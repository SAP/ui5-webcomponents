
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const SwitchLitRenderer = {};
const block0 = (context) => { return html`<div 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"	class="${ifTruthy(context.classes.main)}"	role="checkbox"	aria-checked="${ifTruthy(context.ctr.checked)}"	tabindex="${ifTruthy(context.tabIndex)}"><div class="ui5-switch-inner"><div class="ui5-switch-track"><div class="ui5-switch-slider"><span class="ui5-switch-text ui5-switch-text--on">${ifTruthy(context.textOn)}</span><span class="ui5-switch-text ui5-switch-text--off">${ifTruthy(context.textOff)}</span><span class="ui5-switch-handle"></span></div></div></div><input type='checkbox' ?checked="${ifTruthy(context.ctr.checked)}" class="ui5-switch-input" data-sap-no-tab-ref/></div>`; };
const renderMe = block0;
SwitchLitRenderer.render = renderMe;
export default SwitchLitRenderer;