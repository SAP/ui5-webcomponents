
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const DayPickerLitRenderer = {};
const block0 = (context) => { return html`<div 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}" class="${ifTruthy(context.classes.wrapper)}" style="${ifTruthy(context.styles.wrapper)}"><div class="${ifTruthy(context.classes.weekNumberContainer)}">		${ repeat(context.ctr._weekNumbers, undefined, (item, index) => block1(item, index, context)) }</div><div id="${ifTruthy(context.ctr._id)}-content" class="${ifTruthy(context.classes.content)}"><div role="row" class="${ifTruthy(context.classes.weekDaysContainer)}">			${ repeat(context.ctr._dayNames, undefined, (item, index) => block2(item, index, context)) }</div><div id="${ifTruthy(context.ctr._id)}-days" class="sapWCDayPickerItemsContainer" tabindex="-1">			${ repeat(context.ctr._weeks, undefined, (item, index) => block3(item, index, context)) }</div></div></div>`; };
const block1 = (item, index, context) => { return html`<div class="sapWCDayPickerWeekNameContainer"><span class="sapWCDayPickerWeekName">${ifTruthy(item)}</span></div>		`; };
const block2 = (item, index, context) => { return html`<div					id=${ifTruthy(item._id)}					role="columnheader"					aria-label="${ifTruthy(item.name)}"					class="${ifTruthy(item.classes)}">					${ifTruthy(item.ultraShortName)}</div>			`; };
const block3 = (item, index, context) => { return html`${ item.length ? block4(item, index, context) : block6(item, index, context) }`; };
const block4 = (item, index, context) => { return html`<div style="display: flex;">						${ repeat(item, undefined, (item, index) => block5(item, index, context)) }</div>				`; };
const block5 = (item, index, context) => { return html`<div								id="${ifTruthy(item.id)}"								tabindex="${ifTruthy(item._tabIndex)}"								data-sap-timestamp="${ifTruthy(item.timestamp)}"								data-sap-index="${ifTruthy(item._index)}"								role="gridcell"								aria-selected="${ifTruthy(item.selected)}"								class="${ifTruthy(item.classes)}"><span 										class="sapWCDayPickerDayText"										data-sap-timestamp="${ifTruthy(item.timestamp)}"										data-sap-index="${ifTruthy(item._index)}">											${ifTruthy(item.iDay)}</span></div>						`; };
const block6 = (item, index, context) => { return html`<div class="sapWCEmptyWeek"></div>				`; };
const renderMe = block0;
DayPickerLitRenderer.render = renderMe;
export default DayPickerLitRenderer;