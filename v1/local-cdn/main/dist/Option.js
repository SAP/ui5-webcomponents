var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-option` component defines the content of an option in the `ui5-select`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Option.js";`
 * @constructor
 * @extends UI5Element
 * @implements {IOption}
 * @public
 * @abstract
 */
let Option = class Option extends UI5Element {
    get stableDomRef() {
        return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
    }
};
__decorate([
    property({ type: Boolean })
], Option.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], Option.prototype, "disabled", void 0);
__decorate([
    property()
], Option.prototype, "title", void 0);
__decorate([
    property({ defaultValue: null })
], Option.prototype, "icon", void 0);
__decorate([
    property()
], Option.prototype, "value", void 0);
__decorate([
    property()
], Option.prototype, "additionalText", void 0);
__decorate([
    property({ type: Boolean })
], Option.prototype, "focused", void 0);
__decorate([
    slot({ type: Node, "default": true, invalidateOnChildChange: true })
], Option.prototype, "text", void 0);
Option = __decorate([
    customElement("ui5-option")
], Option);
Option.define();
export default Option;
//# sourceMappingURL=Option.js.map