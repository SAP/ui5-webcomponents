/* eslint no-unused-vars: 0 */
import { html, repeat, ifDefined } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<div class="ui5-timeline-root" @focusin=${this._onfocusin} @keydown=${this._onkeydown}><div class="ui5-timeline-scroll-container"><ul class="ui5-timeline-list" aria-live="polite" aria-label="${ifDefined(this.ariaLabel)}">${repeat(this.items, (item, index) => item._id || index, (item, index) => block1.call(this, context, tags, suffix, item, index))}</ul></div></div>`; }
function block1(context, tags, suffix, item, index) { return html `<li class="ui5-timeline-list-item"><slot name="${ifDefined(item._individualSlot)}"></slot></li>`; }
export default block0;
//# sourceMappingURL=TimelineTemplate.lit.js.map