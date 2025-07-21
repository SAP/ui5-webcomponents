import DateTimePicker from "../../src/DateTimePicker.js";
import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import type ResponsivePopover from "../../src/ResponsivePopover.js";

function DefaultDateTimePicker() {
	return (
		<DateTimePicker id="dt" />
	);
}

function DateTimePickerWithMinutes() {
	return <DateTimePicker
		id="dtMinutes"
		formatPattern="dd/MM/yyyy, hh:mm a"
		value="13/04/2020, 09:16 AM" />;
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
	it("tests time controls adjustments", () => {
		setAnimationMode(AnimationMode.None);
		const PREVIOUS_VALUE = "13/04/2020, 03:16:16 AM";

		cy.mount(<DateTimePicker id="dtSeconds" formatPattern="dd/MM/yyyy, hh:mm:ss a" value={PREVIOUS_VALUE} />);

		cy.get<DateTimePicker>("#dtSeconds")
			.as("dtp")
			.ui5DateTimePickerOpen();

		cy.get("@dtp")
			.shadow()
			.find("ui5-datetime-input")
			.should("have.value", PREVIOUS_VALUE);

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetPopover()
			.within(() => {
				// Adjust hours:
				cy.get("[ui5-time-selection-clocks]")
					.shadow()
					.as("clocks");

				cy.get("@clocks")
					.find(`[ui5-toggle-spin-button][data-ui5-clock="hours"]`)
					.realClick()
					.should("be.focused");

				cy.realPress("ArrowDown");
				cy.realPress("Space");

				// Adjust minutes.
				cy.get("@clocks")
					.find(`[ui5-toggle-spin-button][data-ui5-clock="minutes"]`)
					.realClick()
					.should("be.focused");

				cy.realPress("ArrowDown");
				cy.realPress("ArrowDown");
				cy.realPress("Space");

				// Adjust seconds.
				cy.get("@clocks")
					.find(`[ui5-toggle-spin-button][data-ui5-clock="seconds"]`)
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
		cy.get<DateTimePicker>("@dtp")
			.shadow()
			.find("ui5-datetime-input")
			.should("be.focused")
			.should("have.attr", "value", "13/04/2020, 02:14:19 PM");

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerExpectToBeClosed();

		setAnimationMode(AnimationMode.Full);
	});

	it("tests picker opens/closes programmatically", () => {
		cy.mount(<DefaultDateTimePicker />);

		cy.get<DateTimePicker>("#dt")
			.as("dtp")
			.ui5DateTimePickerOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerExpectToBeOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerClose();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerExpectToBeClosed();
	});

	// Unstable but valid test, needs to be individually observed
	it("tests selection of new date", () => {
		setAnimationMode(AnimationMode.None);
		const PREVIOUS_VALUE = "13/04/2020, 03:16:16 AM";

		cy.mount(<DateTimePicker id="dtSeconds" formatPattern="dd/MM/yyyy, hh:mm:ss a" value={PREVIOUS_VALUE} />);

		cy.get<DateTimePicker>("#dtSeconds")
			.as("dtp")
			.ui5DateTimePickerOpen();

		cy.get("#dtSeconds")
			.shadow()
			.as("DateTimePicker");

		cy.get("@dtp")
			.shadow()
			.find("ui5-datetime-input")
			.should("have.value", PREVIOUS_VALUE);

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetPopover()
			.within(() => {
				// Click the currently selected day and then move to the next day.
				cy.get("[ui5-calendar]")
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
		cy.get("@dtp")
			.shadow()
			.find("ui5-datetime-input")
			.should("be.focused")
			.should("have.attr", "value", "14/04/2020, 03:16:16 AM");

		cy.get<DateTimePicker>("@dtp").ui5DateTimePickerExpectToBeClosed();

		setAnimationMode(AnimationMode.Full);
	});

	// Unstable test, needs investigation
	it.skip("tests selection of new date without changing the time section", () => {
		setAnimationMode(AnimationMode.None);

		const PREVIOUS_VALUE = "14/04/2020, 02:14:19 PM";
		cy.mount(<>
			<button>before</button>
			<DateTimePickerWithSeconds initialValue={PREVIOUS_VALUE} />
		</>);

		cy.get("#dtSeconds")
			.as("dtp")
			.shadow()
			.find("[ui5-datetime-input]")
			.should("have.value", PREVIOUS_VALUE);

		cy.get("button")
			.contains("before")
			.realClick();

		cy.get("button")
			.contains("before")
			.should("be.focused");

		cy.realPress("Tab");

		// Simulate keyboard interactions
		cy.get("@dtp")
			.shadow()
			.find("[ui5-datetime-input]")
			.should("be.focused");

		cy.realPress("Backspace");
		cy.realType("wrongtext");
		cy.realPress("Tab");

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerExpectToBeOpen();

		let selectedDate = "";

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetPopover()
			.within(() => {
				cy.get("[ui5-calendar]")
					.shadow()
					.as("calendar");

				cy.get("@calendar")
					.find("ui5-daypicker")
					.shadow()
					.as("daypicker");

				cy.get("@daypicker")
					.find(".ui5-dp-item--now")
					.realClick();

				cy.get("@daypicker")
					.find(".ui5-dp-item--now")
					.should("be.focused")
					.then($el => {
						const timestamp = $el.attr("data-sap-timestamp") || "";
						const date = new Date(parseInt(timestamp) * 1000);
						selectedDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
					})
			})
			.then(() => {
				cy.get<DateTimePicker>("@dtp")
					.ui5DateTimePickerGetSubmitButton()
					.realClick();

				cy.get("#dtSeconds")
					.shadow()
					.find("ui5-datetime-input")
					.should("be.focused")
					.and("have.attr", "value", selectedDate + ", 02:14:19 PM");
			});

		setAnimationMode(AnimationMode.Full);
	});

	it("tests time controls for dtSeconds picker", () => {
		const expectedClocksCount = 3;
		const expectedPeriodCount = 1;

		cy.mount(<DateTimePickerWithSeconds />);

		cy.get<DateTimePicker>("#dtSeconds")
			.as("dtp")
			.ui5DateTimePickerOpen();


		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerTimeSelectionClocksCount()
			.should("be.equal", expectedClocksCount)

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerPeriodSegmentedButtonCount()
			.should("be.equal", expectedPeriodCount)

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerClose();
	});

	it("tests time controls for dtMinutes picker", () => {
		const expectedClocksCount = 2;
		const expectedPeriodCount = 1;

		cy.mount(<DateTimePickerWithMinutes />);

		cy.get<DateTimePicker>("#dtMinutes")
			.as("dtp")
			.ui5DateTimePickerOpen();


		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerTimeSelectionClocksCount()
			.should("be.equal", expectedClocksCount)

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerPeriodSegmentedButtonCount()
			.should("be.equal", expectedPeriodCount)

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerClose();
	});

	it("tests hours clock is active on picker open", () => {
		cy.mount(<DefaultDateTimePicker />);

		cy.get<DateTimePicker>("#dt")
			.as("dtp")
			.ui5DateTimePickerOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetPopover()
			.within(() => {
				cy.get("[ui5-time-selection-clocks]")
					.shadow()
					.as("clocks");

				cy.get("@clocks")
					.find(`[ui5-time-picker-clock][data-ui5-clock="hours"]`)
					.should("have.attr", "active", "");
			});

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerClose();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerExpectToBeClosed();
	});

	// Unstable test, needs investigation
	it("tests selection of 12:34:56 AM", () => {
		setAnimationMode(AnimationMode.None);

		cy.mount(<DateTimePickerWithSeconds />);

		cy.get<DateTimePicker>("#dtSeconds")
			.as("dtp")
			.ui5DateTimePickerOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerExpectToBeOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetPopover()
			.within(() => {
				cy.get("[ui5-calendar]")
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

				cy.get("[ui5-time-selection-clocks]")
					.shadow()
					.as("clocks");

				cy.get("@clocks")
					.find(`[ui5-toggle-spin-button][data-ui5-clock="hours"]`)
					.realClick()
					.should("be.focused");

				cy.realType("12")

				cy.get("@clocks")
					.find(`[ui5-toggle-spin-button][data-ui5-clock="minutes"]`)
					.should("be.focused");

				cy.realType("34");

				cy.get("@clocks")
					.find(`[ui5-toggle-spin-button][data-ui5-clock="seconds"]`)
					.should("be.focused")

				cy.realType("56a")
			});

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetSubmitButton()
			.realClick();

		cy.get("#dtSeconds")
			.shadow()
			.find("ui5-datetime-input")
			.should("be.focused")
			.and("have.attr", "value", "13/04/2020, 12:34:56 AM");

		setAnimationMode(AnimationMode.Full);
	});

	it("tests change event is prevented on submit when prevent default is called", () => {
		cy.mount(<DefaultDateTimePicker />);

		cy.get<DateTimePicker>("[ui5-datetime-picker]")
			.as("dtp")

		cy.get<DateTimePicker>("@dtp")
			.shadow()
			.find("[ui5-datetime-input]")
			.as("input");

		cy.get<DateTimePicker>("@dtp")
			.shadow()
			.find("ui5-responsive-popover ui5-calendar")
			.shadow()
			.find("ui5-daypicker")
			.as("daypicker");

		cy.get<DateTimePicker>("@dtp")
			.then($el => {
				$el[0].addEventListener("ui5-change", (ev: Event) => {
					ev.preventDefault();
				});
			});

		// act: open the picker
		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerOpen();

		// act: click today's date
		cy.get("@daypicker")
			.shadow()
			.find("[data-sap-focus-ref]")
			.should("be.focused")
			.realClick();

		// act: confirm selection
		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetSubmitButton()
			.realClick();

		// assert: the picker is closed
		cy.get("@dtp")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverClosed();

		// assert: the value is not changed
		cy.get("@input")
			.should("be.focused")
			.should("have.attr", "value", "");
	});

	it("custom formatting", () => {
		cy.mount(<DateTimePicker displayFormat="yyyy, dd/MM hh:mm:ss" valueFormat="yyyy-MM-dd hh:mm:ss"></DateTimePicker>);

		cy.get("[ui5-datetime-picker]")
			.as("dateTimePicker");

		cy.get<DateTimePicker>("@dateTimePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realType("2018, 05/05 12:00:00")
			.realPress("Enter");

		cy.get("@dateTimePicker")
			.shadow()
			.find("ui5-datetime-input")
			.should("have.attr", "value", "2018, 05/05 12:00:00");

		cy.get("@dateTimePicker")
			.should("have.attr", "value", "2018-05-05 12:00:00");
	});

	it("Min and max dates are set, with no format pattern provided, using valid ISO format", () => {
		cy.mount(
			<DateTimePicker
				id="dtMinMaxDatesISO"
				minDate="2023-05-01"
				maxDate="2023-05-31"
			></DateTimePicker>
		);

		cy.get<DateTimePicker>("#dtMinMaxDatesISO")
			.as("dtp")

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetPopover()
			.within(() => {
				cy.get("[ui5-calendar]")
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

		cy.get<DateTimePicker>("#dt")
			.ui5DateTimePickerGetPopover()
			.should("have.attr", "accessible-name", "Choose Date and Time");
	});

	it("value state", () => {
		cy.mount(<DateTimePicker id="dtpValueState" valueState="Negative"></DateTimePicker>);
		cy.get("[ui5-datetime-picker]")
			.as("dtp");

		cy.get<DateTimePicker>("@dtp")
			.shadow()
			.find("ui5-datetime-input")
			.should("have.attr", "value-state", "Negative");

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerOpen();

		cy.get<DateTimePicker>("@dtp")
			.shadow()
			.find("[slot='header']")
			.first()
			.should("have.text", "Invalid entry");
	});

	// Unstable test, needs investigation
	it("tests change event is fired on submit", () => {
		cy.mount(<DefaultDateTimePicker />);

		const changeStub = cy.stub();

		cy.get("#dt")
			.as("dtp")
			.then($el => {
				$el[0].addEventListener("ui5-change", changeStub);
			});

		// Open the picker, select a date, and submit to fire the event
		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerExpectToBeOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetPopover()
			.within(() => {
				cy.get("[ui5-calendar]")
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
			});

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetSubmitButton()
			.realClick();

		// Assert the change event was fired once
		cy.wrap(changeStub).should("have.been.calledOnce");

		// Re-open the picker and submit without making a change
		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetSubmitButton()
			.realClick();

		// The change event should not have been fired a second time.
		cy.wrap(changeStub).should("have.been.calledOnce");

		// Verify the picker is closed
		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerExpectToBeClosed();
	});
});
