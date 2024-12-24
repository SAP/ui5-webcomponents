import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
export default function TimelineTemplate() {
    return (_jsx("div", { class: "ui5-timeline-root", onFocusIn: this._onfocusin, onKeyDown: this._onkeydown, children: _jsx("div", { class: "ui5-timeline-scroll-container", children: _jsx("ul", { class: "ui5-timeline-list", "aria-live": "polite", "aria-label": this.ariaLabel, children: this.items.map(item => _jsx("li", { class: "ui5-timeline-list-item", children: _jsx("slot", { name: item._individualSlot }) })) }) }) }));
}
//# sourceMappingURL=TimelineTemplate.js.map