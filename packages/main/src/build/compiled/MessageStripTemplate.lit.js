
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<div class="${ifDefined(classMap(context.classes.main))}"
	role="alert"
	aria-live="assertive"
	aria-labelledby="${ifDefined(context._id)}">

	${ !context.noIcon ? block1(context) : undefined }<span class="ui5-hidden-text">${ifDefined(context.hiddenText)}</span><span class="${ifDefined(classMap(context.classes.label))}"><slot></slot></span>

	${ !context.noCloseButton ? block2(context) : undefined }</div>
`; };
const block1 = (context) => { return html`<ui5-icon class="ui5-messagestrip-icon" src="${ifDefined(context.messageStripIcon)}"></ui5-icon>
	`; };
const block2 = (context) => { return html`<ui5-icon
			class="${ifDefined(classMap(context.classes.closeIcon))}"
			src="sap-icon://decline"
			tabindex="0"
			role="button"
			title="${ifDefined(context._closeButtonText)}"
			@ui5-press="${ifDefined(context._handleCloseIconPress)}"></ui5-icon>
	`; };

export default block0;