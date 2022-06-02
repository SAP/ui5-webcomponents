/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div tabindex="${ifDefined(context._tabIndex)}" @click="${context._handleSelect}" @focusin="${context._focusin}" @focusout="${context._focusout}" @keydown="${context._keydown}" class="ui5-token--wrapper" role="option" aria-selected="${ifDefined(context.selected)}"><span class="ui5-token--text">${ifDefined(context.text)}</span>${ !context.readonly ? block1(context, tags, suffix) : undefined }</div>`;
const block1 = (context, tags, suffix) => html`<div class="ui5-token--icon" @click="${context._delete}">${ context.closeIcon.length ? block2(context, tags, suffix) : block3(context, tags, suffix) }</div>`;
const block2 = (context, tags, suffix) => html`<slot name="closeIcon"></slot>`;
const block3 = (context, tags, suffix) => suffix ? html`<${scopeTag("ui5-icon", tags, suffix)} name="${ifDefined(context.iconURI)}" accessible-name="${ifDefined(context.tokenDeletableText)}" show-tooltip></${scopeTag("ui5-icon", tags, suffix)}>` : html`<ui5-icon name="${ifDefined(context.iconURI)}" accessible-name="${ifDefined(context.tokenDeletableText)}" show-tooltip></ui5-icon>`;


export default block0;