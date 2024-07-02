/* eslint no-unused-vars: 0 */
import { html, repeat, ifDefined } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<div id="${ifDefined(this._id)}" class="ui5-tab-root" data-ui5-stable="${ifDefined(this.stableDomRef)}"><slot name="${ifDefined(this._defaultSlotName)}"></slot>${repeat(this.tabs, (item, index) => item._id || index, (item, index) => block1.call(this, context, tags, suffix, item, index))}</div>`; }
function block1(context, tags, suffix, item, index) { return html `<slot name="${ifDefined(item._effectiveSlotName)}"></slot>`; }
export default block0;
//# sourceMappingURL=TabTemplate.lit.js.map