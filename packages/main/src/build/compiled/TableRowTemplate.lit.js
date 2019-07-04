
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<div	class="${ifDefined(classMap(context.classes.main))}"	style="${ifDefined(styleMap(context.styles.main))}"	tabindex="${ifDefined(context._tabIndex)}"	@focusin="${ifDefined(context.onfocusin)}">	${ repeat(context.visibleCells, undefined, (item, index) => block1(item, index, context)) }${ repeat(context.popinCells, undefined, (item, index) => block2(item, index, context)) }</div>`; };
const block1 = (item, index, context) => { return html`<div class="${ifDefined(classMap(context.classes.cellWrapper))}"><slot name="${ifDefined(item._individualSlot)}"></slot></div>	`; };
const block2 = (item, index, context) => { return html`<div class="${ifDefined(classMap(context.classes.popin))}"			style="grid-column-end: ${ifDefined(context.visibleColumnLength)}" ><span class="${ifDefined(classMap(context.classes.popinTitle))}">${ifDefined(item.popinText)}</span><div><slot name="${ifDefined(item.cell._individualSlot)}"></slot></div></div>	`; };

export default block0;