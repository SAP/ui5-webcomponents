/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<a class="ui5-link-root" role="${ifDefined(context.effectiveAccRole)}" href="${ifDefined(context.parsedRef)}" target="${ifDefined(context.target)}" rel="${ifDefined(context._rel)}" tabindex="${ifDefined(context.tabIndex)}" ?disabled="${context.disabled}" aria-label="${ifDefined(context.ariaLabelText)}" aria-haspopup="${ifDefined(context.accessibilityAttributes.hasPopup)}" aria-expanded="${ifDefined(context.accessibilityAttributes.expanded)}" @focusin=${context._onfocusin} @focusout=${context._onfocusout} @click=${context._onclick} @keydown=${context._onkeydown} @keyup=${context._onkeyup}><slot></slot>${ context.hasLinkType ? block1(context, tags, suffix) : undefined }</a>`;
const block1 = (context, tags, suffix) => html`<span class="ui5-hidden-text">${ifDefined(context.linkTypeText)}</span>`;


export default block0;