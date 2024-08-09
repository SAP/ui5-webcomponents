import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type SideNavigation from "./SideNavigation.js";
/**
 * @class
 * Base class for the items that are accepted by the `ui5-side-navigation` component.
 *
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since 1.19.0
 */
declare class SideNavigationItemBase extends UI5Element implements ITabbable {
    /**
     * Defines the text of the item.
     *
     * @public
     * @default ""
     */
    text: string;
    /**
     * Defines whether the component is disabled.
     * A disabled component can't be pressed or
     * focused, and it is not in the tab chain.
     *
     * @default false
     * @public
     * @since 1.19.0
     */
    disabled: boolean;
    /**
     * Defines the tooltip of the component.
     * @default ""
     * @private
     * @since 1.0.0-rc.16
     */
    title: string;
    forcedTabIndex: string;
    sideNavCollapsed: boolean;
    inPopover: boolean;
    _sideNavigation: SideNavigation;
    get _tooltip(): string | undefined;
    get classesArray(): string[];
    get _classes(): string;
    get effectiveTabIndex(): string | undefined;
    get sideNavigation(): SideNavigation;
    set sideNavigation(sideNavigation: SideNavigation);
    get isFixedItem(): boolean;
}
export default SideNavigationItemBase;
