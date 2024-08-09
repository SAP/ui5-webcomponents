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
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import MediaRange from "@ui5/webcomponents-base/dist/MediaRange.js";
import browserScrollbarCSS from "@ui5/webcomponents/dist/generated/themes/BrowserScrollbar.css.js";
import PageBackgroundDesign from "./types/PageBackgroundDesign.js";
// Template
import PageTemplate from "./generated/templates/PageTemplate.lit.js";
// Styles
import PageCss from "./generated/themes/Page.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-page` is a container component that holds one whole screen of an application.
 * The page has three distinct areas that can hold content - a header, content area and a footer.
 * ### Structure
 * #### Header
 * The top most area of the page is occupied by the header. The standard header includes a navigation button and a title.
 * #### Content
 * The content occupies the main part of the page. Only the content area is scrollable by default.
 * This can be prevented by setting  `enableScrolling` to `false`.
 * #### Footer
 * The footer is optional and occupies the fixed bottom part of the page. Alternatively, the footer can be floating above the bottom part of the content.
 * This is enabled with the `floatingFooter` property.
 *
 * **Note:** `ui5-page` occipues the whole available space of its parent. In order to achieve the intended design you have to make sure
 * that there is enough space for the `ui5-page` to be rendered.
 * **Note:** In order for the `ui5-page` to be displayed, the parent element should have fixed height.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/Page.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.12
 * @public
 * @csspart content - Used to style the content section of the component
 */
let Page = class Page extends UI5Element {
    constructor() {
        super();
        this._updateMediaRange = this.updateMediaRange.bind(this);
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._updateMediaRange);
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._updateMediaRange);
    }
    updateMediaRange() {
        this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, this.getDomRef().offsetWidth);
    }
    get _contentBottom() {
        return !this.floatingFooter && !this.hideFooter ? "2.75rem" : "0";
    }
    get _contentPaddingBottom() {
        return this.floatingFooter && !this.hideFooter ? "3.5rem" : "0";
    }
    get _contentTop() {
        return this.header.length ? "2.75rem" : "0rem";
    }
    get styles() {
        return {
            content: {
                "padding-bottom": this.footer.length && this._contentPaddingBottom,
                "bottom": this.footer.length && this._contentBottom,
                "top": this._contentTop,
            },
            footer: {},
        };
    }
};
__decorate([
    property({ type: PageBackgroundDesign, defaultValue: PageBackgroundDesign.Solid })
], Page.prototype, "backgroundDesign", void 0);
__decorate([
    property({ type: Boolean })
], Page.prototype, "disableScrolling", void 0);
__decorate([
    property({ type: Boolean })
], Page.prototype, "floatingFooter", void 0);
__decorate([
    property({ type: Boolean })
], Page.prototype, "hideFooter", void 0);
__decorate([
    property()
], Page.prototype, "mediaRange", void 0);
__decorate([
    slot()
], Page.prototype, "header", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], Page.prototype, "content", void 0);
__decorate([
    slot()
], Page.prototype, "footer", void 0);
Page = __decorate([
    customElement({
        tag: "ui5-page",
        languageAware: true,
        renderer: litRender,
        styles: [
            browserScrollbarCSS,
            PageCss,
        ],
        template: PageTemplate,
    })
], Page);
Page.define();
export default Page;
//# sourceMappingURL=Page.js.map