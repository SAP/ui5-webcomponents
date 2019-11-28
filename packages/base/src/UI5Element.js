import boot from "./boot.js";
import { skipOriginalEvent } from "./config/NoConflict.js";
import { getCompactSize } from "./config/CompactSize.js";
import DOMObserver from "./compatibility/DOMObserver.js";
import UI5ElementMetadata from "./UI5ElementMetadata.js";
import Integer from "./types/Integer.js";
import RenderScheduler from "./RenderScheduler.js";
import { getConstructableStyle, createHeadStyle, getShadowRootStyle } from "./CSS.js";
import { attachThemeChange } from "./Theming.js";
import { kebabToCamelCase, camelToKebabCase } from "./util/StringHelper.js";
import isValidPropertyName from "./util/isValidPropertyName.js";

const metadata = {
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
		this._initializeShadowRoot();

		attachThemeChange(this.onThemeChanged.bind(this));

		let deferredResolve;
		this._domRefReadyPromise = new Promise(resolve => {
			deferredResolve = resolve;
		});
		this._domRefReadyPromise._deferredResolve = deferredResolve;

		this._monitoredChildProps = new Map();
	}

	onThemeChanged() {
		if (window.ShadyDOM || !this.constructor.needsShadowDOM()) {
			// polyfill theme handling is in head styles directly
			return;
		}
		const newStyle = getConstructableStyle(this.constructor);
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

	_initializeShadowRoot() {
		if (!this.constructor.needsShadowDOM()) {
			return;
		}

		this.attachShadow({ mode: "open" });

		// IE11, Edge
		if (window.ShadyDOM) {
			createHeadStyle(this.constructor);
		}

		// Chrome
		if (document.adoptedStyleSheets) {
			const style = getConstructableStyle(this.constructor);
			this.shadowRoot.adoptedStyleSheets = [style];
		}
	}

	async connectedCallback() {
		const isCompact = getCompactSize();
		if (isCompact) {
			this.setAttribute("data-ui5-compact-size", "");
		}

		if (!this.constructor.needsShadowDOM()) {
			return;
		}

		// always register the observer before yielding control to the main thread (await)
		this._startObservingDOMChildren();

		await this._processChildren();
		await RenderScheduler.renderImmediately(this);
		this._domRefReadyPromise._deferredResolve();
		if (typeof this.onEnterDOM === "function") {
			this.onEnterDOM();
		}
	}

	disconnectedCallback() {
		if (!this.constructor.needsShadowDOM()) {
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

	async _processChildren(mutations) {
		const hasSlots = this.constructor.getMetadata().hasSlots();
		if (hasSlots) {
			await this._updateSlots();
		}
		this.onChildrenChanged(mutations);
	}

	async _updateSlots() {
		const slotsMap = this.constructor.getMetadata().getSlots();
		const canSlotText = slotsMap.default && slotsMap.default.type === Node;

		let domChildren;
		if (canSlotText) {
			domChildren = Array.from(this.childNodes);
		} else {
			domChildren = Array.from(this.children);
		}

		// Init the _state object based on the supported slots
		for (const [slotName, slotData] of Object.entries(slotsMap)) { // eslint-disable-line
			this._clearSlot(slotName);
		}

		const autoIncrementMap = new Map();
		const slottedChildrenMap = new Map();

		const allChildrenUpgraded = domChildren.map(async (child, idx) => {
			// Determine the type of the child (mainly by the slot attribute)
			const slotName = this.constructor._getSlotName(child);
			const slotData = slotsMap[slotName];

			// Check if the slotName is supported
			if (slotData === undefined) {
				const validValues = Object.keys(slotsMap).join(", ");
				console.warn(`Unknown slotName: ${slotName}, ignoring`, child, `Valid values are: ${validValues}`); // eslint-disable-line
				return;
			}

			// For children that need individual slots, calculate them
			if (slotData.individualSlots) {
				const nextId = (autoIncrementMap.get(slotName) || 0) + 1;
				autoIncrementMap.set(slotName, nextId);
				child._individualSlot = `${slotName}-${nextId}`;
			}

			// Await for not-yet-defined custom elements
			if (child instanceof HTMLElement) {
				const localName = child.localName;
				const isCustomElement = localName.includes("-");
				if (isCustomElement) {
					const isDefined = window.customElements.get(localName);
					if (!isDefined) {
						const whenDefinedPromise = window.customElements.whenDefined(localName); // Class registered, but instances not upgraded yet
						const timeoutPromise = new Promise(resolve => setTimeout(resolve, 1000));
						await Promise.race([whenDefinedPromise, timeoutPromise]);
					}
					window.customElements.upgrade(child);
				}
			}

			child = this.constructor.getMetadata().constructor.validateSlotValue(child, slotData);

			if (child.isUI5Element) {
				this._attachChildPropertyUpdated(child, slotData);
			}

			const propertyName = slotData.propertyName || slotName;

			if (slottedChildrenMap.has(propertyName)) {
				slottedChildrenMap.get(propertyName).push({ child, idx });
			} else {
				slottedChildrenMap.set(propertyName, [{ child, idx }]);
			}
		});

		await Promise.all(allChildrenUpgraded);

		// Distribute the child in the _state object, keeping the Light DOM order,
		// not the order elements are defined.
		slottedChildrenMap.forEach((children, slot) => {
			this._state[slot] = children.sort((a, b) => a.idx - b.idx).map(_ => _.child);
		});
		this._invalidate();
	}

	// Removes all children from the slot and detaches listeners, if any
	_clearSlot(slotName) {
		const slotData = this.constructor.getMetadata().getSlots()[slotName];
		const propertyName = slotData.propertyName || slotName;

		let children = this._state[propertyName];
		if (!Array.isArray(children)) {
			children = [children];
		}

		children.forEach(child => {
			if (child && child.isUI5Element) {
				this._detachChildPropertyUpdated(child);
			}
		});

		this._state[propertyName] = [];
		this._invalidate(propertyName, []);
	}

	static get observedAttributes() {
		const observedAttributes = this.getMetadata().getAttributesList();
		return observedAttributes.map(camelToKebabCase);
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
		if (!this.constructor.getMetadata().hasAttribute(name)) {
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
		const allProps = this.constructor.getMetadata().getPropsList();
		allProps.forEach(this._upgradeProperty.bind(this));
	}

	static async define() {
		await boot();
		const tag = this.getMetadata().getTag();

		const definedLocally = DefinitionsSet.has(tag);
		const definedGlobally = customElements.get(tag);

		if (definedGlobally && !definedLocally) {
			console.warn(`Skipping definition of tag ${tag}, because it was already defined by another instance of ui5-webcomponents.`); // eslint-disable-line
		} else if (!definedGlobally) {
			this.generateAccessors();
			DefinitionsSet.add(tag);
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
		const defaultState = this.constructor._getDefaultState();
		this._state = Object.assign({}, defaultState);
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

		result.properties = this._mergeMetadataEntry(metadatas, "properties"); // merge properties
		result.slots = this._mergeMetadataEntry(metadatas, "slots"); // merge slots
		result.events = this._mergeMetadataEntry(metadatas, "events"); // merge events

		this._metadata = new UI5ElementMetadata(result);
		return this._metadata;
	}

	static _mergeMetadataEntry(metadatas, prop) {
		return metadatas.reverse().reduce((result, current) => { // eslint-disable-line
			Object.assign(result, current[prop] || {});
			return result;
		}, {});
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

		child.addEventListener("_propertyChange", this._invalidateParentOnPropertyUpdate);
	}

	_detachChildPropertyUpdated(child) {
		child.removeEventListener("_propertyChange", this._invalidateParentOnPropertyUpdate);
	}

	_invalidateParentOnPropertyUpdate(prop) {
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
	 * Asynchronously re-renders an already rendered web component
	 * @private
	 */
	_invalidate() {
		if (this._invalidated) {
			// console.log("already invalidated", this, ...arguments);
			return;
		}

		if (this.getDomRef() && !this._suppressInvalidation) {
			this._invalidated = true;
			// console.log("INVAL", this, ...arguments);
			RenderScheduler.renderDeferred(this);
		}
	}

	_render() {
		// suppress invalidation to prevent state changes scheduling another rendering
		this._suppressInvalidation = true;

		if (typeof this.onBeforeRendering === "function") {
			this.onBeforeRendering();
		}

		// Intended for framework usage only. Currently ItemNavigation updates tab indexes after the component has updated its state but before the template is rendered
		this.dispatchEvent(new CustomEvent("_componentStateFinalized"));

		// resume normal invalidation handling
		delete this._suppressInvalidation;

		// Update the shadow root with the render result
		// console.log(this.getDomRef() ? "RE-RENDER" : "FIRST RENDER", this);
		delete this._invalidated;
		this._updateShadowRoot();

		// Safari requires that children get the slot attribute only after the slot tags have been rendered in the shadow DOM
		this._assignIndividualSlotsToChildren();

		// Call the onAfterRendering hook
		if (typeof this.onAfterRendering === "function") {
			this.onAfterRendering();
		}
	}

	_updateShadowRoot() {
		const renderResult = this.constructor.template(this);
		// For browsers that do not support constructable style sheets (and not using the polyfill)
		const styleToPrepend = getShadowRootStyle(this.constructor);
		this.constructor.render(renderResult, this.shadowRoot, styleToPrepend, { eventContext: this });
	}

	_assignIndividualSlotsToChildren() {
		const domChildren = Array.from(this.children);

		domChildren.forEach(child => {
			if (child._individualSlot) {
				child.setAttribute("slot", child._individualSlot);
			}
		});
	}

	getDomRef() {
		if (!this.shadowRoot || this.shadowRoot.children.length === 0) {
			return;
		}

		return this.shadowRoot.children.length === 1
			? this.shadowRoot.children[0] : this.shadowRoot.children[1];
	}

	_waitForDomRef() {
		return this._domRefReadyPromise;
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

		if (focusDomRef && typeof focusDomRef.focus === "function") {
			focusDomRef.focus();
		}
	}

	/**
	 * Calls the event handler on the web component for a native event
	 *
	 * @param event The event object
	 * @private
	 */
	_handleEvent(event) {
		const sHandlerName = `on${event.type}`;

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

		const noConflictEvent = new CustomEvent(`ui5-${name}`, {
			detail: data,
			composed: false,
			bubbles: true,
			cancelable,
		});

		// This will be false if the compat event is prevented
		compatEventResult = this.dispatchEvent(noConflictEvent);

		if (skipOriginalEvent(name)) {
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
			if (curr.localName !== "slot") {
				return acc.concat([curr]);
			}
			return acc.concat(curr.assignedNodes({ flatten: true }).filter(item => item instanceof HTMLElement));
		};

		return this[slotName].reduce(reducer, []);
	}

	/**
	 * Used to duck-type UI5 elements without using instanceof
	 * @returns {boolean}
	 * @public
	 */
	get isUI5Element() {
		return true;
	}

	/**
	 * Used to generate the next auto-increment id for the current class
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
		// Text nodes can only go to the default slot
		if (!(child instanceof HTMLElement)) {
			return "default";
		}

		// Discover the slot based on the real slot name (f.e. footer => footer, or content-32 => content)
		const slot = child.getAttribute("slot");
		if (slot) {
			const match = slot.match(/^(.+?)-\d+$/);
			return match ? match[1] : slot;
		}

		// Use default slot as a fallback
		return "default";
	}

	static needsShadowDOM() {
		return !!this.template;
	}

	static _getDefaultState() {
		if (this._defaultState) {
			return this._defaultState;
		}

		const MetadataClass = this.getMetadata();
		const defaultState = {};

		// Initialize properties
		const props = MetadataClass.getProperties();
		for (const propName in props) { // eslint-disable-line
			const propType = props[propName].type;
			const propDefaultValue = props[propName].defaultValue;

			if (propType === Boolean) {
				defaultState[propName] = false;

				if (propDefaultValue !== undefined) {
					console.warn("The 'defaultValue' metadata key is ignored for all booleans properties, they would be initialized with 'false' by default"); // eslint-disable-line
				}
			} else if (props[propName].multiple) {
				defaultState[propName] = [];
			} else if (propType === Object) {
				defaultState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : {};
			} else if (propType === String) {
				defaultState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : "";
			} else {
				defaultState[propName] = propDefaultValue;
			}
		}

		// Initialize slots
		const slots = MetadataClass.getSlots();
		for (const [slotName, slotData] of Object.entries(slots)) { // eslint-disable-line
			const propertyName = slotData.propertyName || slotName;
			defaultState[propertyName] = [];
		}

		this._defaultState = defaultState;
		return defaultState;
	}

	static generateAccessors() {
		const proto = this.prototype;

		// Properties
		const properties = this.getMetadata().getProperties();
		for (const [prop, propData] of Object.entries(properties)) { // eslint-disable-line
			if (!isValidPropertyName(prop)) {
				throw new Error(`"${prop}" is not a valid property name. Use a name that does not collide with DOM APIs`);
			}

			if (propData.type === "boolean" && propData.defaultValue) {
				throw new Error(`Cannot set a default value for property "${prop}". All booleans are false by default.`);
			}

			Object.defineProperty(proto, prop, {
				get() {
					if (this._state[prop] !== undefined) {
						return this._state[prop];
					}

					const propDefaultValue = propData.defaultValue;

					if (propData.type === Boolean) {
						return false;
					} else if (propData.type === String) {  // eslint-disable-line
						return propDefaultValue;
					} else if (propData.multiple) { // eslint-disable-line
						return [];
					} else {
						return propDefaultValue;
					}
				},
				set(value) {
					value = this.constructor.getMetadata().constructor.validatePropertyValue(value, propData);

					const oldState = this._state[prop];

					if (oldState !== value) {
						this._state[prop] = value;
						this._invalidate(prop, value);
						this._propertyChange(prop, value);
					}
				},
			});
		}

		// Slots
		const slots = this.getMetadata().getSlots();
		for (const [slotName, slotData] of Object.entries(slots)) { // eslint-disable-line
			if (!isValidPropertyName(slotName)) {
				throw new Error(`"${slotName}" is not a valid property name. Use a name that does not collide with DOM APIs`);
			}

			const propertyName = slotData.propertyName || slotName;
			Object.defineProperty(proto, propertyName, {
				get() {
					if (this._state[propertyName] !== undefined) {
						return this._state[propertyName];
					}
					return [];
				},
				set() {
					throw new Error("Cannot set slots directly, use the DOM APIs");
				},
			});
		}
	}
}

export default UI5Element;
