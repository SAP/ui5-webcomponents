
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const InputLitRenderer = {};
const block0 = (context) => { return html`<div 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"	class="${ifTruthy(context.classes.main)}"	style="${ifTruthy(context.styles.main)}"	aria-invalid="${ifTruthy(context.ariaInvalid)}"	aria-labelledBy="${ifTruthy(context.ariaLabelledBy)}"><div id="${ifTruthy(context.ctr._id)}-wrapper"	class="${ifTruthy(context.classes.wrapper)}"><input id="${ifTruthy(context.ctr._id)}-inner"			class="sapWCInputBaseInner"			type="${ifTruthy(context.type)}"			?disabled="${ifTruthy(context.ctr.disabled)}"			?readonly="${ifTruthy(context._readonly)}"			.value="${ifTruthy(context.ctr.value)}"			placeholder="${ifTruthy(context.ctr.placeholder)}"			@input="${ifTruthy(context.ctr._input.onInput)}"			@change="${ifTruthy(context.ctr._input.change)}"			data-sap-no-tab-ref			data-sap-focus-ref	/>		${ context.ctr.icon ? block1(context) : undefined }</div>	${ context.ctr.showSuggestions ? block2(context) : undefined }<slot name="formSupport"></slot></div>`; };
const block1 = (context) => { return html`<slot name="${ifTruthy(context.ctr.icon._slot)}"></slot>		`; };
const block2 = (context) => { return html`<ui5-popover				placement-type="Bottom"				hide-header="true"				hide-arrow="true"				horizontal-align="Stretch"				initial-focus="${ifTruthy(context.ctr._id)}-inner"><ui5-list separators="Inner">						${ repeat(context.ctr.suggestionItems, undefined, (item, index) => block3(item, index, context)) }</ui5-list></ui5-popover>	`; };
const block3 = (item, index, context) => { return html`<slot name="${ifTruthy(item._slot)}"></slot>						`; };
const renderMe = block0;
InputLitRenderer.render = renderMe;
export default InputLitRenderer;