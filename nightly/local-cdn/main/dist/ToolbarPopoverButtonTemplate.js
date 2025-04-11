import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "./Button.js";
export default function ToolbarPopoverButtonTemplate() {
    return (_jsx(Button, { icon: this.icon, endIcon: this.endIcon, accessibleName: this.accessibleName, accessibleNameRef: this.accessibleNameRef, accessibilityAttributes: this.accessibilityAttributes, tooltip: this.tooltip, design: this.design, disabled: this.disabled, hidden: this.hidden, class: "ui5-tb-popover-button ui5-tb-popover-item", "data-ui5-external-action-item-id": this._id, "data-ui5-stable": this.stableDomRef, onClick: (...args) => this.onClick(...args), children: this.text }));
}
//# sourceMappingURL=ToolbarPopoverButtonTemplate.js.map