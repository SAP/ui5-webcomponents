/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div id="${ifDefined(context._id)}" data-ui5-stable="${ifDefined(context.stableDomRef)}" role="separator" class="${classMap(context.classes)}"></div>`;


export default block0;