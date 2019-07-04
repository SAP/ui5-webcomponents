
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const LabelLitRenderer = {};
const block0 = (context) => { return html`<label 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"	class="${ifTruthy(context.classes.main)}"	style="${ifTruthy(context.styles.main)}"	for="${ifTruthy(context.ctr.for)}"><bdi id="${ifTruthy(context.ctr._id)}-bdi">			${ifTruthy(context.ctr._nodeText)}</bdi></label>`; };
const renderMe = block0;
LabelLitRenderer.render = renderMe;
export default LabelLitRenderer;