
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const TabLitRenderer = {};
const block0 = (context) => { return html`<div 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}">	${ repeat(context.ctr.content, undefined, (item, index) => block1(item, index, context)) }</div>`; };
const block1 = (item, index, context) => { return html`<slot name="${ifTruthy(item._slot)}"></slot>	`; };
const renderMe = block0;
TabLitRenderer.render = renderMe;
export default TabLitRenderer;