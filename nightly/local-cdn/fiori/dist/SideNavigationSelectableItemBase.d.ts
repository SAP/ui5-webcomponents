import SideNavigationItemBase from "./SideNavigationItemBase.js";
import type SideNavigationItemDesign from "./types/SideNavigationItemDesign.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";
type SideNavigationItemAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup">;
/**
 * Fired when the component is activated either with a click/tap or by using the [Enter] or [Space] keys.
 *
 * @public
 */
declare class SideNavigationSelectableItemBase extends SideNavigationItemBase {
    eventDetails: SideNavigationItemBase["eventDetails"] & {
        "click": void;
    };
    /**
     * Defines the icon of the item.
     *
     * The SAP-icons font provides numerous options.
     *
     * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @public
     * @default undefined
     */
    icon?: string;
    /**
     * Defines whether the item is selected
     *
     * @public
     * @default false
     */
    selected: boolean;
    /**
     * Defines the link target URI. Supports standard hyperlink behavior.
     * If a JavaScript action should be triggered,
     * this should not be set, but instead an event handler
     * for the `click` event should be registered.
     *
     * @public
     * @default undefined
     * @since 1.19.0
     */
    href?: string;
    /**
     * Defines the component target.
     *
     * **Notes:**
     *
     * - `_self`
     * - `_top`
     * - `_blank`
     * - `_parent`
     * - `_search`
     *
     * **This property must only be used when the `href` property is set.**
     *
     * @public
     * @default undefined
     * @since 1.19.0
     */
    target?: string;
    /**
     * Item design.
     *
     * **Note:** Items with "Action" design must not have sub-items.
     *
     * @public
     * @default "Default"
     * @since 2.7.0
     */
    design: `${SideNavigationItemDesign}`;
    /**
     * Indicates whether the navigation item is selectable. By default all items are selectable unless specifically marked as unselectable.
     *
     * When a parent item is marked as unselectable, selecting it will only expand or collapse its sub-items.
     * To improve user experience do not mix unselectable parent items with selectable parent items in a single side navigation.
     *
     *
     * **Guidelines**:
     * - External links should be unselectable.
     * - Items that trigger actions (with design "Action") should be unselectable.
     *
     * @public
     * @default false
     * @since 2.7.0
     */
    unselectable: boolean;
    /**
     * Defines the additional accessibility attributes that will be applied to the component.
     * The following fields are supported:
     *
     * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
     * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
     *
     * **Note:** Do not use it on parent items, as it will be overridden if the item is in the overflow menu.
     *
     * @public
     * @default {}
     * @since 2.7.0
     */
    accessibilityAttributes: SideNavigationItemAccessibilityAttributes;
    /**
     * @private
     * @default false
     */
    isOverflow: boolean;
    get ariaRole(): "menuitem" | "menuitemradio" | "treeitem";
    get isSelectable(): boolean;
    get _href(): string | undefined;
    get _target(): string | undefined;
    get isExternalLink(): boolean | "" | undefined;
    get _selected(): boolean;
    get classesArray(): string[];
    get _classes(): string;
    get _ariaCurrent(): "page" | undefined;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onclick(e: MouseEvent): void;
    _onfocusin(e: FocusEvent): void;
    _activate(e: KeyboardEvent | MouseEvent): void;
    get isSideNavigationSelectableItemBase(): boolean;
}
declare const isInstanceOfSideNavigationSelectableItemBase: (object: any) => object is SideNavigationSelectableItemBase;
export default SideNavigationSelectableItemBase;
export { isInstanceOfSideNavigationSelectableItemBase, };
export type { SideNavigationItemAccessibilityAttributes, };
