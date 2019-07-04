
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<a	class="${ifDefined(classMap(context.classes.main))}"	role="link"	href="${ifDefined(context.parsedRef)}"	target="${ifDefined(context.target)}"	rel="${ifDefined(context._rel)}"	tabindex="${ifDefined(context.tabIndex)}"	?disabled="${ifDefined(context.disabled)}"	aria-disabled="${ifDefined(context.ariaDisabled)}"><slot></slot></a>`; };

export default block0;