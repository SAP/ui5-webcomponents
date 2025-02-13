import DateTimePicker from "../../src/DateTimePicker.js";

function DefaultDateTimePicker() {
	return (
		<DateTimePicker id="dt" />
	);
}

function DateTimePickerWithMinutes() {
	return <DateTimePicker
		id="dtMinutes"
		formatPattern="dd/MM/yyyy, hh:mm a"
		value="13/04/2020, 09:16 AM"/>;
}

function DateTimePickerWithSeconds({ initialValue }: { initialValue: string }) {
	return (
		<>
			<DateTimePicker
				id="dtSeconds"
				formatPattern="dd/MM/yyyy, hh:mm:ss a"
				value={initialValue || "13/04/2020, 03:16:16 AM"}
			/>
		</>
	);
}
describe("DateTimePicker general interaction", () => {
	it("tests picker opens/closes programmatically", () => {
		cy.mount(<DefaultDateTimePicker />);

		cy.ui5DateTimePickerOpen("#dt");
		cy.ui5DateTimePickerIsOpen("#dt").should("equal", true);
		cy.ui5DateTimePickerClose("#dt");
		cy.ui5DateTimePickerIsOpen("#dt").should("equal", false);
	});

	it("tests selection of new date/time", () => {
		const PREVIOUS_VALUE = "13/04/2020, 03:16:16 AM";

		cy.mount(<DateTimePickerWithSeconds initialValue={PREVIOUS_VALUE} />);

		cy.ui5DateTimePickerOpen("#dtSeconds");

		cy.get("#dtSeconds")
			.shadow()
			.find("ui5-input")
			.should("have.value", PREVIOUS_VALUE);

		cy.ui5DateTimePickerGetPicker("#dtSeconds").within(() => {
			// Select the next day (click on the currently selected day, then ArrowRight and Space).
			cy.get("ui5-calendar")
				.shadow()
				.find("ui5-daypicker")
				.shadow()
				.find(".ui5-dp-item--selected")
				.realClick();
			cy.realPress("ArrowRight");
			cy.realPress("Space");

			cy.get("ui5-time-selection-clocks")
				.shadow()
				.find(`ui5-toggle-spin-button[data-ui5-clock="hours"]`)
				.realClick();
			cy.realPress("ArrowDown");
			cy.realPress("Space");

			// Adjust minutes.
			cy.realPress("ArrowDown");
			cy.realPress("ArrowDown");
			cy.realPress("Space");

			// Adjust seconds.
			cy.realPress("ArrowUp");
			cy.realPress("ArrowUp");
			cy.realPress("ArrowUp");
			cy.realType("p");

			// Confirm.
			cy.get("#ok").realClick();
		});

		cy.get("#dtSeconds")
			.shadow()
			.find("ui5-input")
			.invoke("prop", "value")
			.should("equal", "14/04/2020, 02:14:19 PM");
	});

	it("tests selection of new date without changing the time section", () => {
		const PREVIOUS_VALUE = "14/04/2020, 02:14:19 PM";
		cy.mount(<DateTimePickerWithSeconds initialValue={PREVIOUS_VALUE} />);

		cy.get("#dtSeconds")
			.shadow()
			.find("ui5-input")
			.should("have.value", PREVIOUS_VALUE);

		// Simulate keyboard interactions
		cy.realPress("Tab");
		cy.realPress(["Shift", "Tab"]);
		cy.realPress("Backspace");
		cy.get("#dtSeconds")
			.shadow()
			.find("ui5-input")
			.realClick();
		cy.realType("wrongtext");
		cy.realPress("Tab");

		cy.ui5DateTimePickerOpen("#dtSeconds");

		// Act
		let selectedDate: string;
		cy.ui5DateTimePickerGetPicker("#dtSeconds").within(() => {
			cy.get("ui5-calendar")
				.shadow()
				.find("ui5-daypicker")
				.shadow()
				.find(".ui5-dp-item--now")
				.then($el => {
					const timestamp = $el.attr("data-sap-timestamp") || "";
					const date = new Date(parseInt(timestamp) * 1000);
					selectedDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
				})
				.realClick();

			cy.get("#ok").realClick();
		});

		cy.get("#dtSeconds")
			.shadow()
			.find("ui5-input")
			.invoke("prop", "value")
			.should(val => {
				expect(val).to.include(selectedDate);
			});
	});

	it("tests time controls for dtSeconds picker", () => {
		const expectedClocksCount = 3;
		const expectedPeriodCount = 1;

		cy.mount(<DateTimePickerWithSeconds initialValue="13/04/2020, 03:16:16 AM" />);

		cy.ui5DateTimePickerOpen("#dtSeconds");

		cy.ui5DateTimePickerTimeSelectionClocksCount("#dtSeconds").then(clocksCount => {
			expect(clocksCount).to.equal(expectedClocksCount,
				"The picker should display 3 clocks for hours, minutes and seconds.");
		});

		cy.ui5DateTimePickerPeriodSegmentedButtonCount("#dtSeconds").then(periodCount => {
			expect(periodCount).to.equal(expectedPeriodCount,
				"The picker should display 1 period selector.");
		});

		cy.ui5DateTimePickerClose("#dtSeconds");
	});

	it("tests time controls for dtMinutes picker", () => {
		const expectedClocksCount = 2;
		const expectedPeriodCount = 1;

		cy.mount(<DateTimePickerWithMinutes />);

		cy.ui5DateTimePickerOpen("#dtMinutes");

		// Verify the number of clock controls and period selector via new commands
		cy.ui5DateTimePickerTimeSelectionClocksCount("#dtMinutes").then(clocksCount => {
			expect(clocksCount).to.equal(expectedClocksCount,
				"The picker should display 2 clocks for hours and minutes.");
		});

		cy.ui5DateTimePickerPeriodSegmentedButtonCount("#dtMinutes").then(periodCount => {
			expect(periodCount).to.equal(expectedPeriodCount,
				"The picker should display 1 period selector.");
		});

		cy.ui5DateTimePickerClose("#dtMinutes");
	});

	it("tests hours clock is active on picker open", () => {
		cy.mount(<DefaultDateTimePicker />);
		cy.ui5DateTimePickerOpen("#dt");

		cy.ui5DateTimePickerGetPicker("#dt").within(() => {
			cy.get("ui5-time-selection-clocks")
				.shadow()
				.find(`ui5-time-picker-clock[data-ui5-clock="hours"]`)
				.invoke("prop", "active")
				.should("equal", true);
		});

		cy.ui5DateTimePickerClose("#dt");
	});

	it("tests selection of 12:34:56 AM", () => {
		cy.mount(<DateTimePickerWithSeconds initialValue="13/04/2020, 03:16:16 AM" />);

		cy.ui5DateTimePickerOpen("#dtSeconds");

		cy.ui5DateTimePickerGetPicker("#dtSeconds").within(() => {
			cy.get("ui5-time-selection-clocks")
				.shadow()
				.find(`ui5-toggle-spin-button[data-ui5-clock="hours"]`)
				.click();
			cy.realType("123456a"); // select 12:34:56 AM
			cy.get("#ok").click();
		});

		cy.get("#dtSeconds")
			.shadow()
			.find("ui5-input")
			.invoke("prop", "value")
			.should("equal", "13/04/2020, 12:34:56 AM");
	});

	it("tests selection of 12:34:56 PM", () => {
		cy.mount(<DateTimePickerWithSeconds initialValue="13/04/2020, 03:16:16 AM" />);

		cy.ui5DateTimePickerOpen("#dtSeconds");

		cy.ui5DateTimePickerGetPicker("#dtSeconds").within(() => {
			cy.get("ui5-time-selection-clocks")
				.shadow()
				.find(`ui5-toggle-spin-button[data-ui5-clock="hours"]`)
				.click();
			cy.realType("123456p"); // select 12:34:56 PM
			cy.get("#ok").click();
		});

		cy.get("#dtSeconds")
			.shadow()
			.find("ui5-input")
			.invoke("prop", "value")
			.should("equal", "13/04/2020, 12:34:56 PM");
	});

	it("tests change event is prevented on submit when prevent default is called", () => {
		cy.mount(<DefaultDateTimePicker />);

		// Prevent default behavior of ui5-change event.
		cy.get("#dt").then($el => {
			$el[0].addEventListener("ui5-change", (ev: Event) => {
				ev.preventDefault();
			});
		});

		cy.ui5DateTimePickerOpen("#dt");

		cy.ui5DateTimePickerGetPicker("#dt").within(() => {
			// Click the focused day and confirm the selection.
			cy.get("ui5-calendar")
				.shadow()
				.find("ui5-daypicker")
				.shadow()
				.find("[data-sap-focus-ref]")
				.click();
			cy.get("#ok").click();
		});

		cy.get("#dt")
			.shadow()
			.find("ui5-input")
			.invoke("prop", "value")
			.should("equal", "");
	});

	it("Min and max dates are set, with no format pattern provided, using valid ISO format", () => {
		cy.mount(
			<DateTimePicker
				id="dtMinMaxDatesISO"
				minDate="2023-05-01"
				maxDate="2023-05-31"
			></DateTimePicker>
		);

		cy.ui5DateTimePickerOpen("#dtMinMaxDatesISO");

		cy.ui5DateTimePickerGetPicker("#dtMinMaxDatesISO").within(() => {
			cy.get("ui5-calendar")
				.shadow()
				.find(".ui5-calheader")
				.find("div[data-ui5-cal-header-btn-prev]")
				.should("have.class", "ui5-calheader-arrowbtn-disabled");

			cy.get("ui5-calendar")
				.shadow()
				.find(".ui5-calheader")
				.find("div[data-ui5-cal-header-btn-next]")
				.should("have.class", "ui5-calheader-arrowbtn-disabled");
		});
	});

	it("picker popover should have accessible name", () => {
		cy.mount(<DefaultDateTimePicker />);
		cy.ui5DateTimePickerOpen("#dt");

		cy.ui5DateTimePickerGetPicker("#dt")
			.invoke("attr", "accessible-name")
			.should("equal", "Choose Date and Time");

		cy.ui5DateTimePickerClose("#dt");
	});
});
