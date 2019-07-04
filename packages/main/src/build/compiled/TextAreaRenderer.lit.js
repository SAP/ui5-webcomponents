
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const TextAreaLitRenderer = {};
const block0 = (context) => { return html`<div 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"	class="${ifTruthy(context.classes.main)}"	style="${ifTruthy(context.styles.main)}"	aria-invalid="${ifTruthy(context.ariaInvalid)}"	aria-labelledBy="${ifTruthy(context.ariaLabelledBy)}">	${ context.ctr.growing ? block1(context) : undefined }<div class="${ifTruthy(context.classes.focusDiv)}" style="${ifTruthy(context.styles.inner)}"><textarea			id="${ifTruthy(context.ctr._id)}-inner"			class="${ifTruthy(context.classes.inner)}"			placeholder="${ifTruthy(context.ctr.placeholder)}"			?disabled="${ifTruthy(context.ctr.disabled)}"			?readonly="${ifTruthy(context.ctr.readonly)}"			maxlength="${ifTruthy(context.maxLength)}"			.value="${ifTruthy(context.ctr.value)}"			@change="${ifTruthy(context.ctr._listeners.change)}"			data-sap-focus-ref></textarea></div>	${ context.ctr.showExceededText ? block4(context) : undefined }<slot name="formSupport"></slot></div>`; };
const block1 = (context) => { return html`<div id="${ifTruthy(context.ctr._id)}-mirror" style="${ifTruthy(context.styles.mirror)}" class="${ifTruthy(context.classes.mirror)}" aria-hidden="true">			${ repeat(context.textTokens, undefined, (item, index) => block2(item, index, context)) }</div>	`; };
const block2 = (item, index, context) => { return html`${ifTruthy(item.text)}${ !item.last ? block3(item, index, context) : undefined }`; };
const block3 = (item, index, context) => { return html`<br/>				`; };
const block4 = (context) => { return html`<span class="${ifTruthy(context.classes.exceededText)}">${ifTruthy(context.exceededText)}</span>	`; };
const renderMe = block0;
TextAreaLitRenderer.render = renderMe;
export default TextAreaLitRenderer;