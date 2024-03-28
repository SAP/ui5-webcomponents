var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ToolbarSeparatorTemplate from "./generated/templates/ToolbarSeparatorTemplate.lit.js";
import ToolbarPopoverSeparatorTemplate from "./generated/templates/ToolbarPopoverSeparatorTemplate.lit.js";
import { registerToolbarItem } from "./ToolbarRegistry.js";
import ToolbarItem from "./ToolbarItem.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-separator` is an element, used for visual separation between two elements.
 * It takes no space in calculating toolbar items width.
 * @constructor
 * @extends ToolbarItem
 * @since 1.17.0
 * @abstract
 * @public
 */
let ToolbarSeparator = class ToolbarSeparator extends ToolbarItem {
    static get toolbarTemplate() {
        return ToolbarSeparatorTemplate;
    }
    static get toolbarPopoverTemplate() {
        return ToolbarPopoverSeparatorTemplate;
    }
    get isSeparator() {
        return true;
    }
    get isInteractive() {
        return false;
    }
};
__decorate([
    property({ type: Boolean })
], ToolbarSeparator.prototype, "visible", void 0);
ToolbarSeparator = __decorate([
    customElement({
        tag: "ui5-toolbar-separator",
    })
], ToolbarSeparator);
registerToolbarItem(ToolbarSeparator);
ToolbarSeparator.define();
export default ToolbarSeparator;
//# sourceMappingURL=ToolbarSeparator.js.map