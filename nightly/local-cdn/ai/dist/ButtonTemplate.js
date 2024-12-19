import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import MainButton from "@ui5/webcomponents/dist/Button.js";
export default function ButtonTemplate() {
    return (_jsxs(_Fragment, { children: [_jsx(MainButton, { class: "ui5-ai-button-inner", design: this.design, icon: this._stateIcon, endIcon: this._stateEndIcon, disabled: this.disabled, onClick: this._onclick, children: this._hasText && (_jsx("div", { class: "ui5-ai-button-text", children: this._stateText })) }), _jsx(MainButton, { class: "ui5-ai-button-hidden", design: this.design })] }));
}
//# sourceMappingURL=ButtonTemplate.js.map