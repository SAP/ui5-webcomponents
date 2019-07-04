
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const TimelineItemLitRenderer = {};
const block0 = (context) => { return html`<div class="sapWCTimelineItem ${ifTruthy(context.ctr._customClasses)}" 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"><div class="${ifTruthy(context.classes.indicator)}">		${ context.ctr.icon ? block1(context) : undefined }</div><div class="sapWCTimelineBubble" tabindex="${ifTruthy(context.ctr._tabIndex)}" data-sap-focus-ref><div class="sapWCTimelineItemTitle">			${ context.ctr.itemName ? block2(context) : undefined }<span>${ifTruthy(context.ctr.titleText)}</span></div><div class="sapWCTimelineItemSubtitle">${ifTruthy(context.ctr.subtitleText)}</div>		${ context.ctr.description ? block5(context) : undefined }<span class="sapWCTimelineBubbleArrow sapWCTimelineBubbleArrowLeft"></span></div></div>`; };
const block1 = (context) => { return html`<ui5-icon class="sapWCTimelineItemIcon" src="${ifTruthy(context.ctr.icon)}"></ui5-icon>		`; };
const block2 = (context) => { return html`${ context.ctr.itemNameClickable ? block3(context) : undefined }${ !context.ctr.itemNameClickable ? block4(context) : undefined }`; };
const block3 = (context) => { return html`<ui5-link @press="${ifTruthy(context.ctr._onItemNamePress)}">${ifTruthy(context.ctr.itemName)}</ui5-link>	`; };
const block4 = (context) => { return html`<span>${ifTruthy(context.ctr.itemName)}</span>	`; };
const block5 = (context) => { return html`<div class="sapWCTimelineItemDesc"><slot name="${ifTruthy(context.ctr.description._slot)}"></slot></div>		`; };
const renderMe = block0;
TimelineItemLitRenderer.render = renderMe;
export default TimelineItemLitRenderer;