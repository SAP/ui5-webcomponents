import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
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
	component: "Calendar",
	subcomponents: {'CalendarDate' : 'CalendarDate'},
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component })
		},
	},
	argTypes,
} as Meta<Calendar>;

const Template: UI5StoryArgs<Calendar, StoryArgsSlots> = (args) => html`<ui5-calendar
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

export const Bounds = Template.bind({});
Bounds.storyName = "Formatted Date Range";
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

export const CalendarWithLegend: StoryFn = () => html`
	<ui5-calendar
		selection-mode="${CalendarSelectionMode.Single}"
		primary-calendar-type="${CalendarType.Gregorian}"
		secondary-calendar-type="${CalendarType.Islamic}"
	>
	</ui5-calendar>

	<ui5-calendar-legend>
		<ui5-cal-legend-standard-item type="Today">Today</ui5-cal-legend-standard-item>
		<ui5-cal-legend-standard-item type="NonWorking">Non-Working Day</ui5-cal-legend-standard-item>
		<ui5-cal-legend-standard-item type="Selected">Selected Day</ui5-cal-legend-standard-item>
	</ui5-calendar-legend>
`;