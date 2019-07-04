
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const TableColumnLitRenderer = {};
const block0 = (context) => { return html`<div 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}" style="${ifTruthy(context.styles.main)}" class="${ifTruthy(context.classes.main)}" >	${ context.ctr.header ? block1(context) : undefined }</div>`; };
const block1 = (context) => { return html`<slot name="${ifTruthy(context.ctr.header._slot)}"></slot>	`; };
const renderMe = block0;
TableColumnLitRenderer.render = renderMe;
export default TableColumnLitRenderer;