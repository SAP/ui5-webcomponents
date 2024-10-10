/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<span>${this._renderEmptyIndicator ? block1.call(this, context, tags, suffix) : block2.call(this, context, tags, suffix)}</span>`; }
function block1(context, tags, suffix) { return html `<span class="empty-indicator" aria-hidden="true">${ifDefined(this._emptyIndicatorSymbol)}</span><span class="empty-indicator-aria-label">${ifDefined(this._emptyIndicatorAriaLabel)}</span>`; }
function block2(context, tags, suffix) { return html `<slot></slot>`; }
export default block0;
//# sourceMappingURL=TextTemplate.lit.js.map