/* eslint no-unused-vars: 0 */
import { html, repeat, ifDefined } from "../../../renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<div>Root text: ${ifDefined(this.text)}${repeat(this.items, (item, index) => item._id || index, (item, index) => block1.call(this, context, tags, suffix, item, index))} Root text: ${ifDefined(this.text)}</div>`; }
function block1(context, tags, suffix, item, index) { return html `<h3>Item-${index}</h3>${item.text ? block2.call(this, context, tags, suffix, item, index) : undefined}<ul>${repeat(item.words, (item, index) => item._id || index, (item, index) => block3.call(this, context, tags, suffix, item, index))}</ul>${item.text ? block4.call(this, context, tags, suffix, item, index) : undefined}`; }
function block2(context, tags, suffix, item, index) { return html `<div class="before-each-content--start--${index}">Root text: ${ifDefined(this.text)}, Item text: ${ifDefined(item.text)}</div>`; }
function block3(context, tags, suffix, item, index) { return html `<li><h3>Word-${index}</h3><div class="nested-each-content--${index}--0">Root Text: ${ifDefined(this.text)}, Word text: ${ifDefined(item.text)}</div><div class="nested-each-content--${index}--1">Root Text: ${ifDefined(this.text)}, Word text: ${ifDefined(item.text)}</div></li>`; }
function block4(context, tags, suffix, item, index) { return html `<div class="after-each-content--end--${index}">Root text: ${ifDefined(this.text)}, Item text: ${ifDefined(item.text)}</div>`; }
export default block0;
//# sourceMappingURL=WithComplexTemplateTemplate.lit.js.map