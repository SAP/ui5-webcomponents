
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const StandardListItemLitRenderer = {};
const block0 = (context) => { return html`<li 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"	tabindex="${ifTruthy(context.ctr._tabIndex)}"	style="${ifTruthy(context.styles.main)}"	class="${ifTruthy(context.classes.main)}">		${ context.placeSelectionControlBefore ? block1(context) : undefined }<div id="${ifTruthy(context.ctr._id)}-content" class="${ifTruthy(context.classes.inner)}">			${ context.displayImage ? block5(context) : undefined }${ context.displayIconBegin ? block6(context) : undefined }<div class="sapMSLITextWrapper">		${ context.ctr._nodeText ? block7(context) : undefined }${ context.ctr.description ? block8(context) : undefined }</div></div>		${ context.displayIconEnd ? block9(context) : undefined }${ context.placeSelectionControlAfter ? block10(context) : undefined }</li>`; };
const block1 = (context) => { return html`${ context.modeSingleSelect ? block2(context) : undefined }${ context.modeMultiSelect ? block3(context) : undefined }${ context.modeDelete ? block4(context) : undefined }`; };
const block2 = (context) => { return html`<ui5-radiobutton				id="${ifTruthy(context.ctr._id)}-singleSelectionControl"				class="singleSelectionRadioButton"				selected="${ifTruthy(context.ctr.selected)}"></ui5-radiobutton>	`; };
const block3 = (context) => { return html`<ui5-checkbox				id="${ifTruthy(context.ctr._id)}-multiSelectionControl"				class="multiSelectionCheckBox"				checked="${ifTruthy(context.ctr.selected)}"></ui5-checkbox>	`; };
const block4 = (context) => { return html`<div class="sapMDeleteListItemButton"><ui5-button				id="${ifTruthy(context.ctr._id)}-deleteSelectionControl"				type="Transparent"				icon="sap-icon://decline"				@press="${ifTruthy(context.ctr._fnOnDelete)}"			></ui5-button></div>	`; };
const block5 = (context) => { return html`<img src="${ifTruthy(context.ctr.image)}" class="sapMSLIImg">	`; };
const block6 = (context) => { return html`<ui5-icon src="${ifTruthy(context.ctr.icon)}" class="sapMLIBIcon"></ui5-icon>	`; };
const block7 = (context) => { return html`<span class="sapMSLITitle">${ifTruthy(context.ctr._nodeText)}</span>		`; };
const block8 = (context) => { return html`<span class="sapMSLIDescription">${ifTruthy(context.ctr.description)}</span>		`; };
const block9 = (context) => { return html`<ui5-icon src="${ifTruthy(context.ctr.icon)}" class="sapMLIBIcon"></ui5-icon>	`; };
const block10 = (context) => { return html`${ context.modeSingleSelect ? block11(context) : undefined }${ context.modeMultiSelect ? block12(context) : undefined }${ context.modeDelete ? block13(context) : undefined }`; };
const block11 = (context) => { return html`<ui5-radiobutton				id="${ifTruthy(context.ctr._id)}-singleSelectionControl"				class="singleSelectionRadioButton"				selected="${ifTruthy(context.ctr.selected)}"></ui5-radiobutton>	`; };
const block12 = (context) => { return html`<ui5-checkbox				id="${ifTruthy(context.ctr._id)}-multiSelectionControl"				class="multiSelectionCheckBox"				checked="${ifTruthy(context.ctr.selected)}"></ui5-checkbox>	`; };
const block13 = (context) => { return html`<div class="sapMDeleteListItemButton"><ui5-button				id="${ifTruthy(context.ctr._id)}-deleteSelectionControl"				type="Transparent"				icon="sap-icon://decline"				@press="${ifTruthy(context.ctr._fnOnDelete)}"			></ui5-button></div>	`; };
const renderMe = block0;
StandardListItemLitRenderer.render = renderMe;
export default StandardListItemLitRenderer;