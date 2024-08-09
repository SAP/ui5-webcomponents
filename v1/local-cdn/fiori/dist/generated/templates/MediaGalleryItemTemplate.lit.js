/* eslint no-unused-vars: 0 */
import { html, styleMap, ifDefined, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<div class="ui5-media-gallery-item-root" tabindex="${ifDefined(this.effectiveTabIndex)}" data-sap-focus-ref @focusout="${this._onfocusout}" @focusin="${this._onfocusin}" @keydown="${this._onkeydown}" @keyup="${this._onkeyup}" role="${ifDefined(this._role)}"><div class="ui5-media-gallery-item-mask-layer"></div><div class="ui5-media-gallery-item-wrapper" style="${styleMap(this.styles.wrapper)}">${this._showBackgroundIcon ? block1.call(this, context, tags, suffix) : undefined}${this._useContent ? block2.call(this, context, tags, suffix) : undefined}${this._useThumbnail ? block3.call(this, context, tags, suffix) : undefined}</div></div>`; }
function block1(context, tags, suffix) { return suffix ? html `<${scopeTag("ui5-icon", tags, suffix)} name="background"></${scopeTag("ui5-icon", tags, suffix)}>` : html `<ui5-icon name="background"></ui5-icon>`; }
function block2(context, tags, suffix) { return html `<slot></slot>`; }
function block3(context, tags, suffix) { return html `<slot name="thumbnail"></slot>`; }
export default block0;
//# sourceMappingURL=MediaGalleryItemTemplate.lit.js.map