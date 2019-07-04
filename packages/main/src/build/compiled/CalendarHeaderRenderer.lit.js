
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/renderer/ifTruthy.js';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const CalendarHeaderLitRenderer = {};
const block0 = (context) => { return html`<div 	id="${ifTruthy(context.ctr._id)}"	data-sap-ui="${ifTruthy(context.ctr._id)}"	aria-hidden="${ifTruthy(context.ariaHidden)}"	class="${ifTruthy(context.classes.main)}"><ui5-icon id="${ifTruthy(context.ctr._id)}-btnPrev"		class="${ifTruthy(context.classes.buttons)}"		src="${ifTruthy(context.ctr._btnPrev.icon)}"		data-sap-cal-head-button="Prev"></ui5-icon><div class="sapWCCalHeadMidButtonContainer"><div			id="${ifTruthy(context.ctr._id)}-btn1"			class="${ifTruthy(context.classes.middleButtons)}"			type="${ifTruthy(context.ctr._btn1.type)}"			tabindex="0"			data-sap-show-picker="Month"		>			${ifTruthy(context.ctr._btn1.text)}</div><div			id="${ifTruthy(context.ctr._id)}-btn2"			class="${ifTruthy(context.classes.middleButtons)}"			type="${ifTruthy(context.ctr._btn2.type)}"			tabindex="0"			data-sap-show-picker="Year"		>			${ifTruthy(context.ctr._btn2.text)}</div></div><ui5-icon		id="${ifTruthy(context.ctr._id)}-btnNext"		class="${ifTruthy(context.classes.buttons)}"		src="${ifTruthy(context.ctr._btnNext.icon)}"		data-sap-cal-head-button="Next"></ui5-icon></div>`; };
const renderMe = block0;
CalendarHeaderLitRenderer.render = renderMe;
export default CalendarHeaderLitRenderer;