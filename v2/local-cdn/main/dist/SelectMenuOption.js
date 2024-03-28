var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
// Template
import CustomListItemTemplate from "./generated/templates/CustomListItemTemplate.lit.js";
// Styles
import CustomListItem from "./CustomListItem.js";
import ListItemType from "./types/ListItemType.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-select-menu-option` component represents an option in the `ui5-select-menu`.
 *
 * ### Usage
 *
 * For the `ui5-select-menu-option`
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents/dist/SelectMenuOption.js";`
 * @constructor
 * @extends CustomListItem
 * @implements {IOption}
 * @public
 * @since 1.17.0
 * @slot {Array<Node>} default  Defines the content of the component.
 */
let SelectMenuOption = class SelectMenuOption extends CustomListItem {
    get stableDomRef() {
        return "";
    }
    get _accInfo() {
        const accInfoSettings = {
            ariaSelected: this.selected,
        };
        return { ...super._accInfo, ...accInfoSettings };
    }
};
__decorate([
    property()
], SelectMenuOption.prototype, "displayText", void 0);
__decorate([
    property({ type: Boolean })
], SelectMenuOption.prototype, "disabled", void 0);
__decorate([
    property()
], SelectMenuOption.prototype, "value", void 0);
__decorate([
    property({ type: ListItemType, defaultValue: ListItemType.Active })
], SelectMenuOption.prototype, "type", void 0);
__decorate([
    property({ type: Object })
], SelectMenuOption.prototype, "accessibilityAttributes", void 0);
__decorate([
    property({ type: Boolean })
], SelectMenuOption.prototype, "navigated", void 0);
__decorate([
    slot()
], SelectMenuOption.prototype, "deleteButton", void 0);
SelectMenuOption = __decorate([
    customElement({
        tag: "ui5-select-menu-option",
        renderer: litRender,
        styles: CustomListItem.styles,
        template: CustomListItemTemplate,
        dependencies: [],
    })
], SelectMenuOption);
SelectMenuOption.define();
export default SelectMenuOption;
//# sourceMappingURL=SelectMenuOption.js.map