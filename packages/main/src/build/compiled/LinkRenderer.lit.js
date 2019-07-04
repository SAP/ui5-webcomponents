
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const LinkLitRenderer = {};
const block0 = (context) => { return html`<a 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"	class="${ifTruthy(context.classes.main)}"	role="link"	href="${ifTruthy(context.ctr.href)}"	target="${ifTruthy(context.ctr.target)}"	rel="${ifTruthy(context.ctr._rel)}"	tabindex="${ifTruthy(context.tabIndex)}"	?disabled="${ifTruthy(context.ctr.disabled)}"	aria-disabled="${ifTruthy(context.ariaDisabled)}">	${ifTruthy(context.ctr._nodeText)}</a>`; };
const renderMe = block0;
LinkLitRenderer.render = renderMe;
export default LinkLitRenderer;