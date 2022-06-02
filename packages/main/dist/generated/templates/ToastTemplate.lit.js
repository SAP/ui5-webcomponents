/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`${ context.domRendered ? block1(context, tags, suffix) : undefined } `;
const block1 = (context, tags, suffix) => html`<div class="ui5-toast-root" role="alert" style="${styleMap(context.styles.root)}" @mouseover="${context._onmouseover}" @mouseleave="${context._onmouseleave}" @transitionend="${context._ontransitionend}"><bdi><slot></slot></bdi></div>`;


export default block0;