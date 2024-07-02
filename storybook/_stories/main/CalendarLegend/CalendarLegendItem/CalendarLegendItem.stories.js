import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Calendar Legend/Calendar Legend Item",
    component: "CalendarLegendItem",
    argTypes,
};
const Template = (args) => html `
<ui5-calendar id="calendar1">
	<ui5-special-date slot="specialDates" value="" type="${ifDefined(args.type)}"></ui5-special-date>

	<ui5-calendar-legend
		slot="calendarLegend"
		id="calendarLegend"
	>
		<ui5-calendar-legend-item type="${ifDefined(args.type)}" text="${ifDefined(args.text)}"></ui5-calendar-legend-item>
	</ui5-calendar-legend>
</ui5-calendar>
<script>
	function updateCurrentDaySpecialType() {
		const currentDate = new Date();
		const day = currentDate.getDate();
		const month = currentDate.getMonth() + 1;
		const year = currentDate.getFullYear();

		const formattedMonth = month < 10 ? "0" + month : month.toString();
		const formattedDay = day < 10 ? "0" + day : day.toString();
		const newValue = year + "-" + formattedMonth + "-" + formattedDay;

		const specialDates = document.querySelectorAll("ui5-special-date");
		specialDates.forEach(specialDate => {
			specialDate.setAttribute("value", newValue);
			specialDate.setAttribute("type", "${ifDefined(args.type)}")
		});
	}
	updateCurrentDaySpecialType();
</script>
`;
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    type: "Type01",
    text: "Placeholder 01",
};
//# sourceMappingURL=CalendarLegendItem.stories.js.map