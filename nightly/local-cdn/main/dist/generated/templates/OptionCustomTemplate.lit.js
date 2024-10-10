/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<li part="native-li" data-sap-focus-ref tabindex="${ifDefined(this._effectiveTabIndex)}" class="${classMap(this.classes.main)}" @focusin="${this._onfocusin}" @keyup="${this._onkeyup}" @keydown="${this._onkeydown}" draggable="${ifDefined(this.movable)}" @click="${this._onclick}"  role="option" title="${ifDefined(this.tooltip)}" ><slot></slot></li> `; }
export default block0;
//# sourceMappingURL=OptionCustomTemplate.lit.js.map