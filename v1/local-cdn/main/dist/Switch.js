var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Switch_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { isDesktop, isSafari } from "@ui5/webcomponents-base/dist/Device.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/less.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import Icon from "./Icon.js";
import SwitchDesign from "./types/SwitchDesign.js";
// Template
import SwitchTemplate from "./generated/templates/SwitchTemplate.lit.js";
// Styles
import switchCss from "./generated/themes/Switch.css.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-switch` component is used for changing between binary states.
 *
 * The component can display texts, that will be switched, based on the component state, via the `textOn` and `textOff` properties,
 * but texts longer than 3 letters will be cutted off.
 *
 * However, users are able to customize the width of `ui5-switch` with pure CSS (`<ui5-switch style="width: 200px">`), and set widths, depending on the texts they would use.
 *
 * Note: the component would not automatically stretch to fit the whole text width.
 *
 * ### Keyboard Handling
 * The state can be changed by pressing the Space and Enter keys.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Switch";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 0.8.0
 * @csspart slider - Used to style the track, where the handle is being slid
 * @csspart text-on - Used to style the `textOn` property text
 * @csspart text-off - Used to style the `textOff` property text
 * @csspart handle - Used to style the handle of the switch
 */
let Switch = Switch_1 = class Switch extends UI5Element {
    onBeforeRendering() {
        this._enableFormSupport();
    }
    _enableFormSupport() {
        const formSupport = getFeature("FormSupport");
        if (formSupport) {
            formSupport.syncNativeHiddenInput(this, (element, nativeInput) => {
                const switchComponent = element;
                nativeInput.checked = !!switchComponent.checked;
                nativeInput.disabled = !!switchComponent.disabled;
                nativeInput.value = switchComponent.checked ? "on" : "";
            });
        }
        else if (this.name) {
            console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
        }
    }
    get sapNextIcon() {
        return this.checked ? "accept" : "less";
    }
    _onclick() {
        this.toggle();
    }
    _onkeydown(e) {
        if (isSpace(e)) {
            e.preventDefault();
        }
        if (isEnter(e)) {
            this._onclick();
        }
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this._onclick();
        }
    }
    toggle() {
        if (!this.disabled) {
            this.checked = !this.checked;
            const changePrevented = !this.fireEvent("change", null, true);
            // Angular two way data binding;
            const valueChangePrevented = !this.fireEvent("value-changed", null, true);
            if (changePrevented || valueChangePrevented) {
                this.checked = !this.checked;
            }
        }
    }
    get graphical() {
        return this.design === SwitchDesign.Graphical;
    }
    get hasNoLabel() {
        return !(this.graphical || this.textOn || this.textOff);
    }
    get _textOn() {
        return this.graphical ? "" : this.textOn;
    }
    get _textOff() {
        return this.graphical ? "" : this.textOff;
    }
    get effectiveTabIndex() {
        return this.disabled ? undefined : "0";
    }
    get classes() {
        const hasLabel = this.graphical || this.textOn || this.textOff;
        return {
            main: {
                "ui5-switch--desktop": isDesktop(),
                "ui5-switch--disabled": this.disabled,
                "ui5-switch--checked": this.checked,
                "ui5-switch--semantic": this.graphical,
                "ui5-switch--no-label": !hasLabel,
                "ui5-switch--safari": isSafari(),
            },
        };
    }
    get effectiveAriaDisabled() {
        return this.disabled ? "true" : undefined;
    }
    get accessibilityOnText() {
        return this._textOn;
    }
    get accessibilityOffText() {
        return this._textOff;
    }
    get hiddenText() {
        return this.checked ? this.accessibilityOnText : this.accessibilityOffText;
    }
    get ariaLabelText() {
        return [getEffectiveAriaLabelText(this), this.hiddenText].join(" ").trim();
    }
    static async onDefine() {
        Switch_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate([
    property({ type: SwitchDesign, defaultValue: SwitchDesign.Textual })
], Switch.prototype, "design", void 0);
__decorate([
    property({ type: Boolean })
], Switch.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean })
], Switch.prototype, "disabled", void 0);
__decorate([
    property()
], Switch.prototype, "textOn", void 0);
__decorate([
    property()
], Switch.prototype, "textOff", void 0);
__decorate([
    property()
], Switch.prototype, "accessibleName", void 0);
__decorate([
    property({ defaultValue: "" })
], Switch.prototype, "accessibleNameRef", void 0);
__decorate([
    property()
], Switch.prototype, "tooltip", void 0);
__decorate([
    property({ type: Boolean })
], Switch.prototype, "required", void 0);
__decorate([
    property()
], Switch.prototype, "name", void 0);
__decorate([
    slot()
], Switch.prototype, "formSupport", void 0);
Switch = Switch_1 = __decorate([
    customElement({
        tag: "ui5-switch",
        languageAware: true,
        styles: switchCss,
        renderer: litRender,
        template: SwitchTemplate,
        dependencies: [Icon],
    })
    /**
     * Fired when the component checked state changes.
     * @public
     * @allowPreventDefault
     */
    ,
    event("change")
], Switch);
Switch.define();
export default Switch;
//# sourceMappingURL=Switch.js.map