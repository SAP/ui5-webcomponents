/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<svg class="ui5-icon-root" tabindex="${ifDefined(context.tabIndex)}" dir="${ifDefined(context._dir)}" viewBox="0 0 512 512" role="${ifDefined(context.effectiveAccessibleRole)}" focusable="false" preserveAspectRatio="xMidYMid meet" aria-label="${ifDefined(context.effectiveAccessibleName)}" aria-hidden=${ifDefined(context.effectiveAriaHidden)} xmlns="http://www.w3.org/2000/svg" @focusin=${context._onfocusin} @focusout=${context._onfocusout} @keydown=${context._onkeydown} @keyup=${context._onkeyup} @click=${context._onclick}>${blockSVG1(context, tags, suffix)}</svg>`;
const block1 = (context, tags, suffix) => svg`<title id="${ifDefined(context._id)}-tooltip">${ifDefined(context.effectiveAccessibleName)}</title>`;

const blockSVG1 = (context, tags, suffix) => svg`${ context.hasIconTooltip ? block1(context, tags, suffix) : undefined }<g role="presentation"><path d="${ifDefined(context.pathData)}"/></g>`;

export default block0;