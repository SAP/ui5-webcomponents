var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import GroupHeaderListItem from "./GroupHeaderListItem.js";
/**
 * @class
 * The `ui5-suggestion-group-item` is type of suggestion item,
 * that can be used to split the `ui5-input` suggestions into groups.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @implements { IInputSuggestionItem }
 * @since 1.0.0-rc.15
 */
let SuggestionGroupItem = class SuggestionGroupItem extends UI5Element {
    /**
     * Indicates the "grouping" nature of the component
     * to avoid tag name checks tag name to diferenciate from the standard suggestion item.
     * @protected
     */
    get groupItem() {
        return true;
    }
};
__decorate([
    property()
], SuggestionGroupItem.prototype, "text", void 0);
SuggestionGroupItem = __decorate([
    customElement({
        tag: "ui5-suggestion-group-item",
        dependencies: [GroupHeaderListItem],
    })
], SuggestionGroupItem);
SuggestionGroupItem.define();
export default SuggestionGroupItem;
//# sourceMappingURL=SuggestionGroupItem.js.map