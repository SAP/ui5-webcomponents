
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const GroupHeaderListItemLitRenderer = {};
const block0 = (context) => { return html`<li 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"	tabindex="${ifTruthy(context.ctr._tabIndex)}"	style="${ifTruthy(context.styles.main)}"	class="${ifTruthy(context.classes.main)}"><div id="${ifTruthy(context.ctr._id)}-content" class="${ifTruthy(context.classes.inner)}"><span class="${ifTruthy(context.classes.span)}">${ifTruthy(context.ctr._nodeText)}</span></div></li>`; };
const renderMe = block0;
GroupHeaderListItemLitRenderer.render = renderMe;
export default GroupHeaderListItemLitRenderer;