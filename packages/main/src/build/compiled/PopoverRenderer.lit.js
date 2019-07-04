
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const PopoverLitRenderer = {};
const block0 = (context) => { return html`<span 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}" class="${ifTruthy(context.classes.frame)}"><span id="${ifTruthy(context.ctr._id)}-firstfe" tabindex="0" @focusin=${ifTruthy(context.focusHelper.forwardToLast)}></span><div style="${ifTruthy(context.styles.main)}" role="dialog" aria-labelledby="${ifTruthy(context.headerId)}" tabindex="-1" class="${ifTruthy(context.classes.main)}">			${ !context.ctr.hideHeader ? block1(context) : undefined }<div id="${ifTruthy(context.ctr._id)}-content" role="application" style="${ifTruthy(context.styles.content)}" class="sapMPopupContent"><div class="sapMPopupScroll">					${ repeat(context.ctr.content, undefined, (item, index) => block4(item, index, context)) }</div></div>			${ context.ctr.footer ? block5(context) : undefined }<span id="${ifTruthy(context.ctr._id)}-arrow" style="${ifTruthy(context.styles.arrow)}" class="${ifTruthy(context.classes.arrow)}"></span></div><span id="${ifTruthy(context.ctr._id)}-lastfe" tabindex="0" @focusin=${ifTruthy(context.focusHelper.forwardToFirst)}></span><div tabindex="0" id="${ifTruthy(context.ctr._id)}-blocklayer" style="${ifTruthy(context.styles.blockLayer)}" class="${ifTruthy(context.classes.blockLayer)}"></div></span>`; };
const block1 = (context) => { return html`<header>			${ context.ctr.header ? block2(context) : block3(context) }</header>	`; };
const block2 = (context) => { return html`<div role="toolbar" class="sapMPopupHeader"><slot name="${ifTruthy(context.ctr.header._slot)}"></slot></div>			`; };
const block3 = (context) => { return html`<h2 role="toolbar" class="sapMPopupHeader sapMPopupHeaderText">${ifTruthy(context.ctr.headerText)}</h2>			`; };
const block4 = (item, index, context) => { return html`<slot name="${ifTruthy(item._slot)}"></slot>					`; };
const block5 = (context) => { return html`<footer><div class="sapMPopupFooter"><slot name="${ifTruthy(context.ctr.footer._slot)}"></slot></div></footer>	`; };
const renderMe = block0;
PopoverLitRenderer.render = renderMe;
export default PopoverLitRenderer;