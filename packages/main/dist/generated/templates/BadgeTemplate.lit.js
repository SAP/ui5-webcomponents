/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="ui5-badge-root"><slot name="icon"></slot>${ context.hasText ? block1(context, tags, suffix) : undefined }<span class="ui5-hidden-text">${ifDefined(context.badgeDescription)}</span></div>`;
const block1 = (context, tags, suffix) => html`<label class="ui5-badge-text"><bdi><slot></slot></bdi></label>`;


export default block0;