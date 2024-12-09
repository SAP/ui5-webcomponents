var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import browserScrollbarCSS from "@ui5/webcomponents/dist/generated/themes/BrowserScrollbar.css.js";
import { isPhone, isTablet, isCombi, } from "@ui5/webcomponents-base/dist/Device.js";
// Template
import NavigationLayoutTemplate from "./generated/templates/NavigationLayoutTemplate.lit.js";
// Styles
import NavigationLayoutCss from "./generated/themes/NavigationLayout.css.js";
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
let NavigationLayout = class NavigationLayout extends UI5Element {
    constructor() {
        super(...arguments);
        this._sideCollapsed = isPhone() || (isTablet() && !isCombi());
        /**
         * @private
         */
        this.isPhone = isPhone();
        /**
         * @private
         */
        this.isTablet = isTablet() && !isCombi();
    }
    /**
     * Indicates whether the side navigation is collapsed.
     * @default false
     * @public
     */
    set sideCollapsed(value) {
        this._sideCollapsed = value;
        if (isPhone()) {
            return;
        }
        const sideNavigation = this.sideContent[0];
        if (sideNavigation) {
            sideNavigation.collapsed = value;
        }
    }
    get sideCollapsed() {
        return this._sideCollapsed;
    }
    onBeforeRendering() {
        if (isPhone()) {
            return;
        }
        const sideNavigation = this.sideContent[0];
        if (sideNavigation) {
            sideNavigation.collapsed = this.sideCollapsed;
        }
    }
};
__decorate([
    property({ type: Boolean })
], NavigationLayout.prototype, "isPhone", void 0);
__decorate([
    property({ type: Boolean })
], NavigationLayout.prototype, "isTablet", void 0);
__decorate([
    property({ type: Boolean })
], NavigationLayout.prototype, "sideCollapsed", null);
__decorate([
    slot()
], NavigationLayout.prototype, "header", void 0);
__decorate([
    slot()
], NavigationLayout.prototype, "sideContent", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], NavigationLayout.prototype, "content", void 0);
NavigationLayout = __decorate([
    customElement({
        tag: "ui5-navigation-layout",
        languageAware: true,
        renderer: litRender,
        styles: [
            browserScrollbarCSS,
            NavigationLayoutCss,
        ],
        template: NavigationLayoutTemplate,
    })
], NavigationLayout);
NavigationLayout.define();
export default NavigationLayout;
//# sourceMappingURL=NavigationLayout.js.map