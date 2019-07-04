
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<span class="${ifDefined(classMap(context.classes.frame))}"><span id="${ifDefined(context._id)}-firstfe" tabindex="0"></span><div style="${ifDefined(context.zindex)}" class="${ifDefined(classMap(context.classes.dialogParent))}"><div tabindex="-1" aria-labelledby="${ifDefined(context.headerId)}" role="dialog" class="${ifDefined(classMap(context.classes.main))}">			${ !context.noHeader ? block1(context) : undefined }<section class="ui5-dialog-wrapper-section"><div class="ui5-popup-wrapper-content"><div class="ui5-popup-wrapper-scroll"><slot></slot></div></div></section>			${ context.footer.length ? block4(context) : undefined }</div></div><span id="${ifDefined(context._id)}-lastfe" tabindex="0"></span><div tabindex="0" id="${ifDefined(context._id)}-blocklayer" style="${ifDefined(context.blockLayer)}" class="${ifDefined(classMap(context.classes.blockLayer))}"></div></span>`; };
const block1 = (context) => { return html`<header>			${ context.header.length ? block2(context) : block3(context) }</header>	`; };
const block2 = (context) => { return html`<div role="heading" class="ui5-popup-wrapper-header"><slot name="header"></slot></div>			`; };
const block3 = (context) => { return html`<h2 role="heading" class="ui5-popup-wrapper-header ui5-popup-wrapper-headerText">${ifDefined(context.headerText)}</h2>			`; };
const block4 = (context) => { return html`<footer><div class="ui5-popup-wrapper-footer"><slot name="footer"></slot></div></footer>	`; };

export default block0;