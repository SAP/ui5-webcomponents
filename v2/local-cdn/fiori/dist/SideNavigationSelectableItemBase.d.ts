import SideNavigationItemBase from "./SideNavigationItemBase.js";
/**
 * Fired when the component is activated either with a
 * click/tap or by using the [Enter] or [Space] keys.
 *
 * @public
 */
declare class SideNavigationSelectableItemBase extends SideNavigationItemBase {
    /**
     * Defines the icon of the item.
     *
     * The SAP-icons font provides numerous options.
     *
     * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @public
     * @default ""
     */
    icon: string;
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
     * @default ""
     * @since 1.19.0
     */
    href: string;
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
     * @default ""
     * @since 1.19.0
     */
    target: string;
    /**
     * @private
     * @default false
     */
    isOverflow: boolean;
    get ariaRole(): "menuitem" | "menuitemradio" | "treeitem";
    get _href(): string | undefined;
    get _target(): string | undefined;
    get isExternalLink(): boolean | "";
    get _selected(): boolean;
    get classesArray(): string[];
    get _classes(): string;
    get _ariaCurrent(): "page" | undefined;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onclick(e: PointerEvent): void;
    _onfocusin(e: FocusEvent): void;
    _activate(e: KeyboardEvent | PointerEvent): void;
}
export default SideNavigationSelectableItemBase;
