
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<div class="${ifDefined(classMap(context.classes.wrapper))}"><div class="${ifDefined(classMap(context.classes.content))}" @ui5-delete=${ifDefined(context._tokenDelete)}><div class="ui5-tokenizer-token-placeholder"><div style="display: inline-block"></div></div>		${ repeat(context.tokens, undefined, (item, index) => block1(item, index, context)) }</div>	${ context.showNMore ? block2(context) : undefined }</div>`; };
const block1 = (item, index, context) => { return html`<div class="ui5-tokenizer--token--wrapper"><slot name="${ifDefined(item._individualSlot)}"></slot></div>		`; };
const block2 = (context) => { return html`<span @click="${ifDefined(context._openOverflowPopover)}" class="ui5-tokenizer-more-text">${ifDefined(context._nMoreText)}</span>	`; };

export default block0;