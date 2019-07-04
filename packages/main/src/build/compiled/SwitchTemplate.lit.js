
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<div	class="${ifDefined(classMap(context.classes.main))}"	role="checkbox"	aria-checked="${ifDefined(context.checked)}"	tabindex="${ifDefined(context.tabIndex)}"	dir="${ifDefined(context.rtl)}"><div class="ui5-switch-inner"><div class="ui5-switch-track"><div class="ui5-switch-slider"><span class="ui5-switch-text ui5-switch-text--on">${ifDefined(context._textOn)}</span><span class="ui5-switch-text ui5-switch-text--off">${ifDefined(context._textOff)}</span><span class="ui5-switch-handle"></span></div></div></div><input type='checkbox' ?checked="${ifDefined(context.checked)}" class="ui5-switch-input" data-sap-no-tab-ref/></div>`; };

export default block0;