
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const CheckBoxLitRenderer = {};
const block0 = (context) => { return html`<div 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"	class="${ifTruthy(context.classes.main)}"	style="${ifTruthy(context.styles.main)}"	role="checkbox"	aria-checked="${ifTruthy(context.ctr.checked)}"	aria-readonly="${ifTruthy(context.ariaReadonly)}"	tabindex="${ifTruthy(context.tabIndex)}"><div id="${ifTruthy(context.ctr._id)}-CbBg" class="${ifTruthy(context.classes.inner)}"><input id="${ifTruthy(context.ctr._id)}-CB" type='checkbox' ?checked="${ifTruthy(context.ctr.checked)}" ?readonly="${ifTruthy(context.ctr.readOnly)}" data-sap-no-tab-ref/></div>		${ context.ctr._label.text ? block1(context) : undefined }<slot name="formSupport"></slot></div>`; };
const block1 = (context) => { return html`<ui5-label				class="ui5-checkbox-label"				?wrap="${ifTruthy(context.ctr._label.wrap)}"		>${ifTruthy(context.ctr._label.text)}</ui5-label>		`; };
const renderMe = block0;
CheckBoxLitRenderer.render = renderMe;
export default CheckBoxLitRenderer;