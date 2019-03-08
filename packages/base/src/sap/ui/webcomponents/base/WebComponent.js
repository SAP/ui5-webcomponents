import { getWCNoConflict } from "./Configuration";
import DOMObserver from "./compatibility/DOMObserver";
import ShadowDOM from "./compatibility/ShadowDOM";
import WebComponentMetadata from "./WebComponentMetadata";
import Integer from "./types/Integer";
import ControlRenderer from "./ControlRenderer";
import RenderScheduler from "./RenderScheduler";
import TemplateContext from "./TemplateContext";
import { attachThemeChange } from "./Theming";
import State from "./State";

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

class WebComponent extends HTMLElement {
	constructor() {
		super();
		this._generateId();
		this._initializeState();
		this._upgradeAllProperties();
		this._shadowRootReadyPromise = this._initializeShadowRoot();

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

	_generateId() {
		this._id = this.constructor._nextID();
	}

	_initializeShadowRoot() {
		if (this.constructor.getMetadata().getNoShadowDOM()) {
			return Promise.resolve();
		}

		this.attachShadow({ mode: "open" });
		return new Promise(resolve => {
			ShadowDOM.prepareShadowDOM(this.constructor).then(shadowDOM => {
				this.shadowRoot.appendChild(shadowDOM);
				resolve();
			});
		});
	}

	connectedCallback() {
		if (this.constructor.getMetadata().getNoShadowDOM()) {
			return;
		}

		this._whenShadowRootReady().then(() => {
			this._processChildren();
			RenderScheduler.renderImmediately(this).then(() => {
				this._domRefReadyPromise._deferredResolve();
				this._startObservingDOMChildren();
				if (typeof this.onEnterDOM === "function") {
					this.onEnterDOM();
				}
			});
		});
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
		const shouldObserveText = this.constructor.getMetadata().usesNodeText();
		if (!shouldObserveChildren && !shouldObserveText) {
			return;
		}
		const mutationObserverOptions = {
			childList: true,
			subtree: shouldObserveText,
			characterData: shouldObserveText,
		};
		DOMObserver.observeDOMNode(this, this._processChildren.bind(this), mutationObserverOptions);
	}

	_stopObservingDOMChildren() {
		DOMObserver.unobserveDOMNode(this);
	}

	onChildrenChanged(mutations) {
	}

	_processChildren(mutations) {
		const usesNodeText = this.constructor.getMetadata().usesNodeText();
		const hasChildren = this.constructor.getMetadata().hasSlots();
		if (usesNodeText) {
			this._updateNodeText();
		} else if (hasChildren) {
			this._updateSlots();
		}
		this.onChildrenChanged(mutations);
	}

	_updateNodeText() {
		this._state._nodeText = this.textContent;
	}

	_updateSlots() {
		const domChildren = Array.from(this.children);

		const slotsMap = this.constructor.getMetadata().getSlots();
		for (const [prop, propData] of Object.entries(slotsMap)) { // eslint-disable-line
			if (propData.multiple) {
				this._state[prop] = [];
			} else {
				this._state[prop] = null;
			}
		}
		const autoIncrementMap = new Map();
		domChildren.forEach(child => {
			const slot = child.getAttribute("data-ui5-slot") || this.constructor.getMetadata().getDefaultSlot();
			if (slotsMap[slot] === undefined) {
				const validValues = Object.keys(slotsMap).join(", ");
				console.warn(`Unknown data-ui5-slot value: ${slot}, ignoring`, child, `Valid data-ui5-slot values are: ${validValues}`); // eslint-disable-line
				return;
			}
			let slotName;
			if (slotsMap[slot].multiple) {
				const nextId = (autoIncrementMap.get(slot) || 0) + 1;
				slotName = `${slot}-${nextId}`;
				autoIncrementMap.set(slot, nextId);
			} else {
				slotName = slot;
			}
			child._slot = slotName;
			if (slotsMap[slot].multiple) {
				this._state[slot] = [...this._state[slot], child];
			} else {
				this._state[slot] = child;
			}
			child.setAttribute("slot", slotName);
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
		if (!WebComponentMetadata.isPublicProperty(name)) {
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
		while (klass !== WebComponent) {
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

		this._metadata = new WebComponentMetadata(result);
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
			childType = child.getAttribute("data-ui5-slot"), // all slotted children have the same configuration
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

		if (!this._monitoredChildProps.has(childType)) {
			this._monitoredChildProps.set(childType, { observedProps, notObservedProps });
		}

		child.addEventListener("_propertyChange", this._onChildPropertyUpdated);
	}

	_detachChildPropertyUpdated(child) {
		child.removeEventListener("_propertyChange", this._onChildPropertyUpdated);
	}

	_onChildPropertyUpdated(prop) {
		if (!this.parentNode) {
			return;
		}

		const propsMetadata = this.parentNode._monitoredChildProps.get(this.getAttribute("data-ui5-slot"));

		if (!propsMetadata) {
			return;
		}
		const { observedProps, notObservedProps } = propsMetadata;

		if (observedProps.includes(prop.detail.name) && !notObservedProps.includes(prop.detail.name)) {
			this.parentNode._invalidate("_parent_", this);
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

		// onAfterRendering
		if (typeof this.onAfterRendering === "function") {
			this.onAfterRendering();
		}
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

		let customEvent = new CustomEvent(name, {
			detail: data,
			composed: false,
			bubbles: true,
			cancelable,
		});

		// This will be false if the normal event is prevented
		const normalEventResult = this.dispatchEvent(customEvent);

		if (WebComponent.noConflictEvents.includes(name)) {
			customEvent = new CustomEvent(`ui5-${name}`, {
				detail: data,
				composed: false,
				bubbles: true,
				cancelable,
			});

			// This will be false if the compat event is prevented
			compatEventResult = this.dispatchEvent(customEvent);
		}

		// Return false if any of the two events was prevented (its result was false).
		return normalEventResult && compatEventResult;
	}

	getSlottedNodes(slotName) {
		const getSlottedElement = el => {
			if (el.tagName.toUpperCase() !== "SLOT") {
				return el;
			}

			const nodes = el.assignedNodes();

			if (nodes.length) {
				return getSlottedElement(nodes[0]);
			}
		};

		return this[slotName].map(getSlottedElement);
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

		// Node Text
		Object.defineProperty(proto, "_nodeText", {
			get() {
				return this._state._nodeText;
			},
			set() {
				throw new Error("Cannot set node text directly, use the DOM APIs");
			},
		});
	}

	static get noConflictEvents() {
		if (!this._noConflictEvents) {
			const noConflictConfig = getWCNoConflict();
			this._noConflictEvents = [];
			if (typeof noConflictConfig === "object" && typeof noConflictConfig.events === "string") {
				this._noConflictEvents = noConflictConfig.events.split(",").map(evtName => evtName.trim());
			}
		}

		return this._noConflictEvents;
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

export default WebComponent;
