
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<button		type="button"		class="${ifDefined(classMap(context.classes.main))}"		?disabled="${ifDefined(context.disabled)}"		data-sap-focus-ref			aria-pressed="${ifDefined(context.pressed)}"		dir="${ifDefined(context.rtl)}"		@focusout=${ifDefined(context._onfocusout)}		@click=${ifDefined(context._onclick)}		@mousedown=${ifDefined(context._onmousedown)}	>		${ context.icon ? block1(context) : undefined }${ context.textContent ? block2(context) : undefined }</button>`; };
const block1 = (context) => { return html`<ui5-icon				class="${ifDefined(classMap(context.classes.icon))}"				src="${ifDefined(context.icon)}"			></ui5-icon>		`; };
const block2 = (context) => { return html`<span id="${ifDefined(context._id)}-content" class="${ifDefined(classMap(context.classes.text))}"><bdi><slot></slot></bdi></span>		`; };

export default block0;