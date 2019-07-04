
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const YearPickerLitRenderer = {};
const block0 = (context) => { return html`<div 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"	class="sapWCYearPicker"	role="grid"	aria-readonly="false"	aria-multiselectable="false"	style="${ifTruthy(context.styles.main)}">	${ repeat(context.ctr._yearIntervals, undefined, (item, index) => block1(item, index, context)) }</div>`; };
const block1 = (item, index, context) => { return html`<div class="${ifTruthy(context.classes.yearInterval)}">			${ repeat(item, undefined, (item, index) => block2(item, index, context)) }</div>	`; };
const block2 = (item, index, context) => { return html`<div id="${ifTruthy(item.id)}"					tabindex="${ifTruthy(item._tabIndex)}"					data-sap-timestamp="${ifTruthy(item.timestamp)}"					class="${ifTruthy(item.classes)}"					role="gridcell"					aria-selected="false">						${ifTruthy(item.year)}</div>			`; };
const renderMe = block0;
YearPickerLitRenderer.render = renderMe;
export default YearPickerLitRenderer;