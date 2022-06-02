/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="${classMap(context.classes.root)}" id="${ifDefined(context._id)}" role="note" aria-live="assertive" aria-labelledby="${ifDefined(context._id)}">${ !context.hideIcon ? block1(context, tags, suffix) : undefined }<span class="ui5-hidden-text">${ifDefined(context.hiddenText)}</span><span class="ui5-message-strip-text"><slot></slot></span>${ !context.hideCloseButton ? block4(context, tags, suffix) : undefined }</div>`;
const block1 = (context, tags, suffix) => html`<div class="ui5-message-strip-icon-wrapper" aria-hidden="true">${ context.iconProvided ? block2(context, tags, suffix) : block3(context, tags, suffix) }</div>`;
const block2 = (context, tags, suffix) => html`<slot name="icon"></slot>`;
const block3 = (context, tags, suffix) => suffix ? html`<${scopeTag("ui5-icon", tags, suffix)} name="${ifDefined(context.standardIconName)}" class="ui5-message-strip-icon"></${scopeTag("ui5-icon", tags, suffix)}>` : html`<ui5-icon name="${ifDefined(context.standardIconName)}" class="ui5-message-strip-icon"></ui5-icon>`;
const block4 = (context, tags, suffix) => suffix ? html`<${scopeTag("ui5-button", tags, suffix)} icon="decline" design="Transparent" class="ui5-message-strip-close-button" tooltip="${ifDefined(context._closeButtonText)}" @click=${context._closeClick}></${scopeTag("ui5-button", tags, suffix)}>` : html`<ui5-button icon="decline" design="Transparent" class="ui5-message-strip-close-button" tooltip="${ifDefined(context._closeButtonText)}" @click=${context._closeClick}></ui5-button>`;


export default block0;