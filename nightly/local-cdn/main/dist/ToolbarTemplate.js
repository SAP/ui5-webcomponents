import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "./Button.js";
import toolbarPopoverTemplate from "./ToolbarPopoverTemplate.js";
import overflowIcon from "@ui5/webcomponents-icons/dist/overflow.js";
export default function ToolbarTemplate() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { class: {
                    "ui5-tb-items": true,
                    "ui5-tb-items-full-width": this.hasFlexibleSpacers,
                }, role: this.accInfo.root.role, "aria-label": this.accInfo.root.accessibleName, children: [this.standardItems.map(item => (item.toolbarTemplate.call(item.context))), _jsx(Button, { "aria-hidden": this.hideOverflowButton, icon: overflowIcon, design: "Transparent", onClick: this.toggleOverflow, class: {
                            "ui5-tb-item": true,
                            "ui5-tb-overflow-btn": true,
                            "ui5-tb-overflow-btn-hidden": this.hideOverflowButton,
                        }, tooltip: this.accInfo.overflowButton.tooltip, accessibleName: this.accInfo.overflowButton.accessibleName, accessibilityAttributes: this.accInfo.overflowButton.accessibilityAttributes })] }), toolbarPopoverTemplate.call(this)] }));
}
//# sourceMappingURL=ToolbarTemplate.js.map