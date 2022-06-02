/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="ui5-dsc-root" style="${styleMap(context.styles.root)}"><div class="${classMap(context.classes.main)}" style="${styleMap(context.styles.main)}"><slot></slot></div><aside role="complementary" aria-label="${ifDefined(context.accInfo.label)}" class="${classMap(context.classes.side)}" style="${styleMap(context.styles.side)}"><slot name="sideContent"></slot></aside></div>`;


export default block0;