/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="${classMap(context.classes.wrapper)}"><span id="${ifDefined(context._id)}-hiddenText" class="ui5-hidden-text">${ifDefined(context.tokenizerLabel)}</span><div class="${classMap(context.classes.content)}" @ui5-delete="${ifDefined(context._delete)}" @click="${context._click}" @mousedown="${context._onmousedown}" @keydown="${context._onkeydown}" role="listbox" aria-labelledby="${ifDefined(context._id)}-hiddenText">${ repeat(context.tokens, (item, index) => item._id || index, (item, index) => block1(item, index, context, tags, suffix)) }</div>${ context.showNMore ? block2(context, tags, suffix) : undefined }</div>`;
const block1 = (item, index, context, tags, suffix) => html`<slot name="${ifDefined(item._individualSlot)}"></slot>`;
const block2 = (context, tags, suffix) => html`<span @click="${context._openOverflowPopover}" class="ui5-tokenizer-more-text" part="n-more-text">${ifDefined(context._nMoreText)}</span>`;


export default block0;