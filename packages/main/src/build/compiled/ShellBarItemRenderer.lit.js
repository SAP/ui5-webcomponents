
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const ShellBarItemLitRenderer = {};
const block0 = (context) => { return html`<span 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"></span>`; };
const renderMe = block0;
ShellBarItemLitRenderer.render = renderMe;
export default ShellBarItemLitRenderer;