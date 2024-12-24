import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type SideNavigation from "./SideNavigation.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-navigation-layout` is a container component that can be used to
 * create a layout with a header, a side navigation and a content area.
 *
 * ### Usage
 *
 * Use the `ui5-navigation-layout` to create whole screen of an application with vertical navigation.
 *
 * ### Responsive Behavior
 *
 * On desktop and tablet devices, the side navigation remains visible and can
 * be expanded or collapsed using the `sideCollapsed` property. On phone devices, the side navigation
 * is hidden by default but can be displayed using the same `sideCollapsed` property.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/NavigationLayout.js";`
 * @constructor
 * @extends UI5Element
 * @since 2.4.0
 * @public
 */
declare class NavigationLayout extends UI5Element {
    _sideCollapsed: boolean;
    /**
     * @private
     */
    isPhone: boolean;
    /**
     * @private
     */
    isTablet: boolean;
    /**
     * Indicates whether the side navigation is collapsed.
     * @default false
     * @public
     */
    set sideCollapsed(value: boolean);
    get sideCollapsed(): boolean;
    /**
     * Defines the header.
     * @public
     */
    header: Array<HTMLElement>;
    /**
     * Defines the side content.
     * @public
     */
    sideContent: Array<SideNavigation>;
    /**
     * Defines the content.
     * @public
     */
    content: Array<HTMLElement>;
    onBeforeRendering(): void;
}
export default NavigationLayout;
