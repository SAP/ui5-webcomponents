/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="ui5-cp-item" style="${styleMap(context.styles.root)}" value="${ifDefined(context.value)}" tabindex="${ifDefined(context._tabIndex)}" role="button" aria-label="${ifDefined(context.colorLabel)} - ${ifDefined(context.index)}: ${ifDefined(context.value)}" title="${ifDefined(context.colorLabel)} - ${ifDefined(context.index)}: ${ifDefined(context.value)}" ?disabled="${context._disabled}"></div>`;


export default block0;