
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<div	class="${ifDefined(classMap(context.classes.main))}"	role="grid"	aria-readonly="false"	aria-multiselectable="false"	style="${ifDefined(styleMap(context.styles.main))}">	${ repeat(context._yearIntervals, undefined, (item, index) => block1(item, index, context)) }</div>`; };
const block1 = (item, index, context) => { return html`<div class="${ifDefined(classMap(context.classes.yearInterval))}">			${ repeat(item, undefined, (item, index) => block2(item, index, context)) }</div>	`; };
const block2 = (item, index, context) => { return html`<div id="${ifDefined(item.id)}"					tabindex="${ifDefined(item._tabIndex)}"					data-sap-timestamp="${ifDefined(item.timestamp)}"					class="${ifDefined(item.classes)}"					role="gridcell"					aria-selected="false">						${ifDefined(item.year)}</div>			`; };

export default block0;