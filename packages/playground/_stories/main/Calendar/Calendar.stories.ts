import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type Calendar from "@ui5/webcomponents/dist/Calendar.js";
import CalendarSelectionMode from "@ui5/webcomponents/dist/types/CalendarSelectionMode.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";


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

const Template: UI5StoryArgs<Calendar, StoryArgsSlots> = (args) => html`
<ui5-calendar
	selection-mode="${ifDefined(args.selectionMode)}"
	?hide-week-numbers="${ifDefined(args.hideWeekNumbers)}"
	primary-calendar-type="${ifDefined(args.primaryCalendarType)}"
	secondary-calendar-type="${ifDefined(args.secondaryCalendarType)}"
	format-pattern="${ifDefined(args.formatPattern)}"
	min-date="${ifDefined(args.minDate)}"
	max-date="${ifDefined(args.maxDate)}"
>
	${unsafeHTML(args.default)}
</ui5-calendar>`;

export const Basic = Template.bind({});

export const WeekNumbering = Template.bind({});
WeekNumbering.storyName = "Hide Week Numbers";
WeekNumbering.args = {
	hideWeekNumbers: true,
};

export const SelectionMode = Template.bind({});
SelectionMode.args = {
	selectionMode: CalendarSelectionMode.Multiple,
};

export const Bounds = Template.bind({});
Bounds.storyName = "Min/Max Dates and Format Pattern";
Bounds.args = {
	minDate: "7/10/2020", 
	maxDate: "20/10/2020",
	formatPattern: "dd/MM/yyyy",
};

export const CalendarTypes = Template.bind({});
CalendarTypes.storyName = "Primary and Secondary Calendar Types";
CalendarTypes.args = {
	primaryCalendarType: CalendarType.Japanese,
	secondaryCalendarType: CalendarType.Islamic,
};