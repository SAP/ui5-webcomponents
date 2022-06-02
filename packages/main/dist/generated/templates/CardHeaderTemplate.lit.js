/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="${classMap(context.classes)}" @click="${context._headerClick}" @keydown="${context._headerKeydown}" @keyup="${context._headerKeyup}" role="${ifDefined(context.ariaHeaderRole)}" aria-labelledby="${ifDefined(context.ariaLabelledByHeader)}" aria-level="${ifDefined(context._ariaLevel)}" aria-roledescription="${ifDefined(context.ariaCardHeaderRoleDescription)}" tabindex="0" id="${ifDefined(context._id)}--header">${ context.hasAvatar ? block1(context, tags, suffix) : undefined }<div class="ui5-card-header-text"><div class="ui5-card-header-first-line">${ context.titleText ? block2(context, tags, suffix) : undefined }${ context.status ? block3(context, tags, suffix) : undefined }</div>${ context.subtitleText ? block4(context, tags, suffix) : undefined }</div>${ context.hasAction ? block5(context, tags, suffix) : undefined }</div></div>`;
const block1 = (context, tags, suffix) => html`<div id="${ifDefined(context._id)}-avatar" class="ui5-card-header-avatar" aria-label="${ifDefined(context.ariaCardAvatarLabel)}"><slot name="avatar"></slot></div>`;
const block2 = (context, tags, suffix) => html`<div id="${ifDefined(context._id)}-title" class="ui5-card-header-title" part="title">${ifDefined(context.titleText)}</div>`;
const block3 = (context, tags, suffix) => html`<div class="ui5-card-header-status"><span id="${ifDefined(context._id)}-status" part="status" dir="auto">${ifDefined(context.status)}</span></div>`;
const block4 = (context, tags, suffix) => html`<div id="${ifDefined(context._id)}-subtitle" class="ui5-card-header-subtitle" part="subtitle">${ifDefined(context.subtitleText)}</div>`;
const block5 = (context, tags, suffix) => html`<div class="ui5-card-header-action"><slot name="action"></slot></div>`;


export default block0;