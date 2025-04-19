var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
/**
 * @class
 *
 * ### Overview
 *
 * ### Usage
 *
 * For the `ui5-filter-item-option`
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents-fiori/dist/FilterItemOption.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.0.0-rc.16
 * @public
 */
let FilterItemOption = class FilterItemOption extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines if the component is selected.
         * @default false
         * @public
         */
        this.selected = false;
    }
};
__decorate([
    property()
], FilterItemOption.prototype, "text", void 0);
__decorate([
    property({ type: Boolean })
], FilterItemOption.prototype, "selected", void 0);
FilterItemOption = __decorate([
    customElement("ui5-filter-item-option")
], FilterItemOption);
FilterItemOption.define();
export default FilterItemOption;
//# sourceMappingURL=FilterItemOption.js.map