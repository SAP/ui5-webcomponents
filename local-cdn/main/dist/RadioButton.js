var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RadioButton_1;
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { isSpace, isEnter, isDown, isLeft, isUp, isRight, } from "@ui5/webcomponents-base/dist/Keys.js";
import Label from "./Label.js";
import RadioButtonGroup from "./RadioButtonGroup.js";
import WrappingType from "./types/WrappingType.js";
// Template
import RadioButtonTemplate from "./generated/templates/RadioButtonTemplate.lit.js";
// i18n
import { VALUE_STATE_ERROR, VALUE_STATE_WARNING, VALUE_STATE_SUCCESS, VALUE_STATE_INFORMATION, RADIO_BUTTON_GROUP_REQUIRED, } from "./generated/i18n/i18n-defaults.js";
// Styles
import radioButtonCss from "./generated/themes/RadioButton.css.js";
let isGlobalHandlerAttached = false;
let activeRadio;
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-radio-button` component enables users to select a single option from a set of options.
 * When a `ui5-radio-button` is selected by the user, the
 * `change` event is fired.
 * When a `ui5-radio-button` that is within a group is selected, the one
 * that was previously selected gets automatically deselected. You can group radio buttons by using the `name` property.
 *
 * **Note:** If `ui5-radio-button` is not part of a group, it can be selected once, but can not be deselected back.
 *
 * ### Keyboard Handling
 *
 * Once the `ui5-radio-button` is on focus, it might be selected by pressing the Space and Enter keys.
 *
 * The Arrow Down/Arrow Up and Arrow Left/Arrow Right keys can be used to change selection between next/previous radio buttons in one group,
 * while TAB and SHIFT + TAB can be used to enter or leave the radio button group.
 *
 * **Note:** On entering radio button group, the focus goes to the currently selected radio button.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/RadioButton";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart outer-ring - Used to style the outer ring of the `ui5-radio-button`.
 * @csspart inner-ring - Used to style the inner ring of the `ui5-radio-button`.
 */
let RadioButton = RadioButton_1 = class RadioButton extends UI5Element {
    static get formAssociated() {
        return true;
    }
    constructor() {
        super();
        this._internals = this.attachInternals();
        this._deactivate = () => {
            if (activeRadio) {
                activeRadio.active = false;
            }
        };
        if (!isGlobalHandlerAttached) {
            document.addEventListener("mouseup", this._deactivate);
            isGlobalHandlerAttached = true;
        }
    }
    static async onDefine() {
        RadioButton_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    onBeforeRendering() {
        this.syncGroup();
        this._enableFormSupport();
    }
    onExitDOM() {
        this.syncGroup(true);
    }
    syncGroup(forceRemove) {
        const oldGroup = this._name;
        const currentGroup = this.name;
        const oldChecked = this._checked;
        const currentChecked = this.checked;
        if (forceRemove) {
            RadioButtonGroup.removeFromGroup(this, oldGroup);
        }
        if (currentGroup !== oldGroup) {
            if (oldGroup) {
                // remove the control from the previous group
                RadioButtonGroup.removeFromGroup(this, oldGroup);
            }
            if (currentGroup) {
                // add the control to the existing group
                RadioButtonGroup.addToGroup(this, currentGroup);
            }
        }
        else if (currentGroup) {
            RadioButtonGroup.enforceSingleSelection(this, currentGroup);
        }
        if (this.name && currentChecked !== oldChecked) {
            RadioButtonGroup.updateTabOrder(this.name);
        }
        this._name = this.name;
        this._checked = this.checked;
    }
    _enableFormSupport() {
        const formSupport = getFeature("FormSupport");
        if (formSupport) {
            this._setFormValue();
        }
        else if (this.value) {
            console.warn(`In order for the "value" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
        }
    }
    _setFormValue() {
        this._internals.setFormValue(this.checked ? this.value : null);
    }
    _resetFormValidity() {
        this._internals.setValidity({});
    }
    _invalidateForm() {
        this._internals.setValidity({ valueMissing: true }, this.radioButtonGroupRequiredText, this.shadowRoot.firstElementChild);
    }
    _onclick() {
        return this.toggle();
    }
    _handleDown(e) {
        const currentGroup = this.name;
        if (!currentGroup) {
            return;
        }
        e.preventDefault();
        RadioButtonGroup.selectNextItem(this, currentGroup);
    }
    _handleUp(e) {
        const currentGroup = this.name;
        if (!currentGroup) {
            return;
        }
        e.preventDefault();
        RadioButtonGroup.selectPreviousItem(this, currentGroup);
    }
    _onkeydown(e) {
        if (isSpace(e)) {
            this.active = true;
            return e.preventDefault();
        }
        if (isEnter(e)) {
            this.active = true;
            return this.toggle();
        }
        const isRTL = this.effectiveDir === "rtl";
        if (isDown(e) || (!isRTL && isRight(e)) || (isRTL && isLeft(e))) {
            this._handleDown(e);
        }
        if (isUp(e) || (!isRTL && isLeft(e)) || (isRTL && isRight(e))) {
            this._handleUp(e);
        }
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this.toggle();
        }
        this.active = false;
    }
    _onmousedown() {
        this.active = true;
        activeRadio = this; // eslint-disable-line
    }
    _onmouseup() {
        this.active = false;
    }
    _onfocusout() {
        this.active = false;
    }
    toggle() {
        if (!this.canToggle()) {
            return this;
        }
        if (!this.name) {
            this.checked = !this.checked;
            this.fireEvent("change");
            return this;
        }
        RadioButtonGroup.selectItem(this, this.name);
        return this;
    }
    canToggle() {
        return !(this.disabled || this.readonly || this.checked);
    }
    get classes() {
        return {
            inner: {
                "ui5-radio-inner--hoverable": !this.disabled && !this.readonly && isDesktop(),
            },
        };
    }
    get effectiveAriaDisabled() {
        return this.disabled ? "true" : null;
    }
    get ariaLabelText() {
        return [getEffectiveAriaLabelText(this), this.text].filter(Boolean).join(" ");
    }
    get effectiveAriaDescribedBy() {
        return this.hasValueState ? `${this._id}-descr` : undefined;
    }
    get hasValueState() {
        return this.valueState !== ValueState.None;
    }
    get valueStateText() {
        switch (this.valueState) {
            case ValueState.Error:
                return RadioButton_1.i18nBundle.getText(VALUE_STATE_ERROR);
            case ValueState.Warning:
                return RadioButton_1.i18nBundle.getText(VALUE_STATE_WARNING);
            case ValueState.Success:
                return RadioButton_1.i18nBundle.getText(VALUE_STATE_SUCCESS);
            case ValueState.Information:
                return RadioButton_1.i18nBundle.getText(VALUE_STATE_INFORMATION);
            default:
                return "";
        }
    }
    get radioButtonGroupRequiredText() {
        return RadioButton_1.i18nBundle.getText(RADIO_BUTTON_GROUP_REQUIRED);
    }
    get effectiveTabIndex() {
        const tabindex = this.getAttribute("tabindex");
        if (this.disabled) {
            return "-1";
        }
        if (this.name) {
            return this._tabIndex;
        }
        return tabindex || "0";
    }
};
__decorate([
    property({ type: Boolean })
], RadioButton.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], RadioButton.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean })
], RadioButton.prototype, "required", void 0);
__decorate([
    property({ type: Boolean })
], RadioButton.prototype, "checked", void 0);
__decorate([
    property()
], RadioButton.prototype, "text", void 0);
__decorate([
    property({ type: ValueState, defaultValue: ValueState.None })
], RadioButton.prototype, "valueState", void 0);
__decorate([
    property()
], RadioButton.prototype, "name", void 0);
__decorate([
    property()
], RadioButton.prototype, "value", void 0);
__decorate([
    property({ type: WrappingType, defaultValue: WrappingType.None })
], RadioButton.prototype, "wrappingType", void 0);
__decorate([
    property()
], RadioButton.prototype, "accessibleName", void 0);
__decorate([
    property()
], RadioButton.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ defaultValue: "-1", noAttribute: true })
], RadioButton.prototype, "_tabIndex", void 0);
__decorate([
    property({ type: Boolean })
], RadioButton.prototype, "active", void 0);
__decorate([
    slot()
], RadioButton.prototype, "formSupport", void 0);
RadioButton = RadioButton_1 = __decorate([
    customElement({
        tag: "ui5-radio-button",
        languageAware: true,
        renderer: litRender,
        template: RadioButtonTemplate,
        styles: radioButtonCss,
        dependencies: [Label],
    })
    /**
     * Fired when the component checked state changes.
     * @public
     * @since 1.0.0-rc.15
     */
    ,
    event("change")
], RadioButton);
RadioButton.define();
export default RadioButton;
//# sourceMappingURL=RadioButton.js.map