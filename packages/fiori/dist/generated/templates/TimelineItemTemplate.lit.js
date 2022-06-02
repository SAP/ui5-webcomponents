/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="ui5-tli-root" dir="${ifDefined(context.effectiveDir)}"><div class="${classMap(context.classes.indicator)}"><div class="ui5-tli-icon-outer">${ context.icon ? block1(context, tags, suffix) : block2(context, tags, suffix) }</div></div><div class="ui5-tli-bubble" tabindex="${ifDefined(context._tabIndex)}" data-sap-focus-ref><div class="ui5-tli-title">${ context.name ? block3(context, tags, suffix) : undefined }<span>${ifDefined(context.titleText)}</span></div><div class="ui5-tli-subtitle">${ifDefined(context.subtitleText)}</div>${ context.textContent ? block6(context, tags, suffix) : undefined }<span class="${classMap(context.classes.bubbleArrowPosition)}"></span></div></div>`;
const block1 = (context, tags, suffix) => suffix ? html`<${scopeTag("ui5-icon", tags, suffix)} class="ui5-tli-icon" name="${ifDefined(context.icon)}"></${scopeTag("ui5-icon", tags, suffix)}>` : html`<ui5-icon class="ui5-tli-icon" name="${ifDefined(context.icon)}"></ui5-icon>`;
const block2 = (context, tags, suffix) => html`<div class="ui5-tli-dummy-icon-container"></div>`;
const block3 = (context, tags, suffix) => html`${ context.nameClickable ? block4(context, tags, suffix) : block5(context, tags, suffix) }`;
const block4 = (context, tags, suffix) => suffix ? html`<${scopeTag("ui5-link", tags, suffix)} @click="${context.onNamePress}" class="ui5-tli-title-name-clickable">${ifDefined(context.name)}&nbsp;</${scopeTag("ui5-link", tags, suffix)}>` : html`<ui5-link @click="${context.onNamePress}" class="ui5-tli-title-name-clickable">${ifDefined(context.name)}&nbsp;</ui5-link>`;
const block5 = (context, tags, suffix) => html`<span class="ui5-tli-title-name">${ifDefined(context.name)}&nbsp;</span>`;
const block6 = (context, tags, suffix) => html`<div class="ui5-tli-desc"><slot></slot></div>`;


export default block0;