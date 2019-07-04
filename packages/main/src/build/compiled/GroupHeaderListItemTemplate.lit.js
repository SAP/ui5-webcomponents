
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<li	tabindex="${ifDefined(context._tabIndex)}"	class="${ifDefined(classMap(context.classes.main))}"	@focusin="${ifDefined(context.onfocusin)}"	@focusout="${ifDefined(context.onfocusout)}"><div id="${ifDefined(context._id)}-content" class="${ifDefined(classMap(context.classes.inner))}"><span class="${ifDefined(classMap(context.classes.span))}"><slot></slot></span></div></li>`; };

export default block0;