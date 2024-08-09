var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProgressIndicator_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Icon from "./Icon.js";
import { VALUE_STATE_ERROR, VALUE_STATE_WARNING, VALUE_STATE_SUCCESS, VALUE_STATE_INFORMATION, } from "./generated/i18n/i18n-defaults.js";
// Template
import ProgressIndicatorTemplate from "./generated/templates/ProgressIndicatorTemplate.lit.js";
// Styles
import ProgressIndicatorCss from "./generated/themes/ProgressIndicator.css.js";
/**
 * @class
 *
 * ### Overview
 * Shows the progress of a process in a graphical way. To indicate the progress,
 * the inside of the component is filled with a color.
 *
 * ### Responsive Behavior
 * You can change the size of the Progress Indicator by changing its `width` or `height` CSS properties.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ProgressIndicator.js";`
 * @csspart bar - Used to style the main bar of the `ui5-progress-indicator`
 * @csspart remaining-bar - Used to style the remaining bar of the `ui5-progress-indicator`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.8
 */
let ProgressIndicator = ProgressIndicator_1 = class ProgressIndicator extends UI5Element {
    constructor() {
        super();
        this._previousValue = 0;
        this._transitionDuration = 0;
    }
    onBeforeRendering() {
        this._transitionDuration = Math.abs(this._previousValue - this.validatedValue) * 20;
        this._previousValue = this.validatedValue;
    }
    valueStateTextMappings() {
        return {
            "Error": ProgressIndicator_1.i18nBundle.getText(VALUE_STATE_ERROR),
            "Warning": ProgressIndicator_1.i18nBundle.getText(VALUE_STATE_WARNING),
            "Success": ProgressIndicator_1.i18nBundle.getText(VALUE_STATE_SUCCESS),
            "Information": ProgressIndicator_1.i18nBundle.getText(VALUE_STATE_INFORMATION),
        };
    }
    valueStateIconMappings() {
        return {
            "Error": "status-negative",
            "Warning": "status-critical",
            "Success": "status-positive",
            "Information": "information",
        };
    }
    get styles() {
        return {
            bar: {
                "width": `${this.validatedValue}%`,
                "transition-duration": this.shouldAnimate ? `${this._transitionDuration}ms` : "none",
            },
        };
    }
    get classes() {
        return {
            root: {
                "ui5-progress-indicator-max-value": this.validatedValue === 100,
                "ui5-progress-indicator-min-value": this.validatedValue === 0,
            },
        };
    }
    get validatedValue() {
        if (this.value < 0) {
            return 0;
        }
        if (this.value > 100) {
            return 100;
        }
        return this.value;
    }
    get showValueInRemainingBar() {
        return this.value <= 50;
    }
    get shouldAnimate() {
        return getAnimationMode() !== AnimationMode.None;
    }
    get valueStateText() {
        const percentValue = `${this.validatedValue}%`;
        const valueText = this.valueStateTextMappings()[this.valueState];
        return valueText ? `${percentValue} ${valueText}` : percentValue;
    }
    get showIcon() {
        return this.valueState !== ValueState.None;
    }
    get valueStateIcon() {
        return this.valueStateIconMappings()[this.valueState];
    }
    get _ariaDisabled() {
        return this.disabled || undefined;
    }
    static async onDefine() {
        ProgressIndicator_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate([
    property()
], ProgressIndicator.prototype, "accessibleName", void 0);
__decorate([
    property({ type: Boolean })
], ProgressIndicator.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], ProgressIndicator.prototype, "hideValue", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 0 })
], ProgressIndicator.prototype, "value", void 0);
__decorate([
    property({ defaultValue: null })
], ProgressIndicator.prototype, "displayValue", void 0);
__decorate([
    property({ type: ValueState, defaultValue: ValueState.None })
], ProgressIndicator.prototype, "valueState", void 0);
ProgressIndicator = ProgressIndicator_1 = __decorate([
    customElement({
        tag: "ui5-progress-indicator",
        renderer: litRender,
        styles: ProgressIndicatorCss,
        template: ProgressIndicatorTemplate,
        dependencies: [Icon],
    })
], ProgressIndicator);
ProgressIndicator.define();
export default ProgressIndicator;
//# sourceMappingURL=ProgressIndicator.js.map