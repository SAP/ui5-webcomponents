
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const CardLitRenderer = {};
const block0 = (context) => { return html`<div 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}" class="${ifTruthy(context.classes.main)}"><header class="${ifTruthy(context.classes.header)}"		@click="${ifTruthy(context.ctr._headerClick)}"		@keydown="${ifTruthy(context.ctr._headerKeydown)}"		@keyup="${ifTruthy(context.ctr._headerKeyup)}"		tabindex="0">		${ context.image ? block1(context) : undefined }${ context.icon ? block2(context) : undefined }<div class="sapFCardHeaderText">			${ context.ctr.heading ? block3(context) : undefined }${ context.ctr.subtitle ? block4(context) : undefined }</div><span part="status" class="sapFCardStatus">${ifTruthy(context.ctr.status)}</span></header><section class="sapFCardContent">		${ repeat(context.ctr.content, undefined, (item, index) => block5(item, index, context)) }</section></div>`; };
const block1 = (context) => { return html`<img src="${ifTruthy(context.ctr.avatar)}" aria-label="Avatar" class="sapFCardAvatar sapFCardHeaderImg">		`; };
const block2 = (context) => { return html`<span role="img" aria-label="Avatar" class="sapFCardAvatar"><ui5-icon class="sapFCardHeaderIcon" src="${ifTruthy(context.ctr.avatar)}"></ui5-icon></span>		`; };
const block3 = (context) => { return html`<div class="sapFCardTitle">${ifTruthy(context.ctr.heading)}</div>			`; };
const block4 = (context) => { return html`<div class="sapFCardSubtitle ">${ifTruthy(context.ctr.subtitle)}</div>			`; };
const block5 = (item, index, context) => { return html`<slot name="${ifTruthy(item._slot)}"></slot>		`; };
const renderMe = block0;
CardLitRenderer.render = renderMe;
export default CardLitRenderer;