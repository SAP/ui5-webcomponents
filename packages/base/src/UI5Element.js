import UI5MinimalElement from "./UI5MinimalElement.js";
import DOMObserver from "./compatibility/DOMObserver.js";
import StaticAreaItem from "./StaticAreaItem.js";

const metadata = {
	events: {
		_propertyChange: {},
	},
};

const elementTimeouts = new Map();

const GLOBAL_CONTENT_DENSITY_CSS_VAR = "--_ui5_content_density";

/**
 * Base class for all UI5 Web Components with advanced features
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.UI5Element
 * @extends ap.ui.webcomponents.base.UI5MinimalElement
 * @public
 */
class UI5Element extends UI5MinimalElement {
	constructor() {
		super();

		this._monitoredChildProps = new Map();
		this._firePropertyChange = false;
	}

	/**
	 * @private
	 */
	_initializeContainers() {
		super._initializeContainers();

		// Init StaticAreaItem only if needed
		if (this.constructor._needsStaticArea()) {
			this.staticAreaItem = new StaticAreaItem(this);
		}
	}

	/**
	 * Do not call this method from derivatives of UI5Element, use "onEnterDOM" only
	 * @private
	 */
	async connectedCallback() {
		// Render the Shadow DOM
		if (this.constructor._needsShadowDOM()) {
			// always register the observer before yielding control to the main thread (await)
			this._startObservingDOMChildren();
			await this._processChildren();
			await this._connectedShadowDOM();
		}

		// Render Fragment if neccessary
		if (this.constructor._needsStaticArea()) {
			this.staticAreaItem._updateFragment(this);
		}
	}

	/**
	 * Do not call this method from derivatives of UI5Element, use "onExitDOM" only
	 * @private
	 */
	disconnectedCallback() {
		if (this.constructor._needsShadowDOM()) {
			this._stopObservingDOMChildren();
			this._disconnectedShadowDOM();
		}

		if (this.constructor._needsStaticArea()) {
			this.staticAreaItem._removeFragmentFromStaticArea();
		}
	}


	/**
	 * @private
	 */
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

	/**
	 * @private
	 */
	_stopObservingDOMChildren() {
		DOMObserver.unobserveDOMNode(this);
	}

	/**
	 * Note: this method is also manually called by "compatibility/patchNodeValue.js"
	 * @private
	 */
	async _processChildren() {
		const hasSlots = this.constructor.getMetadata().hasSlots();
		if (hasSlots) {
			await this._updateSlots();
		}
	}

	/**
	 * @private
	 */
	async _updateSlots() {
		const slotsMap = this.constructor.getMetadata().getSlots();
		const canSlotText = slotsMap.default && slotsMap.default.type === Node;
		const domChildren = Array.from(canSlotText ? this.childNodes : this.children);

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
						let timeoutPromise = elementTimeouts.get(localName);
						if (!timeoutPromise) {
							timeoutPromise = new Promise(resolve => setTimeout(resolve, 1000));
							elementTimeouts.set(localName, timeoutPromise);
						}
						await Promise.race([whenDefinedPromise, timeoutPromise]);
					}
					window.customElements.upgrade(child);
				}
			}

			child = this.constructor.getMetadata().constructor.validateSlotValue(child, slotData);

			if (child.isUI5Element && slotData.listenFor) {
				this._attachChildPropertyUpdated(child, slotData.listenFor);
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

	/**
	 * Removes all children from the slot and detaches listeners, if any
	 * @private
	 */
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


	/**
	 * @private
	 */
	_attachChildPropertyUpdated(child, listenFor) {
		const childMetadata = child.constructor.getMetadata(),
			slotName = this.constructor._getSlotName(child), // all slotted children have the same configuration
			childProperties = childMetadata.getProperties();

		let observedProps = [],
			notObservedProps = [];

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
		child._firePropertyChange = true;
	}

	/**
	 * @private
	 */
	_detachChildPropertyUpdated(child) {
		child.removeEventListener("_propertyChange", this._invalidateParentOnPropertyUpdate);
		child._firePropertyChange = false;
	}

	/**
	 * @private
	 */
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
	 * @private
	 */
	_propertyChange(name, value) {
		super._propertyChange(name, value);

		if (this._firePropertyChange) {
			this.dispatchEvent(new CustomEvent("_propertyChange", {
				detail: { name, newValue: value },
				composed: false,
				bubbles: true,
			}));
		}
	}

	_afterShadowRootUpdated() {
		if (this.constructor._needsStaticArea()) {
			this.staticAreaItem._updateFragment(this);
		}

		// Safari requires that children get the slot attribute only after the slot tags have been rendered in the shadow DOM
		this._assignIndividualSlotsToChildren();
	}

	/**
	 * @private
	 */
	_assignIndividualSlotsToChildren() {
		const domChildren = Array.from(this.children);

		domChildren.forEach(child => {
			if (child._individualSlot) {
				child.setAttribute("slot", child._individualSlot);
			}
		});
	}

	/**
	 * Returns the actual children, associated with a slot.
	 * Useful when there are transitive slots in nested component scenarios and you don't want to get a list of the slots, but rather of their content.
	 * @public
	 */
	getSlottedNodes(slotName) {
		const reducer = (acc, curr) => {
			if (curr.localName !== "slot") {
				return acc.concat([curr]);
			}
			return acc.concat(curr.assignedNodes({ flatten: true }).filter(item => item instanceof HTMLElement));
		};

		return this[slotName].reduce(reducer, []);
	}

	get isCompact() {
		return getComputedStyle(this).getPropertyValue(GLOBAL_CONTENT_DENSITY_CSS_VAR) === "compact";
	}

	updateStaticAreaItemContentDensity() {
		if (this.staticAreaItem) {
			this.staticAreaItem._updateContentDensity(this.isCompact);
		}
	}

	/**
	 * Returns the metadata object for this UI5 Web Component Class
	 * @protected
	 */
	static get metadata() {
		return metadata;
	}

	/**
	 * @private
	 */
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

	/**
	 * @private
	 */
	static _needsStaticArea() {
		return typeof this.staticAreaTemplate === "function";
	}

	/**
	 * @public
	 */
	getStaticAreaItemDomRef() {
		return this.staticAreaItem.getDomRef();
	}
}

export default UI5Element;
