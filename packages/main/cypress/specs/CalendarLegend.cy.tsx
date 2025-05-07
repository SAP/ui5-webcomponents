import Calendar from "../../src/Calendar.js";
import CalendarDate from "../../src/CalendarDate.js";
import CalendarLegend from "../../src/CalendarLegend.js";
import CalendarLegendItem from "../../src/CalendarLegendItem.js";
import SpecialCalendarDate from "../../src/SpecialCalendarDate.js";

const getCalendarWithLegend = () => {
	return (
		<Calendar id="calendar1">
			<CalendarDate value="Mar 31, 2024"></CalendarDate>
			<SpecialCalendarDate slot="specialDates" value="Mar 30, 2024" type="Type01"></SpecialCalendarDate>
			<SpecialCalendarDate slot="specialDates" value="Mar 29, 2024" type="Type02"></SpecialCalendarDate>

			<CalendarLegend slot="calendarLegend" id="calendarLegend">
				<CalendarLegendItem type="Type01" text="Placeholder 01"></CalendarLegendItem>
				<CalendarLegendItem type="Type02" text="Placeholder 02"></CalendarLegendItem>
			</CalendarLegend>
		</Calendar>
	);
};

describe("Calendar Legend tests", () => {
	it("Calendar legend hides Today and Selected, when hideToday and hideSelectedDay properties are provided", () => {
		cy.mount(getCalendarWithLegend());

		cy.get<CalendarLegend>("#calendarLegend")
			.shadow()
			.find(".ui5-calendar-legend-root")
			.find("[ui5-calendar-legend-item]")
			.should("have.length", 4);

		cy.get<CalendarLegend>("#calendarLegend").invoke("prop", "hideToday", true);

		cy.get<CalendarLegend>("#calendarLegend")
			.shadow()
			.find(".ui5-calendar-legend-root")
			.find("[ui5-calendar-legend-item]")
			.should("have.length", 3);

		cy.get<CalendarLegend>("#calendarLegend").invoke("prop", "hideSelectedDay", true);

		cy.get<CalendarLegend>("#calendarLegend")
			.shadow()
			.find(".ui5-calendar-legend-root")
			.find("[ui5-calendar-legend-item]")
			.should("have.length", 2);
	});

	it("Focusing item in the legend and then focus out, reset filtered days", () => {
		cy.mount(getCalendarWithLegend());

		cy.get<CalendarLegend>("#calendarLegend")
			.find("ui5-calendar-legend-item[type='Type01']")
			.realClick();

		cy.get("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find("[data-ui5-special-day]")
			.should("have.length", 1);

		cy.get<CalendarLegend>("#calendarLegend")
			.find("ui5-calendar-legend-item[type='Type01']")
			.realClick()
			.realClick()
			.realPress("ArrowUp")
			.realPress("ArrowUp");

		cy.get("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find("[data-ui5-special-day]")
			.should("have.length", 2);
	});
});
