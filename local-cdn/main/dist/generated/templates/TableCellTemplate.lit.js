/* eslint no-unused-vars: 0 */
import { html, ifDefined } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `${this._popin ? block1.call(this, context, tags, suffix) : block3.call(this, context, tags, suffix)}`; }
function block1(context, tags, suffix) { return html `${this._popinHeader ? block2.call(this, context, tags, suffix) : undefined}<slot></slot>`; }
function block2(context, tags, suffix) { return html `<div class="popin-header-colon">${ifDefined(this._popinHeader)}<span class="popin-colon">${ifDefined(this._i18nPopinColon)}</span></div>`; }
function block3(context, tags, suffix) { return html `<slot></slot>`; }
export default block0;
//# sourceMappingURL=TableCellTemplate.lit.js.map