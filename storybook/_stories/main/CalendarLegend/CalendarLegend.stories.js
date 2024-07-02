import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Calendar Legend",
    component: "CalendarLegend",
    argTypes,
};
const Template = (args) => html `
		<ui5-calendar-legend
			?hide-today="${ifDefined(args.hideToday)}"
			?hide-selected-day="${ifDefined(args.hideSelectedDay)}"
			?hide-non-working-day="${ifDefined(args.hideNonWorkingDay)}"
			?hide-working-day="${ifDefined(args.hideWorkingDay)}"
			slot="calendarLegend"
		>
			${unsafeHTML(args.default)}
		</ui5-calendar-legend>
`;
export const Basic = Template.bind({});
Basic.decorators = [
    (story) => {
        return html `
<ui5-calendar>
	<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
	<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
	<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
	<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
	<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
	<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
	<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
	<ui5-special-date slot="specialDates" value="" type=""></ui5-special-date>
	${story()}
</ui5-calendar>

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
		`;
    },
];
Basic.args = {
    default: `
			<ui5-calendar-legend-item type="Type05" text="Holiday"></ui5-calendar-legend-item>
			<ui5-calendar-legend-item type="Type07" text="School Vacation"></ui5-calendar-legend-item>
			<ui5-calendar-legend-item type="Type13" text="Wedding"></ui5-calendar-legend-item>
	`,
};
//# sourceMappingURL=CalendarLegend.stories.js.map