/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getCustomElementsScopingSuffix } from "@ui5/webcomponents-base/dist/CustomElementsScopeUtils.js";
function block0(context, tags, suffix) { return html `${this.invisible ? block1.call(this, context, tags, suffix) : block2.call(this, context, tags, suffix)}`; }
function block1(context, tags, suffix) { return html `<div></div>`; }
function block2(context, tags, suffix) { return html `${this._isInteractive ? block3.call(this, context, tags, suffix) : block4.call(this, context, tags, suffix)}`; }
function block3(context, tags, suffix) { return suffix ? html `<${scopeTag("ui5-button", tags, suffix)} icon="${ifDefined(this._icon)}" tooltip="${ifDefined(this._text)}" @click=${this._onActionClick} design="Transparent"></${scopeTag("ui5-button", tags, suffix)}>` : html `<ui5-button icon="${ifDefined(this._icon)}" tooltip="${ifDefined(this._text)}" @click=${this._onActionClick} design="Transparent"></ui5-button>`; }
function block4(context, tags, suffix) { return suffix ? html `<${scopeTag("ui5-icon", tags, suffix)} name="${ifDefined(this._icon)}" tooltip="${ifDefined(this._text)}" design="NonInteractive"></${scopeTag("ui5-icon", tags, suffix)}>` : html `<ui5-icon name="${ifDefined(this._icon)}" tooltip="${ifDefined(this._text)}" design="NonInteractive"></ui5-icon>`; }
function template() { return block0.call(this, this, this.constructor.tagsToScope, getCustomElementsScopingSuffix()); }
export default template;
//# sourceMappingURL=TableRowActionBaseTemplate.lit.js.map