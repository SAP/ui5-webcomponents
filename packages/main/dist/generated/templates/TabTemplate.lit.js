/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div id="${ifDefined(context._id)}" class="ui5-tab-root"><slot name="${ifDefined(context._defaultSlotName)}"></slot>${ repeat(context.tabs, (item, index) => item._id || index, (item, index) => block1(item, index, context, tags, suffix)) }</div>`;
const block1 = (item, index, context, tags, suffix) => html`<slot name="${ifDefined(item._effectiveSlotName)}"></slot>`;


export default block0;