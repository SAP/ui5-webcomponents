import "../../dist/Assets.js";
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import DateRangePicker from "../../src/DateRangePicker.js";

describe("DateRangePicker general interaction", () => {
	afterEach(() => {
		// eslint-disable-next-line
		cy.wait(200);
	});
	it("Custom Validation Error", () => {
		cy.mount(<DateRangePicker formatPattern="dd/MM/yyyy"></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.realClick()
			.should("be.focused")
			.realType("invalid input")
			.realPress("Enter");

		cy.get("@dateRangePicker")
			.should("have.attr", "value-state", "Negative");
	});

	it("Custom Validation None", () => {
		cy.mount(<DateRangePicker formatPattern="dd/MM/yyyy"></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.realClick()
			.should("be.focused")
			.realType("09/09/2020 - 10/10/2020")
			.realPress("Enter");

		cy.get("@dateRangePicker")
			.should("have.attr", "value-state", "None");
	});

	it("Selected dates are updated after value update in the input field", () => {
		cy.mount(<DateRangePicker formatPattern="dd/MM/yyyy"></DateRangePicker>);

		const timestamp_9_Sep_2020 = 1599609600;

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.realClick()
			.should("be.focused")
			.realType("09/09/2020 - 10/10/2020")
			.realPress("Enter");

		cy.get<DateRangePicker>("@dateRangePicker")
			.shadow()
			.find("ui5-calendar")
			.shadow()
			.find("ui5-daypicker")
			.should("have.attr", "timestamp", timestamp_9_Sep_2020.toString());
	});

	it("Is delimiter set", () => {
		cy.mount(<DateRangePicker formatPattern="MMM d, y" delimiter="@"></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.realClick()
			.should("be.focused")
			.realType("Feb 25, 2022 @ Feb 28, 2022")
			.realPress("Enter");

		cy.get<DateRangePicker>("@dateRangePicker")
			.invoke("attr", "delimiter", "###")
			.should("have.attr", "value", "Feb 25, 2022 ### Feb 28, 2022");
	});

	it("startDateValue and endDateValue getter", () => {
		cy.mount(<DateRangePicker formatPattern="dd/MM/yyyy"></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.realClick()
			.should("be.focused")
			.realType("27/09/2019 - 10/10/2019")
			.realPress("Enter");

		cy.get<DateRangePicker>("@dateRangePicker")
			.then($datePicker => {
				cy.wrap({
					startDateValue: () => $datePicker[0].startDateValue,
					endDateValue: () => $datePicker[0].endDateValue
				})
					.as("dates")
					.invoke("startDateValue")
					.then(date => {
						const timestamp = date ? date.getTime() : new Date().getTime();
						expect(new Date(timestamp)).to.deep.equal(new Date(2019, 8, 27));
					});

				cy.get("@dates")
					.invoke("endDateValue")
					.then(date => {
						const timestamp = date ? date.getTime() : new Date().getTime();
						expect(new Date(timestamp as number)).to.deep.equal(new Date(2019, 9, 10));
					});
			});
	});

	it("Setting the same date for first & last is possible", () => {
		cy.mount(<DateRangePicker formatPattern="dd/MM/yyyy"></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.realClick()
			.should("be.focused")
			.realType("05/08/2020 - 05/08/2020")
			.realPress("Enter");

		cy.get<DateRangePicker>("@dateRangePicker")
			.then($el => {
				cy.wrap({
					startDateValue: () => $el[0].startDateValue,
					endDateValue: () => $el[0].endDateValue
				})
					.as("dates")
					.invoke("startDateValue")
					.then(date => {
						const timestamp = date ? date.getTime() : new Date().getTime();
						expect(new Date(timestamp)).to.deep.equal(new Date(2020, 7, 5));
					});

				cy.get("@dates")
					.invoke("endDateValue")
					.then(date => {
						const timestamp = date ? date.getTime() : new Date().getTime();
						expect(new Date(timestamp as number)).to.deep.equal(new Date(2020, 7, 5));
					});
			});
	});

	it("Change event fired once", () => {
		cy.mount(<DateRangePicker></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-calendar")
			.shadow()
			.find("ui5-daypicker")
			.shadow()
			.find(".ui5-dp-root .ui5-dp-content div > .ui5-dp-item")
			.as("items")
			.eq(5)
			.as("dayOne");

		cy.get("@items")
			.eq(15)
			.as("dayTwo");

		cy.get("@dateRangePicker")
			.shadow()
			.find("ui5-input")
			.realClick()
			.should("be.focused")
			.realPress("F4");

		cy.get("@dateRangePicker")
			.then($dateRangePicker => {
				$dateRangePicker.on("change", cy.stub().as("changeStub"));
			});

		cy.get("@dayOne").realClick();
		cy.get("@dayTwo").realClick();

		cy.get("@changeStub").should("be.calledOnce");
	});

	it("Page up/down increments/decrements the day value", () => {
		cy.mount(<DateRangePicker
			formatPattern="MMM d, y"
			value="Jul 16, 2020 @ Jul 29, 2020"
			delimiter="@">
		</DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.as("input")
			.realClick()
			.should("be.focused")
			.realPress("End")
			.realPress("PageDown");

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 28, 2020");

		cy.get("@input")
			.realPress("PageUp");

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 29, 2020");

		cy.get("@input")
			.realPress("Home")
			.realPress("PageDown");

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 15, 2020 @ Jul 29, 2020");

		cy.get("@input")
			.realPress("PageUp");

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 29, 2020");
	});

	it("Page up/down increments/decrements the month value", () => {
		cy.mount(<DateRangePicker
			formatPattern="MMM d, y"
			value="Jul 16, 2020 @ Jul 29, 2020"
			delimiter="@"
		></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.as("input")
			.realClick()
			.should("be.focused")
			.realPress("End")
			.realPress(["Shift", "PageUp"]);

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Aug 29, 2020");

		cy.get("@input")
			.realPress(["Shift", "PageDown"]);

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 29, 2020");

		cy.get("@input")
			.realPress("Home")
			.realPress(["Shift", "PageDown"]);

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jun 16, 2020 @ Jul 29, 2020");

		cy.get("@input")
			.realPress(["Shift", "PageUp"]);

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 29, 2020");
	});

	it("Page up/down increments/decrements the year value", () => {
		cy.mount(<DateRangePicker
			formatPattern="MMM d, y"
			value="Jul 16, 2020 @ Jul 29, 2020"
			delimiter="@">
		</DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.as("input")
			.realClick()
			.should("be.focused")
			.realPress("End")
			.realPress(["Control", "Shift", "PageUp"]);

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 29, 2021");

		cy.get("@input")
			.realPress(["Control", "Shift", "PageDown"]);

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 29, 2020");

		cy.get("@input")
			.realPress("Home")
			.realPress(["Control", "Shift", "PageDown"]);

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2019 @ Jul 29, 2020");

		cy.get("@input")
			.realPress(["Control", "Shift", "PageUp"]);

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 29, 2020");
	});

	it("Enter keyboard key confirms the date range in the input field", () => {
		cy.mount(<DateRangePicker formatPattern="MMM d, y" delimiter="@"></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.realClick()
			.should("be.focused")
			.realType("Jul 17, 2020 @ Jul 16, 2020")
			.realPress("Enter");

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 17, 2020");
	});

	it("Focus out of the input field confirms the date range", () => {
		cy.mount(<DateRangePicker formatPattern="MMM d, y" delimiter="@"></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.realClick()
			.should("be.focused")
			.realType("Jul 17, 2020 @ Jul 16, 2020")
			.realPress("Tab");

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 17, 2020");
	});

	it("Delimiter is part of the format pattern", () => {
		cy.mount(<DateRangePicker formatPattern="yyyy-MM-dd"></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.realClick()
			.should("be.focused")
			.realType("2020-09-09 - 2020-10-10")
			.realPress("Enter");

		cy.get("@dateRangePicker")
			.should("have.attr", "value-state", "None");
	});

	it("Month name changes on next button press", () => {
		cy.mount(<DateRangePicker value="09/09/2020 - 10/10/2020" formatPattern="dd/MM/yyyy"></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-calendar")
			.as("calendar")
			.shadow()
			.find(".ui5-calheader")
			.as("calendarHeader");

		cy.get("@dateRangePicker")
			.shadow()
			.find("ui5-input")
			.realClick()
			.should("be.focused")
			.realPress("F4");

		cy.get("@calendarHeader")
			.find("[data-ui5-cal-header-btn-next]")
			.realClick()
			.should("be.visible");

		cy.get("@calendarHeader")
			.find("[data-ui5-cal-header-btn-month]")
			.as("monthButton")
			.should("have.text", "October");
	});

	it("startDateValue and endDateValue getters when only start date is present", () => {
		cy.mount(<DateRangePicker value="27/09/2019" formatPattern="dd/MM/yyyy"></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.then($datePicker => {
				cy.wrap({
					startDateValue: () => $datePicker[0].startDateValue,
					endDateValue: () => $datePicker[0].endDateValue
				})
					.as("dates")
					.invoke("startDateValue")
					.then(date => {
						const timestamp = date ? date.getTime() : new Date().getTime();
						expect(new Date(timestamp)).to.deep.equal(new Date(2019, 8, 27));
					});

				cy.get("@dates")
					.invoke("endDateValue")
					.then(date => {
						expect(date.toString()).to.be.equal("Invalid Date");
					});
			});
	});

	it("Picker popover should have accessible name", () => {
		cy.mount(<DateRangePicker></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.realClick()
			.should("be.focused")
			.realPress("F4");

		cy.get("@dateRangePicker")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.attr", "accessible-name", "Choose Date Range");
	});

	it("Selected days: accessibility semantics", () => {
		cy.wrap({ setLanguage })
			.invoke("setLanguage", "en");

		cy.mount(<DateRangePicker formatPattern="dd/MM/yyyy"></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.realClick()
			.should("be.focused")
			.realType("09/06/2024 - 15/06/2024")
			.realPress("Enter")
			.realPress("F4");

		cy.get<DateRangePicker>("@dateRangePicker")
			.shadow()
			.find("ui5-calendar")
			.shadow()
			.find("ui5-daypicker")
			.shadow()
			.find(".ui5-dp-root .ui5-dp-content div > .ui5-dp-item")
			.then(days => {
				const startSelectionDay = days[14];
				const dayInBetween = days[15];
				const endSelectionDay = days[20];

				expect(startSelectionDay).to.have.attr("aria-selected", "true");
				expect(dayInBetween).to.have.attr("aria-selected", "true");
				expect(endSelectionDay).to.have.attr("aria-selected", "true");
			});
	});

	it("Min and max dates are set without format-pattern by using ISO (YYYY-MM-dd) format", () => {
		cy.wrap({ setLanguage })
			.invoke("setLanguage", "bg");

		cy.mount(<DateRangePicker minDate="2023-02-10" maxDate="2023-07-22"></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.shadow()
			.find("input")
			.realClick()
			.should("be.focused")
			.realType("10.02.2023 - 25.07.2023")
			.realPress("Enter");

		cy.get("@dateRangePicker")
			.should("have.attr", "value-state", "Negative");
	});

	it("Should open month picker if format-pattern is 'MM.yyyy'", () => {
		cy.mount(<DateRangePicker formatPattern="MM.yyyy"></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.realClick()
			.should("be.focused")
			.realPress("F4");

		cy.get("@dateRangePicker")
			.shadow()
			.find("ui5-calendar")
			.shadow()
			.find("ui5-monthpicker")
			.should("exist")
			.and("be.visible");
	});

	it("Select month range in MonthPicker", () => {
		cy.wrap({ setLanguage })
			.invoke("setLanguage", "en");

		cy.mount(<DateRangePicker formatPattern="MM.yyyy"></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.realClick()
			.should("be.focused")
			.realType("09.2024 - 11.2024")
			.realPress("Enter")
			.realPress("F4");

		cy.get<DateRangePicker>("@dateRangePicker")
			.shadow()
			.find("ui5-calendar")
			.shadow()
			.find("ui5-monthpicker")
			.shadow()
			.find(".ui5-mp-root .ui5-mp-item")
			.then(months => {
				const startSelectionMonth = months[8];
				const monthInBetween = months[9];
				const endSelectionMonth = months[10];

				expect(startSelectionMonth).to.have.class("ui5-mp-item--selected");
				expect(monthInBetween).to.have.class("ui5-mp-item--selected-between");
				expect(endSelectionMonth).to.have.class("ui5-mp-item--selected");
			});
	});

	it("Should open year picker if format-pattern is 'yyyy'", () => {
		cy.mount(<DateRangePicker formatPattern="yyyy"></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.realClick()
			.should("be.focused")
			.realPress("F4");

		cy.get("@dateRangePicker")
			.shadow()
			.find("ui5-calendar")
			.shadow()
			.find("ui5-yearpicker")
			.should("exist")
			.and("be.visible");
	});

	it("Select year range in YearPicker", () => {
		cy.wrap({ setLanguage })
			.invoke("setLanguage", "en");

		cy.mount(<DateRangePicker formatPattern="yyyy"></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("ui5-input")
			.realClick()
			.should("be.focused")
			.realType("0001 - 0006")
			.realPress("Enter")
			.realPress("F4");

		cy.get<DateRangePicker>("@dateRangePicker")
			.shadow()
			.find("ui5-calendar")
			.shadow()
			.find("ui5-yearpicker")
			.shadow()
			.find(".ui5-yp-root .ui5-yp-item")
			.then(years => {
				const startSelectionYear = years[0];
				const yearInBetween = years[4];
				const endSelectionYear = years[5];

				expect(startSelectionYear).to.have.class("ui5-yp-item--selected");
				expect(yearInBetween).to.have.class("ui5-yp-item--selected-between");
				expect(endSelectionYear).to.have.class("ui5-yp-item--selected");
			});
	});
});
