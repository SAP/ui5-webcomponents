/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="${classMap(context.classes.root)}">${ context._isBusy ? block1(context, tags, suffix) : undefined }<slot></slot>${ context._isBusy ? block3(context, tags, suffix) : undefined }</div>`;
const block1 = (context, tags, suffix) => html`<div class="ui5-busy-indicator-busy-area" title="${ifDefined(context.ariaTitle)}" tabindex="0" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuetext="Busy" aria-labelledby="${ifDefined(context.labelId)}" data-sap-focus-ref><div class="ui5-busy-indicator-circles-wrapper"><div class="ui5-busy-indicator-circle circle-animation-0"></div><div class="ui5-busy-indicator-circle circle-animation-1"></div><div class="ui5-busy-indicator-circle circle-animation-2"></div></div>${ context.text ? block2(context, tags, suffix) : undefined }</div>`;
const block2 = (context, tags, suffix) => suffix ? html`<${scopeTag("ui5-label", tags, suffix)} id="${ifDefined(context._id)}-label" class="ui5-busy-indicator-text">${ifDefined(context.text)}</${scopeTag("ui5-label", tags, suffix)}>` : html`<ui5-label id="${ifDefined(context._id)}-label" class="ui5-busy-indicator-text">${ifDefined(context.text)}</ui5-label>`;
const block3 = (context, tags, suffix) => html`<span data-ui5-focus-redirect tabindex="0" @focusin="${context._redirectFocus}"></span>`;


export default block0;