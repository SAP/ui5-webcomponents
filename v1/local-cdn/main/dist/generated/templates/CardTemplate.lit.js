/* eslint no-unused-vars: 0 */
import { html, classMap, ifDefined } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<div class="${classMap(this.classes.root)}" role="region" aria-label="${ifDefined(this._getAriaLabel)}" part="root">${this._hasHeader ? block1.call(this, context, tags, suffix) : undefined}<div role="group" aria-label="${ifDefined(this._ariaCardContentLabel)}" part="content"><slot></slot></div></div>`; }
function block1(context, tags, suffix) { return html `<div class="ui5-card-header-root"><slot name="header"></slot></div>`; }
export default block0;
//# sourceMappingURL=CardTemplate.lit.js.map