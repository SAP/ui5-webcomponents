/* eslint no-unused-vars: 0 */
import { html, repeat, ifDefined } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<div class="ui5-form-item-root"><div class="ui5-form-item-layout" part="layout"><div class="ui5-form-item-label" part="label"><slot name="labelContent"></slot></div><div class="ui5-form-item-content" part="content">${repeat(this.content, (item, index) => item._id || index, (item, index) => block1.call(this, context, tags, suffix, item, index))}</div></div></div>`; }
function block1(context, tags, suffix, item, index) { return html `<div class="ui5-form-item-content-child"><slot name="${ifDefined(item._individualSlot)}"></slot></div>`; }
export default block0;
//# sourceMappingURL=FormItemTemplate.lit.js.map