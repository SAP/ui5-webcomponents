
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const MessageStripLitRenderer = {};
const block0 = (context) => { return html`<div class="${ifTruthy(context.classes.main)}">
	${ !context.ctr.hideIcon ? block1(context) : undefined }<span class="${ifTruthy(context.classes.label)}">${ifTruthy(context.ctr._nodeText)}</span> 

	${ !context.ctr.hideCloseButton ? block2(context) : undefined }</div>
`; };
const block1 = (context) => { return html`<ui5-icon class="ui5-messagestrip-icon" src="${ifTruthy(context.icon)}"></ui5-icon>
	`; };
const block2 = (context) => { return html`<ui5-icon
			class="${ifTruthy(context.classes.closeIcon)}"
			src="sap-icon://decline"
			tabindex="0"
			@press="${ifTruthy(context.ctr._closeButton.press)}"></ui5-icon>
	`; };
const renderMe = block0;
MessageStripLitRenderer.render = renderMe;
export default MessageStripLitRenderer;