/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<section style="${styleMap(context.styles.root)}" class="${classMap(context.classes.root)}" role="dialog" aria-modal="${ifDefined(context._ariaModal)}" aria-label="${ifDefined(context._ariaLabel)}" aria-labelledby="${ifDefined(context._ariaLabelledBy)}" @keydown=${context._onkeydown} @focusout=${context._onfocusout} @mouseup=${context._onmouseup} @mousedown=${context._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${context.forwardToLast}></span><div style="${styleMap(context.styles.content)}" class="${classMap(context.classes.content)}"  @scroll="${context._scroll}" part="content"><slot></slot></div><span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${context.forwardToFirst}></span></section> `;


export default block0;