import { jsxs as _jsxs, jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
export default function IconTemplate() {
    return (_jsxs("svg", { class: "ui5-icon-root", part: "root", tabindex: this._tabIndex, dir: this._dir, viewBox: this.viewBox, role: this.effectiveAccessibleRole, focusable: "false", preserveAspectRatio: "xMidYMid meet", "aria-label": this.effectiveAccessibleName, "aria-hidden": this.effectiveAriaHidden, xmlns: "http://www.w3.org/2000/svg", onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, children: [this.hasIconTooltip &&
                _jsxs("title", { id: `${this._id}-tooltip`, children: [" ", this.effectiveAccessibleName, " "] }), _jsxs("g", { role: "presentation", children: [this.customSvg && svgTemplate.call(this, this.customSvg), this.pathData.map(path => (_jsx("path", { d: path })))] })] }));
}
function svgTemplate(template) {
    if (template.strings) {
        return _jsx("g", { dangerouslySetInnerHTML: { __html: renderLegacySVGTemplate(this.customSvg) ?? "" } });
    }
    return template;
}
// Renders legacy (lit) SVG template
function renderLegacySVGTemplate(customTemplate) {
    const { strings, values } = customTemplate;
    return strings.map((str, i) => {
        const value = values && values[i];
        if (typeof value === "string") {
            return str + value;
        }
        if (typeof value === "object" && value?.strings) {
            return str + renderLegacySVGTemplate(value);
        }
        return str;
    }).join("");
}
//# sourceMappingURL=IconTemplate.js.map