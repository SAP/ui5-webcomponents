/* eslint no-unused-vars: 0 */
import { html, ifDefined } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `${this._hasGrowingButton ? block1.call(this, context, tags, suffix) : undefined}`; }
function block1(context, tags, suffix) { return html `<div id="growing-button" tabindex="-1" ?active="${this._activeState}" @click="${this.loadMore}" @keydown="${this._onKeydown}" @keyup="${this._onKeyup}" @focusout="${this._onFocusout}" role="button" aria-labelledby="growing-text growing-subtext" aria-describedby="growing-description"><span id="growing-text">${ifDefined(this._growingButtonText)}</span>${this.growingSubText ? block2.call(this, context, tags, suffix) : undefined}<span id="growing-description" style="display: none;" aria-hidden="true">${ifDefined(this._growingButtonDescription)}</span></div>`; }
function block2(context, tags, suffix) { return html `<span id="growing-subtext">${ifDefined(this.growingSubText)}</span>`; }
export default block0;
//# sourceMappingURL=TableGrowingTemplate.lit.js.map