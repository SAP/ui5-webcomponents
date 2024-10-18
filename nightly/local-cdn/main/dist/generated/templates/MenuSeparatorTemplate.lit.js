/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return suffix ? html `<${scopeTag("ui5-li-custom", tags, suffix)} class="${classMap(this.classes.main)}" role="separator" disabled></${scopeTag("ui5-li-custom", tags, suffix)}>` : html `<ui5-li-custom class="${classMap(this.classes.main)}" role="separator" disabled></ui5-li-custom>`; }
export default block0;
//# sourceMappingURL=MenuSeparatorTemplate.lit.js.map