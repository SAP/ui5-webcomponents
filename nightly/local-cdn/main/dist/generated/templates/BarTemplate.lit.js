/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<div class="${classMap(this.classes.root)}" aria-label="${ifDefined(this.accInfo.label)}" role="toolbar" part="bar"><div class="ui5-bar-content-container ui5-bar-startcontent-container" part="startContent"><slot name="startContent"></slot></div><div class="ui5-bar-content-container ui5-bar-midcontent-container" part="midContent"><slot></slot></div><div class="ui5-bar-content-container ui5-bar-endcontent-container" part="endContent"><slot name="endContent"></slot></div></div>`; }
export default block0;
//# sourceMappingURL=BarTemplate.lit.js.map