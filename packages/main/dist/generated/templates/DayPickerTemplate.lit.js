/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="ui5-dp-root" style="${styleMap(context.styles.wrapper)}" @keydown=${context._onkeydown} @keyup=${context._onkeyup} @click=${context._onclick} @mouseover=${context._onmouseover} @focusin=${context._onfocusin} @focusout=${context._onfocusout}><div id="${ifDefined(context._id)}-content" class="ui5-dp-content" role="grid" aria-roledescription="${ifDefined(context.ariaRoledescription)}"><div role="row" class="ui5-dp-days-names-container">${ repeat(context._dayNames, (item, index) => item._id || index, (item, index) => block1(item, index, context, tags, suffix)) }</div>${ repeat(context._weeks, (item, index) => item._id || index, (item, index) => block2(item, index, context, tags, suffix)) }</div></div>`;
const block1 = (item, index, context, tags, suffix) => html`<div role="columnheader" aria-label="${ifDefined(item.name)}" class="${ifDefined(item.classes)}">${ifDefined(item.ultraShortName)}</div>`;
const block2 = (item, index, context, tags, suffix) => html`${ item.length ? block3(item, index, context, tags, suffix) : block9(item, index, context, tags, suffix) }`;
const block3 = (item, index, context, tags, suffix) => html`<div class="ui5-dp-weeks-row" role="row">${ repeat(item, (item, index) => item._id || index, (item, index) => block4(item, index, context, tags, suffix)) }</div>`;
const block4 = (item, index, context, tags, suffix) => html`${ item.timestamp ? block5(item, index, context, tags, suffix) : block7(item, index, context, tags, suffix) }`;
const block5 = (item, index, context, tags, suffix) => html`<div tabindex="${ifDefined(item._tabIndex)}" ?data-sap-focus-ref="${item.focusRef}" data-sap-timestamp="${ifDefined(item.timestamp)}" role="gridcell" aria-selected="${ifDefined(item.ariaSelected)}" aria-label="${ifDefined(item.ariaLabel)}" aria-disabled="${ifDefined(item.ariaDisabled)}" class="${ifDefined(item.classes)}"><span class="ui5-dp-daytext" data-sap-timestamp="${ifDefined(item.timestamp)}">${ifDefined(item.day)}</span>${ item._isSecondaryCalendarType ? block6(item, index, context, tags, suffix) : undefined }</div>`;
const block6 = (item, index, context, tags, suffix) => html`<span class="ui5-dp-daytext ui5-dp-daysectext">${ifDefined(item.secondDay)}</span>`;
const block7 = (item, index, context, tags, suffix) => html`${ !item.isHidden ? block8(item, index, context, tags, suffix) : undefined }`;
const block8 = (item, index, context, tags, suffix) => html`<div class="ui5-dp-weekname-container" role="rowheader" aria-label="Calendar Week ${ifDefined(item.weekNum)}"><span class="ui5-dp-weekname">${ifDefined(item.weekNum)}</span></div>`;
const block9 = (item, index, context, tags, suffix) => html`<div class="sapWCEmptyWeek"></div>`;


export default block0;