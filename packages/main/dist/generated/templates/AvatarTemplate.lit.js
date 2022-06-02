/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="ui5-avatar-root" tabindex="${ifDefined(context.tabindex)}" data-sap-focus-ref @keyup=${context._onkeyup} @keydown=${context._onkeydown} @focusout=${context._onfocusout} @focusin=${context._onfocusin} @click=${context._onclick} role="${ifDefined(context._role)}" aria-haspopup="${ifDefined(context._ariaHasPopup)}">${ context.hasImage ? block1(context, tags, suffix) : block2(context, tags, suffix) }</div>`;
const block1 = (context, tags, suffix) => html`<slot></slot>`;
const block2 = (context, tags, suffix) => html`${ context.icon ? block3(context, tags, suffix) : block4(context, tags, suffix) }`;
const block3 = (context, tags, suffix) => suffix ? html`<${scopeTag("ui5-icon", tags, suffix)} class="ui5-avatar-icon" name="${ifDefined(context.icon)}" accessible-name="${ifDefined(context.accessibleNameText)}"></${scopeTag("ui5-icon", tags, suffix)}>` : html`<ui5-icon class="ui5-avatar-icon" name="${ifDefined(context.icon)}" accessible-name="${ifDefined(context.accessibleNameText)}"></ui5-icon>`;
const block4 = (context, tags, suffix) => html`${ context.initials ? block5(context, tags, suffix) : undefined }`;
const block5 = (context, tags, suffix) => html`<span class="ui5-avatar-initials">${ifDefined(context.validInitials)}</span>`;


export default block0;