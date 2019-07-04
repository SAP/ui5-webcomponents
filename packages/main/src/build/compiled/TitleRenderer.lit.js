
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const TitleLitRenderer = {};
const block0 = (context) => { return html`<h2		id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"	class="${ifTruthy(context.classes.main)}"	style="${ifTruthy(context.styles.main)}"	role="heading"><span id="${ifTruthy(context.ctr._id)}-inner">${ifTruthy(context.ctr._nodeText)}</span></h2>`; };
const renderMe = block0;
TitleLitRenderer.render = renderMe;
export default TitleLitRenderer;