/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="${classMap(context.classes)}" role="region" aria-label="${ifDefined(context._getAriaLabel)}">${ context._hasHeader ? block1(context, tags, suffix) : undefined }<div role="group" aria-label="${ifDefined(context._ariaCardContentLabel)}"><slot></slot></div></div>`;
const block1 = (context, tags, suffix) => html`<div class="ui5-card-header-root"><slot name="header"></slot></div>`;


export default block0;