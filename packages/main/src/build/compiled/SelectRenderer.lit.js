
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const SelectLitRenderer = {};
const block0 = (context) => { return html`<div 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"	class="${ifTruthy(context.classes.main)}"	style="${ifTruthy(context.styles.main)}"	tabindex="${ifTruthy(context.tabIndex)}"><div		class="sapWCSelectLabel"		@click="${ifTruthy(context.ctr._fnClickSelectBox)}"><ui5-label>${ifTruthy(context.ctr._text)}</ui5-label></div>	${ context.ctr.items ? block1(context) : undefined }<ui5-icon		src="sap-icon://slim-arrow-down"		class="sapWCSelectDropDownIcon"		@press="${ifTruthy(context.ctr._fnClickSelectBox)}"	></ui5-icon></div>`; };
const block1 = (context) => { return html`<ui5-popover			placement-type="Bottom"			hide-header="true"			hide-arrow="true"			horizontal-align="Stretch"><ui5-list separators="None">					${ repeat(context.ctr.items, undefined, (item, index) => block2(item, index, context)) }</ui5-list></ui5-popover>	`; };
const block2 = (item, index, context) => { return html`<slot name="${ifTruthy(item._slot)}"></slot>					`; };
const renderMe = block0;
SelectLitRenderer.render = renderMe;
export default SelectLitRenderer;