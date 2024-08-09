var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GroupHeaderListItem_1;
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ListItemBase from "./ListItemBase.js";
import { GROUP_HEADER_TEXT } from "./generated/i18n/i18n-defaults.js";
// Template
import GroupHeaderListItemTemplate from "./generated/templates/GroupHeaderListItemTemplate.lit.js";
// Styles
import groupheaderListItemCss from "./generated/themes/GroupHeaderListItem.css.js";
/**
 * @class
 * The `ui5-li-groupheader` is a special list item, used only to separate other list items into logical groups.
 * @slot {Node[]} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 * @constructor
 * @extends ListItemBase
 * @public
 */
let GroupHeaderListItem = GroupHeaderListItem_1 = class GroupHeaderListItem extends ListItemBase {
    get groupItem() {
        return true;
    }
    get groupHeaderText() {
        return GroupHeaderListItem_1.i18nBundle.getText(GROUP_HEADER_TEXT);
    }
    get ariaLabelText() {
        return [this.textContent, this.accessibleName].filter(Boolean).join(" ");
    }
    static async onDefine() {
        GroupHeaderListItem_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate([
    property()
], GroupHeaderListItem.prototype, "accessibleName", void 0);
GroupHeaderListItem = GroupHeaderListItem_1 = __decorate([
    customElement({
        tag: "ui5-li-groupheader",
        languageAware: true,
        template: GroupHeaderListItemTemplate,
        styles: [ListItemBase.styles, groupheaderListItemCss],
    })
], GroupHeaderListItem);
GroupHeaderListItem.define();
export default GroupHeaderListItem;
//# sourceMappingURL=GroupHeaderListItem.js.map