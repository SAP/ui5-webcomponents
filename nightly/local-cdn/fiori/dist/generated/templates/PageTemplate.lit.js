/* eslint no-unused-vars: 0 */
import { html, styleMap } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<div class="ui5-page-root"><header class="ui5-page-header-root" id="ui5-page-header"><slot name="header"></slot></header><section part="content" class="ui5-page-content-root" style="${styleMap(this.styles.content)}"><slot></slot></section><footer class="ui5-page-footer-root" style="${styleMap(this.styles.footer)}"><slot name="footer"></slot></footer></div>`; }
export default block0;
//# sourceMappingURL=PageTemplate.lit.js.map