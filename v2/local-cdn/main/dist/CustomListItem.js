var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { isTabNext, isTabPrevious } from "@ui5/webcomponents-base/dist/Keys.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ListItem from "./ListItem.js";
import CustomListItemTemplate from "./generated/templates/CustomListItemTemplate.lit.js";
// Styles
import customListItemCss from "./generated/themes/CustomListItem.css.js";
/**
 * @class
 *
 * A component to be used as custom list item within the `ui5-list`
 * the same way as the standard `ui5-li`.
 *
 * The component accepts arbitrary HTML content to allow full customization.
 * @csspart native-li - Used to style the main li tag of the list item
 * @csspart content - Used to style the content area of the list item
 * @csspart detail-button - Used to style the button rendered when the list item is of type detail
 * @csspart delete-button - Used to style the button rendered when the list item is in delete mode
 * @csspart radio - Used to style the radio button rendered when the list item is in single selection mode
 * @csspart checkbox - Used to style the checkbox rendered when the list item is in multiple selection mode
 * @slot {Node[]} default - Defines the content of the component.
 * @constructor
 * @extends ListItem
 * @public
 */
let CustomListItem = class CustomListItem extends ListItem {
    _onkeydown(e) {
        const isTab = isTabNext(e) || isTabPrevious(e);
        if (!isTab && !this.focused) {
            return;
        }
        super._onkeydown(e);
    }
    _onkeyup(e) {
        const isTab = isTabNext(e) || isTabPrevious(e);
        if (!isTab && !this.focused) {
            return;
        }
        super._onkeyup(e);
    }
    get classes() {
        const result = super.classes;
        result.main["ui5-custom-li-root"] = true;
        return result;
    }
};
__decorate([
    property()
], CustomListItem.prototype, "accessibleName", void 0);
CustomListItem = __decorate([
    customElement({
        tag: "ui5-li-custom",
        template: CustomListItemTemplate,
        styles: [ListItem.styles, customListItemCss],
    })
], CustomListItem);
CustomListItem.define();
export default CustomListItem;
//# sourceMappingURL=CustomListItem.js.map