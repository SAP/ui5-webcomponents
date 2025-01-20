/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getCustomElementsScopingSuffix } from "@ui5/webcomponents-base/dist/CustomElementsScopeUtils.js";
function block0(context, tags, suffix) { return html `${this._popin ? block1.call(this, context, tags, suffix) : block5.call(this, context, tags, suffix)}`; }
function block1(context, tags, suffix) { return html `${this._popinText ? block2.call(this, context, tags, suffix) : block3.call(this, context, tags, suffix)}<slot></slot>`; }
function block2(context, tags, suffix) { return html `${ifDefined(this._popinText)}<span class="popin-colon">${ifDefined(this._i18nPopinColon)}</span>`; }
function block3(context, tags, suffix) { return html `${this._popinHeader ? block4.call(this, context, tags, suffix) : undefined}`; }
function block4(context, tags, suffix) { return html `${ifDefined(this._popinHeader)}<span class="popin-colon">${ifDefined(this._i18nPopinColon)}</span>`; }
function block5(context, tags, suffix) { return html `<slot></slot>`; }
function template() { return block0.call(this, this, this.constructor.tagsToScope, getCustomElementsScopingSuffix()); }
export default template;
//# sourceMappingURL=TableCellTemplate.lit.js.map