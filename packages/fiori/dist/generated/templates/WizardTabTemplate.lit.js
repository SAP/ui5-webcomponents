/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="ui5-wiz-step-root" role="listitem" tabindex="${ifDefined(context.tabIndex)}" aria-current="${ifDefined(context.accInfo.ariaCurrent)}" aria-setsize="${ifDefined(context.accInfo.ariaSetsize)}" aria-posinset="${ifDefined(context.accInfo.ariaPosinset)}" aria-disabled="${ifDefined(context.accInfo.ariaDisabled)}" aria-label="${ifDefined(context.accInfo.ariaLabel)}" @click="${context._onclick}" @keydown="${context._onkeydown}" @keyup="${context._onkeyup}" @focusin="${context._onfocusin}"><div class="ui5-wiz-step-main"><div class="ui5-wiz-step-icon-circle">${ context.icon ? block1(context, tags, suffix) : block2(context, tags, suffix) }</div>${ context.hasTexts ? block3(context, tags, suffix) : undefined }</div>${ !context.hideSeparator ? block4(context, tags, suffix) : undefined }</div>`;
const block1 = (context, tags, suffix) => suffix ? html`<${scopeTag("ui5-icon", tags, suffix)} class="ui5-wiz-step-icon" name="${ifDefined(context.icon)}"></${scopeTag("ui5-icon", tags, suffix)}>` : html`<ui5-icon class="ui5-wiz-step-icon" name="${ifDefined(context.icon)}"></ui5-icon>`;
const block2 = (context, tags, suffix) => html`<span class="ui5-wiz-step-number">${ifDefined(context.number)}</span>`;
const block3 = (context, tags, suffix) => html`<div class="ui5-wiz-step-texts"><div class="ui5-wiz-step-title-text">${ifDefined(context.titleText)}</div><div class="ui5-wiz-step-subtitle-text">${ifDefined(context.subtitleText)}</div></div>`;
const block4 = (context, tags, suffix) => html`<div class="ui5-wiz-step-hr"></div>`;


export default block0;