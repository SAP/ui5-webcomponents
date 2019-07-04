
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<div	class="${ifDefined(classMap(context.classes.main))}"	style="${ifDefined(styleMap(context.styles.main))}"	?aria-invalid="${ifDefined(context.ariaInvalid)}"	@focusin="${ifDefined(context.onfocusin)}"	@focusout="${ifDefined(context.onfocusout)}">	${ context.growing ? block1(context) : undefined }<div class="${ifDefined(classMap(context.classes.focusDiv))}" style="${ifDefined(styleMap(context.styles.inner))}"><textarea			id="${ifDefined(context._id)}-inner"			class="${ifDefined(classMap(context.classes.inner))}"			placeholder="${ifDefined(context.placeholder)}"			?disabled="${ifDefined(context.disabled)}"			?readonly="${ifDefined(context.readonly)}"			maxlength="${ifDefined(context._exceededTextProps.calcedMaxLength)}"			.value="${ifDefined(context.value)}"			@change="${ifDefined(context._listeners.change)}"			data-sap-focus-ref></textarea></div>	${ context.showExceededText ? block4(context) : undefined }<slot name="formSupport"></slot></div>`; };
const block1 = (context) => { return html`<div id="${ifDefined(context._id)}-mirror" style="${ifDefined(styleMap(context.styles.mirror))}" class="${ifDefined(classMap(context.classes.mirror))}" aria-hidden="true">			${ repeat(context._mirrorText, undefined, (item, index) => block2(item, index, context)) }</div>	`; };
const block2 = (item, index, context) => { return html`${ifDefined(item.text)}${ !item.last ? block3(item, index, context) : undefined }`; };
const block3 = (item, index, context) => { return html`<br/>				`; };
const block4 = (context) => { return html`<span class="${ifDefined(classMap(context.classes.exceededText))}">${ifDefined(context._exceededTextProps.exceededText)}</span>	`; };

export default block0;