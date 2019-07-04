
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const DialogLitRenderer = {};
const block0 = (context) => { return html`<span 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}" class="${ifTruthy(context.classes.frame)}"><span id="${ifTruthy(context.ctr._id)}-firstfe" tabindex="0"></span><div style="${ifTruthy(context.styles.zindex)}" class="${ifTruthy(context.classes.dialogParent)}"><div tabindex="-1" aria-labelledby="${ifTruthy(context.headerId)}" role="dialog" class="${ifTruthy(context.classes.main)}">			${ !context.ctr.hideHeader ? block1(context) : undefined }<section class="sapMDialogSection"><div style="${ifTruthy(context.styles.content)}" class="sapMPopupContent"><div class="sapMPopupScroll">						${ repeat(context.ctr.content, undefined, (item, index) => block4(item, index, context)) }</div></div></section>			${ context.ctr.footer ? block5(context) : undefined }</div></div><span id="${ifTruthy(context.ctr._id)}-lastfe" tabindex="0"></span><div tabindex="0" id="${ifTruthy(context.ctr._id)}-blocklayer" style="${ifTruthy(context.styles.blockLayer)}" class="${ifTruthy(context.classes.blockLayer)}"></div></span>`; };
const block1 = (context) => { return html`<header>			${ context.ctr.header ? block2(context) : block3(context) }</header>	`; };
const block2 = (context) => { return html`<div role="heading" class="sapMPopupHeader"><slot name="${ifTruthy(context.ctr.header._slot)}"></slot></div>			`; };
const block3 = (context) => { return html`<h2 role="heading" class="sapMPopupHeader sapMPopupHeaderText">${ifTruthy(context.ctr.headerText)}</h2>			`; };
const block4 = (item, index, context) => { return html`<slot name="${ifTruthy(item._slot)}"></slot>						`; };
const block5 = (context) => { return html`<footer><div class="sapMPopupFooter"><slot name="${ifTruthy(context.ctr.footer._slot)}"></slot></div></footer>	`; };
const renderMe = block0;
DialogLitRenderer.render = renderMe;
export default DialogLitRenderer;