var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SplitButton_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import { isEscape, isSpace, isEnter, isDown, isUp, isDownAlt, isUpAlt, isF4, isShift, isTabNext, isTabPrevious, } from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import ButtonDesign from "./types/ButtonDesign.js";
import Button from "./Button.js";
import { SPLIT_BUTTON_DESCRIPTION, SPLIT_BUTTON_KEYBOARD_HINT, } from "./generated/i18n/i18n-defaults.js";
// Template
import SplitButtonTemplate from "./generated/templates/SplitButtonTemplate.lit.js";
// Styles
import SplitButtonCss from "./generated/themes/SplitButton.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-split-button` enables users to trigger actions. It is constructed of two separate actions -
 * default action and arrow action that can be activated by clicking or tapping, or by
 * pressing certain keyboard keys - `Space` or `Enter` for default action,
 * and `Arrow Down` or `Arrow Up` for arrow action.
 *
 * ### Usage
 *
 * `ui5-split-button` consists two separate buttons:
 *
 * - for the first one (default action) you can define some `text` or an `icon`, or both.
 * Also, it is possible to define different icon for active state of this button - `activeIcon`.
 * - the second one (arrow action) contains only `slim-arrow-down` icon.
 *
 * You can choose a `design` from a set of predefined types (the same as for ui5-button) that offer
 * different styling to correspond to the triggered action. Both text and arrow actions have the same design.
 *
 * You can set the `ui5-split-button` as enabled or disabled. Both parts of an enabled
 * `ui5-split-button` can be pressed by clicking or tapping it, or by certain keys, which changes
 * the style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled `ui5-split-button` appears inactive and any of the two buttons
 * cannot be pressed.
 *
 * ### Keyboard Handling
 *
 * - `Space` or `Enter` - triggers the default action
 * - `Shift` or `Escape` - if `Space` is pressed, releases the default action button without triggering the click event.
 * - `Arrow Down`, `Arrow Up`, `Alt`+`Arrow Down`, `Alt`+`Arrow Up`, or `F4` - triggers the arrow action
 * There are separate events that are fired on activating of `ui5-split-button` parts:
 *
 * - `click` for the first button (default action)
 * - `arrow-click` for the second button (arrow action)
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/SplitButton.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.1.0
 */
let SplitButton = SplitButton_1 = class SplitButton extends UI5Element {
    static async onDefine() {
        SplitButton_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    constructor() {
        super();
        this._isDefaultActionPressed = false;
        this._isKeyDownOperation = false;
        const handleTouchStartEvent = () => {
            this._textButtonActive = true;
            this.focused = false;
            this._tabIndex = "-1";
        };
        this._textButtonPress = {
            handleEvent: handleTouchStartEvent,
            passive: true,
        };
    }
    /**
     * Function that makes sure the focus is properly managed.
     * @private
     */
    _manageFocus(button) {
        const buttons = [this.textButton, this.arrowButton, this];
        buttons.forEach(btn => {
            btn.focused = btn === button;
        });
    }
    onBeforeRendering() {
        this._textButtonIcon = this.textButton && this.activeIcon !== "" && (this._textButtonActive) && !this._shiftOrEscapePressed ? this.activeIcon : this.icon;
        if (this.disabled) {
            this._tabIndex = "-1";
        }
    }
    _handleMouseClick(e) {
        const target = e.target;
        this._manageFocus(target);
        this._fireClick(e);
    }
    _onFocusOut(e) {
        if (this.disabled || getEventMark(e)) {
            return;
        }
        this._shiftOrEscapePressed = false;
        this._setTabIndexValue();
        this._manageFocus();
    }
    _onFocusIn(e) {
        if (this.disabled || getEventMark(e)) {
            return;
        }
        this._shiftOrEscapePressed = false;
        this._manageFocus(this);
    }
    _textButtonFocusIn(e) {
        e?.stopPropagation();
        this._manageFocus(this.textButton);
        this._setTabIndexValue();
    }
    _onKeyDown(e) {
        this._isKeyDownOperation = true;
        if (this._isArrowKeyAction(e)) {
            this._handleArrowButtonAction(e);
            this._activeArrowButton = true;
        }
        else if (this._isDefaultAction(e)) {
            this._handleDefaultAction(e);
            this._isDefaultActionPressed = true;
        }
        if (this._spacePressed && this._isShiftOrEscape(e)) {
            this._handleShiftOrEscapePressed();
        }
        // Handles button freeze issue when pressing Enter/Space and navigating with Tab/Shift+Tab simultaneously.
        if (this._isDefaultActionPressed && (isTabNext(e) || isTabPrevious(e))) {
            this._activeArrowButton = false;
            this._textButtonActive = false;
        }
        this._tabIndex = "-1";
    }
    _onKeyUp(e) {
        this._isKeyDownOperation = false;
        if (this._isArrowKeyAction(e)) {
            e.preventDefault();
            this._activeArrowButton = false;
            this._textButtonActive = false;
        }
        else if (this._isDefaultAction(e)) {
            this._isDefaultActionPressed = false;
            this._textButtonActive = false;
            if (isSpace(e)) {
                e.preventDefault();
                e.stopPropagation();
                this._fireClick();
                this._spacePressed = false;
                this._textButtonActive = false;
            }
        }
        if (this._isShiftOrEscape(e)) {
            this._handleShiftOrEscapePressed();
        }
        this._tabIndex = "-1";
    }
    _fireClick(e) {
        e?.stopPropagation();
        if (!this._shiftOrEscapePressed) {
            this.fireEvent("click");
        }
        this._shiftOrEscapePressed = false;
    }
    _fireArrowClick(e) {
        e?.stopPropagation();
        this.fireEvent("arrow-click");
    }
    _textButtonRelease() {
        this._textButtonActive = false;
        this._textButtonIcon = this.textButton && this.activeIcon !== "" && (this._textButtonActive) && !this._shiftOrEscapePressed ? this.activeIcon : this.icon;
        this._tabIndex = "-1";
    }
    _arrowButtonPress(e) {
        e.preventDefault();
        this.arrowButton.focus();
        this._tabIndex = "-1";
    }
    _arrowButtonRelease(e) {
        e.preventDefault();
        this._tabIndex = "-1";
    }
    _setTabIndexValue() {
        this._tabIndex = this.disabled ? "-1" : "0";
        if (this._tabIndex === "-1" && (this.textButton?.focused || this.arrowButton?.focused)) {
            this._tabIndex = "0";
        }
    }
    _onArrowButtonActiveStateChange(e) {
        if (this.activeArrowButton) {
            e.preventDefault();
        }
    }
    /**
     * Checks if the pressed key is an arrow key.
     * @param e - keyboard event
     * @private
     */
    _isArrowKeyAction(e) {
        return isDown(e) || isUp(e) || isDownAlt(e) || isUpAlt(e) || isF4(e);
    }
    /**
     * Checks if the pressed key is a default action key (Space or Enter).
     * @param e - keyboard event
     * @private
     */
    _isDefaultAction(e) {
        return isSpace(e) || isEnter(e);
    }
    /**
     * Checks if the pressed key is an escape key or shift key.
     * @param e - keyboard event
     * @private
     */
    _isShiftOrEscape(e) {
        return isEscape(e) || isShift(e);
    }
    /**
     * Handles the click event and the focus on the arrow button.
     * @param e - keyboard event
     * @private
     */
    _handleArrowButtonAction(e) {
        e.preventDefault();
        this._fireArrowClick(e);
        if (isSpace(e)) {
            this._spacePressed = true;
        }
    }
    /**
     * Handles the default action and the active state of the respective button.
     * @param e - keyboard event
     * @private
     */
    _handleDefaultAction(e) {
        e.preventDefault();
        const wasSpacePressed = isSpace(e);
        if (this.focused || this.textButton?.focused) {
            this._textButtonActive = true;
            this._fireClick();
            if (wasSpacePressed) {
                this._spacePressed = true;
            }
        }
        else if (this.arrowButton && this.arrowButton.focused) {
            this._activeArrowButton = true;
            this._fireArrowClick();
            if (wasSpacePressed) {
                this._spacePressed = true;
                this._textButtonActive = false;
            }
        }
    }
    _handleShiftOrEscapePressed() {
        this._shiftOrEscapePressed = true;
        this._textButtonActive = false;
        this._isKeyDownOperation = false;
    }
    get effectiveActiveArrowButton() {
        return this.activeArrowButton || this._activeArrowButton;
    }
    get textButtonAccText() {
        return this.textContent;
    }
    get isTextButton() {
        return !!this.textContent;
    }
    get textButton() {
        return this.getDomRef()?.querySelector(".ui5-split-text-button");
    }
    get arrowButton() {
        return this.getDomRef()?.querySelector(".ui5-split-arrow-button");
    }
    get accessibilityInfo() {
        return {
            // affects arrow button
            ariaExpanded: this._splitButtonAccInfo && this._splitButtonAccInfo.ariaExpanded,
            ariaHaspopup: this._splitButtonAccInfo && this._splitButtonAccInfo.ariaHaspopup,
            // affects root element
            description: SplitButton_1.i18nBundle.getText(SPLIT_BUTTON_DESCRIPTION),
            keyboardHint: SplitButton_1.i18nBundle.getText(SPLIT_BUTTON_KEYBOARD_HINT),
        };
    }
    get ariaLabelText() {
        return [SplitButton_1.i18nBundle.getText(SPLIT_BUTTON_DESCRIPTION), SplitButton_1.i18nBundle.getText(SPLIT_BUTTON_KEYBOARD_HINT)].join(" ");
    }
};
__decorate([
    property()
], SplitButton.prototype, "icon", void 0);
__decorate([
    property()
], SplitButton.prototype, "activeIcon", void 0);
__decorate([
    property({ type: Boolean })
], SplitButton.prototype, "activeArrowButton", void 0);
__decorate([
    property({ type: ButtonDesign, defaultValue: ButtonDesign.Default })
], SplitButton.prototype, "design", void 0);
__decorate([
    property({ type: Boolean })
], SplitButton.prototype, "disabled", void 0);
__decorate([
    property({ defaultValue: undefined })
], SplitButton.prototype, "accessibleName", void 0);
__decorate([
    property({ type: Boolean })
], SplitButton.prototype, "focused", void 0);
__decorate([
    property({ type: Object })
], SplitButton.prototype, "_splitButtonAccInfo", void 0);
__decorate([
    property({ defaultValue: "0", noAttribute: true })
], SplitButton.prototype, "_tabIndex", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], SplitButton.prototype, "_spacePressed", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], SplitButton.prototype, "_shiftOrEscapePressed", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], SplitButton.prototype, "_textButtonActive", void 0);
__decorate([
    property({ noAttribute: true })
], SplitButton.prototype, "_textButtonIcon", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], SplitButton.prototype, "_activeArrowButton", void 0);
__decorate([
    slot({ type: Node, "default": true })
], SplitButton.prototype, "text", void 0);
SplitButton = SplitButton_1 = __decorate([
    customElement({
        tag: "ui5-split-button",
        renderer: litRender,
        styles: SplitButtonCss,
        template: SplitButtonTemplate,
        dependencies: [Button],
    })
    /**
     * Fired when the user clicks on the default action.
     * @public
     */
    ,
    event("click")
    /**
     * Fired when the user clicks on the arrow action.
     * @public
     */
    ,
    event("arrow-click")
], SplitButton);
SplitButton.define();
export default SplitButton;
//# sourceMappingURL=SplitButton.js.map