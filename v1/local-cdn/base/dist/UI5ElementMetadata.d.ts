import DataType from "./types/DataType.js";
type SlotInvalidation = {
    properties: boolean | Array<string>;
    slots: boolean | Array<string>;
};
type Slot = {
    type: typeof Node | typeof HTMLElement;
    default?: boolean;
    propertyName?: string;
    individualSlots?: boolean;
    invalidateOnChildChange?: boolean | SlotInvalidation;
    cloned?: boolean;
};
type SlotValue = Node;
type Property = {
    type?: BooleanConstructor | StringConstructor | ObjectConstructor | DataType;
    validator?: DataType;
    defaultValue?: PropertyValue;
    noAttribute?: boolean;
    multiple?: boolean;
    compareValues?: boolean;
};
type PropertyValue = boolean | number | string | object | undefined | null | DataType;
type EventData = Record<string, object>;
type Metadata = {
    tag?: string;
    managedSlots?: boolean;
    properties?: Record<string, Property>;
    slots?: Record<string, Slot>;
    events?: EventData;
    fastNavigation?: boolean;
    themeAware?: boolean;
    languageAware?: boolean;
};
type State = Record<string, PropertyValue | Array<SlotValue>>;
/**
 * @class
 * @public
 */
declare class UI5ElementMetadata {
    metadata: Metadata;
    _initialState: State | undefined;
    constructor(metadata: Metadata);
    getInitialState(): State;
    /**
     * Validates the property's value and returns it if correct
     * or returns the default value if not.
     * **Note:** Only intended for use by UI5Element.js
     * @public
     */
    static validatePropertyValue(value: PropertyValue, propData: Property): PropertyValue;
    /**
     * Validates the slot's value and returns it if correct
     * or throws an exception if not.
     * **Note:** Only intended for use by UI5Element.js
     * @public
     */
    static validateSlotValue(value: Node, slotData: Slot): Node;
    /**
     * Returns the tag of the UI5 Element without the scope
     * @public
     */
    getPureTag(): string;
    /**
     * Returns the tag of the UI5 Element
     * @public
     */
    getTag(): string;
    /**
     * Determines whether a property should have an attribute counterpart
     * @public
     * @param propName
     */
    hasAttribute(propName: string): boolean;
    /**
     * Returns an array with the properties of the UI5 Element (in camelCase)
     * @public
     */
    getPropertiesList(): Array<string>;
    /**
     * Returns an array with the attributes of the UI5 Element (in kebab-case)
     * @public
     */
    getAttributesList(): Array<string>;
    /**
     * Determines whether this UI5 Element has a default slot of type Node, therefore can slot text
     */
    canSlotText(): boolean;
    /**
     * Determines whether this UI5 Element supports any slots
     * @public
     */
    hasSlots(): boolean;
    /**
     * Determines whether this UI5 Element supports any slots with "individualSlots: true"
     * @public
     */
    hasIndividualSlots(): boolean;
    /**
     * Determines whether this UI5 Element needs to invalidate if children are added/removed/changed
     * @public
     */
    slotsAreManaged(): boolean;
    /**
     * Determines whether this control supports F6 fast navigation
     * @public
     */
    supportsF6FastNavigation(): boolean;
    /**
     * Returns an object with key-value pairs of properties and their metadata definitions
     * @public
     */
    getProperties(): Record<string, Property>;
    /**
     * Returns an object with key-value pairs of events and their metadata definitions
     * @public
     */
    getEvents(): EventData;
    /**
     * Returns an object with key-value pairs of slots and their metadata definitions
     * @public
     */
    getSlots(): Record<string, Slot>;
    /**
     * Determines whether this UI5 Element has any translatable texts (needs to be invalidated upon language change)
     */
    isLanguageAware(): boolean;
    /**
     * Determines whether this UI5 Element has any theme dependant carachteristics.
     */
    isThemeAware(): boolean;
    /**
     * Matches a changed entity (property/slot) with the given name against the "invalidateOnChildChange" configuration
     * and determines whether this should cause and invalidation
     *
     * @param slotName the name of the slot in which a child was changed
     * @param type the type of change in the child: "property" or "slot"
     * @param name the name of the property/slot that changed
     */
    shouldInvalidateOnChildChange(slotName: string, type: "property" | "slot", name: string): boolean;
}
export default UI5ElementMetadata;
export type { Property, PropertyValue, Slot, SlotValue, EventData, State, Metadata, };
