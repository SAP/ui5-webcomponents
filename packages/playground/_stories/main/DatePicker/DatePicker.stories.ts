import { html } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type DatePicker from "@ui5/webcomponents/dist/DatePicker.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";

const component = "ui5-date-picker";

export default {
	title: "Main/DatePicker",
	component,
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component })
		},
	},
	argTypes,
} as Meta<DatePicker>;

const Template: UI5StoryArgs<DatePicker, StoryArgsSlots> = (args) => html`<ui5-date-picker
	value="${ifDefined(args.value)}"
	value-state="${ifDefined(args.valueState)}"
	?disabled="${ifDefined(args.disabled)}"
	?readonly="${ifDefined(args.readonly)}"
	placeholder="${ifDefined(args.placeholder)}"
	?hide-week-numbers="${ifDefined(args.hideWeekNumbers)}"
	primary-calendar-type="${ifDefined(args.primaryCalendarType)}"
	secondary-calendar-type="${ifDefined(args.secondaryCalendarType)}"
	format-pattern="${ifDefined(args.formatPattern)}"
	min-date="${ifDefined(args.minDate)}"
	max-date="${ifDefined(args.maxDate)}"
	accessible-name="${ifDefined(args.accessibleName)}"
	accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
>
	${unsafeHTML(args.valueStateMessage)}
</ui5-date-picker>`;

export const Basic = Template.bind({});

export const Placeholder = Template.bind({});
Placeholder.args = {
	placeholder: "Delivery Date...",
};

export const WeekNumbers = Template.bind({});
WeekNumbers.storyName = "Hide Week Numbers";
WeekNumbers.args = {
	hideWeekNumbers: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
	value: "18 September, 2021",
	disabled: true,
};

export const Readonly = Template.bind({});
Readonly.args = {
	value: "14 February, 2023",
	readonly: true,
};

export const State = Template.bind({});
State.storyName = "ValueState and Message";
State.args = {
	value: "2024-02-29",
	valueState: ValueState.Information,
	valueStateMessage: `<div slot="valueStateMessage">This date exists only once every four years!</div>`,
};

export const MinMax = Template.bind({});
MinMax.storyName = "Min/Max Dates and Format Pattern";
MinMax.args = {
	minDate: "1/1/2020",
	maxDate: "4/5/2020",
	formatPattern: "dd/MM/yyyy",
};

export const LongFormat = Template.bind({});
LongFormat.storyName = "Long Format Pattern";
LongFormat.args = {
	value: "2023-03-03",
	formatPattern: "long",
};

export const CalendarTypes = Template.bind({});
CalendarTypes.storyName = "Primary and Secondary Calendar Types";
CalendarTypes.args = {
	primaryCalendarType: CalendarType.Japanese,
	secondaryCalendarType: CalendarType.Islamic,
};