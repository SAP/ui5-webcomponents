/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<label class="ui5-label-root" @click=${context._onclick} for="${ifDefined(context.for)}"><span class="${classMap(context.classes.textWrapper)}"><bdi id="${ifDefined(context._id)}-bdi"><slot></slot></bdi></span><span aria-hidden="true" class="ui5-label-required-colon"></span></label>`;


export default block0;