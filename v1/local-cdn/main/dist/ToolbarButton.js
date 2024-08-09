var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import CSSSize from "@ui5/webcomponents-base/dist/types/CSSSize.js";
import Button from "./Button.js";
import ButtonDesign from "./types/ButtonDesign.js";
import ToolbarItem from "./ToolbarItem.js";
import ToolbarButtonTemplate from "./generated/templates/ToolbarButtonTemplate.lit.js";
import ToolbarPopoverButtonTemplate from "./generated/templates/ToolbarPopoverButtonTemplate.lit.js";
import ToolbarButtonPopoverCss from "./generated/themes/ToolbarButtonPopover.css.js";
import { registerToolbarItem } from "./ToolbarRegistry.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-button` represents an abstract action,
 * used in the `ui5-toolbar`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/ToolbarButton.js";`
 * @constructor
 * @abstract
 * @extends ToolbarItem
 * @public
 * @since 1.17.0
 */
let ToolbarButton = class ToolbarButton extends ToolbarItem {
    static get staticAreaStyles() {
        return ToolbarButtonPopoverCss;
    }
    get styles() {
        return {
            width: this.width,
            display: this.hidden ? "none" : "inline-block",
        };
    }
    get containsText() {
        return true;
    }
    static get toolbarTemplate() {
        return ToolbarButtonTemplate;
    }
    static get toolbarPopoverTemplate() {
        return ToolbarPopoverButtonTemplate;
    }
    get subscribedEvents() {
        const map = new Map();
        map.set("click", { preventClosing: false });
        return map;
    }
};
__decorate([
    property({ type: Boolean })
], ToolbarButton.prototype, "disabled", void 0);
__decorate([
    property({ type: ButtonDesign, defaultValue: ButtonDesign.Default })
], ToolbarButton.prototype, "design", void 0);
__decorate([
    property()
], ToolbarButton.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean })
], ToolbarButton.prototype, "iconEnd", void 0);
__decorate([
    property()
], ToolbarButton.prototype, "tooltip", void 0);
__decorate([
    property({ defaultValue: undefined })
], ToolbarButton.prototype, "accessibleName", void 0);
__decorate([
    property({ defaultValue: "" })
], ToolbarButton.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ type: Object })
], ToolbarButton.prototype, "accessibilityAttributes", void 0);
__decorate([
    property()
], ToolbarButton.prototype, "text", void 0);
__decorate([
    property({ validator: CSSSize })
], ToolbarButton.prototype, "width", void 0);
ToolbarButton = __decorate([
    customElement({
        tag: "ui5-toolbar-button",
        dependencies: [Button],
    })
    /**
     * Fired when the component is activated either with a
     * mouse/tap or by using the Enter or Space key.
     *
     * **Note:** The event will not be fired if the `disabled`
     * property is set to `true`.
     * @public
     */
    ,
    event("click")
], ToolbarButton);
registerToolbarItem(ToolbarButton);
ToolbarButton.define();
export default ToolbarButton;
//# sourceMappingURL=ToolbarButton.js.map