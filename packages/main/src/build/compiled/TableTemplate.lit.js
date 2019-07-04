
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<div	style="display: grid; place-items: center;"><!-- columns --><div class="${ifDefined(classMap(context.classes.main))}" style="${ifDefined(styleMap(context.styles.main))}">		${ repeat(context.visibleColumns, undefined, (item, index) => block1(item, index, context)) }</div><!-- rows -->	${ repeat(context.rows, undefined, (item, index) => block2(item, index, context)) }${ !context.rows.length ? block3(context) : undefined }</div>`; };
const block1 = (item, index, context) => { return html`<div class="sapWCTableColumnWrapper"><slot name="${ifDefined(item._individualSlot)}"></slot></div>		`; };
const block2 = (item, index, context) => { return html`<div style="width: 100%"><slot name="${ifDefined(item._individualSlot)}"></slot></div>	`; };
const block3 = (context) => { return html`${ context.showNoData ? block4(context) : undefined }`; };
const block4 = (context) => { return html`<div id="noData" class="sapWCTableNoDataRow"><span>${ifDefined(context.noDataText)}</span></div>		`; };

export default block0;