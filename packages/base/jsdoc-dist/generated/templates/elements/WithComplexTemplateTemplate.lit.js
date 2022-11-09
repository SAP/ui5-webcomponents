/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const block0 = (context, tags, suffix) => html`<div>Root text: ${ifDefined(context.text)}${ repeat(context.items, (item, index) => item._id || index, (item, index) => block1(item, index, context, tags, suffix)) } Root text: ${ifDefined(context.text)}</div>`;
const block1 = (item, index, context, tags, suffix) => html`<h3>Item-${index}</h3>${ item.text ? block2(item, index, context, tags, suffix) : undefined }<ul>${ repeat(item.words, (item, index) => item._id || index, (item, index) => block3(item, index, context, tags, suffix)) }</ul>${ item.text ? block4(item, index, context, tags, suffix) : undefined }`;
const block2 = (item, index, context, tags, suffix) => html`<div class="before-each-content--start--${index}">Root text: ${ifDefined(context.text)}, Item text: ${ifDefined(item.text)}</div>`;
const block3 = (item, index, context, tags, suffix) => html`<li><h3>Word-${index}</h3><div class="nested-each-content--${index}--0">Root Text: ${ifDefined(context.text)}, Word text: ${ifDefined(item.text)}</div><div class="nested-each-content--${index}--1">Root Text: ${ifDefined(context.text)}, Word text: ${ifDefined(item.text)}</div></li>`;
const block4 = (item, index, context, tags, suffix) => html`<div class="after-each-content--end--${index}">Root text: ${ifDefined(context.text)}, Item text: ${ifDefined(item.text)}</div>`;


export default block0;