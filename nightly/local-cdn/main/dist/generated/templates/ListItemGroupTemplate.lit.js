/* eslint no-unused-vars: 0 */
import { html, ifDefined, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<ul class="ui5-group-li-root" role="group">${this.hasHeader ? block1.call(this, context, tags, suffix) : undefined}<slot></slot></ul>`; }
function block1(context, tags, suffix) { return suffix ? html `<${scopeTag("ui5-li-group-header", tags, suffix)} ?focused="${this.focused}" part="header">${this.hasFormattedHeader ? block2.call(this, context, tags, suffix) : block3.call(this, context, tags, suffix)}</${scopeTag("ui5-li-group-header", tags, suffix)}>` : html `<ui5-li-group-header ?focused="${this.focused}" part="header">${this.hasFormattedHeader ? block2.call(this, context, tags, suffix) : block3.call(this, context, tags, suffix)}</ui5-li-group-header>`; }
function block2(context, tags, suffix) { return html `<slot name="header"></slot>`; }
function block3(context, tags, suffix) { return html `${ifDefined(this.headerText)}`; }
export default block0;
//# sourceMappingURL=ListItemGroupTemplate.lit.js.map