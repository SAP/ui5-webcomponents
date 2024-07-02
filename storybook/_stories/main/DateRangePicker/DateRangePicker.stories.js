import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/DateRangePicker",
    component: "DateRangePicker",
    argTypes,
};
const Template = (args) => html `<ui5-daterange-picker
	value="${ifDefined(args.value)}"
	value-state="${ifDefined(args.valueState)}"
	?disabled="${ifDefined(args.disabled)}"
	?readonly="${ifDefined(args.readonly)}"
	delimiter="${ifDefined(args.delimiter)}"
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
</ui5-daterange-picker>`;
export const Basic = Template.bind({});
export const MinMax = Template.bind({});
MinMax.storyName = "Formatted Date Range";
MinMax.args = {
    minDate: "1/1/2020",
    maxDate: "4/5/2020",
    formatPattern: "dd/MM/yyyy",
};
export const LongFormat = Template.bind({});
LongFormat.storyName = "Formatted Value and Delimiter";
LongFormat.args = {
    value: "March 31, 2023 ~ April 9, 2023",
    delimiter: "~",
    formatPattern: "long",
};
//# sourceMappingURL=DateRangePicker.stories.js.map