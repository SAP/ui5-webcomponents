import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "./Button.js";
export default function ToolbarButtonTemplate() {
    return (_jsx(Button, { class: this.classes.root, id: this.id, style: {
            width: this.width || "100%",
        }, icon: this.icon, endIcon: this.endIcon, tooltip: this.tooltip, accessibleName: this.accessibleName, accessibleNameRef: this.accessibleNameRef, accessibilityAttributes: this.accessibilityAttributes, design: this.design, disabled: this.disabled, hidden: this.hidden, "data-ui5-external-action-item-id": this._id, "data-ui5-stable": this.stableDomRef, onClick: (...args) => this.onClick(...args), children: this.text }));
}
//# sourceMappingURL=ToolbarButtonTemplate.js.map