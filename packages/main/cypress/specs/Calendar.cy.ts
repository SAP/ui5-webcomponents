import { html } from "lit";
import type Calendar from "../../src/Calendar.js";
import "../../src/Calendar.js";
import "../../src/Button.js";
import "../../src/CalendarDate.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";

const getDefaultCalendar = (date: Date) => {
	const calDate = new Date(date);
	const formattedDate = calDate.toLocaleDateString("default", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	return html`
		<ui5-calendar id="calendar1" timestamp="${calDate.valueOf() / 1000}">
			<ui5-date value="${formattedDate}"></ui5-date>
		</ui5-calendar>
	`;
};

const getCalendarsWithWeekNumbers = () => html`
			<ui5-calendar id="calendar1" calendar-week-numbering="ISO_8601">
				<ui5-date value="Jan 1, 2023"></ui5-date>
			</ui5-calendar>

			<ui5-calendar id="calendar2" calendar-week-numbering="MiddleEastern">
				<ui5-date value="Jan 1, 2023"></ui5-date>
			</ui5-calendar>

			<ui5-calendar id="calendar3" calendar-week-numbering="WesternTraditional">
				<ui5-date value="Jan 1, 2023"></ui5-date>
			</ui5-calendar>
			`;

describe("Calendar general interaction", () => {
	it("Focus goes into the current day item of the day picker", () => {
		const date = new Date(Date.UTC(2000, 10, 22, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(`div[data-sap-timestamp=974851200]`)
			.should("have.focus");

		cy.focused().realPress("Tab");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.should("have.focus");

		cy.focused().realPress("Tab");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.should("have.focus");

		cy.focused().realPress(["Shift", "Tab"]);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.should("have.focus");

		cy.focused().realPress(["Shift", "Tab"]);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(`div[data-sap-timestamp=974851200]`)
			.should("have.focus");
	});

	it("Calendar focuses the selected year when yearpicker is opened", () => {
		const YEAR = 1997;
		const date = Date.UTC(YEAR);
		cy.mount(getDefaultCalendar(new Date(date)));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.click();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-yearpicker]")
			.shadow()
			.find("[tabindex='0']")
			.invoke("attr", "data-sap-timestamp")
			.then(_timestamp => {
				const focusedYear = new Date(parseInt(_timestamp!) * 1000).getUTCFullYear();
				expect(focusedYear).to.equal(1997);
			});
	});

	it("Calendar focuses the selected month when monthpicker is opened with space", () => {
		const date = new Date(Date.UTC(2000, 10, 22, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(`div[data-sap-timestamp=974851200]`)
			.click();

		cy.focused().realPress("Tab");
		cy.focused().realPress("Space");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-monthpicker]")
			.should("not.have.attr", "hidden");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-monthpicker]")
			.shadow()
			.find("[tabindex='0']")
			.invoke("attr", "data-sap-timestamp")
			.then(_timestamp => {
				const focusedMonth = new Date(parseInt(_timestamp!) * 1000).getUTCMonth();
				expect(focusedMonth).to.equal(10);
			});
	});

	it("Calendar focuses the selected year when yearpicker is opened with space", () => {
		const date = new Date(Date.UTC(2000, 10, 22, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(`div[data-sap-timestamp=974851200]`)
			.click();

		cy.focused().realPress("Tab");
		cy.focused().realPress("Tab");
		cy.focused().realPress("Space");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-yearpicker]")
			.should("not.have.attr", "hidden");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-yearpicker]")
			.shadow()
			.find("[tabindex='0']")
			.invoke("attr", "data-sap-timestamp")
			.then(_timestamp => {
				const focusedYear = new Date(parseInt(_timestamp!) * 1000).getUTCFullYear();
				expect(focusedYear).to.equal(2000);
			});
	});

	it("Calendar doesn't mark year as selected when there are no selected dates", () => {
		cy.mount(html`<ui5-calendar id="calendar2"></ui5-calendar>`);

		cy.get<Calendar>("#calendar2")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.click();

		cy.get<Calendar>("#calendar2")
			.shadow()
			.find("[ui5-yearpicker]")
			.shadow()
			.find(`[data-sap-timestamp=1738195200]`)
			.should("have.focus")
			.should("not.have.class", "ui5-yp-item--selected");
	});

	it("Calendar doesn't mark month as selected when there are no selected dates", () => {
		cy.mount(html`<ui5-calendar id="calendar2"></ui5-calendar>`);

		cy.get<Calendar>("#calendar2")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.click();

		cy.get<Calendar>("#calendar2")
			.shadow()
			.find("[ui5-monthpicker]")
			.shadow()
			.find(`[data-sap-timestamp=1738195200]`)
			.should("have.focus")
			.should("not.have.class", "ui5-mp-item--selected");
	});

	it("Page up/down increments/decrements the month value", () => {
		const date = new Date(Date.UTC(2000, 10, 1, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find("[tabindex='0']")
			.click();

		cy.focused().realPress("PageUp");

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));
			});

		cy.focused().realPress("PageDown");

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(2000, 10, 1, 0, 0, 0)));
			});
	});

	it("Shift + Page up/down increments/decrements the year value by one", () => {
		const date = new Date(Date.UTC(2000, 10, 1, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find("[tabindex='0']")
			.click();

		cy.focused().realPress(["Shift", "PageUp"]);

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(1999, 10, 1, 0, 0, 0)));
			});

		cy.focused().realPress(["Shift", "PageDown"]);

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(2000, 10, 1, 0, 0, 0)));
			});
	});

	it("Ctrl + Shift + Page up/down increments/decrements the year value by ten", () => {
		const date = new Date(Date.UTC(2000, 10, 1, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find("[tabindex='0']")
			.click();

		cy.focused().realPress(["Control", "Shift", "PageUp"]);

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(1990, 10, 1, 0, 0, 0)));
			});

		cy.focused().realPress(["Control", "Shift", "PageDown"]);

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(2000, 10, 1, 0, 0, 0)));
			});
	});

	it("Page up/down increments/decrements the year value in the month picker", () => {
		const date = new Date(Date.UTC(2000, 9, 1, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find("[tabindex='0']")
			.click();

		cy.focused().realPress("F4");
		cy.focused().realPress("PageUp");

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(1999, 9, 1, 0, 0, 0)));
			});

		cy.focused().realPress("PageDown");

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));
			});
	});

	it("Page up/down increments/decrements the year range in the year picker", () => {
		const date = new Date(Date.UTC(2000, 9, 1, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find("[tabindex='0']")
			.click();

		cy.focused().realPress(["Shift", "F4"]);
		cy.focused().realPress("PageUp");

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(1980, 9, 1, 0, 0, 0)));
			});

		cy.focused().realPress("PageDown");

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));
			});
	});

	it("Calendar with 'Multiple' selection type", () => {
		cy.mount(html`<ui5-calendar id="calendar1" selection-mode="Multiple"></ui5-calendar>`);
		const timestamp = new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000;

		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		const timestamps = [971136000, 971222400, 971308800];

		timestamps.forEach(_timestamp => {
			cy.get<Calendar>("#calendar1")
				.shadow()
				.find("[ui5-daypicker]")
				.shadow()
				.find(`[data-sap-timestamp=${_timestamp}]`)
				.first()
				.as("date");

			cy.get("@date").click();
			cy.get("@date").should("have.class", "ui5-dp-item--selected");
		});

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "selectedDates")
			.then(selectedDates => {
				expect(selectedDates.sort()).to.deep.equal(timestamps.sort());
			});
	});

	it("Keyboard navigation works properly, when calendar selection type is set to 'Multiple'", () => {
		cy.mount(html`
			<ui5-calendar id="calendar1" selection-mode="Multiple"></ui5-calendar>
		`);
		const timestamp = new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000;

		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(`[data-sap-timestamp=${timestamp}]`)
			.first()
			.focus();

		// Select the focused date
		cy.focused().realPress("Space");

		// Deselect the focused date
		cy.focused().realPress("Space");
		cy.focused().realPress("ArrowRight");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(`[data-sap-timestamp=971222400]`)
			.should("have.focus");
	});

	it("Calendar with 'Range' selection type", () => {
		cy.mount(html`<ui5-calendar id="calendar1" selection-mode="Range"></ui5-calendar>`);
		const timestamp = new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000;

		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		const timestamps = [971740800, 971827200, 971913600];

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(`[data-sap-timestamp=${timestamps[0]}]`)
			.first()
			.click();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(`[data-sap-timestamp=${timestamps[2]}]`)
			.first()
			.click();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(`[data-sap-timestamp=${timestamps[0]}]`)
			.should("have.class", "ui5-dp-item--selected");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(`[data-sap-timestamp=${timestamps[1]}]`)
			.should("have.class", "ui5-dp-item--selected-between");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(`[data-sap-timestamp=${timestamps[2]}]`)
			.should("have.class", "ui5-dp-item--selected");

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "selectedDates")
			.then(selectedDates => {
				expect(selectedDates.sort()).to.deep.equal([timestamps[0], timestamps[2]].sort());
			});
	});

	it("Previous and next buttons are disabled when necessary", () => {
		cy.mount(html`
			<ui5-calendar id="calendar1" format-pattern="dd/MM/yyyy" min-date="7/7/2020" max-date="20/10/2020">
				<ui5-date value="08/07/2020"></ui5-date>
			</ui5-calendar>
		`);
		const timestamp = 1594166400;

		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-prev]")
			.should("have.class", "ui5-calheader-arrowbtn-disabled");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-next]")
			.should("not.have.class", "ui5-calheader-arrowbtn-disabled")
			.click();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-prev]")
			.should("not.have.class", "ui5-calheader-arrowbtn-disabled");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-next]")
			.should("not.have.class", "ui5-calheader-arrowbtn-disabled");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-next]")
			.click();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-next]")
			.click();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-prev]")
			.should("not.have.class", "ui5-calheader-arrowbtn-disabled");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-next]")
			.should("have.class", "ui5-calheader-arrowbtn-disabled");
	});

	it("Second month and year are rendered in the header", () => {
		cy.mount(html`<ui5-calendar id="calendar1" primary-calendar-type="Islamic" secondary-calendar-type="Gregorian"></ui5-calendar>`);
		const timestamp = new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000;

		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-month] > span")
			.should("have.length", 2);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-year] > span")
			.should("have.length", 2);
	});

	it("Buttons for month and year in header are rendered with correct value", () => {
		cy.mount(html`<ui5-calendar id="calendar1" primary-calendar-type="Islamic" secondary-calendar-type="Gregorian"></ui5-calendar>`);
		const timestamp = new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000;

		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.find("span")
			.should(spans => {
				expect(spans[0].textContent).to.equal("Rajab");
				expect(spans[1].textContent).to.equal("Sep – Oct");
			});

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.find("span")
			.then(spans => {
				expect(spans[0].textContent).to.equal("1421 AH");
				expect(spans[1].textContent).to.equal("2000");
			});
	});

	it("Calendar render two type for Month when MonthPicker is opened", () => {
		cy.mount(html`<ui5-calendar id="calendar1" primary-calendar-type='Islamic' secondary-calendar-type='Gregorian'></ui5-calendar>`);
		const timestamp = new Date(Date.UTC(2000, 0, 1, 0, 0, 0)).valueOf() / 1000;

		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.click();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-monthpicker]")
			.shadow()
			.find(".ui5-mp-item")
			.first()
			.find("span")
			.should("have.length", 2)
			.then(spans => {
				expect(spans[0]).to.have.text("Muharram");
				expect(spans[1]).to.have.text("Apr – May");
			});
	});

	it("Calendar render two type for Year when Year Picker is opened", () => {
		cy.mount(html`<ui5-calendar id="calendar1" primary-calendar-type='Islamic' secondary-calendar-type='Gregorian'></ui5-calendar>`);
		const timestamp = new Date(Date.UTC(2000, 0, 1, 0, 0, 0)).valueOf() / 1000;

		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.click();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-yearpicker]")
			.shadow()
			.find(".ui5-yp-item")
			.should("have.length", 8)
			.first()
			.find("span")
			.should("have.length", 2)
			.then(spans => {
				expect(spans[0]).to.have.text("1416 AH");
				expect(spans[1]).to.have.text("1995 - 1996");
			});
	});

	it("Min and max dates are set without format-pattern by using ISO (YYYY-MM-dd) format", () => {
		const maxDate = new Date(Date.UTC(2024, 9, 4, 0, 0, 0)).toISOString().split("T")[0];
		cy.mount(html`<ui5-calendar id="calendar1" max-date="${maxDate}"></ui5-calendar>`);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.click();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-yearpicker]")
			.shadow()
			.find(".ui5-yp-root .ui5-yp-item")
			.eq(11) // year 2025
			.should("have.class", "ui5-yp-item--disabled");
	});

	it("Min and max dates are NOT set without format-pattern, because are not in ISO format (YYYY-MM-dd)", () => {
		const maxDate = new Date(Date.UTC(2024, 9, 4, 0, 0, 0)).toString();
		cy.mount(html`<ui5-calendar id="calendar1" max-date="${maxDate}" min-date="25.10.2018"></ui5-calendar>`);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.click();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-yearpicker]")
			.shadow()
			.find(".ui5-yp-root .ui5-yp-item")
			.eq(3) // year 2016
			.should("not.have.class", "ui5-yp-item--disabled");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-yearpicker]")
			.shadow()
			.find(".ui5-yp-root .ui5-yp-item")
			.eq(10) // year 2024
			.should("not.have.class", "ui5-yp-item--disabled");
	});

	it("Focus goes into first selected day of the range selection", () => {
		cy.mount(html`
			<ui5-calendar id="calendar1" primary-calendar-type="Gregorian" 
				secondary-calendar-type="Gregorian" selection-mode="Range">
				<ui5-date-range start-value="Jan 20, 2021" end-value="Jan 30, 2021"></ui5-date-range>
			</ui5-calendar>`);

		const timestamp = new Date(Date.UTC(2021, 0, 20, 0, 0, 0)).valueOf() / 1000; // 1611100800

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.click();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-monthpicker]")
			.shadow()
			.find(`[data-sap-timestamp=${timestamp}]`)
			.click();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(`div[data-sap-timestamp=${timestamp}]`)
			.should("have.focus");
	});

	it("Special date respects format-pattern given to the calendar", () => {
		cy.mount(html`
			<ui5-calendar id="calendar1" format-pattern="ddMMyyyy" min-date="01072020" max-date="21102020">
				<ui5-special-date slot="specialDates" type="Type01" value="07102020"></ui5-special-date>
			</ui5-calendar>`);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-root")
			.find("div[data-ui5-special-day]")
			.should("have.length", 1);
	});

	it("Check calendar week numbers with specific CalendarWeekNumbering configuration", () => {
		cy.mount(getCalendarsWithWeekNumbers());

		// Check first week number in ISO_8601 calendar
		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-weekname")
			.first()
			.should("have.text", "52");

		// Check first week number in MiddleEastern calendar
		cy.get<Calendar>("#calendar2")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-weekname")
			.first()
			.should("have.text", "1");

		// Check first week number in WesternTraditional calendar
		cy.get<Calendar>("#calendar3")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-weekname")
			.first()
			.should("have.text", "1");
	});

	it("Check calendar week day names with specific CalendarWeekNumbering configuration", () => {
		cy.mount(getCalendarsWithWeekNumbers());
		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-firstday")
			.first()
			.should("have.text", "Mon");

		cy.get<Calendar>("#calendar2")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-firstday")
			.first()
			.should("have.text", "Sat");

		cy.get<Calendar>("#calendar3")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-firstday")
			.first()
			.should("have.text", "Sun");
	});
});
