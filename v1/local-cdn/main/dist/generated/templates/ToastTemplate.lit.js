/* eslint no-unused-vars: 0 */
import { html, ifDefined } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `${this.domRendered ? block1.call(this, context, tags, suffix) : undefined} `; }
function block1(context, tags, suffix) { return html `<div class="ui5-toast-root" role="alert" tabindex="${ifDefined(this._tabindex)}"><bdi><slot></slot></bdi></div>`; }
export default block0;
//# sourceMappingURL=ToastTemplate.lit.js.map