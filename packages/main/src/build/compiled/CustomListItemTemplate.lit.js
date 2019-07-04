
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<li	tabindex="${ifDefined(context._tabIndex)}"	class="${ifDefined(classMap(context.classes.main))}"	dir="${ifDefined(context.rtl)}"	@focusin="${ifDefined(context.onfocusin)}"	@focusout="${ifDefined(context.onfocusout)}">		${ context.placeSelectionElementBefore ? block1(context) : undefined }<div id="${ifDefined(context._id)}-content" class="${ifDefined(classMap(context.classes.inner))}">			<slot></slot></div>		${ context.placeSelectionElementAfter ? block5(context) : undefined }</li>`; };
const block1 = (context) => { return html`${ context.modeSingleSelect ? block2(context) : undefined }${ context.modeMultiSelect ? block3(context) : undefined }${ context.modeDelete ? block4(context) : undefined }`; };
const block2 = (context) => { return html`<ui5-radiobutton				id="${ifDefined(context._id)}-singleSelectionElement"				class="singleSelectionRadioButton"				?selected="${ifDefined(context.selected)}"></ui5-radiobutton>	`; };
const block3 = (context) => { return html`<ui5-checkbox				id="${ifDefined(context._id)}-multiSelectionElement"				class="multiSelectionCheckBox"				?checked="${ifDefined(context.selected)}"></ui5-checkbox>	`; };
const block4 = (context) => { return html`<div class="sapMDeleteListItemButton"><ui5-button				id="${ifDefined(context._id)}-deleteSelectionElement"				design="Transparent"				icon="sap-icon://decline"				@ui5-press="${ifDefined(context._onDelete)}"			></ui5-button></div>	`; };
const block5 = (context) => { return html`${ context.modeSingleSelect ? block6(context) : undefined }${ context.modeMultiSelect ? block7(context) : undefined }${ context.modeDelete ? block8(context) : undefined }`; };
const block6 = (context) => { return html`<ui5-radiobutton				id="${ifDefined(context._id)}-singleSelectionElement"				class="singleSelectionRadioButton"				?selected="${ifDefined(context.selected)}"></ui5-radiobutton>	`; };
const block7 = (context) => { return html`<ui5-checkbox				id="${ifDefined(context._id)}-multiSelectionElement"				class="multiSelectionCheckBox"				?checked="${ifDefined(context.selected)}"></ui5-checkbox>	`; };
const block8 = (context) => { return html`<div class="sapMDeleteListItemButton"><ui5-button				id="${ifDefined(context._id)}-deleteSelectionElement"				design="Transparent"				icon="sap-icon://decline"				@ui5-press="${ifDefined(context._onDelete)}"			></ui5-button></div>	`; };

export default block0;