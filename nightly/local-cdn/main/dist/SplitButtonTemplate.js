import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import Button from "./Button.js";
export default function SplitButtonTemplate() {
    return (_jsxs("div", { role: this._hideArrowButton ? "button" : "group", class: "ui5-split-button-root", tabindex: this._tabIndex, "aria-labelledby": `${this._id}-invisibleTextDefault ${this._id}}-invisibleText`, onFocusOut: this._onFocusOut, onFocusIn: this._onFocusIn, onKeyDown: this._onKeyDown, onKeyUp: this._onKeyUp, children: [_jsx(Button, { class: "ui5-split-text-button", design: this.design, icon: this.icon, endIcon: this._endIcon, tabindex: -1, disabled: this.disabled, active: this._textButtonActive, exportparts: "icon,endIcon,button", onClick: this._handleMouseClick, onTouchStart: this.handleTouchStart, onMouseDown: this.handleTouchStart, onMouseUp: this._textButtonRelease, onFocusIn: this._onInnerButtonFocusIn, onFocusOut: this._onFocusOut, children: this.isTextButton && _jsx("slot", {}) }), !this._hideArrowButton &&
                _jsx(Button, { class: "ui5-split-arrow-button", design: this.design, icon: slimArrowDown, tabindex: -1, tooltip: this.accInfo.arrowButton.title, accessibilityAttributes: this.accInfo.arrowButton.accessibilityAttributes, disabled: this.disabled, active: this.effectiveActiveArrowButton, part: "arrowButton", onClick: this._handleArrowButtonAction, onMouseDown: this._arrowButtonPress, onMouseUp: this._arrowButtonRelease, onFocusIn: this._onInnerButtonFocusIn, onActiveStateChange: this._onArrowButtonActiveStateChange }), _jsxs("span", { id: `${this._id}-invisibleText`, class: "ui5-hidden-text", children: [this.accInfo.root.description, " ", this.accInfo.root.keyboardHint, " ", this.accessibleName] }), _jsx("span", { id: `${this._id}-invisibleTextDefault`, class: "ui5-hidden-text", children: this.textButtonAccText })] }));
}
//# sourceMappingURL=SplitButtonTemplate.js.map