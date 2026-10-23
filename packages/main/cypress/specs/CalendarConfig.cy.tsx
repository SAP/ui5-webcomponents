import Calendar from "../../src/Calendar.js";
import YearPicker from "../../src/YearPicker.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
import { resetConfiguration } from "@ui5/webcomponents-base/dist/InitialConfiguration.js";

const configureCalendarTypes = (calendarType: string, secondaryCalendarType: string) => {
	cy.window()
		.then($el => {
			const scriptElement = $el.document.createElement("script");
			scriptElement.type = "application/json";
			scriptElement.setAttribute("data-ui5-config", "true");
			scriptElement.innerHTML = JSON.stringify({ calendarType, secondaryCalendarType });

			$el.document.head.append(scriptElement);
		});

	cy.wrap({ resetConfiguration })
		.invoke("resetConfiguration", true);
};

describe("Calendar general interaction", () => {
	afterEach(() => {
		cy.window()
			.then($el => {
				$el.document.head.querySelector("script[data-ui5-config]")?.remove();
			});

		cy.wrap({ resetConfiguration })
			.invoke("resetConfiguration", true);
	});

	it("Calendar type configured", () => {
		configureCalendarTypes("Islamic", "Gregorian");

		cy.mount(<Calendar></Calendar>);

		cy.get("[ui5-calendar]")
			.should("not.have.prop", "primaryCalendarType");

		cy.get("[ui5-calendar]")
			.should("not.have.prop", "secondaryCalendarType");

		cy.get("[ui5-calendar]")
			.should("have.prop", "_primaryCalendarType", "Islamic")

		cy.get("[ui5-calendar]")
			.should("have.prop", "_secondaryCalendarType", "Gregorian");
	});

	it("Year Picker shows correct range when secondary calendar type is configured globally", () => {
		configureCalendarTypes("Gregorian", "Islamic");

		cy.mount(<Calendar timestamp={Date.UTC(2024, 5, 1) / 1000}></Calendar>);

		cy.get<Calendar>("[ui5-calendar]")
			.as("calendar");

		// Secondary type is resolved from the global config, not from an attribute
		cy.get("@calendar")
			.should("not.have.prop", "secondaryCalendarType");
		
		cy.get("@calendar")
			.should("have.prop", "_secondaryCalendarType", "Islamic");

		cy.get<Calendar>("@calendar")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.realClick();

		cy.get<Calendar>("@calendar")
			.shadow()
			.find("[ui5-yearpicker]")
			.as("yearPicker");

		// The two-calendar-type grid renders 8 years
		cy.get<YearPicker>("@yearPicker")
			.shadow()
			.find(".ui5-yp-item")
			.should("have.length", 8);

		// The currently selected year (2024) must be present in the grid
		cy.get<YearPicker>("@yearPicker")
			.shadow()
			.find(".ui5-yp-item .ui5-dp-yeartext")
			.should("contain.text", "2024");

		// The first rendered year is 2022 (selected year is the 3rd cell)
		cy.get<YearPicker>("@yearPicker")
			.shadow()
			.find(".ui5-yp-item")
			.first()
			.find(".ui5-dp-yeartext")
			.should("have.text", "2022");
	});
});
