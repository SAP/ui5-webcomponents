import { html } from "lit-html";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type Calendar from "@ui5/webcomponents/dist/Calendar.js";

const component = "ui5-calendar";

export default {
    title: "Main/Calendar",
    component,
    subcomponents: {'CalendarDate' : 'ui5-date'},
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<Calendar>;

const Template: UI5StoryArgs<Calendar, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Basic Calendar</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-calendar></ui5-calendar>
		</div>
	</div>
`;


export const Template1: StoryFn = () => html`
<h3>Calendar with Minimum and Maximum Date &amp; Format Pattern</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-calendar min-date="7/7/2020" max-date="20/10/2020" format-pattern="dd/MM/yyyy"></ui5-calendar>
		</div>
	</div>
`;


export const Template2: StoryFn = () => html`
<h3>Calendar with Hidden Week Numbers</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-calendar hide-week-numbers=""></ui5-calendar>
		</div>
	</div>
`;


export const Template3: StoryFn = () => html`
<h3>Calendar with Selection Mode Multiple</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-calendar selection-mode="Multiple"></ui5-calendar>
		</div>
	</div>
`;


export const Template4: StoryFn = () => html`
<h3>Calendar with Selection Mode Range</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-calendar selection-mode="Range"></ui5-calendar>
		</div>
	</div>
`;


export const Template5: StoryFn = () => html`
<h3>Japanese Calendar</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-calendar primary-calendar-type="Japanese"></ui5-calendar>
		</div>
	</div>
`;


export const Template6: StoryFn = () => html`
<h3>Islamic Calendar</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-calendar primary-calendar-type="Islamic"></ui5-calendar>
		</div>
	</div>
`;


export const Template7: StoryFn = () => html`
<h3>Buddhist Calendar</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-calendar primary-calendar-type="Buddhist"></ui5-calendar>
		</div>
	</div>
`;


export const Template8: StoryFn = () => html`
<h3>Persian Calendar</h3>
	<div class="snippet">
		<div class="datepicker-width">
			<ui5-calendar primary-calendar-type="Persian"></ui5-calendar>
		</div>
	</div>
`;
