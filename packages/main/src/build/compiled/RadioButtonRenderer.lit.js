
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const RadioButtonLitRenderer = {};
const block0 = (context) => { return html`<div 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"	class="${ifTruthy(context.classes.main)}"	style="${ifTruthy(context.styles.main)}"	role="radio"	aria-checked="${ifTruthy(context.ctr.selected)}"	aria-readonly="${ifTruthy(context.readOnly)}"	tabindex="${ifTruthy(context.tabIndex)}"><div class='${ifTruthy(context.classes.inner)}'><svg class="sapMRbSvg" focusable="false"><circle class="sapMRbSvgOuter" cx="${ifTruthy(context.circle.x)}" cy="${ifTruthy(context.circle.y)}" r="${ifTruthy(context.circle.rOuter)}" stroke-width="2" fill="none" /><circle class="sapMRbSvgInner" cx="${ifTruthy(context.circle.x)}" cy="${ifTruthy(context.circle.y)}" r="${ifTruthy(context.circle.rInner)}" stroke-width="10" /></svg><input type='radio' ?checked="${ifTruthy(context.ctr.selected)}" ?readonly="${ifTruthy(context.ctr.readOnly)}" ?disabled="${ifTruthy(context.ctr.readOnly)}" name="${ifTruthy(context.ctr.name)}" data-sap-no-tab-ref/></div>	${ context.ctr._label.text ? block1(context) : undefined }</div>`; };
const block1 = (context) => { return html`<ui5-label class="labelInRadioButton">${ifTruthy(context.ctr._label.text)}</ui5-label>	`; };
const renderMe = block0;
RadioButtonLitRenderer.render = renderMe;
export default RadioButtonLitRenderer;