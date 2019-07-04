
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const TabSeparatorLitRenderer = {};
const block0 = (context) => { return html`<li 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}" role="separator"></li>`; };
const renderMe = block0;
TabSeparatorLitRenderer.render = renderMe;
export default TabSeparatorLitRenderer;