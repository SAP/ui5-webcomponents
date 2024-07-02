var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter, isSpaceShift } from "@ui5/webcomponents-base/dist/Keys.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import WizardTabTemplate from "./generated/templates/WizardTabTemplate.lit.js";
import WizardTabCss from "./generated/themes/WizardTab.css.js";
/**
 * @class
 *
 * ### Overview
 * Private component, used internally by the `ui5-wizard`
 * to represent a "step" in the navigation header of the `ui5-wizard`.
 *
 * ### Usage
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/WizardTab.js";` (imported with <ui5-wizard>)
 * @constructor
 * @extends UI5Element
 * @private
 */
let WizardTab = class WizardTab extends UI5Element {
    _onclick() {
        if (!this.disabled) {
            this.fireEvent("selection-change-requested");
        }
    }
    _onkeyup(e) {
        if (this.disabled) {
            return;
        }
        if ((isSpace(e) || isEnter(e)) && !isSpaceShift(e)) {
            e.preventDefault();
            this.fireEvent("selection-change-requested");
        }
    }
    _onfocusin() {
        this.fireEvent("focused");
    }
    get tabIndex() {
        return Number(this.forcedTabIndex);
    }
    get hasTexts() {
        return this.titleText || this.subtitleText;
    }
    get accInfo() {
        return {
            "ariaSetsize": this._wizardTabAccInfo && this._wizardTabAccInfo.ariaSetsize,
            "ariaPosinset": this._wizardTabAccInfo && this._wizardTabAccInfo.ariaPosinset,
            "ariaLabel": this._wizardTabAccInfo && this._wizardTabAccInfo.ariaLabel,
            "ariaCurrent": this.selected ? "true" : undefined,
            "ariaDisabled": this.disabled ? "true" : undefined,
        };
    }
};
__decorate([
    property()
], WizardTab.prototype, "icon", void 0);
__decorate([
    property()
], WizardTab.prototype, "titleText", void 0);
__decorate([
    property()
], WizardTab.prototype, "subtitleText", void 0);
__decorate([
    property()
], WizardTab.prototype, "number", void 0);
__decorate([
    property({ type: Boolean })
], WizardTab.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], WizardTab.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], WizardTab.prototype, "hideSeparator", void 0);
__decorate([
    property({ type: Boolean })
], WizardTab.prototype, "activeSeparator", void 0);
__decorate([
    property({ type: Boolean })
], WizardTab.prototype, "branchingSeparator", void 0);
__decorate([
    property({ defaultValue: "-1" })
], WizardTab.prototype, "forcedTabIndex", void 0);
WizardTab = __decorate([
    customElement({
        tag: "ui5-wizard-tab",
        renderer: litRender,
        styles: WizardTabCss,
        template: WizardTabTemplate,
        dependencies: [Icon],
    })
    /**
     * Fired when clicking on none disabled step.
     * @private
     */
    ,
    event("selection-change-requested")
], WizardTab);
WizardTab.define();
export default WizardTab;
//# sourceMappingURL=WizardTab.js.map