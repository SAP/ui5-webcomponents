/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="ui5-file-uploader-root" @mouseover="${context._onmouseover}" @mouseout="${context._onmouseout}" @focusin="${context._onfocusin}" @focusout="${context._onfocusout}" @keydown="${context._onkeydown}" @keyup="${context._onkeyup}" @click="${context._onclick}"><div class="ui5-file-uploader-mask">${ !context.hideInput ? block1(context, tags, suffix) : undefined }<slot></slot></div>${ context._keepInputInShadowDOM ? block2(context, tags, suffix) : block3(context, tags, suffix) }</div>`;
const block1 = (context, tags, suffix) => suffix ? html`<${scopeTag("ui5-input", tags, suffix)} value="${ifDefined(context.value)}" value-state="${ifDefined(context.valueState)}" placeholder="${ifDefined(context.placeholder)}" ?disabled="${context.disabled}" tabindex="-1" class="ui5-file-uploader-input"></${scopeTag("ui5-input", tags, suffix)}>` : html`<ui5-input value="${ifDefined(context.value)}" value-state="${ifDefined(context.valueState)}" placeholder="${ifDefined(context.placeholder)}" ?disabled="${context.disabled}" tabindex="-1" class="ui5-file-uploader-input"></ui5-input>`;
const block2 = (context, tags, suffix) => html`<input type="file" title="${ifDefined(context.titleText)}" accept="${ifDefined(context.accept)}" ?multiple="${context.multiple}" ?disabled="${context.disabled}" @change="${context._onChange}" aria-hidden="true" tabindex="-1">`;
const block3 = (context, tags, suffix) => html`<slot name="formSupport"></slot>`;


export default block0;