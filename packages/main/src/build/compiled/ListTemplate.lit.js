
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<div	class="${ifDefined(classMap(context.classes.main))}"	@focusin="${ifDefined(context.onfocusin)}"><!-- header -->	${ context.header.length ? block1(context) : undefined }${ context.shouldRenderH1 ? block2(context) : undefined }<div id="${ifDefined(context._id)}-before" tabindex="0" class="sapMListDummyArea"></div><ul id="${ifDefined(context._id)}-listUl" class="${ifDefined(classMap(context.classes.ul))}"><slot></slot>		${ context.showNoDataText ? block3(context) : undefined }</ul>	${ context.footerText ? block4(context) : undefined }<div id="${ifDefined(context._id)}-after" tabindex="0" class="sapMListDummyArea"></div></div>`; };
const block1 = (context) => { return html`<slot name="header" />	`; };
const block2 = (context) => { return html`<header id="${ifDefined(context._id)}-header" class="sapMListHdr sapMListHdrText">			${ifDefined(context.headerText)}</header>	`; };
const block3 = (context) => { return html`<li id="${ifDefined(context._id)}-nodata" class="${ifDefined(classMap(context.classes.noData))}" tabindex="${ifDefined(context.noDataTabIndex)}"><div id="${ifDefined(context._id)}-nodata-text" class="sapMListNoDataText">					${ifDefined(context.noDataText)}</div></li>		`; };
const block4 = (context) => { return html`<footer id="${ifDefined(context._id)}-footer" class="sapMListFtr">			${ifDefined(context.footerText)}</footer>	`; };

export default block0;