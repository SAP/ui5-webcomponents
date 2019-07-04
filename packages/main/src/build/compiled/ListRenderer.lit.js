
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const ListLitRenderer = {};
const block0 = (context) => { return html`<div 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"	class="${ifTruthy(context.classes.main)}"	style="${ifTruthy(context.styles.main)}"><!-- header -->	${ context.ctr.header ? block1(context) : undefined }${ context.shouldRenderH1 ? block2(context) : undefined }<div id="${ifTruthy(context.ctr._id)}-before" tabindex="0" class="sapMListDummyArea"></div><ul id="${ifTruthy(context.ctr._id)}-listUl" class="${ifTruthy(context.classes.ul)}">		${ repeat(context.ctr.items, undefined, (item, index) => block3(item, index, context)) }${ context.showNoDataText ? block4(context) : undefined }</ul>	${ context.ctr.footerText ? block5(context) : undefined }<div id="${ifTruthy(context.ctr._id)}-after" tabindex="0" class="sapMListDummyArea"></div></div>`; };
const block1 = (context) => { return html`<slot name="${ifTruthy(context.ctr.header._slot)}" />	`; };
const block2 = (context) => { return html`<header id="${ifTruthy(context.ctr._id)}-header" class="sapMListHdr sapMListHdrText">			${ifTruthy(context.ctr.headerText)}</header>	`; };
const block3 = (item, index, context) => { return html`<slot name="${ifTruthy(item._slot)}" />		`; };
const block4 = (context) => { return html`<li id="${ifTruthy(context.ctr._id)}-nodata" class="${ifTruthy(context.classes.noData)}" tabindex="${ifTruthy(context.noDataTabIndex)}"><div id="${ifTruthy(context.ctr._id)}-nodata-text" class="sapMListNoDataText">					${ifTruthy(context.ctr.noDataText)}</div></li>		`; };
const block5 = (context) => { return html`<footer id="${ifTruthy(context.ctr._id)}-footer" class="sapMListFtr">			${ifTruthy(context.ctr.footerText)}</footer>	`; };
const renderMe = block0;
ListLitRenderer.render = renderMe;
export default ListLitRenderer;