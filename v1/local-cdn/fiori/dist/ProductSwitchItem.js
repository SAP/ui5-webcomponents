var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter, isSpaceShift } from "@ui5/webcomponents-base/dist/Keys.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ProductSwitchItemTemplate from "./generated/templates/ProductSwitchItemTemplate.lit.js";
// Styles
import ProductSwitchItemCss from "./generated/themes/ProductSwitchItem.css.js";
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
let ProductSwitchItem = class ProductSwitchItem extends UI5Element {
    constructor() {
        super();
        this._deactivate = () => {
            if (this.active) {
                this.active = false;
            }
        };
    }
    onEnterDOM() {
        document.addEventListener("mouseup", this._deactivate);
    }
    onExitDOM() {
        document.removeEventListener("mouseup", this._deactivate);
    }
    _onmousedown() {
        this.active = true;
    }
    _onkeydown(e) {
        if (isSpace(e) || isEnter(e)) {
            this.active = true;
        }
        if (isSpace(e)) {
            e.preventDefault();
        }
        if (isEnter(e)) {
            this._fireItemClick();
        }
    }
    _onkeyup(e) {
        if (isSpace(e) || isEnter(e)) {
            this.active = false;
        }
        if (isSpace(e)) {
            if (isSpaceShift(e)) {
                e.stopPropagation();
            }
            this._fireItemClick();
        }
    }
    _onfocusout() {
        this.active = false;
        this.focused = false;
    }
    _onfocusin(e) {
        this.focused = true;
        this.fireEvent("_focused", e);
    }
    _fireItemClick() {
        this.fireEvent("click", { item: this });
    }
};
__decorate([
    property()
], ProductSwitchItem.prototype, "titleText", void 0);
__decorate([
    property()
], ProductSwitchItem.prototype, "subtitleText", void 0);
__decorate([
    property()
], ProductSwitchItem.prototype, "icon", void 0);
__decorate([
    property({ defaultValue: "_self" })
], ProductSwitchItem.prototype, "target", void 0);
__decorate([
    property()
], ProductSwitchItem.prototype, "targetSrc", void 0);
__decorate([
    property({ type: Boolean })
], ProductSwitchItem.prototype, "active", void 0);
__decorate([
    property({ type: Boolean })
], ProductSwitchItem.prototype, "focused", void 0);
__decorate([
    property({ type: Boolean })
], ProductSwitchItem.prototype, "selected", void 0);
__decorate([
    property({ defaultValue: "-1", noAttribute: true })
], ProductSwitchItem.prototype, "forcedTabIndex", void 0);
ProductSwitchItem = __decorate([
    customElement({
        tag: "ui5-product-switch-item",
        renderer: litRender,
        styles: ProductSwitchItemCss,
        template: ProductSwitchItemTemplate,
        dependencies: [Icon],
    })
    /**
     * Fired when the `ui5-product-switch-item` is activated either with a
     * click/tap or by using the Enter or Space key.
     * @public
     */
    ,
    event("click"),
    event("_focused")
], ProductSwitchItem);
ProductSwitchItem.define();
export default ProductSwitchItem;
//# sourceMappingURL=ProductSwitchItem.js.map