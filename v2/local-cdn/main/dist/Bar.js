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
import BarDesign from "./types/BarDesign.js";
// Template
import BarTemplate from "./generated/templates/BarTemplate.lit.js";
// Styles
import BarCss from "./generated/themes/Bar.css.js";
/**
 * @class
 *
 * ### Overview
 * The Bar is a container which is primarily used to hold titles, buttons and input elements
 * and its design and functionality is the basis for page headers and footers.
 * The component consists of three areas to hold its content - startContent slot, default slot and endContent slot.
 * It has the capability to center content, such as a title, while having other components on the left and right side.
 *
 * ### Usage
 * With the use of the design property, you can set the style of the Bar to appear designed like a Header, Subheader, Footer and FloatingFooter.
 *
 * **Note:** Do not place a Bar inside another Bar or inside any bar-like component. Doing so may cause unpredictable behavior.
 *
 * ### Responsive Behavior
 * The default slot will be centered in the available space between the startContent and the endContent areas,
 * therefore it might not always be centered in the entire bar.
 *
 * ### Keyboard Handling
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Bar.js";`
 * @csspart bar - Used to style the wrapper of the content of the component
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.11
 */
let Bar = class Bar extends UI5Element {
    get accInfo() {
        return {
            "label": this.design,
        };
    }
    constructor() {
        super();
        this._handleResizeBound = this.handleResize.bind(this);
    }
    handleResize() {
        const bar = this.getDomRef();
        const barWidth = bar.offsetWidth;
        const needShrinked = Array.from(bar.children).some(child => {
            return child.offsetWidth > barWidth / 3;
        });
        bar.classList.toggle("ui5-bar-root-shrinked", needShrinked);
    }
    get classes() {
        return {
            root: {
                "ui5-bar-root": true,
            },
        };
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._handleResizeBound);
        this.getDomRef().querySelectorAll(".ui5-bar-content-container").forEach(child => {
            ResizeHandler.register(child, this._handleResizeBound);
        }, this);
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._handleResizeBound);
        this.getDomRef().querySelectorAll(".ui5-bar-content-container").forEach(child => {
            ResizeHandler.deregister(child, this._handleResizeBound);
        }, this);
    }
};
__decorate([
    property({ type: BarDesign, defaultValue: BarDesign.Header })
], Bar.prototype, "design", void 0);
__decorate([
    slot({ type: HTMLElement })
], Bar.prototype, "startContent", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], Bar.prototype, "middleContent", void 0);
__decorate([
    slot({ type: HTMLElement })
], Bar.prototype, "endContent", void 0);
Bar = __decorate([
    customElement({
        tag: "ui5-bar",
        fastNavigation: true,
        renderer: litRender,
        styles: BarCss,
        template: BarTemplate,
    })
], Bar);
Bar.define();
export default Bar;
//# sourceMappingURL=Bar.js.map