
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<div	class="${ifDefined(classMap(context.classes.main))}"	role="checkbox"	aria-checked="${ifDefined(context.checked)}"	aria-readonly="${ifDefined(context.ariaReadonly)}"	aria-disabled="${ifDefined(context.ariaDisabled)}"	tabindex="${ifDefined(context.tabIndex)}"	dir="${ifDefined(context.rtl)}"><div id="${ifDefined(context._id)}-CbBg" class="${ifDefined(classMap(context.classes.inner))}"><input id="${ifDefined(context._id)}-CB" type='checkbox' ?checked="${ifDefined(context.checked)}" ?readonly="${ifDefined(context.readonly)}" ?disabled="${ifDefined(context.disabled)}" data-sap-no-tab-ref/></div>		${ context._label.text ? block1(context) : undefined }<slot name="formSupport"></slot></div>`; };
const block1 = (context) => { return html`<ui5-label class="ui5-checkbox-label" ?wrap="${ifDefined(context._label.wrap)}">${ifDefined(context._label.text)}</ui5-label>		`; };

export default block0;