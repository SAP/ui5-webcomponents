
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<div	class="${ifDefined(classMap(context.classes.main))}"	style="width: 100%;"	?aria-invalid="${ifDefined(context.ariaInvalid)}"	@focusin="${ifDefined(context.onfocusin)}"	@focusout="${ifDefined(context.onfocusout)}"><div id="${ifDefined(context._id)}-wrapper"	class="${ifDefined(classMap(context.classes.wrapper))}">	${ context._beginContent.length ? block1(context) : undefined }<input id="${ifDefined(context._id)}-inner"			class="sapWCInputBaseInner"			type="${ifDefined(context.inputType)}"			?disabled="${ifDefined(context.disabled)}"			?readonly="${ifDefined(context._readonly)}"			.value="${ifDefined(context.value)}"			placeholder="${ifDefined(context.inputPlaceholder)}"			@input="${ifDefined(context._handleInput)}"			@change="${ifDefined(context._handleChange)}"			data-sap-no-tab-ref			data-sap-focus-ref	/>		${ context.icon.length ? block2(context) : undefined }</div>	${ context.showSuggestions ? block3(context) : undefined }<slot name="formSupport"></slot></div>`; };
const block1 = (context) => { return html`<slot name="_beginContent"></slot>	`; };
const block2 = (context) => { return html`<slot name="icon"></slot>		`; };
const block3 = (context) => { return html`<ui5-popover				placement-type="Bottom"				no-header				no-arrow				horizontal-align="Stretch"				initial-focus="${ifDefined(context._id)}-inner"><ui5-list separators="Inner"><slot></slot></ui5-list></ui5-popover>	`; };

export default block0;