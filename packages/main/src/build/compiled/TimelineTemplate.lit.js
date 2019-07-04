
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<div class="${ifDefined(classMap(context.classes.main))}"><ul class="sapWCTimelineList">		${ repeat(context.items, undefined, (item, index) => block1(item, index, context)) }</ul></div>`; };
const block1 = (item, index, context) => { return html`<li class="sapWCTimelineListItem"><slot name="${ifDefined(item._individualSlot)}"></slot></li>		`; };

export default block0;