import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import NavigationMenu from "@ui5/webcomponents/dist/NavigationMenu.js";
import type { MenuItemClickEventDetail } from "@ui5/webcomponents/dist/Menu.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import SideNavigationItemBase from "./SideNavigationItemBase.js";
import SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import SideNavigationItem from "./SideNavigationItem.js";
import SideNavigationSubItem from "./SideNavigationSubItem.js";
import SideNavigationGroup from "./SideNavigationGroup.js";
type SideNavigationPopoverContents = {
    item: SideNavigationItem;
    subItems: Array<SideNavigationSubItem>;
};
type SideNavigationSelectionChangeEventDetail = {
    item: SideNavigationItemBase;
};
type NavigationMenuClickEventDetail = MenuItemClickEventDetail & {
    item: Pick<MenuItemClickEventDetail, "item"> & {
        associatedItem: SideNavigationSelectableItemBase;
    };
};
/**
 * @class
 *
 * ### Overview
 *
 * The `SideNavigation` is used as a standard menu in applications.
 * It consists of three containers: header (top-aligned), main navigation section (top-aligned) and the secondary section (bottom-aligned).
 *
 *  - The header is meant for displaying user related information - profile data, avatar, etc.
 *  - The main navigation section is related to the user’s current work context
 *  - The secondary section is mostly used to link additional information that may be of interest (legal information, developer communities, external help, contact information and so on).
 *
 * ### Usage
 *
 * Use the available `ui5-side-navigation-group`, `ui5-side-navigation-item`
 * and `ui5-side-navigation-sub-item` components to build your menu.
 * The items can consist of text only or an icon with text. The use or non-use of icons must be consistent for all items on one level.
 * You must not combine entries with and without icons on the same level. We strongly recommend that you do not use icons on the second level.
 *
 * ### Keyboard Handling
 *
 * ### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigation.js"`
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";` (for `ui5-side-navigation-group`)
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";` (for `ui5-side-navigation-item`)
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";` (for `ui5-side-navigation-sub-item`)
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.8
 * @public
 */
declare class SideNavigation extends UI5Element {
    /**
     * Defines whether the `ui5-side-navigation` is expanded or collapsed.
     *
     * @public
     * @default false
     */
    collapsed: boolean;
    /**
     * Defines the main items of the `ui5-side-navigation`. Use the `ui5-side-navigation-item` component
     * for the top-level items, and the `ui5-side-navigation-sub-item` component for second-level items, nested
     * inside the items.
     *
     * @public
     */
    items: Array<SideNavigationItemBase>;
    /**
     * Defines the fixed items at the bottom of the `ui5-side-navigation`. Use the `ui5-side-navigation-item` component
     * for the fixed items, and optionally the `ui5-side-navigation-sub-item` component to provide second-level items inside them.
     *
     * **Note:** In order to achieve the best user experience, it is recommended that you keep the fixed items "flat" (do not pass sub-items)
     *
     * @public
     */
    fixedItems: Array<SideNavigationItemBase>;
    /**
     * Defines the header of the `ui5-side-navigation`.
     *
     * **Note:** The header is displayed when the component is expanded - the property `collapsed` is false;
     *
     * @public
     * @since 1.0.0-rc.11
     */
    header: Array<HTMLElement>;
    /**
     * @private
     */
    _popoverContents: SideNavigationPopoverContents;
    inPopover: boolean;
    _isOverflow: boolean;
    _flexibleItemNavigation: ItemNavigation;
    _fixedItemNavigation: ItemNavigation;
    _menuPopoverItems: Array<HTMLElement>;
    /**
     * @private
     */
    isTouchDevice: boolean;
    static i18nBundle: I18nBundle;
    constructor();
    _handleResizeBound: () => void;
    onBeforeRendering(): void;
    _onAfterPopoverOpen(): Promise<void>;
    _onBeforePopoverOpen(): Promise<void>;
    _onBeforePopoverClose(): Promise<void>;
    _onBeforeMenuOpen(): Promise<void>;
    _onBeforeMenuClose(): Promise<void>;
    get accSideNavigationPopoverHiddenText(): string;
    get ariaRoleDescNavigationList(): string;
    get overflowAccessibleName(): string;
    handlePopupItemClick(e: KeyboardEvent | PointerEvent): Promise<void>;
    handleOverflowItemClick(e: CustomEvent<NavigationMenuClickEventDetail>): Promise<void>;
    getOverflowPopover(): Promise<NavigationMenu>;
    getPicker(): Promise<ResponsivePopover>;
    openPicker(opener: HTMLElement): Promise<void>;
    openOverflowMenu(opener: HTMLElement): Promise<void>;
    closePicker(): Promise<void>;
    closeMenu(): Promise<void>;
    getPickerTree(): Promise<SideNavigation>;
    get hasHeader(): boolean;
    get showHeader(): boolean;
    get hasFixedItems(): boolean;
    get _rootRole(): "none" | undefined;
    get classes(): {
        root: {
            "ui5-sn-collapsed": boolean;
        };
    };
    getEnabledFixedItems(): Array<ITabbable>;
    getEnabledFlexibleItems(): Array<ITabbable>;
    getEnabledItems(items: Array<SideNavigationItem | SideNavigationGroup>): Array<ITabbable>;
    focusItem(item: SideNavigationItemBase): void;
    onAfterRendering(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    handleResize(): void;
    _updateOverflowItems(): null | undefined;
    _findFocusedItem(items: Array<SideNavigationItem | SideNavigationGroup>): SideNavigationItemBase | undefined;
    _getSelectableItems(items: Array<SideNavigationItem | SideNavigationGroup>): Array<SideNavigationSelectableItemBase>;
    _getFocusableItems(items: Array<SideNavigationItem | SideNavigationGroup>): Array<SideNavigationItemBase>;
    _getAllItems(items: Array<SideNavigationItem | SideNavigationGroup>): Array<SideNavigationItemBase>;
    _findSelectedItem(items: Array<SideNavigationItem | SideNavigationGroup>): SideNavigationSelectableItemBase | undefined;
    get overflowItems(): Array<HTMLElement>;
    _handleItemClick(e: KeyboardEvent | PointerEvent, item: SideNavigationSelectableItemBase): void;
    _handleOverflowClick(): void;
    _getOverflowItems(): Array<SideNavigationSelectableItemBase>;
    _selectItem(item: SideNavigationSelectableItemBase): void;
    get _overflowItem(): SideNavigationItem | null;
    get isOverflow(): boolean;
    _onkeydownOverflow(e: KeyboardEvent): void;
    _onkeyupOverflow(e: KeyboardEvent): void;
    static onDefine(): Promise<void>;
}
export default SideNavigation;
export type { SideNavigationSelectionChangeEventDetail, };
