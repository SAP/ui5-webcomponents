/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="ui5-progress-indicator-root ${classMap(context.classes.root)}" role="progressbar" aria-valuemin="0" aria-valuenow="${ifDefined(context.validatedValue)}" aria-valuemax="100" aria-valuetext="${ifDefined(context.valueStateText)}" aria-disabled="${ifDefined(context._ariaDisabled)}"><div class="ui5-progress-indicator-bar" style="${styleMap(context.styles.bar)}">${ !context.showValueInRemainingBar ? block1(context, tags, suffix) : undefined }</div><div class="ui5-progress-indicator-remaining-bar">${ context.showValueInRemainingBar ? block6(context, tags, suffix) : undefined }</div></div>`;
const block1 = (context, tags, suffix) => html`${ context.showIcon ? block2(context, tags, suffix) : undefined }${ !context.hideValue ? block3(context, tags, suffix) : undefined }`;
const block2 = (context, tags, suffix) => suffix ? html`<${scopeTag("ui5-icon", tags, suffix)} name="${ifDefined(context.valueStateIcon)}" class="ui5-progress-indicator-icon"></${scopeTag("ui5-icon", tags, suffix)}>` : html`<ui5-icon name="${ifDefined(context.valueStateIcon)}" class="ui5-progress-indicator-icon"></ui5-icon>`;
const block3 = (context, tags, suffix) => html`<span class="ui5-progress-indicator-value">${ context.displayValue ? block4(context, tags, suffix) : block5(context, tags, suffix) }</span>`;
const block4 = (context, tags, suffix) => html`${ifDefined(context.displayValue)}`;
const block5 = (context, tags, suffix) => html`${ifDefined(context.validatedValue)}% `;
const block6 = (context, tags, suffix) => html`${ context.showIcon ? block7(context, tags, suffix) : undefined }${ !context.hideValue ? block8(context, tags, suffix) : undefined }`;
const block7 = (context, tags, suffix) => suffix ? html`<${scopeTag("ui5-icon", tags, suffix)} name="${ifDefined(context.valueStateIcon)}" class="ui5-progress-indicator-icon"></${scopeTag("ui5-icon", tags, suffix)}>` : html`<ui5-icon name="${ifDefined(context.valueStateIcon)}" class="ui5-progress-indicator-icon"></ui5-icon>`;
const block8 = (context, tags, suffix) => html`<span class="ui5-progress-indicator-value">${ context.displayValue ? block9(context, tags, suffix) : block10(context, tags, suffix) }</span>`;
const block9 = (context, tags, suffix) => html`${ifDefined(context.displayValue)}`;
const block10 = (context, tags, suffix) => html`${ifDefined(context.validatedValue)}% `;


export default block0;