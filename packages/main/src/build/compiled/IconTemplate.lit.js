
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<span	class="${ifDefined(classMap(context.classes.main))}"	style="${ifDefined(context.fontStyle)}"	tabindex="-1"	data-sap-ui-icon-content="${ifDefined(context.iconContent)}"	dir="${ifDefined(context.dir)}"></span>`; };

export default block0;