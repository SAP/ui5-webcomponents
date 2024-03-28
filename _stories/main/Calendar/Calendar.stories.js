import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
export default {
    title: "Main/Calendar",
    component: "Calendar",
    argTypes,
};
const Template = (args) => html `<ui5-calendar
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
export const CalendarWithLegend = Template.bind({});
CalendarWithLegend.storyName = "Calendar with Calendar Legend";
CalendarWithLegend.args = {
    default: `
<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>

<ui5-calendar-legend
	slot="calendarLegend"
	id="calendarLegend"
	hide-today
	hide-selected-day
>
	<ui5-calendar-legend-item type="Type05" text="Holiday"></ui5-calendar-legend-item>
	<ui5-calendar-legend-item type="Type07" text="School Vacation"></ui5-calendar-legend-item>
	<ui5-calendar-legend-item type="Type13" text="Wedding"></ui5-calendar-legend-item>
</ui5-calendar-legend>
	`,
};
CalendarWithLegend.decorators = [
    (story) => html `
	${story()}
	<script>
	// Function that maps special dates to the current month
	function updateSpecialDates() {
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const formattedMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
		const specialDates = document.querySelectorAll("ui5-special-date");
		const types = ["Type05", "Type07", "Type13"];
		const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
		let assignedDays = new Set();

		function generateUniqueRandomDay() {
			let randomDay;
			do {
				randomDay = Math.floor(Math.random() * daysInMonth) + 1;
			} while (assignedDays.has(randomDay));
			assignedDays.add(randomDay);
			return randomDay.toString().padStart(2, "0");
		}

		specialDates.forEach((specDate, index) => {
			specDate.setAttribute("value", year + "-" + formattedMonth + "-" + generateUniqueRandomDay());
			specDate.setAttribute("type", types[index % types.length]);
		});
	}

	updateSpecialDates();
</script>
`,
];
//# sourceMappingURL=Calendar.stories.js.map