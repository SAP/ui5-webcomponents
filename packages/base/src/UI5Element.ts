import merge from "./thirdparty/merge.js";
import { boot } from "./Boot.js";
import UI5ElementMetadata, {
	Slot,
	SlotValue,
	State,
	PropertyValue,
	Metadata,
} from "./UI5ElementMetadata.js";
import EventProvider from "./EventProvider.js";
import getSingletonElementInstance from "./util/getSingletonElementInstance.js";
import StaticAreaItem from "./StaticAreaItem.js";
import updateShadowRoot from "./updateShadowRoot.js";
import { renderDeferred, renderImmediately, cancelRender } from "./Render.js";
import { registerTag, isTagRegistered, recordTagRegistrationFailure } from "./CustomElementsRegistry.js";
import { observeDOMNode, unobserveDOMNode } from "./DOMObserver.js";
import { skipOriginalEvent } from "./config/NoConflict.js";
import getEffectiveDir from "./locale/getEffectiveDir.js";
import DataType from "./types/DataType.js";
import { kebabToCamelCase, camelToKebabCase } from "./util/StringHelper.js";
import isValidPropertyName from "./util/isValidPropertyName.js";
import { getSlotName, getSlottedNodesList } from "./util/SlotsHelper.js";
import arraysAreEqual from "./util/arraysAreEqual.js";
import { markAsRtlAware } from "./locale/RTLAwareRegistry.js";
import preloadLinks from "./theming/preloadLinks.js";
import { TemplateFunction, TemplateFunctionResult } from "./renderer/executeTemplate.js";
import { PromiseResolve, ComponentStylesData, ClassMap } from "./types.js";

let autoId = 0;

const elementTimeouts = new Map<string, Promise<void>>();
const uniqueDependenciesCache = new Map<typeof UI5Element, Array<typeof UI5Element>>();

type ChangeInfo = {
	type: "property" | "slot",
	name: string,
	reason?: string,
	child?: SlotValue,
	target?: UI5Element,
	newValue?: PropertyValue,
	oldValue?: PropertyValue,
}

type InvalidationInfo = ChangeInfo & { target: UI5Element };

type ChildChangeListener = (param: InvalidationInfo) => void;

type SlotChangeListener = (this: HTMLSlotElement, ev: Event) => void;

/**
 * Triggers re-rendering of a UI5Element instance due to state change.
 * @param {ChangeInfo} changeInfo An object with information about the change that caused invalidation.
 * @private
 */
function _invalidate(this: UI5Element, changeInfo: ChangeInfo) {
	// Invalidation should be suppressed: 1) before the component is rendered for the first time 2) and during the execution of onBeforeRendering
	// This is necessary not only as an optimization, but also to avoid infinite loops on invalidation between children and parents (when invalidateOnChildChange is used)
	if (this._suppressInvalidation) {
		return;
	}

	// Call the onInvalidation hook
	this.onInvalidation(changeInfo);

	this._changedState.push(changeInfo);
	renderDeferred(this);
	this._eventProvider.fireEvent("invalidate", { ...changeInfo, target: this });
}

let metadata = {} as Metadata;

/**
 * Base class for all UI5 Web Components
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.base.UI5Element
 * @extends HTMLElement
 * @public
 */
abstract class UI5Element extends HTMLElement {
	__id?: string;
	_suppressInvalidation: boolean;
	_changedState: Array<ChangeInfo>;
	_eventProvider: EventProvider<InvalidationInfo, void>;
	_inDOM: boolean;
	_fullyConnected: boolean;
	_childChangeListeners: Map<string, ChildChangeListener>;
	_slotChangeListeners: Map<string, SlotChangeListener>;
	_domRefReadyPromise: Promise<void> & { _deferredResolve?: PromiseResolve };
	_doNotSyncAttributes: Set<string>;
	_state: State;
	_onComponentStateFinalized?: () => void;
	_getRealDomRef?: () => HTMLElement;

	staticAreaItem?: StaticAreaItem;

	static template?: TemplateFunction;
	static staticAreaTemplate?: TemplateFunction;
	static _metadata: UI5ElementMetadata;
	static render: (templateFunctionResult: TemplateFunctionResult, container: HTMLElement | DocumentFragment, styleStrOrHrefsArr: string | Array<string> | undefined, forStaticArea: boolean, options: { host: HTMLElement }) => void;

	constructor() {
		super();

		const ctor = this.constructor as typeof UI5Element;
		this._changedState = []; // Filled on each invalidation, cleared on re-render (used for debugging)
		this._suppressInvalidation = true; // A flag telling whether all invalidations should be ignored. Initialized with "true" because a UI5Element can not be invalidated until it is rendered for the first time
		this._inDOM = false; // A flag telling whether the UI5Element is currently in the DOM tree of the document or not
		this._fullyConnected = false; // A flag telling whether the UI5Element's onEnterDOM hook was called (since it's possible to have the element removed from DOM before that)
		this._childChangeListeners = new Map(); // used to store lazy listeners per slot for the child change event of every child inside that slot
		this._slotChangeListeners = new Map(); // used to store lazy listeners per slot for the slotchange event of all slot children inside that slot
		this._eventProvider = new EventProvider(); // used by parent components for listening to changes to child components
		let deferredResolve;
		this._domRefReadyPromise = new Promise(resolve => {
			deferredResolve = resolve;
		});
		this._domRefReadyPromise._deferredResolve = deferredResolve;
		this._doNotSyncAttributes = new Set(); // attributes that are excluded from attributeChangedCallback synchronization

		this._state = { ...ctor.getMetadata().getInitialState() };

		this._upgradeAllProperties();

		if (ctor._needsShadowDOM()) {
			this.attachShadow({ mode: "open" });
		}
	}

	/**
	 * Returns a unique ID for this UI5 Element
	 *
	 * @deprecated - This property is not guaranteed in future releases
	 * @protected
	 */
	get _id() {
		if (!this.__id) {
			this.__id = `ui5wc_${++autoId}`;
		}

		return this.__id;
	}

	/**
	 * Do not call this method from derivatives of UI5Element, use "onEnterDOM" only
	 * @private
	 */
	async connectedCallback() {
		const ctor = this.constructor as typeof UI5Element;

		this.setAttribute(ctor.getMetadata().getPureTag(), "");
		if (ctor.getMetadata().supportsF6FastNavigation()) {
			this.setAttribute("data-sap-ui-fastnavgroup", "true");
		}

		const slotsAreManaged = ctor.getMetadata().slotsAreManaged();

		this._inDOM = true;

		if (slotsAreManaged) {
			// always register the observer before yielding control to the main thread (await)
			this._startObservingDOMChildren();
			await this._processChildren();
		}

		if (!this._inDOM) { // Component removed from DOM while _processChildren was running
			return;
		}

		renderImmediately(this);
		this._domRefReadyPromise._deferredResolve!();
		this._fullyConnected = true;
		this.onEnterDOM();
	}

	/**
	 * Do not call this method from derivatives of UI5Element, use "onExitDOM" only
	 * @private
	 */
	disconnectedCallback() {
		const ctor = this.constructor as typeof UI5Element;
		const slotsAreManaged = ctor.getMetadata().slotsAreManaged();

		this._inDOM = false;

		if (slotsAreManaged) {
			this._stopObservingDOMChildren();
		}

		if (this._fullyConnected) {
			this.onExitDOM();
			this._fullyConnected = false;
		}

		if (this.staticAreaItem && this.staticAreaItem.parentElement) {
			this.staticAreaItem.parentElement.removeChild(this.staticAreaItem);
		}

		cancelRender(this);
	}

	/**
	 * Called every time before the component renders.
	 * @public
	 */
	onBeforeRendering() {}

	/**
	 * Called every time after the component renders.
	 * @public
	 */
	onAfterRendering() {}

	/**
	 * Called on connectedCallback - added to the DOM.
	 * @public
	 */
	onEnterDOM() {}

	/**
	 * Called on disconnectedCallback - removed from the DOM.
	 * @public
	 */
	onExitDOM() {}

	/**
	 * @private
	 */
	_startObservingDOMChildren() {
		const ctor = this.constructor as typeof UI5Element;
		const shouldObserveChildren = ctor.getMetadata().hasSlots();
		if (!shouldObserveChildren) {
			return;
		}

		const canSlotText = ctor.getMetadata().canSlotText();
		const mutationObserverOptions = {
			childList: true,
			subtree: canSlotText,
			characterData: canSlotText,
		};
		observeDOMNode(this, this._processChildren.bind(this) as MutationCallback, mutationObserverOptions);
	}

	/**
	 * @private
	 */
	_stopObservingDOMChildren() {
		unobserveDOMNode(this);
	}

	/**
	 * Note: this method is also manually called by "compatibility/patchNodeValue.js"
	 * @private
	 */
	async _processChildren() {
		const hasSlots = (this.constructor as typeof UI5Element).getMetadata().hasSlots();
		if (hasSlots) {
			await this._updateSlots();
		}
	}

	/**
	 * @private
	 */
	async _updateSlots() {
		const ctor = this.constructor as typeof UI5Element;
		const slotsMap = ctor.getMetadata().getSlots();
		const canSlotText = ctor.getMetadata().canSlotText();
		const domChildren = Array.from(canSlotText ? this.childNodes : this.children) as Array<Node>;

		const slotsCachedContentMap = new Map<string, Array<SlotValue>>(); // Store here the content of each slot before the mutation occurred
		const propertyNameToSlotMap = new Map<string, string>(); // Used for reverse lookup to determine to which slot the property name corresponds

		// Init the _state object based on the supported slots and store the previous values
		for (const [slotName, slotData] of Object.entries(slotsMap)) { // eslint-disable-line
			const propertyName = slotData.propertyName || slotName;
			propertyNameToSlotMap.set(propertyName, slotName);
			slotsCachedContentMap.set(propertyName, [...(this._state[propertyName] as Array<SlotValue>)]);
			this._clearSlot(slotName, slotData);
		}

		const autoIncrementMap = new Map<string, number>();
		const slottedChildrenMap = new Map<string, Array<{child: Node, idx: number }>>();

		const allChildrenUpgraded = domChildren.map(async (child, idx) => {
			// Determine the type of the child (mainly by the slot attribute)
			const slotName = getSlotName(child);
			const slotData = slotsMap[slotName];

			// Check if the slotName is supported
			if (slotData === undefined) {
				if (slotName !== "default") {
					const validValues = Object.keys(slotsMap).join(", ");
					console.warn(`Unknown slotName: ${slotName}, ignoring`, child, `Valid values are: ${validValues}`); // eslint-disable-line
				}

				return;
			}

			// For children that need individual slots, calculate them
			if (slotData.individualSlots) {
				const nextIndex = (autoIncrementMap.get(slotName) || 0) + 1;
				autoIncrementMap.set(slotName, nextIndex);
				(child as Record<string, any>)._individualSlot = `${slotName}-${nextIndex}`;
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

			child = (ctor.getMetadata().constructor as typeof UI5ElementMetadata).validateSlotValue(child, slotData);

			// Listen for any invalidation on the child if invalidateOnChildChange is true or an object (ignore when false or not set)
			if (instanceOfUI5Element(child) && slotData.invalidateOnChildChange) {
				const childChangeListener = this._getChildChangeListener(slotName);

				if (childChangeListener) {
					child.attachInvalidate.call(child, childChangeListener);
				}
			}

			// Listen for the slotchange event if the child is a slot itself
			if (child instanceof HTMLSlotElement) {
				this._attachSlotChange(child, slotName);
			}

			const propertyName = slotData.propertyName || slotName;

			if (slottedChildrenMap.has(propertyName)) {
				slottedChildrenMap.get(propertyName)!.push({ child, idx });
			} else {
				slottedChildrenMap.set(propertyName, [{ child, idx }]);
			}
		});

		await Promise.all(allChildrenUpgraded);

		// Distribute the child in the _state object, keeping the Light DOM order,
		// not the order elements are defined.
		slottedChildrenMap.forEach((children, propertyName) => {
			this._state[propertyName] = children.sort((a, b) => a.idx - b.idx).map(_ => _.child);
		});

		// Compare the content of each slot with the cached values and invalidate for the ones that changed
		let invalidated = false;
		for (const [slotName, slotData] of Object.entries(slotsMap)) { // eslint-disable-line
			const propertyName = slotData.propertyName || slotName;
			if (!arraysAreEqual(slotsCachedContentMap.get(propertyName)!, this._state[propertyName] as Array<SlotValue>)) {
				_invalidate.call(this, {
					type: "slot",
					name: propertyNameToSlotMap.get(propertyName)!,
					reason: "children",
				});
				invalidated = true;
			}
		}

		// If none of the slots had an invalidation due to changes to immediate children,
		// the change is considered to be text content of the default slot
		if (!invalidated) {
			_invalidate.call(this, {
				type: "slot",
				name: "default",
				reason: "textcontent",
			});
		}
	}

	/**
	 * Removes all children from the slot and detaches listeners, if any
	 * @private
	 */
	_clearSlot(slotName: string, slotData: Slot) {
		const propertyName = slotData.propertyName || slotName;
		const children = this._state[propertyName] as Array<SlotValue>;

		children.forEach(child => {
			if (instanceOfUI5Element(child)) {
				const childChangeListener = this._getChildChangeListener(slotName);

				if (childChangeListener) {
					child.detachInvalidate.call(child, childChangeListener);
				}
			}

			if (child instanceof HTMLSlotElement) {
				this._detachSlotChange(child, slotName);
			}
		});

		this._state[propertyName] = [];
	}

	/**
	 * Attach a callback that will be executed whenever the component is invalidated
	 *
	 * @param {InvalidationInfo} callback
	 * @public
	 */
	attachInvalidate(callback: (param: InvalidationInfo) => void) {
		this._eventProvider.attachEvent("invalidate", callback);
	}

	/**
	 * Detach the callback that is executed whenever the component is invalidated
	 *
	 * @param {InvalidationInfo} callback
	 * @public
	 */
	detachInvalidate(callback: (param: InvalidationInfo) => void) {
		this._eventProvider.detachEvent("invalidate", callback);
	}

	/**
	 * Callback that is executed whenever a monitored child changes its state
	 *
	 * @param {sting} slotName the slot in which a child was invalidated
	 * @param { ChangeInfo } childChangeInfo the changeInfo object for the child in the given slot
	 * @private
	 */
	_onChildChange(slotName: string, childChangeInfo: ChangeInfo) {
		if (!(this.constructor as typeof UI5Element).getMetadata().shouldInvalidateOnChildChange(slotName, childChangeInfo.type, childChangeInfo.name)) {
			return;
		}

		// The component should be invalidated as this type of change on the child is listened for
		// However, no matter what changed on the child (property/slot), the invalidation is registered as "type=slot" for the component itself
		_invalidate.call(this, {
			type: "slot",
			name: slotName,
			reason: "childchange",
			child: childChangeInfo.target,
		});
	}

	/**
	 * Do not override this method in derivatives of UI5Element
	 * @private
	 */
	attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
		let newPropertyValue: PropertyValue;
		if (this._doNotSyncAttributes.has(name)) { // This attribute is mutated internally, not by the user
			return;
		}

		const properties = (this.constructor as typeof UI5Element).getMetadata().getProperties();
		const realName = name.replace(/^ui5-/, "");
		const nameInCamelCase = kebabToCamelCase(realName);
		if (properties.hasOwnProperty(nameInCamelCase)) { // eslint-disable-line
			const propData = properties[nameInCamelCase];
			const propertyType = propData.type;
			let propertyValidator = propData.validator as typeof DataType;

			if (propertyType && (propertyType as typeof DataType).isDataTypeClass) {
				propertyValidator = propertyType as typeof DataType;
			}

			if (propertyValidator) {
				newPropertyValue = propertyValidator.attributeToProperty(newValue);
			} else if (propertyType === Boolean) {
				newPropertyValue = newValue !== null;
			} else {
				newPropertyValue = newValue as string;
			}

			(this as Record<string, any>)[nameInCamelCase] = newPropertyValue;
		}
	}

	/**
	 * @private
	 */
	_updateAttribute(name: string, newValue: PropertyValue) {
		const ctor = this.constructor as typeof UI5Element;

		if (!ctor.getMetadata().hasAttribute(name)) {
			return;
		}
		const properties = ctor.getMetadata().getProperties();
		const propData = properties[name];
		const propertyType = propData.type;
		let propertyValidator = propData.validator as typeof DataType;
		const attrName = camelToKebabCase(name);
		const attrValue = this.getAttribute(attrName);

		if (propertyType && (propertyType as typeof DataType).isDataTypeClass) {
			propertyValidator = propertyType as typeof DataType;
		}

		if (propertyValidator) {
			const newAttrValue = propertyValidator.propertyToAttribute(newValue);
			if (newAttrValue === null) { // null means there must be no attribute for the current value of the property
				this._doNotSyncAttributes.add(attrName); // skip the attributeChangedCallback call for this attribute
				this.removeAttribute(attrName); // remove the attribute safely (will not trigger synchronization to the property value due to the above line)
				this._doNotSyncAttributes.delete(attrName); // enable synchronization again for this attribute
			} else {
				this.setAttribute(attrName, newAttrValue);
			}
		} else if (propertyType === Boolean) {
			if (newValue === true && attrValue === null) {
				this.setAttribute(attrName, "");
			} else if (newValue === false && attrValue !== null) {
				this.removeAttribute(attrName);
			}
		} else if (typeof newValue !== "object") {
			if (attrValue !== newValue) {
				this.setAttribute(attrName, newValue as string);
			}
		} // else { return; } // old object handling
	}

	/**
	 * @private
	 */
	_upgradeProperty(this: Record<string, any>, propertyName: string) {
		if (this.hasOwnProperty(propertyName)) { // eslint-disable-line
			const value = this[propertyName];
			delete this[propertyName];
			this[propertyName] = value;
		}
	}

	/**
	 * @private
	 */
	_upgradeAllProperties() {
		const allProps = (this.constructor as typeof UI5Element).getMetadata().getPropertiesList();
		allProps.forEach(this._upgradeProperty.bind(this));
	}

	/**
	 * Returns a singleton event listener for the "change" event of a child in a given slot
	 *
	 * @param slotName the name of the slot, where the child is
	 * @returns {ChildChangeListener}
	 * @private
	 */
	_getChildChangeListener(slotName: string) {
		if (!this._childChangeListeners.has(slotName)) {
			this._childChangeListeners.set(slotName, this._onChildChange.bind(this, slotName));
		}
		return this._childChangeListeners.get(slotName);
	}

	/**
	 * Returns a singleton slotchange event listener that invalidates the component due to changes in the given slot
	 *
	 * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
	 * @returns {SlotChangeListener}
	 * @private
	 */
	_getSlotChangeListener(slotName: string) {
		if (!this._slotChangeListeners.has(slotName)) {
			this._slotChangeListeners.set(slotName, this._onSlotChange.bind(this, slotName));
		}
		return this._slotChangeListeners.get(slotName)!;
	}

	/**
	 * @private
	 */
	_attachSlotChange(child: HTMLSlotElement, slotName: string) {
		const slotChangeListener = this._getSlotChangeListener(slotName);
		if (slotChangeListener) {
			child.addEventListener("slotchange", slotChangeListener);
		}
	}

	/**
	 * @private
	 */
	_detachSlotChange(child: HTMLSlotElement, slotName: string) {
		child.removeEventListener("slotchange", this._getSlotChangeListener(slotName));
	}

	/**
	 * Whenever a slot element is slotted inside a UI5 Web Component, its slotchange event invalidates the component
	 *
	 * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
	 * @private
	 */
	_onSlotChange(slotName: string) {
		_invalidate.call(this, {
			type: "slot",
			name: slotName,
			reason: "slotchange",
		});
	}

	/**
	 * A callback that is executed each time an already rendered component is invalidated (scheduled for re-rendering)
	 *
	 * @param  changeInfo An object with information about the change that caused invalidation.
	 * The object can have the following properties:
	 *  - type: (property|slot) tells what caused the invalidation
	 *   1) property: a property value was changed either directly or as a result of changing the corresponding attribute
	 *   2) slot: a slotted node(nodes) changed in one of several ways (see "reason")
	 *
	 *  - name: the name of the property or slot that caused the invalidation
	 *
	 *  - reason: (children|textcontent|childchange|slotchange) relevant only for type="slot" only and tells exactly what changed in the slot
	 *   1) children: immediate children (HTML elements or text nodes) were added, removed or reordered in the slot
	 *   2) textcontent: text nodes in the slot changed value (or nested text nodes were added or changed value). Can only trigger for slots of "type: Node"
	 *   3) slotchange: a slot element, slotted inside that slot had its "slotchange" event listener called. This practically means that transitively slotted children changed.
	 *      Can only trigger if the child of a slot is a slot element itself.
	 *   4) childchange: indicates that a UI5Element child in that slot was invalidated and in turn invalidated the component.
	 *      Can only trigger for slots with "invalidateOnChildChange" metadata descriptor
	 *
	 *  - newValue: the new value of the property (for type="property" only)
	 *
	 *  - oldValue: the old value of the property (for type="property" only)
	 *
	 *  - child the child that was changed (for type="slot" and reason="childchange" only)
	 *
	 * @public
	 */
	onInvalidation(changeInfo: ChangeInfo) {} // eslint-disable-line

	/**
	 * Do not call this method directly, only intended to be called by js
	 * @protected
	 */
	_render() {
		const ctor = this.constructor as typeof UI5Element;
		const hasIndividualSlots = ctor.getMetadata().hasIndividualSlots();

		// suppress invalidation to prevent state changes scheduling another rendering
		this._suppressInvalidation = true;

		this.onBeforeRendering();

		// Intended for framework usage only. Currently ItemNavigation updates tab indexes after the component has updated its state but before the template is rendered
		if (this._onComponentStateFinalized) {
			this._onComponentStateFinalized();
		}

		// resume normal invalidation handling
		this._suppressInvalidation = false;

		// Update the shadow root with the render result
		/*
		if (this._changedState.length) {
			let element = this.localName;
			if (this.id) {
				element = `${element}#${this.id}`;
			}
			console.log("Re-rendering:", element, this._changedState.map(x => { // eslint-disable-line
				let res = `${x.type}`;
				if (x.reason) {
					res = `${res}(${x.reason})`;
				}
				res = `${res}: ${x.name}`;
				if (x.type === "property") {
					res = `${res} ${x.oldValue} => ${x.newValue}`;
				}

				return res;
			}));
		}
		*/
		this._changedState = [];

		// Update shadow root and static area item
		if (ctor._needsShadowDOM()) {
			updateShadowRoot(this);
		}
		if (this.staticAreaItem) {
			this.staticAreaItem.update();
		}

		// Safari requires that children get the slot attribute only after the slot tags have been rendered in the shadow DOM
		if (hasIndividualSlots) {
			this._assignIndividualSlotsToChildren();
		}

		// Call the onAfterRendering hook
		this.onAfterRendering();
	}

	/**
	 * @private
	 */
	_assignIndividualSlotsToChildren() {
		const domChildren = Array.from(this.children);

		domChildren.forEach((child: Record<string, any>) => {
			if (child._individualSlot) {
				child.setAttribute("slot", child._individualSlot);
			}
		});
	}

	/**
	 * @private
	 */
	_waitForDomRef() {
		return this._domRefReadyPromise;
	}

	/**
	 * Returns the DOM Element inside the Shadow Root that corresponds to the opening tag in the UI5 Web Component's template
	 * *Note:* For logical (abstract) elements (items, options, etc...), returns the part of the parent's DOM that represents this option
	 * Use this method instead of "this.shadowRoot" to read the Shadow DOM, if ever necessary
	 *
	 * @public
	 */
	getDomRef() {
		// If a component set _getRealDomRef to its children, use the return value of this function
		if (typeof this._getRealDomRef === "function") {
			return this._getRealDomRef();
		}

		if (!this.shadowRoot || this.shadowRoot.children.length === 0) {
			return;
		}

		const children = [...this.shadowRoot.children].filter(child => !["link", "style"].includes(child.localName));
		if (children.length !== 1) {
			console.warn(`The shadow DOM for ${(this.constructor as typeof UI5Element).getMetadata().getTag()} does not have a top level element, the getDomRef() method might not work as expected`); // eslint-disable-line
		}

		return children[0] as HTMLElement;
	}

	/**
	 * Returns the DOM Element marked with "data-sap-focus-ref" inside the template.
	 * This is the element that will receive the focus by default.
	 * @public
	 */
	getFocusDomRef() {
		const domRef = this.getDomRef();
		if (domRef) {
			const focusRef = domRef.querySelector("[data-sap-focus-ref]") as HTMLElement;
			return focusRef || domRef;
		}
	}

	/**
	 * Waits for dom ref and then returns the DOM Element marked with "data-sap-focus-ref" inside the template.
	 * This is the element that will receive the focus by default.
	 * @public
	 */
	async getFocusDomRefAsync() {
		await this._waitForDomRef();
		return this.getFocusDomRef();
	}

	/**
	 * Set the focus to the element, returned by "getFocusDomRef()" (marked by "data-sap-focus-ref")
	 * @public
	 */
	async focus() {
		await this._waitForDomRef();

		const focusDomRef = this.getFocusDomRef();

		if (focusDomRef && typeof focusDomRef.focus === "function") {
			focusDomRef.focus();
		}
	}

	/**
	 *
	 * @public
	 * @param name - name of the event
	 * @param data - additional data for the event
	 * @param cancelable - true, if the user can call preventDefault on the event object
	 * @param bubbles - true, if the event bubbles
	 * @returns {boolean} false, if the event was cancelled (preventDefault called), true otherwise
	 */
	fireEvent<T>(name: string, data?: T, cancelable = false, bubbles = true) {
		const eventResult = this._fireEvent(name, data, cancelable, bubbles);
		const camelCaseEventName = kebabToCamelCase(name);

		if (camelCaseEventName !== name) {
			return eventResult && this._fireEvent(camelCaseEventName, data, cancelable);
		}

		return eventResult;
	}

	_fireEvent<T>(name: string, data?: T, cancelable = false, bubbles = true) {
		const noConflictEvent = new CustomEvent<T>(`ui5-${name}`, {
			detail: data,
			composed: false,
			bubbles,
			cancelable,
		});

		// This will be false if the no-conflict event is prevented
		const noConflictEventResult = this.dispatchEvent(noConflictEvent);

		if (skipOriginalEvent(name)) {
			return noConflictEventResult;
		}

		const normalEvent = new CustomEvent<T>(name, {
			detail: data,
			composed: false,
			bubbles,
			cancelable,
		});

		// This will be false if the normal event is prevented
		const normalEventResult = this.dispatchEvent(normalEvent);

		// Return false if any of the two events was prevented (its result was false).
		return normalEventResult && noConflictEventResult;
	}

	/**
	 * Returns the actual children, associated with a slot.
	 * Useful when there are transitive slots in nested component scenarios and you don't want to get a list of the slots, but rather of their content.
	 * @public
	 */
	getSlottedNodes(slotName: string) {
		return getSlottedNodesList((this as unknown as Record<string, Array<SlotValue>>)[slotName]);
	}

	/**
	 * Determines whether the component should be rendered in RTL mode or not.
	 * Returns: "rtl", "ltr" or undefined
	 *
	 * @public
	 * @returns {String|undefined}
	 */
	get effectiveDir() {
		markAsRtlAware(this.constructor as typeof UI5Element); // if a UI5 Element calls this method, it's considered to be rtl-aware
		return getEffectiveDir(this);
	}

	/**
	 * Used to duck-type UI5 elements without using instanceof
	 * @returns {boolean}
	 * @public
	 */
	get isUI5Element() {
		return true;
	}

	get classes(): ClassMap {
		return {};
	}

	/**
	 * Do not override this method in derivatives of UI5Element, use metadata properties instead
	 * @private
	 */
	static get observedAttributes() {
		return this.getMetadata().getAttributesList();
	}

	/**
	 * @private
	 */
	static _needsShadowDOM() {
		return !!this.template;
	}

	/**
	 * @private
	 */
	static _needsStaticArea() {
		return !!this.staticAreaTemplate;
	}

	/**
	 * @public
	 */
	getStaticAreaItemDomRef() {
		if (!(this.constructor as typeof UI5Element)._needsStaticArea()) {
			throw new Error("This component does not use the static area");
		}

		if (!this.staticAreaItem) {
			this.staticAreaItem = StaticAreaItem.createInstance();
			this.staticAreaItem.setOwnerElement(this);
		}
		if (!this.staticAreaItem.parentElement) {
			getSingletonElementInstance("ui5-static-area").appendChild(this.staticAreaItem);
		}

		return this.staticAreaItem.getDomRef();
	}

	/**
	 * @private
	 */
	static _generateAccessors() {
		const proto = this.prototype;
		const slotsAreManaged = this.getMetadata().slotsAreManaged();

		// Properties
		const properties = this.getMetadata().getProperties();
		for (const [prop, propData] of Object.entries(properties)) { // eslint-disable-line
			if (!isValidPropertyName(prop)) {
				console.warn(`"${prop}" is not a valid property name. Use a name that does not collide with DOM APIs`); /* eslint-disable-line */
			}

			if (propData.type === Boolean && propData.defaultValue) {
				throw new Error(`Cannot set a default value for property "${prop}". All booleans are false by default.`);
			}

			if (propData.type === Array) {
				throw new Error(`Wrong type for property "${prop}". Properties cannot be of type Array - use "multiple: true" and set "type" to the single value type, such as "String", "Object", etc...`);
			}

			if (propData.type === Object && propData.defaultValue) {
				throw new Error(`Cannot set a default value for property "${prop}". All properties of type "Object" are empty objects by default.`);
			}

			if (propData.multiple && propData.defaultValue) {
				throw new Error(`Cannot set a default value for property "${prop}". All multiple properties are empty arrays by default.`);
			}

			Object.defineProperty(proto, prop, {
				get(this: UI5Element) {
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

				set(this: UI5Element, value: PropertyValue) {
					let isDifferent;
					const ctor = this.constructor as typeof UI5Element;
					const metadataCtor = ctor.getMetadata().constructor as typeof UI5ElementMetadata;

					value = metadataCtor.validatePropertyValue(value, propData);
					const propertyType = propData.type;
					let propertyValidator = propData.validator as typeof DataType;
					const oldState = this._state[prop];

					if (propertyType && (propertyType as typeof DataType).isDataTypeClass) {
						propertyValidator = propertyType as typeof DataType;
					}

					if (propertyValidator) {
						isDifferent = !propertyValidator.valuesAreEqual(oldState, value);
					} else if (Array.isArray(oldState) && Array.isArray(value) && propData.multiple && propData.compareValues) { // compareValues is added for IE, test if needed now
						isDifferent = !arraysAreEqual(oldState, value);
					} else {
						isDifferent = oldState !== value;
					}

					if (isDifferent) {
						this._state[prop] = value;
						_invalidate.call(this, {
							type: "property",
							name: prop,
							newValue: value,
							oldValue: oldState,
						});
						this._updateAttribute(prop, value);
					}
				},
			});
		}

		// Slots
		if (slotsAreManaged) {
			const slots = this.getMetadata().getSlots();
			for (const [slotName, slotData] of Object.entries(slots)) { // eslint-disable-line
				if (!isValidPropertyName(slotName)) {
					console.warn(`"${slotName}" is not a valid property name. Use a name that does not collide with DOM APIs`); /* eslint-disable-line */
				}

				const propertyName = slotData.propertyName || slotName;
				Object.defineProperty(proto, propertyName, {
					get(this: UI5Element) {
						if (this._state[propertyName] !== undefined) {
							return this._state[propertyName];
						}
						return [];
					},
					set() {
						throw new Error("Cannot set slot content directly, use the DOM APIs (appendChild, removeChild, etc...)");
					},
				});
			}
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
	 * Sets a new metadata object for this UI5 Web Component Class
	 * @protected
	 */
	static set metadata(newMetadata) {
		metadata = newMetadata;
	}

	/**
	 * Returns the CSS for this UI5 Web Component Class
	 * @protected
	 */
	static get styles(): ComponentStylesData {
		return "";
	}

	/**
	 * Returns the Static Area CSS for this UI5 Web Component Class
	 * @protected
	 */
	static get staticAreaStyles(): ComponentStylesData {
		return "";
	}

	/**
	 * Returns an array with the dependencies for this UI5 Web Component, which could be:
	 *  - composed components (used in its shadow root or static area item)
	 *  - slotted components that the component may need to communicate with
	 *
	 * @protected
	 */
	static get dependencies(): Array<typeof UI5Element> {
		return [];
	}

	/**
	 * Returns a list of the unique dependencies for this UI5 Web Component
	 *
	 * @public
	 */
	static getUniqueDependencies(this: typeof UI5Element) {
		if (!uniqueDependenciesCache.has(this)) {
			const filtered = this.dependencies.filter((dep, index, deps) => deps.indexOf(dep) === index);
			uniqueDependenciesCache.set(this, filtered);
		}

		return uniqueDependenciesCache.get(this) || [];
	}

	/**
	 * Returns a promise that resolves whenever all dependencies for this UI5 Web Component have resolved
	 *
	 * @returns {Promise}
	 */
	static whenDependenciesDefined(): Promise<Array<typeof UI5Element>> {
		return Promise.all(this.getUniqueDependencies().map(dep => dep.define()));
	}

	/**
	 * Hook that will be called upon custom element definition
	 *
	 * @protected
	 * @returns {Promise<void>}
	 */
	static async onDefine() {
		return Promise.resolve();
	}

	/**
	 * Registers a UI5 Web Component in the browser window object
	 * @public
	 * @returns {Promise<UI5Element>}
	 */
	static async define() {
		await boot();

		await Promise.all([
			this.whenDependenciesDefined(),
			this.onDefine(),
		]);

		const tag = this.getMetadata().getTag();

		const definedLocally = isTagRegistered(tag);
		const definedGlobally = customElements.get(tag);

		if (definedGlobally && !definedLocally) {
			recordTagRegistrationFailure(tag);
		} else if (!definedGlobally) {
			this._generateAccessors();
			registerTag(tag);
			window.customElements.define(tag, this as unknown as CustomElementConstructor);
			preloadLinks(this);
		}
		return this;
	}

	/**
	 * Returns an instance of UI5ElementMetadata.js representing this UI5 Web Component's full metadata (its and its parents')
	 * Note: not to be confused with the "get metadata()" method, which returns an object for this class's metadata only
	 * @public
	 * @returns {UI5ElementMetadata}
	 */
	static getMetadata() {
		if (this.hasOwnProperty("_metadata")) { // eslint-disable-line
			return this._metadata;
		}

		const effectiveMetadata = Object.keys(this.metadata).length ? this.metadata : this.decoratorMetadata;
		const metadataObjects = [effectiveMetadata];
		let klass = this; // eslint-disable-line
		while (klass !== UI5Element) {
			klass = Object.getPrototypeOf(klass);
			const effectiveKlassMetadata = Object.keys(klass.metadata).length ? klass.metadata : klass.decoratorMetadata;
			metadataObjects.unshift(effectiveKlassMetadata);
		}
		const mergedMetadata = merge({}, ...metadataObjects) as Metadata;

		this._metadata = new UI5ElementMetadata(mergedMetadata);
		return this._metadata;
	}

	static decoratorMetadata: Metadata = {};
}

/**
 * Always use duck-typing to cover all runtimes on the page.
 * @returns {boolean}
 */
const instanceOfUI5Element = (object: any): object is UI5Element => {
	return "isUI5Element" in object;
};

export default UI5Element;
export { instanceOfUI5Element };
export type { ChangeInfo };
