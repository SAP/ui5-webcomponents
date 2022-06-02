/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="ui5-media-gallery-item-root" tabindex="${ifDefined(context.tabIndex)}" data-sap-focus-ref @focusout="${context._onfocusout}" @focusin="${context._onfocusin}" @keydown="${context._onkeydown}" @keyup="${context._onkeyup}" role="${ifDefined(context._role)}"><div class="ui5-media-gallery-item-mask-layer"></div><div class="ui5-media-gallery-item-wrapper" style="${styleMap(context.styles.wrapper)}">${ context._showBackgroundIcon ? block1(context, tags, suffix) : undefined }${ context._useContent ? block2(context, tags, suffix) : undefined }${ context._useThumbnail ? block3(context, tags, suffix) : undefined }</div></div>`;
const block1 = (context, tags, suffix) => suffix ? html`<${scopeTag("ui5-icon", tags, suffix)} name="background"></${scopeTag("ui5-icon", tags, suffix)}>` : html`<ui5-icon name="background"></ui5-icon>`;
const block2 = (context, tags, suffix) => html`<slot></slot>`;
const block3 = (context, tags, suffix) => html`<slot name="thumbnail"></slot>`;


export default block0;