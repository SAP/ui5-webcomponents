/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`${ context.targetSrc ? block1(context, tags, suffix) : block5(context, tags, suffix) }`;
const block1 = (context, tags, suffix) => html`<a class="ui5-product-switch-item-root" data-sap-focus-ref @focusout="${context._onfocusout}" @focusin="${context._onfocusin}" @mousedown="${context._onmousedown}" @keydown="${context._onkeydown}" @keyup="${context._onkeyup}" tabindex=${ifDefined(context._tabIndex)} href="${ifDefined(context.targetSrc)}" target="${ifDefined(context.target)}">${ context.icon ? block2(context, tags, suffix) : undefined }<span class="ui5-product-switch-item-text-content">${ context.titleText ? block3(context, tags, suffix) : undefined }${ context.subtitleText ? block4(context, tags, suffix) : undefined }</span></a>`;
const block2 = (context, tags, suffix) => suffix ? html`<${scopeTag("ui5-icon", tags, suffix)} class="ui5-product-switch-item-icon" name="${ifDefined(context.icon)}"></${scopeTag("ui5-icon", tags, suffix)}>` : html`<ui5-icon class="ui5-product-switch-item-icon" name="${ifDefined(context.icon)}"></ui5-icon>`;
const block3 = (context, tags, suffix) => html`<span class="ui5-product-switch-item-title">${ifDefined(context.titleText)}</span>`;
const block4 = (context, tags, suffix) => html`<span class="ui5-product-switch-item-subtitle">${ifDefined(context.subtitleText)}</span>`;
const block5 = (context, tags, suffix) => html`<div role="listitem" class="ui5-product-switch-item-root" data-sap-focus-ref @focusout="${context._onfocusout}" @focusin="${context._onfocusin}" @mousedown="${context._onmousedown}" @keydown="${context._onkeydown}" @keyup="${context._onkeyup}" tabindex=${ifDefined(context._tabIndex)}>${ context.icon ? block6(context, tags, suffix) : undefined }<span class="ui5-product-switch-item-text-content">${ context.titleText ? block7(context, tags, suffix) : undefined }${ context.subtitleText ? block8(context, tags, suffix) : undefined }</span></div>`;
const block6 = (context, tags, suffix) => suffix ? html`<${scopeTag("ui5-icon", tags, suffix)} class="ui5-product-switch-item-icon" name="${ifDefined(context.icon)}"></${scopeTag("ui5-icon", tags, suffix)}>` : html`<ui5-icon class="ui5-product-switch-item-icon" name="${ifDefined(context.icon)}"></ui5-icon>`;
const block7 = (context, tags, suffix) => html`<span class="ui5-product-switch-item-title">${ifDefined(context.titleText)}</span>`;
const block8 = (context, tags, suffix) => html`<span class="ui5-product-switch-item-subtitle">${ifDefined(context.subtitleText)}</span>`;


export default block0;