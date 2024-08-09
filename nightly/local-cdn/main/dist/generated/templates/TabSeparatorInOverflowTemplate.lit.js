/* eslint no-unused-vars: 0 */
import { html, classMap, styleMap, ifDefined, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return suffix ? html `<${scopeTag("ui5-li-custom", tags, suffix)} id="${ifDefined(this._id)}" role="separator" class="${classMap(this.classes.root)}" disabled style="${styleMap(this._forcedStyleInOverflow)}" .realTabReference="${ifDefined(this)}"></${scopeTag("ui5-li-custom", tags, suffix)}>` : html `<ui5-li-custom id="${ifDefined(this._id)}" role="separator" class="${classMap(this.classes.root)}" disabled style="${styleMap(this._forcedStyleInOverflow)}" .realTabReference="${ifDefined(this)}"></ui5-li-custom>`; }
export default block0;
//# sourceMappingURL=TabSeparatorInOverflowTemplate.lit.js.map