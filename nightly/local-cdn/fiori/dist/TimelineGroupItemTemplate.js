import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
export default function TimelineGroupItemTemplate() {
    return (_jsxs("div", { class: "ui5-tlgi-root", children: [_jsxs("div", { class: "ui5-tlgi-btn-root", children: [_jsx("div", { class: "ui5-tlgi-icon-placeholder", children: _jsx("div", { class: "ui5-tlgi-icon-dot" }) }), _jsx("div", { class: "ui5-tlgi-line-placeholder", children: _jsx("div", { class: "ui5-tlgi-line" }) }), _jsx(ToggleButton, { class: "ui5-tlgi-btn", icon: this._groupItemIcon, pressed: this.collapsed, onClick: this.onGroupItemClick, children: this.groupName })] }), _jsx("ul", { class: "ui5-tl-group-item", children: this.items.map(item => _jsx("li", { class: "ui5-timeline-group-list-item", children: _jsx("slot", { name: item._individualSlot }) })) })] }));
}
//# sourceMappingURL=TimelineGroupItemTemplate.js.map