var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
// Template
import ListItemGroupTemplate from "./generated/templates/ListItemGroupTemplate.lit.js";
// Styles
import ListItemGroupCss from "./generated/themes/ListItemGroup.css.js";
import ListItemStandard from "./ListItemStandard.js";
import ListItemGroupHeader from "./ListItemGroupHeader.js";
/**
 * @class
 * ### Overview
 * The `ui5-li-group` is a special list item, used only to create groups of list items.
 *
 * This is the item to use inside a `ui5-list`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/ListItemGroup.js";`
 * @csspart header - Used to style the header item of the group
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 */
let ListItemGroup = class ListItemGroup extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Indicates whether the header is focused
         * @private
         */
        this.focused = false;
    }
    get groupHeaderItem() {
        return this.shadowRoot.querySelector("[ui5-li-group-header]");
    }
    get hasHeader() {
        return !!this.headerText || this.hasFormattedHeader;
    }
    get hasFormattedHeader() {
        return !!this.header.length;
    }
    get isListItemGroup() {
        return true;
    }
};
__decorate([
    property()
], ListItemGroup.prototype, "headerText", void 0);
__decorate([
    property()
], ListItemGroup.prototype, "headerAccessibleName", void 0);
__decorate([
    slot({
        "default": true,
        invalidateOnChildChange: true,
        type: HTMLElement,
    })
], ListItemGroup.prototype, "items", void 0);
__decorate([
    property({ type: Boolean })
], ListItemGroup.prototype, "focused", void 0);
__decorate([
    slot({ type: HTMLElement })
], ListItemGroup.prototype, "header", void 0);
ListItemGroup = __decorate([
    customElement({
        tag: "ui5-li-group",
        renderer: litRender,
        languageAware: true,
        template: ListItemGroupTemplate,
        styles: [ListItemGroupCss],
        dependencies: [ListItemStandard, ListItemGroupHeader],
    })
], ListItemGroup);
ListItemGroup.define();
const isInstanceOfListItemGroup = (object) => {
    return "isListItemGroup" in object;
};
export default ListItemGroup;
export { isInstanceOfListItemGroup };
//# sourceMappingURL=ListItemGroup.js.map