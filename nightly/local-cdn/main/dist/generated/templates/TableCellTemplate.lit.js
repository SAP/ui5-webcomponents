/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getCustomElementsScopingSuffix } from "@ui5/webcomponents-base/dist/CustomElementsScopeUtils.js";
function block0(context, tags, suffix) { return html `${this._popin ? block1.call(this, context, tags, suffix) : undefined}<slot></slot>`; }
function block1(context, tags, suffix) { return html `${repeat(this._popinHeaderNodes, (item, index) => item._id || index, (item, index) => block2.call(this, context, tags, suffix, item, index))}<span class="popin-colon">${ifDefined(this._i18nPopinColon)}</span>`; }
function block2(context, tags, suffix, item, index) { return html `${ifDefined(item)}`; }
function template() { return block0.call(this, this, this.constructor.tagsToScope, getCustomElementsScopingSuffix()); }
export default template;
//# sourceMappingURL=TableCellTemplate.lit.js.map