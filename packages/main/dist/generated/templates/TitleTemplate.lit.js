/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`${ context.h1 ? block1(context, tags, suffix) : undefined }${ context.h2 ? block2(context, tags, suffix) : undefined }${ context.h3 ? block3(context, tags, suffix) : undefined }${ context.h4 ? block4(context, tags, suffix) : undefined }${ context.h5 ? block5(context, tags, suffix) : undefined }${ context.h6 ? block6(context, tags, suffix) : undefined }`;
const block1 = (context, tags, suffix) => html`<h1 class="ui5-title-root"><span id="${ifDefined(context._id)}-inner"><slot></slot></span></h1>`;
const block2 = (context, tags, suffix) => html`<h2 class="ui5-title-root"><span id="${ifDefined(context._id)}-inner"><slot></slot></span></h2>`;
const block3 = (context, tags, suffix) => html`<h3 class="ui5-title-root"><span id="${ifDefined(context._id)}-inner"><slot></slot></span></h3>`;
const block4 = (context, tags, suffix) => html`<h4 class="ui5-title-root"><span id="${ifDefined(context._id)}-inner"><slot></slot></span></h4>`;
const block5 = (context, tags, suffix) => html`<h5 class="ui5-title-root"><span id="${ifDefined(context._id)}-inner"><slot></slot></span></h5>`;
const block6 = (context, tags, suffix) => html`<h6 class="ui5-title-root"><span id="${ifDefined(context._id)}-inner"><slot></slot></span></h6>`;


export default block0;