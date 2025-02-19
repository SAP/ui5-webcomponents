/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getCustomElementsScopingSuffix } from "@ui5/webcomponents-base/dist/CustomElementsScopeUtils.js";
function block0(context, tags, suffix) { return html `<slot name="action"></slot><slot></slot>${this._sortIcon ? block1.call(this, context, tags, suffix) : undefined}`; }
function block1(context, tags, suffix) { return suffix ? html `<${scopeTag("ui5-icon", tags, suffix)} name="${ifDefined(this._sortIcon)}"></${scopeTag("ui5-icon", tags, suffix)}>` : html `<ui5-icon name="${ifDefined(this._sortIcon)}"></ui5-icon>`; }
function template() { return block0.call(this, this, this.constructor.tagsToScope, getCustomElementsScopingSuffix()); }
export default template;
//# sourceMappingURL=TableHeaderCellTemplate.lit.js.map