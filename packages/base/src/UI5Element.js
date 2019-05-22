import { getWCNoConflict, getCompactSize } from "./Configuration.js";
import DOMObserver from "./compatibility/DOMObserver.js";
import ShadowDOM from "./compatibility/ShadowDOM.js";
import UI5ElementMetadata from "./UI5ElementMetadata.js";
import Integer from "./types/Integer.js";
import ControlRenderer from "./ControlRenderer.js";
import RenderScheduler from "./RenderScheduler.js";
import TemplateContext from "./TemplateContext.js";
import State from "./State.js";
import { createStyle } from "./CSS.js";
import { attachThemeChange } from "./Theming.js";

const metadata = {
	properties: {
		/**
		 * CSS classes that will be applied to the top-level element of the control
		 */
		_customClasses: {
			type: String,
			multiple: true,
		},

		/**
		 * Attributes (most commonly accessibility-related) that will be passed to the control.
		 * The control has the responsibility to render these attributes
		 */
		_customAttributes: {
			type: Object,
		},
	},
	events: {
		_propertyChange: {},
	},
};

const DefinitionsSet = new Set();
const IDMap = new Map();

class UI5Element extends HTMLElement {
	constructor() {
		super();
		this._generateId();
		this._initializeState();
		this._upgradeAllProperties();
		this._shadowRootReadyPromise = this._initializeShadowRoot();

		attachThemeChange(this.onThemeChanged.bind(this));

		let deferredResolve;
		this._domRefReadyPromise = new Promise(resolve => {
			deferredResolve = resolve;
		});
		this._domRefReadyPromise._deferredResolve = deferredResolve;

		this._monitoredChildProps = new Map();
	}

	_whenShadowRootReady() {
		return this._shadowRootReadyPromise;
	}

	onThemeChanged() {
		if (window.ShadyDOM) {
			// polyfill theme handling is in head styles directly
			return;
		}
		const newStyle = createStyle(this.constructor);
		if (document.adoptedStyleSheets) {
			this.shadowRoot.adoptedStyleSheets = [newStyle];
		} else {
			const oldStyle = this.shadowRoot.querySelector("style");
			oldStyle.textContent = newStyle.textContent;
		}
	}

	_generateId() {
		this._id = this.constructor._nextID();
	}

	async _initializeShadowRoot() {
		const isCompact = getCompactSize();

		if (isCompact) {
			this.setAttribute("data-ui5-compact-size", "");
		}

		if (this.constructor.getMetadata().getNoShadowDOM()) {
			return Promise.resolve();
		}

		this.attachShadow({ mode: "open" });
		const shadowDOM = await ShadowDOM.prepareShadowDOM(this.constructor);
		this.shadowRoot.appendChild(shadowDOM);

		if (document.adoptedStyleSheets) {
			const style = createStyle(this.constructor);
			this.shadowRoot.adoptedStyleSheets = [style];
		}
	}

	async connectedCallback() {
		if (this.constructor.getMetadata().getNoShadowDOM()) {
			return;
		}

		await this._whenShadowRootReady();
		this._processChildren();
		await RenderScheduler.renderImmediately(this);
		this._domRefReadyPromise._deferredResolve();
		this._startObservingDOMChildren();
		if (typeof this.onEnterDOM === "function") {
			this.onEnterDOM();
		}
	}

	disconnectedCallback() {
		if (this.constructor.getMetadata().getNoShadowDOM()) {
			return;
		}

		this._stopObservingDOMChildren();
		if (typeof this.onExitDOM === "function") {
			this.onExitDOM();
		}
	}

	_startObservingDOMChildren() {
		const shouldObserveChildren = this.constructor.getMetadata().hasSlots();
		if (!shouldObserveChildren) {
			return;
		}
		const mutationObserverOptions = {
			childList: true,
			subtree: true,
			characterData: true,
		};
		DOMObserver.observeDOMNode(this, this._processChildren.bind(this), mutationObserverOptions);
	}

	_stopObservingDOMChildren() {
		DOMObserver.unobserveDOMNode(this);
	}

	onChildrenChanged(mutations) {
	}

	_processChildren(mutations) {
		const hasSlots = this.constructor.getMetadata().hasSlots();
		if (hasSlots) {
			this._updateSlots();
		}
		this.onChildrenChanged(mutations);
	}

	_updateSlots() {
		const slotsMap = this.constructor.getMetadata().getSlots();
		const defaultSlot = this.constructor.getMetadata().getDefaultSlot();
		const canSlotText = slotsMap[defaultSlot] !== undefined && slotsMap[defaultSlot].type === Node;

		let domChildren;
		if (canSlotText) {
			domChildren = Array.from(this.childNodes);
		} else {
			domChildren = Array.from(this.children);
		}

		// Init the _state object based on the supported slots
		for (const [prop, propData] of Object.entries(slotsMap)) { // eslint-disable-line
			if (propData.multiple) {
				this._state[prop] = [];
			} else {
				this._state[prop] = null;
			}
		}

		const autoIncrementMap = new Map();
		domChildren.forEach(child => {
			// Determine the type of the child (mainly by the slot attribute)
			const slotName = this.constructor._getSlotName(child);

			// Check if the slotName is supported
			if (slotsMap[slotName] === undefined) {
				const validValues = Object.keys(slotsMap).join(", ");
				console.warn(`Unknown slotName: ${slotName}, ignoring`, child, `Valid values are: ${validValues}`); // eslint-disable-line
				return;
			}

			// For children that need individual slots, calculate them
			if (slotsMap[slotName].individualSlots) {
				const nextId = (autoIncrementMap.get(slotName) || 0) + 1;
				autoIncrementMap.set(slotName, nextId);
				child._individualSlot = `${slotName}-${nextId}`;
			}

			// Distribute the child in the _state object
			if (slotsMap[slotName].multiple) {
				this._state[slotName] = [...this._state[slotName], child];
			} else {
				this._state[slotName] = child;
			}
		});
	}

	static get observedAttributes() {
		const observedProps = this.getMetadata().getObservedProps();
		return observedProps.map(camelToKebabCase);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		const properties = this.constructor.getMetadata().getProperties();
		const realName = name.replace(/^ui5-/, "");
		const nameInCamelCase = kebabToCamelCase(realName);
		if (properties.hasOwnProperty(nameInCamelCase)) { // eslint-disable-line
			const propertyTypeClass = properties[nameInCamelCase].type;
			if (propertyTypeClass === Boolean) {
				newValue = newValue !== null;
			}
			if (propertyTypeClass === Integer) {
				newValue = parseInt(newValue);
			}
			this[nameInCamelCase] = newValue;
		}
	}

	_updateAttribute(name, newValue) {
		if (!UI5ElementMetadata.isPublicProperty(name)) {
			return;
		}

		if (typeof newValue === "object") {
			return;
		}

		const attrName = camelToKebabCase(name);
		const attrValue = this.getAttribute(attrName);
		if (typeof newValue === "boolean") {
			if (newValue === true && attrValue === null) {
				this.setAttribute(attrName, "");
			} else if (newValue === false && attrValue !== null) {
				this.removeAttribute(attrName);
			}
		} else if (attrValue !== newValue) {
			this.setAttribute(attrName, newValue);
		}
	}

	_upgradeProperty(prop) {
		if (this.hasOwnProperty(prop)) { // eslint-disable-line
			const value = this[prop];
			delete this[prop];
			this[prop] = value;
		}
	}

	_upgradeAllProperties() {
		const observedProps = this.constructor.getMetadata().getObservedProps();
		observedProps.forEach(this._upgradeProperty.bind(this));
	}

	static define() {
		const tag = this.getMetadata().getTag();

		if (!DefinitionsSet.has(tag)) {
			DefinitionsSet.add(tag);
			this.generateAccessors();
			window.customElements.define(tag, this);
		}
		return this;
	}

	static get metadata() {
		return metadata;
	}

	static get styles() {
		return "";
	}

	_initializeState() {
		const StateClass = this.constructor.StateClass;
		this._state = new StateClass(this);

		this._delegates = [];
	}

	static get StateClass() {
		if (!this.hasOwnProperty("_StateClass")) { // eslint-disable-line
			this._StateClass = class extends State {};
			this._StateClass.generateAccessors(this.getMetadata());
		}

		return this._StateClass;
	}

	static getMetadata() {
		let klass = this; // eslint-disable-line

		if (klass.hasOwnProperty("_metadata")) { // eslint-disable-line
			return klass._metadata;
		}

		const metadatas = [Object.assign(klass.metadata, {})];
		while (klass !== UI5Element) {
			klass = Object.getPrototypeOf(klass);
			metadatas.push(klass.metadata);
		}

		const result = metadatas[0];

		// merge properties
		result.properties = metadatas.reverse().reduce((result, current) => { // eslint-disable-line
			Object.assign(result, current.properties);
			return result;
		}, {});

		// merge slots
		result.slots = metadatas.reverse().reduce((result, current) => { // eslint-disable-line
			Object.assign(result, current.slots);
			return result;
		}, {});

		// merge events
		result.events = metadatas.reverse().reduce((result, current) => { // eslint-disable-line
			Object.assign(result, current.events);
			return result;
		}, {});

		this._metadata = new UI5ElementMetadata(result);
		return this._metadata;
	}

	static calculateTemplateContext(state) {
		return {
			ctr: state,
		};
	}

	_attachChildPropertyUpdated(child, propData) {
		const listenFor = propData.listenFor,
			childMetadata = child.constructor.getMetadata(),
			slotName = this.constructor._getSlotName(child), // all slotted children have the same configuration
			childProperties = childMetadata.getProperties();

		let observedProps = [],
			notObservedProps = [];

		if (!listenFor) {
			return;
		}

		if (Array.isArray(listenFor)) {
			observedProps = listenFor;
		} else {
			observedProps = Array.isArray(listenFor.props) ? listenFor.props : Object.keys(childProperties);
			notObservedProps = Array.isArray(listenFor.exclude) ? listenFor.exclude : [];
		}

		if (!this._monitoredChildProps.has(slotName)) {
			this._monitoredChildProps.set(slotName, { observedProps, notObservedProps });
		}

		child.addEventListener("_propertyChange", this._invalidateParentOfPropertyUpdate);
	}

	_detachChildPropertyUpdated(child) {
		child.removeEventListener("_propertyChange", this._invalidateParentOfPropertyUpdate);
	}

	_invalidateParentOfPropertyUpdate(prop) {
		// The web component to be invalidated
		const parentNode = this.parentNode;
		if (!parentNode) {
			return;
		}

		const slotName = parentNode.constructor._getSlotName(this);
		const propsMetadata = parentNode._monitoredChildProps.get(slotName);

		if (!propsMetadata) {
			return;
		}
		const { observedProps, notObservedProps } = propsMetadata;

		if (observedProps.includes(prop.detail.name) && !notObservedProps.includes(prop.detail.name)) {
			parentNode._invalidate("_parent_", this);
		}
	}

	/**
	 * Asynchronously re-renders an already rendered control
	 * @private
	 */
	_invalidate() {
		if (this._invalidated) {
			return;
		}

		if (this.getDomRef() && !this._suppressInvalidation) {
			this._invalidated = true;
			// console.log("INVAL", this, ...arguments);
			RenderScheduler.renderDeferred(this);
		}
	}

	_render() {
		// onBeforeRendering
		if (typeof this.onBeforeRendering === "function") {
			this._suppressInvalidation = true;
			this.onBeforeRendering();
			delete this._suppressInvalidation;
		}

		// render
		// console.log(this.getDomRef() ? "RE-RENDER" : "FIRST RENDER", this);
		delete this._invalidated;
		ControlRenderer.render(this);

		// Safari requires that children get the slot attribute only after the slot tags have been rendered in the shadow DOM
		this._assignSlotsToChildren();

		// onAfterRendering
		if (typeof this.onAfterRendering === "function") {
			this.onAfterRendering();
		}
	}

	_assignSlotsToChildren() {
		const defaultSlot = this.constructor.getMetadata().getDefaultSlot();
		const domChildren = Array.from(this.children);

		domChildren.forEach(child => {
			const slotName = this.constructor._getSlotName(child);
			const slot = child.getAttribute("slot");
			const hasSlot = !!slot;

			// Assign individual slots, f.e. items => items-1
			if (child._individualSlot) {
				child.setAttribute("slot", child._individualSlot);
				return;
			}

			// If the user set a slot equal to the default slot, f.e. slot="content", remove it
			// Otherwise, stop here
			if (slotName === defaultSlot) {
				if (hasSlot) {
					child.removeAttribute("slot");
				}
				return;
			}

			// Compatibility - for the ones with "data-ui5-slot"
			// If they don't have a slot yet, and are not of the default child type, set slotName as slot
			if (!hasSlot) {
				child.setAttribute("slot", slotName);
			}
		}, this);


		domChildren.filter(child => child._compatibilitySlot).forEach(child => {
			const hasSlot = !!child.getAttribute("slot");
			const needsSlot = child._compatibilitySlot !== defaultSlot;
			if (!hasSlot && needsSlot) {
				child.setAttribute("slot", child._compatibilitySlot);
			}
		});
	}

	_getTemplateContext() {
		return TemplateContext.calculate(this);
	}

	getDomRef() {
		if (!this.shadowRoot || this.shadowRoot.children.length === 0) {
			return;
		}

		return this._getRoot().children[0];
	}

	_waitForDomRef() {
		return this._domRefReadyPromise;
	}

	_getRoot() {
		return this.shadowRoot.querySelector("[data-sap-ui-wc-root]");
	}

	getFocusDomRef() {
		const domRef = this.getDomRef();
		if (domRef) {
			const focusRef = domRef.querySelector("[data-sap-focus-ref]");
			return focusRef || domRef;
		}
	}

	async focus() {
		await this._waitForDomRef();

		const focusDomRef = this.getFocusDomRef();

		if (focusDomRef) {
			focusDomRef.focus();
		}
	}

	/**
	 * Calls the event handler on the control for a native event
	 *
	 * @param event The event object
	 * @private
	 */
	_handleEvent(event) {
		const sHandlerName = `on${event.type}`;

		this._delegates.forEach(delegate => {
			if (delegate[sHandlerName]) {
				delegate[sHandlerName](event);
			}
		});

		if (this[sHandlerName]) {
			this[sHandlerName](event);
		}
	}

	_propertyChange(name, value) {
		this._updateAttribute(name, value);

		const customEvent = new CustomEvent("_propertyChange", {
			detail: { name, newValue: value },
			composed: false,
			bubbles: true,
		});

		this.dispatchEvent(customEvent);
	}

	/**
	 *
	 * @param name - name of the event
	 * @param data - additional data for the event
	 * @param cancelable - true, if the user can call preventDefault on the event object
	 * @returns {boolean} false, if the event was cancelled (preventDefault called), true otherwise
	 */
	fireEvent(name, data, cancelable) {
		let compatEventResult = true; // Initialized to true, because if the event is not fired at all, it should be considered "not-prevented"
		const noConflict = getWCNoConflict();

		const noConflictEvent = new CustomEvent(`ui5-${name}`, {
			detail: data,
			composed: false,
			bubbles: true,
			cancelable,
		});

		// This will be false if the compat event is prevented
		compatEventResult = this.dispatchEvent(noConflictEvent);

		if (noConflict === true || (noConflict.events && noConflict.events.includes && noConflict.events.includes(name))) {
			return compatEventResult;
		}

		const customEvent = new CustomEvent(name, {
			detail: data,
			composed: false,
			bubbles: true,
			cancelable,
		});

		// This will be false if the normal event is prevented
		const normalEventResult = this.dispatchEvent(customEvent);

		// Return false if any of the two events was prevented (its result was false).
		return normalEventResult && compatEventResult;
	}

	getSlottedNodes(slotName) {
		const reducer = (acc, curr) => {
			if (curr.tagName.toUpperCase() !== "SLOT") {
				return acc.concat([curr]);
			}
			return acc.concat(curr.assignedElements({ flatten: true }));
		};

		return this[slotName].reduce(reducer, []);
	}

	/**
	 * Used to generate the next auto-increment id for the current class
	 * Note: do not call Control._nextID (static) but rather this.constructor._nextID (polymorphic)
	 * @returns {string}
	 * @private
	 */
	static _nextID() {
		const className = "el";
		const lastNumber = IDMap.get(className);
		const nextNumber = lastNumber !== undefined ? lastNumber + 1 : 1;
		IDMap.set(className, nextNumber);
		return `__${className}${nextNumber}`;
	}

	static _getSlotName(child) {
		const defaultSlot = this.getMetadata().getDefaultSlot();

		// Text nodes can only go to the default slot
		if (!(child instanceof HTMLElement)) {
			return defaultSlot;
		}

		// Check for explicitly given logical slot
		const ui5Slot = child.getAttribute("data-ui5-slot");
		if (ui5Slot) {
			return ui5Slot;
		}

		// Discover the slot based on the real slot name (f.e. footer => footer, or content-32 => content)
		const slot = child.getAttribute("slot");
		if (slot) {
			const match = slot.match(/^(.+?)-\d+$/);
			return match ? match[1] : slot;
		}

		// Use default slot as a fallback
		return defaultSlot;
	}

	static generateAccessors() {
		const proto = this.prototype;

		// Properties
		const properties = this.getMetadata().getProperties();
		for (const [prop, propData] of Object.entries(properties)) { // eslint-disable-line
			if (nameCollidesWithNative(prop)) {
				throw new Error(`"${prop}" is not a valid property name. Use a name that does not collide with DOM APIs`);
			}

			if (propData.type === "boolean" && propData.defaultValue) {
				throw new Error(`Cannot set a default value for property "${prop}". All booleans are false by default.`);
			}

			Object.defineProperty(proto, prop, {
				get() {
					return this._state[prop];
				},
				set(value) {
					this._state[prop] = value;
				},
			});
		}

		// Slots
		const slots = this.getMetadata().getSlots();
		for (const [slot] of Object.entries(slots)) { // eslint-disable-line
			if (nameCollidesWithNative(slot)) {
				throw new Error(`"${slot}" is not a valid property name. Use a name that does not collide with DOM APIs`);
			}

			Object.defineProperty(proto, slot, {
				get() {
					return this._state[slot];
				},
				set() {
					throw new Error("Cannot set slots directly, use the DOM APIs");
				},
			});
		}
	}
}
const kebabToCamelCase = string => toCamelCase(string.split("-"));
const camelToKebabCase = string => string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = parts => {
	return parts.map((string, index) => {
		return index === 0 ? string.toLowerCase() : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}).join("");
};
const nameCollidesWithNative = name => {
	if (name === "disabled") {
		return false;
	}
	const classes = [
		HTMLElement,
		Element,
		Node,
	];
	return classes.some(klass => klass.prototype.hasOwnProperty(name)); // eslint-disable-line
};

export default UI5Element;
