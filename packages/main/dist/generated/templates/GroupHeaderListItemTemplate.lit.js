/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<li part="native-li" tabindex="${ifDefined(context._tabIndex)}" class="ui5-ghli-root ${classMap(context.classes.main)}" @focusin="${context._onfocusin}" @focusout="${context._onfocusout}" @keydown="${context._onkeydown}" aria-label="${ifDefined(context.ariaLabelText)}" aria-roledescription="${ifDefined(context.groupHeaderText)}" role="group"><div id="${ifDefined(context._id)}-content" class="ui5-li-content"><span class="ui5-ghli-title"><slot></slot></span></div></li>`;


export default block0;