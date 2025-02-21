/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getCustomElementsScopingSuffix } from "@ui5/webcomponents-base/dist/CustomElementsScopeUtils.js";
function block0(context, tags, suffix) { return suffix ? html `<${scopeTag("ui5-button", tags, suffix)} icon="${ifDefined(this._icon)}" tooltip="${ifDefined(this._tooltip)}" @click=${this._onClick} design="Transparent"></${scopeTag("ui5-button", tags, suffix)}>` : html `<ui5-button icon="${ifDefined(this._icon)}" tooltip="${ifDefined(this._tooltip)}" @click=${this._onClick} design="Transparent"></ui5-button>`; }
function template() { return block0.call(this, this, this.constructor.tagsToScope, getCustomElementsScopingSuffix()); }
export default template;
//# sourceMappingURL=TableHeaderCellActionBaseTemplate.lit.js.map