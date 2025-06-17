import "../../src/Assets.js";
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import TimePicker from "../../src/TimePicker.js";
import Label from "../../src/Label.js";

function pressKeyNTimes(key: "ArrowDown" | "ArrowUp" | "Space" | "Tab" | "Enter", n: number) {
	for (let i = 0; i < n; i++) {
		cy.realPress(key);
	}
}

describe("TimePicker Tests", () => {
	it("input receives value in format pattern depending on the set language", () => {
		cy.wrap({ setLanguage })
		.then(api => {
			return api.setLanguage("bg")
		})

		cy.mount(<TimePicker value="03:16:16"></TimePicker>);

		cy.get("[ui5-time-picker]")
			.as("timePicker");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("have.value", "3:16:16 ч.");

		cy.wrap({ setLanguage })
			.then(api => {
				return api.setLanguage("en");
			});
	});

	it("tests clocks value", () => {
		cy.mount(<TimePicker formatPattern="HH:mm:ss" value="11:12:13"></TimePicker>);

		cy.get("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetClock("hours")
			.should("have.prop", "valueNow", 11);

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetClock("minutes")
			.should("have.prop", "valueNow", 12);

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetClock("seconds")
			.should("have.prop", "valueNow", 13);
	});

	it("tests clocks submit value", () => {
		cy.mount(<TimePicker formatPattern="hh:mm:ss" value="12:00:01"></TimePicker>);

		cy.get("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get("@timePicker")
			.ui5TimePickerGetClock("hours")
			.realClick()
			.should("be.focused")


		pressKeyNTimes("ArrowDown", 2);
		cy.realPress("Space");

		cy.get("@timePicker")
			.ui5TimePickerGetClock("minutes");

		pressKeyNTimes("ArrowDown", 5);
		pressKeyNTimes("ArrowUp", 2);

		cy.realPress("Space");

		cy.get("@timePicker")
			.ui5TimePickerGetClock("seconds");

		pressKeyNTimes("ArrowUp", 4);

		cy.realPress("Tab");
		cy.realPress("Enter");

		cy.get("@timePicker")
			.should("have.value", "10:57:05");
	});

	it("tests submit wrong value", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused");

		cy.realType("123123123");
		cy.realPress("Enter");

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.should("have.attr", "value-state", "Negative");
	});

	it("tests change event", () => {
		cy.mount(<TimePicker formatPattern="HH:mm" value="12:00" onChange={cy.stub().as("changeStub")}></TimePicker>);

		cy.get("[ui5-time-picker]")
			.as("timePicker");

		// Open picker and submit without changes
		cy.get("@timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get("@timePicker")
			.ui5TimePickerGetSubmitButton()
			.realClick();

		// Assert no change event was fired
		cy.get("@changeStub").should("not.have.been.called");

		// Open picker, change time and submit
		cy.get("@timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get("@timePicker")
			.ui5TimePickerGetClock("hours")
			.realClick()
			.should("be.focused")

		cy.realPress("PageDown");

		pressKeyNTimes("ArrowDown", 2);
		cy.realPress("Space");

		cy.get("@timePicker")
			.ui5TimePickerGetSubmitButton()
			.realClick();

		// Assert change event was fired once
		cy.get("@changeStub").should("have.been.calledOnce");

		// Open picker and submit without changes
		cy.get("@timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get("@timePicker")
			.ui5TimePickerGetSubmitButton()
			.realClick();

		// Assert change event was not fired again
		cy.get("@changeStub").should("have.been.calledOnce");

		// Open picker, change time and submit
		cy.get("@timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get("@timePicker")
			.ui5TimePickerGetClock("hours")
			.realClick()
			.should("be.focused")
			.realPress("ArrowDown") // select 00
			.realPress("Space");

		cy.get("@timePicker")
			.ui5TimePickerGetSubmitButton()
			.realClick();

		// Assert change event was fired again
		cy.get("@changeStub").should("have.been.calledTwice");

		// Test direct input change
		cy.get("@timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress("Backspace")
			.realType("7")
			.realPress("Enter");

		// Assert change event was fired again
		cy.get("@changeStub").should("have.been.calledThrice");
	});

	it("tests value state", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick();

		// Clear the input
		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick({ clickCount: 2 })
			.realPress("Backspace");

		cy.get("body").realClick(); // Click outside to trigger blur

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.should("have.attr", "value-state", "None");
	});

	it("tests input keyboard handling", () => {
		cy.mount(<TimePicker formatPattern="hh:mm:ss" value="02:40:05"></TimePicker>);

		cy.get("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress(["Shift", "PageUp"]);

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("have.value", "02:41:05");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress(["Shift", "PageDown"]);

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("have.value", "02:40:05");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress("PageUp");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("have.value", "03:40:05");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress("PageDown");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("have.value", "02:40:05");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress(["Shift", "Control", "PageUp"]);

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("have.value", "02:40:06");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress(["Shift", "Control", "PageDown"]);

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("have.value", "02:40:05");
	});

	it("test closing the picker with the keyboard", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.realPress(["Alt", "ArrowUp"]);

		cy.get<TimePicker>("@timePicker")
			.should("not.have.attr", "open");
	});

	it("the value 'now' returns the current time, instead of the string 'now'", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realType("now")
			.realPress("Enter");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("not.have.value", "now");
	});

	it("opening time picker's value-help, sets the 'open' property to true", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.should("have.attr", "open");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetPopover()
			.should("have.attr", "open");
	});

	it("setting time picker's open property to true, opens the value-help", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get("[ui5-time-picker]")
			.as("timePicker");

		cy.get<TimePicker>("@timePicker")
			.invoke("prop", "open", true);

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetPopover()
			.should("have.attr", "open");
	});

	it("picker popover should have accessible name", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress("F4");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetPopover()
			.should("have.attr", "accessible-name", "Choose Time");
	});

	it("input should have accessible name", () => {
		cy.mount(
			<>
				<Label id="timeLabel">Pick a time</Label>
				<TimePicker accessibleNameRef="timeLabel"></TimePicker>
			</>
		);

		cy.get("[ui5-time-picker]")
			.ui5TimePickerGetInnerInput()
			.should("have.attr", "aria-label", "Pick a time");
	});

	it("should apply aria-label from the accessibleName property", () => {
		cy.mount(<TimePicker accessibleName="Pick a time"></TimePicker>);

		cy.get("[ui5-time-picker]")
			.ui5TimePickerGetInnerInput()
			.should("have.attr", "aria-label", "Pick a time");
	});

	it("displays value state message header in popover when value state is set", () => {
		cy.mount(<TimePicker valueState="Negative"></TimePicker>);

		cy.get("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get("@timePicker")
			.ui5TimePickerGetPopover()
			.find(".ui5-valuestatemessage-header")
			.should("exist")
			.and("have.class", "ui5-valuestatemessage--error");
	});
}); 