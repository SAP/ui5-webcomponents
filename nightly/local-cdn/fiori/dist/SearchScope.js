var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 * The `ui5-search-scope` represents the options for the scope in `ui5-search`.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @implements {ISearchScope}
 * @public
 * @since 2.9.0
 * @experimental
 */
let SearchScope = class SearchScope extends UI5Element {
    get stableDomRef() {
        return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
    }
};
__decorate([
    property()
], SearchScope.prototype, "text", void 0);
__decorate([
    property({ type: Boolean })
], SearchScope.prototype, "selected", void 0);
SearchScope = __decorate([
    customElement("ui5-search-scope")
], SearchScope);
SearchScope.define();
export default SearchScope;
//# sourceMappingURL=SearchScope.js.map