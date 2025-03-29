var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Button_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isSpace, isEnter, isEscape, isShift, } from "@ui5/webcomponents-base/dist/Keys.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import { getIconAccessibleName } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { isDesktop, isSafari, } from "@ui5/webcomponents-base/dist/Device.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import { submitForm, resetForm } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import { getEnableDefaultTooltips } from "@ui5/webcomponents-base/dist/config/Tooltips.js";
import toLowercaseEnumValue from "@ui5/webcomponents-base/dist/util/toLowercaseEnumValue.js";
import ButtonDesign from "./types/ButtonDesign.js";
import ButtonType from "./types/ButtonType.js";
import ButtonBadgeDesign from "./types/ButtonBadgeDesign.js";
import ButtonTemplate from "./ButtonTemplate.js";
import { BUTTON_ARIA_TYPE_ACCEPT, BUTTON_ARIA_TYPE_REJECT, BUTTON_ARIA_TYPE_EMPHASIZED } from "./generated/i18n/i18n-defaults.js";
// Styles
import buttonCss from "./generated/themes/Button.css.js";
let isGlobalHandlerAttached = false;
let activeButton = null;
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-button` component represents a simple push button.
 * It enables users to trigger actions by clicking or tapping the `ui5-button`, or by pressing
 * certain keyboard keys, such as Enter.
 *
 * ### Usage
 *
 * For the `ui5-button` UI, you can define text, icon, or both. You can also specify
 * whether the text or the icon is displayed first.
 *
 * You can choose from a set of predefined types that offer different
 * styling to correspond to the triggered action.
 *
 * You can set the `ui5-button` as enabled or disabled. An enabled
 * `ui5-button` can be pressed by clicking or tapping it. The button changes
 * its style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled `ui5-button` appears inactive and cannot be pressed.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Button.js";`
 * @csspart button - Used to style the native button element
 * @csspart icon - Used to style the icon in the native button element
 * @csspart endIcon - Used to style the end icon in the native button element
 * @constructor
 * @extends UI5Element
 * @implements { IButton }
 * @public
 */
let Button = Button_1 = class Button extends UI5Element {
    constructor() {
        super();
        /**
         * Defines the component design.
         * @default "Default"
         * @public
         */
        this.design = "Default";
        /**
         * Defines whether the component is disabled.
         * A disabled component can't be pressed or
         * focused, and it is not in the tab chain.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * When set to `true`, the component will
         * automatically submit the nearest HTML form element on `press`.
         *
         * **Note:** This property is only applicable within the context of an HTML Form element.`
         * @default false
         * @public
         * @deprecated Set the "type" property to "Submit" to achieve the same result. The "submits" property is ignored if "type" is set to any value other than "Button".
         */
        this.submits = false;
        /**
         * Defines the additional accessibility attributes that will be applied to the component.
         * The following fields are supported:
         *
         * - **expanded**: Indicates whether the button, or another grouping element it controls, is currently expanded or collapsed.
         * Accepts the following string values: `true` or `false`
         *
         * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
         * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
         *
         * - **controls**: Identifies the element (or elements) whose contents or presence are controlled by the button element.
         * Accepts a lowercase string value.
         *
         * @public
         * @since 1.2.0
         * @default {}
         */
        this.accessibilityAttributes = {};
        /**
         * Defines whether the button has special form-related functionality.
         *
         * **Note:** This property is only applicable within the context of an HTML Form element.
         * @default "Button"
         * @public
         * @since 1.15.0
         */
        this.type = "Button";
        /**
         * Describes the accessibility role of the button.
         *
         * **Note:** Use <code>ButtonAccessibleRole.Link</code> role only with a press handler, which performs a navigation. In all other scenarios the default button semantics are recommended.
         *
         * @default "Button"
         * @public
         * @since 1.23
         */
        this.accessibleRole = "Button";
        /**
         * Used to switch the active state (pressed or not) of the component.
         * @private
         */
        this.active = false;
        /**
         * Defines if a content has been added to the default slot
         * @private
         */
        this.iconOnly = false;
        /**
         * Indicates if the elements has a slotted icon
         * @private
         */
        this.hasIcon = false;
        /**
         * Indicates if the elements has a slotted end icon
         * @private
         */
        this.hasEndIcon = false;
        /**
         * Indicates if the element is focusable
         * @private
         */
        this.nonInteractive = false;
        /**
         * @private
         */
        this._iconSettings = {};
        /**
         * Defines the tabIndex of the component.
         * @private
         */
        this.forcedTabIndex = "0";
        /**
         * @since 1.0.0-rc.13
         * @private
         */
        this._isTouch = false;
        this._cancelAction = false;
        this._deactivate = () => {
            if (activeButton) {
                activeButton._setActiveState(false);
            }
        };
        if (!isGlobalHandlerAttached) {
            document.addEventListener("mouseup", this._deactivate);
            isGlobalHandlerAttached = true;
        }
    }
    _ontouchstart() {
        if (this.nonInteractive) {
            return;
        }
        this._setActiveState(true);
    }
    onEnterDOM() {
        if (isDesktop()) {
            this.setAttribute("desktop", "");
        }
    }
    async onBeforeRendering() {
        this._setBadgeOverlayStyle();
        this.hasIcon = !!this.icon;
        this.hasEndIcon = !!this.endIcon;
        this.iconOnly = this.isIconOnly;
        this.buttonTitle = this.tooltip || await this.getDefaultTooltip();
    }
    _setBadgeOverlayStyle() {
        const needsOverflowVisible = this.badge.length && (this.badge[0].design === ButtonBadgeDesign.AttentionDot || this.badge[0].design === ButtonBadgeDesign.OverlayText);
        if (needsOverflowVisible) {
            this._internals.states.add("has-overlay-badge");
        }
        else {
            this._internals.states.delete("has-overlay-badge");
        }
    }
    _onclick() {
        if (this.nonInteractive) {
            return;
        }
        if (this._isSubmit) {
            submitForm(this);
        }
        if (this._isReset) {
            resetForm(this);
        }
        if (isSafari()) {
            this.getDomRef()?.focus();
        }
    }
    _onmousedown() {
        if (this.nonInteractive) {
            return;
        }
        this._setActiveState(true);
        activeButton = this; // eslint-disable-line
    }
    _ontouchend(e) {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (this.active) {
            this._setActiveState(false);
        }
        if (activeButton) {
            activeButton._setActiveState(false);
        }
    }
    _onkeydown(e) {
        this._cancelAction = isShift(e) || isEscape(e);
        if (isSpace(e) || isEnter(e)) {
            this._setActiveState(true);
        }
        else if (this._cancelAction) {
            this._setActiveState(false);
        }
    }
    _onkeyup(e) {
        if (this._cancelAction) {
            e.preventDefault();
        }
        if (isSpace(e) || isEnter(e)) {
            if (this.active) {
                this._setActiveState(false);
            }
        }
    }
    _onfocusout() {
        if (this.nonInteractive) {
            return;
        }
        if (this.active) {
            this._setActiveState(false);
        }
    }
    _setActiveState(active) {
        const eventPrevented = !this.fireDecoratorEvent("active-state-change");
        if (eventPrevented) {
            return;
        }
        this.active = active;
    }
    get _hasPopup() {
        return this.accessibilityAttributes.hasPopup;
    }
    get hasButtonType() {
        return this.design !== ButtonDesign.Default && this.design !== ButtonDesign.Transparent;
    }
    get isIconOnly() {
        return !willShowContent(this.text);
    }
    static typeTextMappings() {
        return {
            "Positive": BUTTON_ARIA_TYPE_ACCEPT,
            "Negative": BUTTON_ARIA_TYPE_REJECT,
            "Emphasized": BUTTON_ARIA_TYPE_EMPHASIZED,
        };
    }
    getDefaultTooltip() {
        if (!getEnableDefaultTooltips()) {
            return;
        }
        return getIconAccessibleName(this.icon);
    }
    get buttonTypeText() {
        return Button_1.i18nBundle.getText(Button_1.typeTextMappings()[this.design]);
    }
    get effectiveAccRole() {
        return toLowercaseEnumValue(this.accessibleRole);
    }
    get tabIndexValue() {
        if (this.disabled) {
            return;
        }
        const tabindex = this.getAttribute("tabindex");
        if (tabindex) {
            return Number.parseInt(tabindex);
        }
        return this.nonInteractive ? -1 : Number.parseInt(this.forcedTabIndex);
    }
    get showIconTooltip() {
        return getEnableDefaultTooltips() && this.iconOnly && !this.tooltip;
    }
    get ariaLabelText() {
        return getEffectiveAriaLabelText(this);
    }
    get ariaDescribedbyText() {
        return this.hasButtonType ? "ui5-button-hiddenText-type" : undefined;
    }
    get ariaDescriptionText() {
        return this.accessibleDescription === "" ? undefined : this.accessibleDescription;
    }
    get _isSubmit() {
        return this.type === ButtonType.Submit || this.submits;
    }
    get _isReset() {
        return this.type === ButtonType.Reset;
    }
    get shouldRenderBadge() {
        return !!this.badge.length && (!!this.badge[0].text.length || this.badge[0].design === ButtonBadgeDesign.AttentionDot);
    }
};
__decorate([
    property()
], Button.prototype, "design", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "disabled", void 0);
__decorate([
    property()
], Button.prototype, "icon", void 0);
__decorate([
    property()
], Button.prototype, "endIcon", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "submits", void 0);
__decorate([
    property()
], Button.prototype, "tooltip", void 0);
__decorate([
    property()
], Button.prototype, "accessibleName", void 0);
__decorate([
    property()
], Button.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ type: Object })
], Button.prototype, "accessibilityAttributes", void 0);
__decorate([
    property()
], Button.prototype, "accessibleDescription", void 0);
__decorate([
    property()
], Button.prototype, "type", void 0);
__decorate([
    property()
], Button.prototype, "accessibleRole", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "active", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "iconOnly", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "hasIcon", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "hasEndIcon", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "nonInteractive", void 0);
__decorate([
    property({ noAttribute: true })
], Button.prototype, "buttonTitle", void 0);
__decorate([
    property({ type: Object })
], Button.prototype, "_iconSettings", void 0);
__decorate([
    property({ noAttribute: true })
], Button.prototype, "forcedTabIndex", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "_isTouch", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], Button.prototype, "_cancelAction", void 0);
__decorate([
    slot({ type: Node, "default": true })
], Button.prototype, "text", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: true })
], Button.prototype, "badge", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], Button, "i18nBundle", void 0);
Button = Button_1 = __decorate([
    customElement({
        tag: "ui5-button",
        formAssociated: true,
        languageAware: true,
        renderer: jsxRenderer,
        template: ButtonTemplate,
        styles: buttonCss,
        shadowRootOptions: { delegatesFocus: true },
    })
    /**
     * Fired whenever the active state of the component changes.
     * @private
     */
    ,
    event("active-state-change", {
        bubbles: true,
        cancelable: true,
    })
], Button);
Button.define();
export default Button;
//# sourceMappingURL=Button.js.map