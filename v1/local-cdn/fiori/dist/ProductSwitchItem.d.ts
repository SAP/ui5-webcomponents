import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IProductSwitchItem } from "./ProductSwitch.js";
/**
 * @class
 * ### Overview
 * The `ui5-product-switch-item` web component represents the items displayed in the
 * `ui5-product-switch` web component.
 *
 * **Note:** `ui5-product-switch-item` is not supported when used outside of `ui5-product-switch`.
 *
 * ### Keyboard Handling
 * The `ui5-product-switch` provides advanced keyboard handling.
 * When focused, the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - [Space] / [Enter] or [Return] - Trigger `ui5-click` event
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @implements {IProductSwitchItem}
 * @since 1.0.0-rc.5
 */
declare class ProductSwitchItem extends UI5Element implements IProductSwitchItem {
    constructor();
    /**
     * Defines the title of the component.
     * @default ""
     * @since 1.0.0-rc.15
     * @public
     */
    titleText: string;
    /**
     * Defines the subtitle of the component.
     * @default ""
     * @since 1.0.0-rc.15
     * @public
     */
    subtitleText: string;
    /**
     * Defines the icon to be displayed as a graphical element within the component.
     *
     * Example:
     *
     * `<ui5-product-switch-item icon="palette">`
     *
     * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default ""
     * @public
     */
    icon: string;
    /**
     * Defines a target where the `targetSrc` content must be open.
     *
     * Available options are:
     *
     * - `_self`
     * - `_top`
     * - `_blank`
     * - `_parent`
     * - `_search`
     * @default "_self"
     * @public
     */
    target: string;
    /**
     * Defines the component target URI. Supports standard hyperlink behavior.
     * @default ""
     * @public
     */
    targetSrc: string;
    /**
     * Used to switch the active state (pressed or not) of the component.
     * @private
     */
    private active;
    /**
     * Indicates whether the element is focused.
     * @private
     */
    private focused;
    /**
     * Used to set the selected state of the component. Only one selected in a sequence.
     * **Note:** Set by the `ProductSwitch`
     */
    selected: boolean;
    /**
     * Defines the component tabindex.
     */
    forcedTabIndex: string;
    _deactivate: () => void;
    onEnterDOM(): void;
    onExitDOM(): void;
    _onmousedown(): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onfocusout(): void;
    _onfocusin(e: FocusEvent): void;
    _fireItemClick(): void;
}
export default ProductSwitchItem;
