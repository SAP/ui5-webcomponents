
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const TableLitRenderer = {};
const block0 = (context) => { return html`<div 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"	style="display: grid; place-items: center;"><!-- columns --><div class="${ifTruthy(context.classes.main)}" style="${ifTruthy(context.styles.main)}">		${ repeat(context.visibleColumns, undefined, (item, index) => block1(item, index, context)) }</div><!-- rows -->	${ repeat(context.ctr.rows, undefined, (item, index) => block2(item, index, context)) }</div>`; };
const block1 = (item, index, context) => { return html`<div class="sapWCTableColumnWrapper"><slot name="${ifTruthy(item._slot)}"></slot></div>		`; };
const block2 = (item, index, context) => { return html`<div style="width: 100%"		><slot name="${ifTruthy(item._slot)}"></slot></div>	`; };
const renderMe = block0;
TableLitRenderer.render = renderMe;
export default TableLitRenderer;