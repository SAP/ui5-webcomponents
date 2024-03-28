/* eslint no-unused-vars: 0 */
import { html, ifDefined } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<tr class="ui5-table-group-row-root" part="group-row" aria-label=${ifDefined(this.ariaLabelText)} tabindex="${ifDefined(this.forcedTabIndex)}" @focusin="${this._onfocusin}"><td colspan=${ifDefined(this.colSpan)}><slot></slot></td></tr>`; }
export default block0;
//# sourceMappingURL=TableGroupRowTemplate.lit.js.map