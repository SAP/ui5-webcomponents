import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/DateTimePicker",
    component: "DateTimePicker",
    argTypes,
};
const Template = (args) => html `<ui5-datetime-picker
	value="${ifDefined(args.value)}"
	value-state="${ifDefined(args.valueState)}"
	?disabled="${ifDefined(args.disabled)}"
	?readonly="${ifDefined(args.readonly)}"
	?hide-week-numbers="${ifDefined(args.hideWeekNumbers)}"
	placeholder="${ifDefined(args.placeholder)}"
	primary-calendar-type="${ifDefined(args.primaryCalendarType)}"
	secondary-calendar-type="${ifDefined(args.secondaryCalendarType)}"
	format-pattern="${ifDefined(args.formatPattern)}"
	min-date="${ifDefined(args.minDate)}"
	max-date="${ifDefined(args.maxDate)}"
	accessible-name="${ifDefined(args.accessibleName)}"
	accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
>
	${unsafeHTML(args.valueStateMessage)}
</ui5-datetime-picker>`;
export const Basic = Template.bind({});
export const FormatPattern = Template.bind({});
FormatPattern.args = {
    formatPattern: "dd/MM/yyyy, hh:mm:ss aa",
};
export const MinMax = Template.bind({});
MinMax.storyName = "Formatted Date Range";
MinMax.args = {
    value: "Jan 11, 2020, 11:11:11 AM",
    minDate: "Jan 11, 2020, 00:00:00 AM",
    maxDate: "Jan 31, 2020, 11:59:59 PM",
    formatPattern: "long",
};
//# sourceMappingURL=DateTimePicker.stories.js.map