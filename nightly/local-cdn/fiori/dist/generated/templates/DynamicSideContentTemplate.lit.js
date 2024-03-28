/* eslint no-unused-vars: 0 */
import { html, classMap, styleMap, ifDefined } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<div class="ui5-dsc-root" style="${styleMap(this.styles.root)}">${this._isSideContentFirst ? block1.call(this, context, tags, suffix) : block2.call(this, context, tags, suffix)}</div> `; }
function block1(context, tags, suffix) { return html `<aside role="complementary" aria-label="${ifDefined(this.accInfo.label)}" class="${classMap(this.classes.side)}" style="${styleMap(this.styles.side)}"><slot name="sideContent"></slot></aside><div class="${classMap(this.classes.main)}" style="${styleMap(this.styles.main)}"><slot></slot></div>`; }
function block2(context, tags, suffix) { return html `<div class="${classMap(this.classes.main)}" style="${styleMap(this.styles.main)}"><slot></slot></div><aside role="complementary" aria-label="${ifDefined(this.accInfo.label)}" class="${classMap(this.classes.side)}" style="${styleMap(this.styles.side)}"><slot name="sideContent"></slot></aside>`; }
export default block0;
//# sourceMappingURL=DynamicSideContentTemplate.lit.js.map