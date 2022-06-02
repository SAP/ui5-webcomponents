/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => suffix ? html`<${scopeTag("ui5-li-custom", tags, suffix)} id="${ifDefined(context._id)}" data-ui5-stable="${ifDefined(context.stableDomRef)}" role="separator" class="${classMap(context.classes)}" disabled style="${styleMap(context._style)}"></${scopeTag("ui5-li-custom", tags, suffix)}>` : html`<ui5-li-custom id="${ifDefined(context._id)}" data-ui5-stable="${ifDefined(context.stableDomRef)}" role="separator" class="${classMap(context.classes)}" disabled style="${styleMap(context._style)}"></ui5-li-custom>`;


export default block0;