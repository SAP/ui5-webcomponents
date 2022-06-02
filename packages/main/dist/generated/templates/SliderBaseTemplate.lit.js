/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div class="ui5-slider-root ${classMap(context.classes.root)}" @mousedown="${context._onmousedown}" @touchstart="${context._ontouchstart}" @mouseover="${context._onmouseover}" @mouseout="${context._onmouseout}" @keydown="${context._onkeydown}" @keyup="${context._onkeyup}"><div class="ui5-slider-inner">${ context.step ? block1(context, tags, suffix) : undefined }</div><span id="${ifDefined(context._id)}-accName" class="ui5-hidden-text">${ifDefined(context.accessibleName)}</span><span id="${ifDefined(context._id)}-sliderDesc" class="ui5-hidden-text">${ifDefined(context._ariaLabelledByText)}</span></div> `;
const block1 = (context, tags, suffix) => html`${ context.showTickmarks ? block2(context, tags, suffix) : undefined }`;
const block2 = (context, tags, suffix) => html`<ul class="ui5-slider-tickmarks">${ repeat(context.tickmarksObject, (item, index) => item._id || index, (item, index) => block3(item, index, context, tags, suffix)) }</ul>${ context.labelInterval ? block6(context, tags, suffix) : undefined }`;
const block3 = (item, index, context, tags, suffix) => html`${ item ? block4(item, index, context, tags, suffix) : block5(item, index, context, tags, suffix) }`;
const block4 = (item, index, context, tags, suffix) => html`<li class="ui5-slider-tickmark ui5-slider-tickmark-in-range"></li>`;
const block5 = (item, index, context, tags, suffix) => html`<li class="ui5-slider-tickmark"></li>`;
const block6 = (context, tags, suffix) => html`<ul class="ui5-slider-labels ${classMap(context.classes.labelContainer)}" style="${styleMap(context.styles.labelContainer)}">${ repeat(context._labels, (item, index) => item._id || index, (item, index) => block7(item, index, context, tags, suffix)) }</ul>`;
const block7 = (item, index, context, tags, suffix) => html`<li style="${styleMap(context.styles.label)}">${ifDefined(item)}</li>`;


export default block0;