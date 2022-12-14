import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/Calendar",
    component: "ui5-calendar",
    subcomponents: {'CalendarDate' : 'ui5-date'},
    argTypes,
};


export const Template0 = () => html`
<h3>Basic Calendar</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-calendar></ui5-calendar>
		</div>
	</div>
`;

export const Template1 = () => html`
<h3>Calendar with Minimum and Maximum Date &amp; Format Pattern</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-calendar min-date="7/7/2020" max-date="20/10/2020" format-pattern="dd/MM/yyyy"></ui5-calendar>
		</div>
	</div>
`;

export const Template2 = () => html`
<h3>Calendar with Hidden Week Numbers</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-calendar hide-week-numbers=""></ui5-calendar>
		</div>
	</div>
`;

export const Template3 = () => html`
<h3>Calendar with Selection Mode Multiple</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-calendar selection-mode="Multiple"></ui5-calendar>
		</div>
	</div>
`;

export const Template4 = () => html`
<h3>Calendar with Selection Mode Range</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-calendar selection-mode="Range"></ui5-calendar>
		</div>
	</div>
`;

export const Template5 = () => html`
<h3>Japanese Calendar</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-calendar primary-calendar-type="Japanese"></ui5-calendar>
		</div>
	</div>
`;

export const Template6 = () => html`
<h3>Islamic Calendar</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-calendar primary-calendar-type="Islamic"></ui5-calendar>
		</div>
	</div>
`;

export const Template7 = () => html`
<h3>Buddhist Calendar</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-calendar primary-calendar-type="Buddhist"></ui5-calendar>
		</div>
	</div>
`;

export const Template8 = () => html`
<h3>Persian Calendar</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-calendar primary-calendar-type="Persian"></ui5-calendar>
		</div>
	</div>
`;