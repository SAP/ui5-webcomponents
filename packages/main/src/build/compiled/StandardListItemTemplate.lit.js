
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<li	tabindex="${ifDefined(context._tabIndex)}"	class="${ifDefined(classMap(context.classes.main))}"	dir="${ifDefined(context.rtl)}"	@focusin="${ifDefined(context.onfocusin)}"	@focusout="${ifDefined(context.onfocusout)}">		${ context.placeSelectionElementBefore ? block1(context) : undefined }<div id="${ifDefined(context._id)}-content" class="${ifDefined(classMap(context.classes.inner))}">			${ context.displayImage ? block5(context) : undefined }${ context.displayIconBegin ? block6(context) : undefined }<div class="sapMSLITextWrapper">		${ context.textContent.length ? block7(context) : undefined }${ context.description ? block8(context) : undefined }</div>	${ context.info ? block9(context) : undefined }</div>		${ context.displayIconEnd ? block10(context) : undefined }${ context.placeSelectionElementAfter ? block11(context) : undefined }</li>`; };
const block1 = (context) => { return html`${ context.modeSingleSelect ? block2(context) : undefined }${ context.modeMultiSelect ? block3(context) : undefined }${ context.modeDelete ? block4(context) : undefined }`; };
const block2 = (context) => { return html`<ui5-radiobutton				id="${ifDefined(context._id)}-singleSelectionElement"				class="singleSelectionRadioButton"				?selected="${ifDefined(context.selected)}"></ui5-radiobutton>	`; };
const block3 = (context) => { return html`<ui5-checkbox				id="${ifDefined(context._id)}-multiSelectionElement"				class="multiSelectionCheckBox"				?checked="${ifDefined(context.selected)}"></ui5-checkbox>	`; };
const block4 = (context) => { return html`<div class="sapMDeleteListItemButton"><ui5-button				id="${ifDefined(context._id)}-deleteSelectionElement"				design="Transparent"				icon="sap-icon://decline"				@ui5-press="${ifDefined(context._onDelete)}"			></ui5-button></div>	`; };
const block5 = (context) => { return html`<img src="${ifDefined(context.image)}" class="sapMSLIImg">	`; };
const block6 = (context) => { return html`<ui5-icon src="${ifDefined(context.icon)}" class="sapMLIBIcon"></ui5-icon>	`; };
const block7 = (context) => { return html`<span class="sapMSLITitle"><slot></slot></span>		`; };
const block8 = (context) => { return html`<span class="sapMSLIDescription">${ifDefined(context.description)}</span>		`; };
const block9 = (context) => { return html`<span class="${ifDefined(classMap(context.classes.info))}">${ifDefined(context.info)}</span>	`; };
const block10 = (context) => { return html`<ui5-icon src="${ifDefined(context.icon)}" class="sapMLIBIcon"></ui5-icon>	`; };
const block11 = (context) => { return html`${ context.modeSingleSelect ? block12(context) : undefined }${ context.modeMultiSelect ? block13(context) : undefined }${ context.modeDelete ? block14(context) : undefined }`; };
const block12 = (context) => { return html`<ui5-radiobutton				id="${ifDefined(context._id)}-singleSelectionElement"				class="singleSelectionRadioButton"				?selected="${ifDefined(context.selected)}"></ui5-radiobutton>	`; };
const block13 = (context) => { return html`<ui5-checkbox				id="${ifDefined(context._id)}-multiSelectionElement"				class="multiSelectionCheckBox"				?checked="${ifDefined(context.selected)}"></ui5-checkbox>	`; };
const block14 = (context) => { return html`<div class="sapMDeleteListItemButton"><ui5-button				id="${ifDefined(context._id)}-deleteSelectionElement"				design="Transparent"				icon="sap-icon://decline"				@ui5-press="${ifDefined(context._onDelete)}"			></ui5-button></div>	`; };

export default block0;