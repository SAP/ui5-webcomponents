
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const IconLitRenderer = {};
const block0 = (context) => { return html`<span 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"	class="${ifTruthy(context.classes.main)}"	style="${ifTruthy(context.styles.main)}"	tabindex="-1"	data-sap-ui-icon-content="${ifTruthy(context.iconContent)}"	aria-expanded="${ifTruthy(context.ariaExpanded)}"	aria-labelledby="${ifTruthy(context.ariaLabelledBy)}"	dir="${ifTruthy(context.dir)}"></span>`; };
const renderMe = block0;
IconLitRenderer.render = renderMe;
export default IconLitRenderer;