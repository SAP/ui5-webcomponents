
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const TableRowLitRenderer = {};
const block0 = (context) => { return html`<div 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"	class="${ifTruthy(context.classes.main)}"	style="${ifTruthy(context.styles.main)}"	tabindex="${ifTruthy(context.ctr._tabIndex)}">	${ repeat(context.visibleCells, undefined, (item, index) => block1(item, index, context)) }${ repeat(context.popinCells, undefined, (item, index) => block2(item, index, context)) }</div>`; };
const block1 = (item, index, context) => { return html`<div class="${ifTruthy(context.classes.cellWrapper)}"><slot name="${ifTruthy(item._slot)}"></slot></div>	`; };
const block2 = (item, index, context) => { return html`<div class="${ifTruthy(context.classes.popin)}"			style="grid-column-end: ${ifTruthy(context.visibleColumnLength)}" ><span class="${ifTruthy(context.classes.popinTitle)}">${ifTruthy(item.popinText)}</span><div><slot name="${ifTruthy(item.cell._slot)}"></slot></div></div>	`; };
const renderMe = block0;
TableRowLitRenderer.render = renderMe;
export default TableRowLitRenderer;