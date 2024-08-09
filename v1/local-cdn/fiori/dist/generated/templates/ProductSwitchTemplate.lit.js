/* eslint no-unused-vars: 0 */
import { html, ifDefined } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<div class="ui5-product-switch-root" role="list" aria-label="${ifDefined(this._ariaLabelText)}" @focusin=${this._onfocusin} @keydown=${this._onkeydown} @click="${this.handleProductSwitchItemClick}"><slot></slot></div>`; }
export default block0;
//# sourceMappingURL=ProductSwitchTemplate.lit.js.map