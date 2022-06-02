/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="ui5-block-layer" ?hidden=${context._blockLayerHidden} tabindex="0" style="${styleMap(context.styles.blockLayer)}" @keydown="${context._preventBlockLayerFocus}" @mousedown="${context._preventBlockLayerFocus}"></div>`;


export default block0;