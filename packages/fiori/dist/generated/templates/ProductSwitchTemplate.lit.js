/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="ui5-product-switch-root" role="list" aria-label="${ifDefined(context._ariaLabelText)}" @focusin=${context._onfocusin} @keydown=${context._onkeydown} @click="${context.handleProductSwitchItemClick}"><slot></slot></div>`;


export default block0;