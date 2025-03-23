import DateTimePicker from "../../src/DateTimePicker.js";
import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";

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

function DateTimePickerWithSeconds({ initialValue }: { initialValue?: string }) {
	return (
		<DateTimePicker
			id="dtSeconds"
			formatPattern="dd/MM/yyyy, hh:mm:ss a"
			value={initialValue || "13/04/2020, 03:16:16 AM"}
		/>
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

	// Unstable but valid test, needs to be individually observed
	it.skip("tests selection of new date", () => {
		setAnimationMode(AnimationMode.None);
		const PREVIOUS_VALUE = "13/04/2020, 03:16:16 AM";

		cy.mount(<DateTimePicker id="dtSeconds" formatPattern="dd/MM/yyyy, hh:mm:ss a" value={PREVIOUS_VALUE} />);
		cy.ui5DateTimePickerOpen("#dtSeconds");

		cy.get("#dtSeconds")
			.shadow()
			.as("DateTimePicker");

		cy.get("@DateTimePicker")
			.find("ui5-input")
			.should("have.value", PREVIOUS_VALUE);

		cy.ui5DateTimePickerGetPopover("#dtSeconds").within(() => {
			// Click the currently selected day and then move to the next day.
			cy.get("ui5-calendar")
				.shadow()
				.as("calendar");

			cy.get("@calendar")
				.find("ui5-daypicker")
				.shadow()
				.as("daypicker")

			cy.get("@daypicker")
				.find(".ui5-dp-item--selected")
				.realClick()
				.should("be.focused");

			cy.realPress("ArrowRight");
			cy.realPress("Space");

			// Confirm the change.
			cy.get("#ok").realClick();
		});

		// Only the date has changed; the time remains the same.
		cy.get("@DateTimePicker")
			.find("ui5-input")
			.should("be.focused")
			.should("have.attr", "value", "14/04/2020, 03:16:16 AM");

		cy.ui5DateTimePickerIsOpen("#dtSeconds").should("equal", false);
		setAnimationMode(AnimationMode.Full);
	});

	it("tests time controls adjustments", () => {
		setAnimationMode(AnimationMode.None);
		const PREVIOUS_VALUE = "13/04/2020, 03:16:16 AM";

		cy.mount(<DateTimePicker id="dtSeconds" formatPattern="dd/MM/yyyy, hh:mm:ss a" value={PREVIOUS_VALUE} />);
		cy.ui5DateTimePickerOpen("#dtSeconds");

		cy.get("#dtSeconds")
			.shadow()
			.find("ui5-input")
			.should("have.value", PREVIOUS_VALUE);

		cy.ui5DateTimePickerGetPopover("#dtSeconds").within(() => {
			// Adjust hours:
			cy.get("ui5-time-selection-clocks")
				.shadow()
				.as("clocks");

			cy.get("@clocks")
				.find(`ui5-toggle-spin-button[data-ui5-clock="hours"]`)
				.realClick()
				.should("be.focused");

			cy.realPress("ArrowDown");
			cy.realPress("Space");

			// Adjust minutes.
			cy.get("@clocks")
				.find(`ui5-toggle-spin-button[data-ui5-clock="minutes"]`)
				.realClick()
				.should("be.focused");

			cy.realPress("ArrowDown");
			cy.realPress("ArrowDown");
			cy.realPress("Space");

			// Adjust seconds.
			cy.get("@clocks")
				.find(`ui5-toggle-spin-button[data-ui5-clock="seconds"]`)
				.realClick()
				.should("be.focused");

			cy.realPress("ArrowUp");
			cy.realPress("ArrowUp");
			cy.realPress("ArrowUp");
			cy.realType("p");

			// Confirm.
			cy.get("#ok").realClick();
		});

		// Only the time parts have been updated.
		cy.get("#dtSeconds")
			.shadow()
			.find("ui5-input")
			.should("be.focused")
			.should("have.attr", "value", "13/04/2020, 02:14:19 PM");

		cy.ui5DateTimePickerIsOpen("#dtSeconds").should("equal", false);

		setAnimationMode(AnimationMode.Full);
	});

	// Unstable test, needs investigation
	it.skip("tests selection of new date without changing the time section", () => {
		setAnimationMode(AnimationMode.None);

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
			.realClick()
			.should("be.focused");
		cy.realType("wrongtext");
		cy.realPress("Tab");

		cy.ui5DateTimePickerOpen("#dtSeconds");

		// Act
		let selectedDate = "";
		cy.ui5DateTimePickerGetPopover("#dtSeconds").within(() => {
			cy.get("ui5-calendar")
				.shadow()
				.as("calendar");
			
			cy.get("@calendar")
				.find("ui5-daypicker")
				.shadow()
				.as("daypicker");
			
			cy.get("@daypicker")
				.find(".ui5-dp-item--now")
				.should("be.focused")
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
			.should("be.focused")
			.should("have.attr", "value", selectedDate + ", 02:14:19 PM");

		setAnimationMode(AnimationMode.Full);
	});

	it("tests time controls for dtSeconds picker", () => {
		const expectedClocksCount = 3;
		const expectedPeriodCount = 1;

		cy.mount(<DateTimePickerWithSeconds />);

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

		cy.ui5DateTimePickerGetPopover("#dt").within(() => {
			cy.get("ui5-time-selection-clocks")
				.shadow()
				.as("clocks");

			cy.get("@clocks")
				.find(`ui5-time-picker-clock[data-ui5-clock="hours"]`)
				.should("have.attr", "active", "");
		});

		cy.ui5DateTimePickerClose("#dt");
		cy.ui5DateTimePickerIsOpen("#dt").should("equal", false);
	});

	// Unstable test, needs investigation
	it.skip("tests selection of 12:34:56 AM", () => {
		setAnimationMode(AnimationMode.None);

		cy.mount(<DateTimePickerWithSeconds />);

		cy.ui5DateTimePickerOpen("#dtSeconds");
		cy.ui5DateTimePickerIsOpen("#dtSeconds").should("equal", true);

		cy.ui5DateTimePickerGetPopover("#dtSeconds")
			.within(() => {
				cy.get("ui5-calendar")
					.shadow()
					.as("calendar");
				
				cy.get("@calendar")
					.find("ui5-daypicker")
					.shadow()
					.as("daypicker");
				
				cy.get("@daypicker")
					.find(".ui5-dp-item--selected")
					.should("be.focused")
					.realClick();

				cy.get("ui5-time-selection-clocks")
					.shadow()
					.as("clocks");

				cy.get("@clocks")
					.find(`ui5-toggle-spin-button[data-ui5-clock="hours"]`)
					.realClick()
					.should("be.focused")
					.realType("1")
					.realType("2");

				cy.get("@clocks")
					.find(`ui5-toggle-spin-button[data-ui5-clock="minutes"]`)
					.should("be.focused")
					.realType("3")
					.realType("4");

				cy.get("@clocks")
					.find(`ui5-toggle-spin-button[data-ui5-clock="seconds"]`)
					.should("be.focused")
					.realType("5")
					.realType("6")
					.realType("a");

				cy.get("#ok").realClick();
			});

		cy.get("#dtSeconds")
			.shadow()
			.find("ui5-input")
			.should("be.focused")
			.should("have.attr", "value", "13/04/2020, 12:34:56 AM");

		setAnimationMode(AnimationMode.Full);
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

		cy.ui5DateTimePickerGetPopover("#dt").within(() => {
			// Click the focused day and confirm the selection.
			cy.get("ui5-calendar")
				.shadow()
				.as("calendar");

			cy.get("@calendar")
				.find("ui5-daypicker")
				.shadow()
				.as("daypicker");

			cy.get("@daypicker")
				.find("[data-sap-focus-ref]")
				.should("be.focused")
				.realClick();
			cy.get("#ok").realClick();
		});

		cy.get("#dt")
			.shadow()
			.find("ui5-input")
			.should("be.focused")
			.should("have.attr", "value", "");
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

		cy.ui5DateTimePickerGetPopover("#dtMinMaxDatesISO").within(() => {
			cy.get("ui5-calendar")
				.shadow()
				.find(".ui5-calheader")
				.as("calHeader");

			cy.get("@calHeader")
				.find("div[data-ui5-cal-header-btn-prev]")
				.should("have.class", "ui5-calheader-arrowbtn-disabled");

			cy.get("@calHeader")
				.find("div[data-ui5-cal-header-btn-next]")
				.should("have.class", "ui5-calheader-arrowbtn-disabled");
		});
	});

	it("picker popover should have accessible name", () => {
		cy.mount(<DefaultDateTimePicker />);
		cy.ui5DateTimePickerOpen("#dt");

		cy.ui5DateTimePickerGetPopover("#dt")
			.should("have.attr", "accessible-name", "Choose Date and Time");
	});

	// Unstable test, needs investigation
	it.skip("tests change event is fired on submit", () => {
		cy.mount(<DefaultDateTimePicker />);

		const changeStub = cy.stub();
		cy.get("#dt").then($el => {
			$el[0].addEventListener("ui5-change", changeStub);
		});

		// Open the picker, select a date, and submit to fire the event
		cy.ui5DateTimePickerOpen("#dt");
		cy.ui5DateTimePickerGetPopover("#dt").within(() => {
			cy.get("ui5-calendar")
				.shadow()
				.as("calendar");

			cy.get("@calendar")
				.find("ui5-daypicker")
				.shadow()
				.as("daypicker");
			
			cy.get("@daypicker")
				.find("[data-sap-focus-ref]")
				.realClick()
				.should("be.focused");
			cy.get("#ok").realClick();
		});

		// Assert the change event was fired once
		cy.wrap(changeStub).should("have.been.calledOnce");

		// Re-open the picker and submit without making a change
		cy.ui5DateTimePickerOpen("#dt");
		cy.ui5DateTimePickerGetPopover("#dt").within(() => {
			cy.get("#ok").realClick();
		});

		// The change event should not have been fired a second time.
		cy.wrap(changeStub).should("have.been.calledOnce");

		// Verify the picker is closed
		cy.ui5DateTimePickerIsOpen("#dt").should("equal", false);
	});
});
