import "./StaticArea.js";
import type UI5Element from "./UI5Element.js";
/**
 * @class
 * @private
 */
declare class StaticAreaItem extends HTMLElement {
    _rendered: boolean;
    ownerElement?: UI5Element;
    constructor();
    /**
     * @param ownerElement the UI5Element instance that owns this static area item
     */
    setOwnerElement(ownerElement: UI5Element): void;
    /**
     * Updates the shadow root of the static area item with the latest state, if rendered
     */
    update(): void;
    updateAdditionalProperties(): void;
    /**
     * Sets the correct content density based on the owner element's state
     * @private
     */
    _updateContentDensity(): void;
    _updateDirection(): void;
    _updateAdditionalAttrs(): void;
    /**
     * Returns reference to the DOM element where the current fragment is added.
     * @protected
     */
    getDomRef(): Promise<ShadowRoot | null>;
    static getTag(): string;
    static createInstance(): StaticAreaItem;
}
export default StaticAreaItem;
