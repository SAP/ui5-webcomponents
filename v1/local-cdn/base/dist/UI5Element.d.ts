import "@ui5/webcomponents-base/dist/ssr-dom.js";
import UI5ElementMetadata, { Slot, SlotValue, State, PropertyValue, Metadata } from "./UI5ElementMetadata.js";
import EventProvider from "./EventProvider.js";
import StaticAreaItem from "./StaticAreaItem.js";
import type { TemplateFunction, TemplateFunctionResult } from "./renderer/executeTemplate.js";
import type { AccessibilityInfo, PromiseResolve, ComponentStylesData, ClassMap } from "./types.js";
type Renderer = (templateResult: TemplateFunctionResult, container: HTMLElement | DocumentFragment, styleStrOrHrefsArr: string | Array<string> | undefined, forStaticArea: boolean, options: RendererOptions) => void;
type RendererOptions = {
    /**
     * An object to use as the `this` value for event listeners. It's often
     * useful to set this to the host component rendering a template.
     */
    host?: object;
};
type ChangeInfo = {
    type: "property" | "slot";
    name: string;
    reason?: string;
    child?: SlotValue;
    target?: UI5Element;
    newValue?: PropertyValue;
    oldValue?: PropertyValue;
};
type InvalidationInfo = ChangeInfo & {
    target: UI5Element;
};
type ChildChangeListener = (param: InvalidationInfo) => void;
type SlotChangeListener = (this: HTMLSlotElement, ev: Event) => void;
/**
 * @class
 * Base class for all UI5 Web Components
 *
 * @extends HTMLElement
 * @public
 */
declare abstract class UI5Element extends HTMLElement {
    __id?: string;
    _suppressInvalidation: boolean;
    _changedState: Array<ChangeInfo>;
    _invalidationEventProvider: EventProvider<InvalidationInfo, void>;
    _componentStateFinalizedEventProvider: EventProvider<void, void>;
    _inDOM: boolean;
    _fullyConnected: boolean;
    _childChangeListeners: Map<string, ChildChangeListener>;
    _slotChangeListeners: Map<string, SlotChangeListener>;
    _domRefReadyPromise: Promise<void> & {
        _deferredResolve?: PromiseResolve;
    };
    _doNotSyncAttributes: Set<string>;
    _state: State;
    _getRealDomRef?: () => HTMLElement;
    staticAreaItem?: StaticAreaItem;
    static template?: TemplateFunction;
    static staticAreaTemplate?: TemplateFunction;
    static _metadata: UI5ElementMetadata;
    /**
     * @deprecated
     */
    static render: Renderer;
    static renderer?: Renderer;
    constructor();
    /**
     * Returns a unique ID for this UI5 Element
     *
     * @deprecated - This property is not guaranteed in future releases
     * @protected
     */
    get _id(): string;
    render(): object;
    renderStatic(): object;
    /**
     * Do not call this method from derivatives of UI5Element, use "onEnterDOM" only
     * @private
     */
    connectedCallback(): Promise<void>;
    /**
     * Do not call this method from derivatives of UI5Element, use "onExitDOM" only
     * @private
     */
    disconnectedCallback(): void;
    /**
     * Called every time before the component renders.
     * @public
     */
    onBeforeRendering(): void;
    /**
     * Called every time after the component renders.
     * @public
     */
    onAfterRendering(): void;
    /**
     * Called on connectedCallback - added to the DOM.
     * @public
     */
    onEnterDOM(): void;
    /**
     * Called on disconnectedCallback - removed from the DOM.
     * @public
     */
    onExitDOM(): void;
    /**
     * @private
     */
    _startObservingDOMChildren(): void;
    /**
     * @private
     */
    _stopObservingDOMChildren(): void;
    /**
     * Note: this method is also manually called by "compatibility/patchNodeValue.js"
     * @private
     */
    _processChildren(): Promise<void>;
    /**
     * @private
     */
    _updateSlots(): Promise<void>;
    /**
     * Removes all children from the slot and detaches listeners, if any
     * @private
     */
    _clearSlot(slotName: string, slotData: Slot): void;
    /**
     * Attach a callback that will be executed whenever the component is invalidated
     *
     * @param callback
     * @public
     */
    attachInvalidate(callback: (param: InvalidationInfo) => void): void;
    /**
     * Detach the callback that is executed whenever the component is invalidated
     *
     * @param callback
     * @public
     */
    detachInvalidate(callback: (param: InvalidationInfo) => void): void;
    /**
     * Callback that is executed whenever a monitored child changes its state
     *
     * @param slotName the slot in which a child was invalidated
     * @param childChangeInfo the changeInfo object for the child in the given slot
     * @private
     */
    _onChildChange(slotName: string, childChangeInfo: ChangeInfo): void;
    /**
     * Do not override this method in derivatives of UI5Element
     * @private
     */
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    /**
     * @private
     */
    _updateAttribute(name: string, newValue: PropertyValue): void;
    /**
     * @private
     */
    _upgradeProperty(this: Record<string, any>, propertyName: string): void;
    /**
     * @private
     */
    _upgradeAllProperties(): void;
    /**
     * Returns a singleton event listener for the "change" event of a child in a given slot
     *
     * @param slotName the name of the slot, where the child is
     * @private
     */
    _getChildChangeListener(slotName: string): ChildChangeListener;
    /**
     * Returns a singleton slotchange event listener that invalidates the component due to changes in the given slot
     *
     * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
     * @private
     */
    _getSlotChangeListener(slotName: string): SlotChangeListener;
    /**
     * @private
     */
    _attachSlotChange(child: HTMLSlotElement, slotName: string): void;
    /**
     * @private
     */
    _detachSlotChange(child: HTMLSlotElement, slotName: string): void;
    /**
     * Whenever a slot element is slotted inside a UI5 Web Component, its slotchange event invalidates the component
     *
     * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
     * @private
     */
    _onSlotChange(slotName: string): void;
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
    onInvalidation(changeInfo: ChangeInfo): void;
    /**
     * Do not call this method directly, only intended to be called by js
     * @protected
     */
    _render(): void;
    /**
     * @private
     */
    _assignIndividualSlotsToChildren(): void;
    /**
     * @private
     */
    _waitForDomRef(): Promise<void> & {
        _deferredResolve?: PromiseResolve | undefined;
    };
    /**
     * Returns the DOM Element inside the Shadow Root that corresponds to the opening tag in the UI5 Web Component's template
     * *Note:* For logical (abstract) elements (items, options, etc...), returns the part of the parent's DOM that represents this option
     * Use this method instead of "this.shadowRoot" to read the Shadow DOM, if ever necessary
     *
     * @public
     */
    getDomRef(): HTMLElement | undefined;
    /**
     * Returns the DOM Element marked with "data-sap-focus-ref" inside the template.
     * This is the element that will receive the focus by default.
     * @public
     */
    getFocusDomRef(): HTMLElement | undefined;
    /**
     * Waits for dom ref and then returns the DOM Element marked with "data-sap-focus-ref" inside the template.
     * This is the element that will receive the focus by default.
     * @public
     */
    getFocusDomRefAsync(): Promise<HTMLElement | undefined>;
    /**
     * Set the focus to the element, returned by "getFocusDomRef()" (marked by "data-sap-focus-ref")
     * @param focusOptions additional options for the focus
     * @public
     */
    focus(focusOptions?: FocusOptions): Promise<void>;
    /**
     *
     * @public
     * @param name - name of the event
     * @param data - additional data for the event
     * @param cancelable - true, if the user can call preventDefault on the event object
     * @param bubbles - true, if the event bubbles
     * @returns false, if the event was cancelled (preventDefault called), true otherwise
     */
    fireEvent<T>(name: string, data?: T, cancelable?: boolean, bubbles?: boolean): boolean;
    _fireEvent<T>(name: string, data?: T, cancelable?: boolean, bubbles?: boolean): boolean;
    /**
     * Returns the actual children, associated with a slot.
     * Useful when there are transitive slots in nested component scenarios and you don't want to get a list of the slots, but rather of their content.
     * @public
     */
    getSlottedNodes<T = Node>(slotName: string): Array<T>;
    /**
     * Attach a callback that will be executed whenever the component's state is finalized
     *
     * @param callback
     * @public
     */
    attachComponentStateFinalized(callback: () => void): void;
    /**
     * Detach the callback that is executed whenever the component's state is finalized
     *
     * @param callback
     * @public
     */
    detachComponentStateFinalized(callback: () => void): void;
    /**
     * Determines whether the component should be rendered in RTL mode or not.
     * Returns: "rtl", "ltr" or undefined
     *
     * @public
     * @default undefined
     */
    get effectiveDir(): string | undefined;
    /**
     * Used to duck-type UI5 elements without using instanceof
     * @public
     * @default true
     */
    get isUI5Element(): boolean;
    get classes(): ClassMap;
    /**
     * Returns the component accessibility info.
     * @private
     */
    get accessibilityInfo(): AccessibilityInfo;
    /**
     * Do not override this method in derivatives of UI5Element, use metadata properties instead
     * @private
     */
    static get observedAttributes(): string[];
    /**
     * @private
     */
    static _needsShadowDOM(): boolean;
    /**
     * @private
     */
    static _needsStaticArea(): boolean;
    /**
     * @public
     */
    getStaticAreaItemDomRef(): Promise<ShadowRoot | null>;
    /**
     * @private
     */
    static _generateAccessors(): void;
    /**
     * Returns the metadata object for this UI5 Web Component Class
     * @protected
     */
    static metadata: Metadata;
    /**
     * Returns the CSS for this UI5 Web Component Class
     * @protected
     */
    static styles: ComponentStylesData;
    /**
     * Returns the Static Area CSS for this UI5 Web Component Class
     * @protected
     */
    static get staticAreaStyles(): ComponentStylesData;
    /**
     * Returns an array with the dependencies for this UI5 Web Component, which could be:
     *  - composed components (used in its shadow root or static area item)
     *  - slotted components that the component may need to communicate with
     *
     * @protected
     */
    static get dependencies(): Array<typeof UI5Element>;
    /**
     * Returns a list of the unique dependencies for this UI5 Web Component
     *
     * @public
     */
    static getUniqueDependencies(this: typeof UI5Element): Array<typeof UI5Element>;
    /**
     * Returns a promise that resolves whenever all dependencies for this UI5 Web Component have resolved
     */
    static whenDependenciesDefined(): Promise<Array<typeof UI5Element>>;
    /**
     * Hook that will be called upon custom element definition
     *
     * @protected
     */
    static onDefine(): Promise<void>;
    /**
     * Registers a UI5 Web Component in the browser window object
     * @public
     */
    static define(): Promise<typeof UI5Element>;
    /**
     * Returns an instance of UI5ElementMetadata.js representing this UI5 Web Component's full metadata (its and its parents')
     * Note: not to be confused with the "get metadata()" method, which returns an object for this class's metadata only
     * @public
     */
    static getMetadata(): UI5ElementMetadata;
}
/**
 * Always use duck-typing to cover all runtimes on the page.
 */
declare const instanceOfUI5Element: (object: any) => object is UI5Element;
export default UI5Element;
export { instanceOfUI5Element };
export type { ChangeInfo, Renderer, RendererOptions, };
