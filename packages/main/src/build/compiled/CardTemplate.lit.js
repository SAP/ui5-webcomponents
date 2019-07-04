
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<div	class="${ifDefined(classMap(context.classes.main))}"	dir="${ifDefined(context.rtl)}"><header class="${ifDefined(classMap(context.classes.header))}"		@click="${ifDefined(context._headerClick)}"		@keydown="${ifDefined(context._headerKeydown)}"		@keyup="${ifDefined(context._headerKeyup)}"		tabindex="${ifDefined(context.tabindex)}"		role="${ifDefined(context.role)}">		${ context.image ? block1(context) : undefined }${ context.icon ? block2(context) : undefined }<div class="sapFCardHeaderText">			${ context.heading ? block3(context) : undefined }${ context.subtitle ? block4(context) : undefined }</div><span part="status" class="sapFCardStatus">${ifDefined(context.status)}</span></header><section class="sapFCardContent"><slot></slot></section></div>`; };
const block1 = (context) => { return html`<img src="${ifDefined(context.avatar)}" aria-label="Avatar" class="sapFCardAvatar sapFCardHeaderImg">		`; };
const block2 = (context) => { return html`<span role="img" aria-label="Avatar" class="sapFCardAvatar"><ui5-icon class="sapFCardHeaderIcon" src="${ifDefined(context.avatar)}"></ui5-icon></span>		`; };
const block3 = (context) => { return html`<div class="sapFCardTitle">${ifDefined(context.heading)}</div>			`; };
const block4 = (context) => { return html`<div class="sapFCardSubtitle ">${ifDefined(context.subtitle)}</div>			`; };

export default block0;