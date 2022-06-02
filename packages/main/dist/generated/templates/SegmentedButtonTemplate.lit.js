/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<ul @click="${context._onclick}" @keydown="${context._onkeydown}" @keyup="${context._onkeyup}" @focusin="${context._onfocusin}" class="ui5-segmented-button-root" role="listbox" aria-multiselectable="true" aria-describedby="${ifDefined(context._id)}-invisibleText" aria-roledescription=${ifDefined(context.ariaDescription)} aria-label=${ifDefined(context.accessibleName)}><slot></slot><span id="${ifDefined(context._id)}-invisibleText" class="ui5-hidden-text">${ifDefined(context.ariaDescribedBy)}</span></ul>`;


export default block0;