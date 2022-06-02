/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<tr class="ui5-table-group-row-root" part="group-row" role="row" aria-label=${ifDefined(context.ariaLabelText)} tabindex="${ifDefined(context._tabIndex)}" @focusin="${context._onfocusin}"><td colspan=${ifDefined(context.colSpan)}><slot></slot></td></tr>`;


export default block0;