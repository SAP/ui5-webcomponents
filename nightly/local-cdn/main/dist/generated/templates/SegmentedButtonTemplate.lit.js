/* eslint no-unused-vars: 0 */
import { html, ifDefined } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<ul @click="${this._onclick}" @mousedown="${this._onmousedown}" @keydown="${this._onkeydown}" @keyup="${this._onkeyup}" @focusin="${this._onfocusin}" class="ui5-segmented-button-root" role="listbox" aria-multiselectable="true" aria-describedby="${ifDefined(this._id)}-invisibleText" aria-roledescription=${ifDefined(this.ariaDescription)} aria-label=${ifDefined(this.accessibleName)}><slot></slot><span id="${ifDefined(this._id)}-invisibleText" class="ui5-hidden-text">${ifDefined(this.ariaDescribedBy)}</span></ul>`; }
export default block0;
//# sourceMappingURL=SegmentedButtonTemplate.lit.js.map