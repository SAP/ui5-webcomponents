var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Button from "./Button.js";
import ToggleButton from "./ToggleButton.js";
// Template
import ToggleSpinButtonTemplate from "./generated/templates/ToggleSpinButtonTemplate.lit.js";
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-toggle-spin-button` is explicitly used in the new design of `ui5-time-picker`.
 * It extends `ui5-toggle-button` with some specific accessibility-related properties in order to
 * have spin button look and feel from accessibility point of view. This component should not be used separately.
 * @constructor
 * @extends ToggleButton
 * @since 1.15.0
 * @private
 */
let ToggleSpinButton = class ToggleSpinButton extends ToggleButton {
    /**
     * Override of the handler in order to prevent button toggle functionality
     */
    _onclick() { }
    /**
     * Override
     */
    get buttonAccessibleRole() {
        return "spinbutton";
    }
};
__decorate([
    property({ validator: Integer, defaultValue: -1 })
], ToggleSpinButton.prototype, "valueMin", void 0);
__decorate([
    property({ validator: Integer, defaultValue: -1 })
], ToggleSpinButton.prototype, "valueMax", void 0);
__decorate([
    property({ validator: Integer, defaultValue: -1 })
], ToggleSpinButton.prototype, "valueNow", void 0);
__decorate([
    property()
], ToggleSpinButton.prototype, "valueText", void 0);
ToggleSpinButton = __decorate([
    customElement({
        tag: "ui5-toggle-spin-button",
        renderer: litRender,
        styles: [Button.styles, ToggleButton.styles],
        template: ToggleSpinButtonTemplate,
    })
], ToggleSpinButton);
ToggleSpinButton.define();
export default ToggleSpinButton;
//# sourceMappingURL=ToggleSpinButton.js.map