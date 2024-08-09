import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import SideNavigationItemBase from "./SideNavigationItemBase.js";
import type SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import type SideNavigationItem from "./SideNavigationItem.js";
/**
 * @class
 *
 * ### Overview
 *
 * Represents a group of navigation actions within `ui5-side-navigation`.
 * The `ui5-side-navigation-group` can only be used inside a `ui5-side-navigation`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";`
 *
 * @constructor
 * @extends SideNavigationItemBase
 * @public
 * @abstract
 * @since 1.24.0
 */
declare class SideNavigationGroup extends SideNavigationItemBase {
    /**
     * Defines if the item is expanded
     *
     * @public
     * @default false
     */
    expanded: boolean;
    /**
     * Defines nested items by passing `ui5-side-navigation-item` to the default slot.
     *
     * @public
     */
    items: Array<SideNavigationItem>;
    static i18nBundle: I18nBundle;
    get overflowItems(): Array<HTMLElement>;
    get selectableItems(): Array<SideNavigationSelectableItemBase>;
    get focusableItems(): Array<SideNavigationItemBase>;
    get allItems(): Array<SideNavigationItemBase>;
    get _groupId(): string | undefined;
    get _expanded(): boolean | undefined;
    get _toggleIconName(): "navigation-right-arrow" | "navigation-down-arrow";
    get belowGroupClassName(): "" | "ui5-sn-item-group-below-group";
    get accDescription(): string;
    _onkeydown: (e: KeyboardEvent) => void;
    _onclick: () => void;
    _onfocusin: (e: FocusEvent) => void;
    _toggle(): void;
    static onDefine(): Promise<void>;
}
export default SideNavigationGroup;
