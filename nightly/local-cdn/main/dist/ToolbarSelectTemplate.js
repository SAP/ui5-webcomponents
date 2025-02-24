import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import Select from "./Select.js";
import Option from "./Option.js";
export default function ToolbarSelectTemplate() {
    return (_jsx(Select, { class: "ui5-tb-item", style: this.styles, "data-ui5-external-action-item-id": this._id, valueState: this.valueState, disabled: this.disabled, accessibleName: this.accessibleName, accessibleNameRef: this.accessibleNameRef, onClick: (...args) => this.onClick(...args), onClose: (...args) => this.onClose(...args), onOpen: (...args) => this.onOpen(...args), onChange: (...args) => this.onChange(...args), children: this.options.map((option, index) => (_jsx(Option, { selected: option.selected, "data-ui5-external-action-item-index": index, children: option.textContent }))) }));
}
//# sourceMappingURL=ToolbarSelectTemplate.js.map