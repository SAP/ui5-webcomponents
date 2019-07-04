
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const TimelineLitRenderer = {};
const block0 = (context) => { return html`<div class="sapWCTimeline" 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"><ul class="sapWCTimelineList">		${ repeat(context.ctr.items, undefined, (item, index) => block1(item, index, context)) }</ul></div>`; };
const block1 = (item, index, context) => { return html`<li class="sapWCTimelineListItem"><slot name="${ifTruthy(item._slot)}"></slot></li>		`; };
const renderMe = block0;
TimelineLitRenderer.render = renderMe;
export default TimelineLitRenderer;