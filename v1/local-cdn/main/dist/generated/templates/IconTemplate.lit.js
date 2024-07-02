/* eslint no-unused-vars: 0 */
import { html, svg, repeat, ifDefined } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<svg class="ui5-icon-root" part="root" tabindex="${ifDefined(this._tabIndex)}" dir="${ifDefined(this._dir)}" viewBox="${ifDefined(this.viewBox)}" role="${ifDefined(this.effectiveAccessibleRole)}" focusable="false" preserveAspectRatio="xMidYMid meet" aria-label="${ifDefined(this.effectiveAccessibleName)}" aria-hidden=${ifDefined(this.effectiveAriaHidden)} xmlns="http://www.w3.org/2000/svg" @focusin=${this._onfocusin} @focusout=${this._onfocusout} @keydown=${this._onkeydown} @keyup=${this._onkeyup}>${blockSVG1.call(this, context, tags, suffix)}</svg>`; }
function block1(context, tags, suffix) { return svg `<title id="${ifDefined(this._id)}-tooltip">${ifDefined(this.effectiveAccessibleName)}</title>`; }
function block2(context, tags, suffix) { return svg `${ifDefined(this.customSvg)}`; }
function block3(context, tags, suffix, item, index) { return svg `<path d="${ifDefined(item)}"></path>`; }
function blockSVG1(context, tags, suffix) {
    return svg `${this.hasIconTooltip ? block1.call(this, context, tags, suffix) : undefined}<g role="presentation">${this.customSvg ? block2.call(this, context, tags, suffix) : undefined}${repeat(this.pathData, (item, index) => item._id || index, (item, index) => block3.call(this, context, tags, suffix, item, index))}</g>`;
}
;
export default block0;
//# sourceMappingURL=IconTemplate.lit.js.map