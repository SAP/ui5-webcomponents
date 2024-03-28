/* eslint no-unused-vars: 0 */
import { html, styleMap } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<div class="ui5-block-layer" ?hidden=${this._blockLayerHidden} tabindex="0" style="${styleMap(this.styles.blockLayer)}" @keydown="${this._preventBlockLayerFocus}" @mousedown="${this._preventBlockLayerFocus}"></div>`; }
export default block0;
//# sourceMappingURL=PopupBlockLayerTemplate.lit.js.map