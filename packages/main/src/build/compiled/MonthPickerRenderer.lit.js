
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const MonthPickerLitRenderer = {};
const block0 = (context) => { return html`<div 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"	class="sapWCMonthPicker"	role="grid"	aria-readonly="false"	aria-multiselectable="false"	style="${ifTruthy(context.styles.main)}">	${ repeat(context.ctr._quarters, undefined, (item, index) => block1(item, index, context)) }</div>`; };
const block1 = (item, index, context) => { return html`<div class="${ifTruthy(context.classes.quarter)}">			${ repeat(item, undefined, (item, index) => block2(item, index, context)) }</div>	`; };
const block2 = (item, index, context) => { return html`<div					id="${ifTruthy(item.id)}"					data-sap-timestamp=${ifTruthy(item.timestamp)}					tabindex=${ifTruthy(item._tabIndex)}					class="${ifTruthy(item.classes)}"					role="gridcell"					aria-selected="false"				>					${ifTruthy(item.name)}</div>			`; };
const renderMe = block0;
MonthPickerLitRenderer.render = renderMe;
export default MonthPickerLitRenderer;