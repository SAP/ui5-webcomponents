/* eslint no-unused-vars: 0 */
import { html, classMap, styleMap, ifDefined } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<div class="${classMap(this.classes.root)}" style="${styleMap(this.styles.root)}" value="${ifDefined(this.value)}" tabindex="${ifDefined(this.forcedTabIndex)}" role="button" aria-label="${ifDefined(this.colorLabel)} - ${ifDefined(this.index)}: ${ifDefined(this.value)}" title="${ifDefined(this.colorLabel)} - ${ifDefined(this.index)}: ${ifDefined(this.value)}" ?disabled="${this._disabled}"></div>`; }
export default block0;
//# sourceMappingURL=ColorPaletteItemTemplate.lit.js.map