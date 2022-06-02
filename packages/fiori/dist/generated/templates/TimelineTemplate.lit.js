/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="ui5-timeline-root" @focusin=${context._onfocusin} @keydown=${context._onkeydown}><div class="ui5-timeline-scroll-container"><ul class="ui5-timeline-list" aria-live="polite" aria-label="${ifDefined(context.ariaLabel)}">${ repeat(context.items, (item, index) => item._id || index, (item, index) => block1(item, index, context, tags, suffix)) }</ul></div></div>`;
const block1 = (item, index, context, tags, suffix) => html`<li class="ui5-timeline-list-item"><slot name="${ifDefined(item._individualSlot)}"></slot></li>`;


export default block0;