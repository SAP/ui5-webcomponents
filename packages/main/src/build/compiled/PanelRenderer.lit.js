
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const PanelLitRenderer = {};
const block0 = (context) => { return html`<div 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"		data-sap-ui-fastnavgroup="true"		class="${ifTruthy(context.classes.main)}"		style="${ifTruthy(context.styles.main)}"		role="${ifTruthy(context.accRole)}"><!-- header: either header or h1 with header text -->	${ context.ctr.fixed ? block1(context) : block4(context) }<!-- content area --><div class="${ifTruthy(context.classes.content)}" tabindex="-1" style="${ifTruthy(context.styles.content)}">		${ repeat(context.ctr.content, undefined, (item, index) => block7(item, index, context)) }</div></div>`; };
const block1 = (context) => { return html`${ context.ctr.header ? block2(context) : undefined }${ context.shouldRenderH1 ? block3(context) : undefined }`; };
const block2 = (context) => { return html`<div class="sapMPanelHdrToolbar"><slot name="${ifTruthy(context.ctr.header._slot)}"></slot></div>	`; };
const block3 = (context) => { return html`<h1 id="${ifTruthy(context.ctr._id)}-header" class="sapMPanelHdr">			${ifTruthy(context.ctr.headerText)}</h1>	`; };
const block4 = (context) => { return html`<header @click="${ifTruthy(context.ctr._header.press)}" class="${ifTruthy(context.classes.header)}" tabindex="${ifTruthy(context.headerTabIndex)}"><ui5-icon				class="${ifTruthy(context.classes.icon)}"				src="${ifTruthy(context.ctr._icon.src)}"				title="${ifTruthy(context.ctr._icon.title)}"				tabindex="${ifTruthy(context.iconTabIndex)}"				aria-expanded="${ifTruthy(context.expanded)}"				aria-labelledby="${ifTruthy(context.ariaLabelledBy)}"				@press="${ifTruthy(context.ctr._icon.press)}"			></ui5-icon>			${ context.ctr.header ? block5(context) : undefined }${ context.shouldRenderH1 ? block6(context) : undefined }</header>	`; };
const block5 = (context) => { return html`<div class="sapMPanelHdrToolbar"><slot name="${ifTruthy(context.ctr.header._slot)}"></slot></div>	`; };
const block6 = (context) => { return html`<h1 id="${ifTruthy(context.ctr._id)}-header" class="sapMPanelHdr">			${ifTruthy(context.ctr.headerText)}</h1>	`; };
const block7 = (item, index, context) => { return html`<slot name="${ifTruthy(item._slot)}"></slot>		`; };
const renderMe = block0;
PanelLitRenderer.render = renderMe;
export default PanelLitRenderer;