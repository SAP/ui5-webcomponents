import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function TimePickerClockTemplate() {
    return (_jsxs("div", { id: `${this._id}`, onDragStart: this.noop, onDrop: this.noop, "aria-hidden": "true", class: {
            "ui5-tp-clock": true,
            "ui5-tp-clock-inner": this.showInnerCircle,
            "ui5-tp-clock-active": this.active,
        }, children: [_jsx("div", { "data-label": this.label, class: "ui5-tp-clock-dial" }), _jsxs("div", { children: [this._items.map((item, i) => (_jsxs("div", { class: "ui5-tp-clock-item", style: { transform: `translate(-50%) rotate(${(i + 1) * 6}deg` }, children: [item.item &&
                                _jsxs(_Fragment, { children: [_jsx("span", { class: "ui5-tp-clock-dot" }), _jsx("span", { id: `${this._id}-${item.item}`, class: "ui5-tp-clock-number", style: { transform: `rotate(-${(i + 1) * 6}deg)` }, children: item.item }), item.innerItem &&
                                            _jsx("span", { id: `${this._id}-${item.innerItem}`, class: "ui5-tp-clock-number", style: { transform: `rotate(-${(i + 1) * 6}deg)` }, children: item.innerItem })] }), !item.item && !this.hideFractions
                                && _jsx("span", { class: "ui5-tp-clock-mid-dot" })] }))), this._selectedItem.showMarker &&
                        _jsxs("div", { class: "ui5-tp-clock-item ui5-tp-clock-item-with-marker", style: { transform: `translate(-50%) rotate(${this._selectedItem.angle || 0}deg)` }, children: [_jsx("div", { class: "ui5-tp-clock-marker" }), _jsx("div", { class: this._selectedItem.itemClasses, style: { transform: `rotate(-${this._selectedItem.angle || 0}deg)` }, children: this._selectedItem.item }), _jsx("div", { id: `${this._id}-selected`, class: this._selectedItem.innerItemClasses, style: { transform: `rotate(-${this._selectedItem.angle || 0}deg)` }, children: this._selectedItem.innerItem })] })] }), _jsx("div", { class: "ui5-tp-clock-cover", onTouchStart: this._onTouchStart, onTouchMove: this._onTouchMove, onTouchEnd: this._onTouchEnd, onMouseDown: this._onTouchStart, onMouseMove: this._onTouchMove, onMouseUp: this._onTouchEnd, onMouseOut: this._onMouseOut, ref: this._captureClockRef.bind(this) })] }));
}
//# sourceMappingURL=TimePickerClockTemplate.js.map