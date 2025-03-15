import { jsx as _jsx, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "./Button.js";
import Icon from "./Icon.js";
export default function TableRowActionBaseTemplate() {
    return (_jsx(_Fragment, { children: this.invisible ?
            _jsx("div", {})
            :
                this._isInteractive ?
                    _jsx(Button, { icon: this._icon, tooltip: this._text, onClick: this._onActionClick, design: "Transparent" })
                    :
                        _jsx(Icon, { name: this._icon, accessibleName: this._text, showTooltip: true, design: "NonInteractive" }) }));
}
//# sourceMappingURL=TableRowActionBaseTemplate.js.map