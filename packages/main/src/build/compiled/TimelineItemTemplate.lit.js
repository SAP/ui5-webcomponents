
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const block0 = (context) => { return html`<div	class="${ifDefined(classMap(context.classes.main))}"	dir="${ifDefined(context.rtl)}"><div class="${ifDefined(classMap(context.classes.indicator))}">		${ context.icon ? block1(context) : undefined }</div><div class="sapWCTimelineBubble" tabindex="${ifDefined(context._tabIndex)}" data-sap-focus-ref><div class="sapWCTimelineItemTitle">			${ context.itemName ? block2(context) : undefined }<span>${ifDefined(context.titleText)}</span></div><div class="sapWCTimelineItemSubtitle">${ifDefined(context.subtitleText)}</div>		${ context.textContent ? block5(context) : undefined }<span class="sapWCTimelineBubbleArrow sapWCTimelineBubbleArrowLeft"></span></div></div>`; };
const block1 = (context) => { return html`<ui5-icon class="sapWCTimelineItemIcon" src="${ifDefined(context.icon)}"></ui5-icon>		`; };
const block2 = (context) => { return html`${ context.itemNameClickable ? block3(context) : undefined }${ !context.itemNameClickable ? block4(context) : undefined }`; };
const block3 = (context) => { return html`<ui5-link @click="${ifDefined(context.onItemNamePress)}">${ifDefined(context.itemName)}</ui5-link>	`; };
const block4 = (context) => { return html`<span>${ifDefined(context.itemName)}</span>	`; };
const block5 = (context) => { return html`<div class="sapWCTimelineItemDesc"><slot></slot></div>		`; };

export default block0;