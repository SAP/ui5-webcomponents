/* eslint no-unused-vars: 0 */
import { html, ifDefined } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `${this.h1 ? block1.call(this, context, tags, suffix) : undefined}${this.h2 ? block2.call(this, context, tags, suffix) : undefined}${this.h3 ? block3.call(this, context, tags, suffix) : undefined}${this.h4 ? block4.call(this, context, tags, suffix) : undefined}${this.h5 ? block5.call(this, context, tags, suffix) : undefined}${this.h6 ? block6.call(this, context, tags, suffix) : undefined}`; }
function block1(context, tags, suffix) { return html `<h1 class="ui5-title-root"><span id="${ifDefined(this._id)}-inner"><slot></slot></span></h1>`; }
function block2(context, tags, suffix) { return html `<h2 class="ui5-title-root"><span id="${ifDefined(this._id)}-inner"><slot></slot></span></h2>`; }
function block3(context, tags, suffix) { return html `<h3 class="ui5-title-root"><span id="${ifDefined(this._id)}-inner"><slot></slot></span></h3>`; }
function block4(context, tags, suffix) { return html `<h4 class="ui5-title-root"><span id="${ifDefined(this._id)}-inner"><slot></slot></span></h4>`; }
function block5(context, tags, suffix) { return html `<h5 class="ui5-title-root"><span id="${ifDefined(this._id)}-inner"><slot></slot></span></h5>`; }
function block6(context, tags, suffix) { return html `<h6 class="ui5-title-root"><span id="${ifDefined(this._id)}-inner"><slot></slot></span></h6>`; }
export default block0;
//# sourceMappingURL=TitleTemplate.lit.js.map