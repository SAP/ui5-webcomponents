import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/InitialConfiguration.js";
import verticalGrip from "@ui5/webcomponents-icons/dist/vertical-grip.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
export default function FlexibleColumnLayoutTemplate() {
    const hasAnimation = getAnimationMode() !== AnimationMode.None;
    return (_jsxs("div", { class: "ui5-fcl-root", children: [_jsxs("div", { role: this._accAttributes.columns.start.role, class: {
                    "ui5-fcl-column": true,
                    "ui5-fcl-column-animation": hasAnimation,
                    "ui5-fcl-column--start": true,
                }, "aria-hidden": this._accAttributes.columns.start.ariaHidden, "aria-labelledby": `${this._id}-startColumnText`, children: [_jsx("span", { id: `${this._id}-startColumnText`, class: "ui5-hidden-text", children: this.accStartColumnText }), _jsx("slot", { name: "startColumn", "aria-hidden": this._accAttributes.columns.middle.ariaHidden })] }), _jsx("div", { role: this.accStartSeparatorRole, title: this.accStartSeparatorText, class: "ui5-fcl-separator ui5-fcl-separator-start", style: { display: this.showStartSeparator ? "flex" : "none" }, tabindex: this.startSeparatorTabIndex, onMouseDown: this.onSeparatorPress, onTouchStart: this.onSeparatorPress, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, children: gripStart.call(this) }), _jsxs("div", { role: this._accAttributes.columns.middle.role, class: {
                    "ui5-fcl-column": true,
                    "ui5-fcl-column-animation": hasAnimation,
                    "ui5-fcl-column--middle": true,
                }, "aria-hidden": this._accAttributes.columns.middle.ariaHidden, "aria-labelledby": `${this._id}-midColumnText`, children: [_jsx("span", { id: `${this._id}-midColumnText`, class: "ui5-hidden-text", children: this.accMiddleColumnText }), _jsx("slot", { name: "midColumn", "aria-hidden": this._accAttributes.columns.middle.ariaHidden })] }), _jsx("div", { role: this.accEndSeparatorRole, title: this.accEndSeparatorText, class: "ui5-fcl-separator ui5-fcl-separator-end", style: { display: this.showEndSeparator ? "flex" : "none" }, tabindex: this.endSeparatorTabIndex, onMouseDown: this.onSeparatorPress, onTouchStart: this.onSeparatorPress, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, children: gripEnd.call(this) }), _jsxs("div", { role: this._accAttributes.columns.end.role, class: {
                    "ui5-fcl-column": true,
                    "ui5-fcl-column-animation": hasAnimation,
                    "ui5-fcl-column--end": true,
                }, "aria-hidden": this._accAttributes.columns.end.ariaHidden, "aria-labelledby": `${this._id}-endColumnText`, children: [_jsx("span", { id: `${this._id}-endColumnText`, class: "ui5-hidden-text", children: this.accEndColumnText }), _jsx("slot", { name: "endColumn", "aria-hidden": this._accAttributes.columns.middle.ariaHidden })] })] }));
}
function gripStart() {
    return (_jsx(Icon, { name: verticalGrip, class: "ui5-fcl-grip ui5-fcl-grip--start", style: { display: this.showStartSeparatorGrip ? "inline-block" : "none" } }));
}
function gripEnd() {
    return (_jsx(Icon, { name: verticalGrip, class: "ui5-fcl-grip ui5-fcl-grip--end", style: { display: this.showEndSeparatorGrip ? "inline-block" : "none" } }));
}
//# sourceMappingURL=FlexibleColumnLayoutTemplate.js.map