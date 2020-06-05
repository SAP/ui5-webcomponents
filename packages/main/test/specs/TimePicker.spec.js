const assert = require("chai").assert;

describe("TimePicker general interaction", () => {
	it("input receives value in format pattern depending on the set language", () => {
		browser.url("http://localhost:8080/test-resources/pages/TimePicker.html?sap-ui-language=bg");

		const timepicker = browser.$("#timepickerSetTime");
		const setTimeButton = browser.$("#setTimeButton");

		setTimeButton.click();

		assert.equal(timepicker.shadow$("ui5-input").getValue(), "3:16:16 ч.");
	});

	it("tests sliders value", () => {
		browser.url("http://localhost:8080/test-resources/pages/TimePicker.html");
		const timepicker = browser.$("#timepicker");
		const timepickerPopover = browser.getStaticAreaRespPopover("#timepicker");

		// act
		timepicker.setProperty("value", "11:12:13");
		timepicker.shadow$("ui5-input").$(".ui5-timepicker-input-icon-button").click();

		const result = browser.execute(async timepickerPopover => {
			return {
				hoursSliderValue: timepickerPopover.querySelector(".ui5-timepicker-hours-wheelslider").getAttribute("value"),
				minutesSliderValue: timepickerPopover.querySelector(".ui5-timepicker-minutes-wheelslider").getAttribute("value"),
				secondsSliderValue: timepickerPopover.querySelector(".ui5-timepicker-seconds-wheelslider").getAttribute("value"),
			}
		}, timepickerPopover);

		// assert
		assert.strictEqual(result.hoursSliderValue, "11", "Hours are equal");
		assert.strictEqual(result.minutesSliderValue, "12", "Minutes are equal");
		assert.strictEqual(result.secondsSliderValue, "13", "Minutes are equal");
	});

	it("tests sliders submit value", () => {
		const timepicker = browser.$("#timepicker");
		const timepickerPopover = browser.getStaticAreaRespPopover("#timepicker");

		// act
		browser.execute(async timepickerPopover => {
			timepickerPopover.setAttribute("opened", true);
			timepickerPopover.querySelector(".ui5-timepicker-hours-wheelslider").setAttribute("value","14");
			timepickerPopover.querySelector(".ui5-timepicker-minutes-wheelslider").setAttribute("value","15");
			timepickerPopover.querySelector(".ui5-timepicker-seconds-wheelslider").setAttribute("value","16");
			timepickerPopover.querySelector("#submit").click();
		}, timepickerPopover);

		const textValue = timepicker.shadow$("ui5-input").getValue();
		assert.strictEqual(textValue.substring(0,2), "14", "Hours are equal");
		assert.strictEqual(textValue.substring(3,5), "15", "Minutes are equal");
	});

	it("tests submit wrong value", () => {
		const timepicker = browser.$("#timepicker");

		timepicker.click();
		timepicker.keys("123123123");
		timepicker.keys("Enter");

		assert.strictEqual(timepicker.shadow$("ui5-input").getProperty("valueState"), "Error", "The value state is on error");
	});

	it("tests valueStateMessage slot", () => {
		const timepicker = browser.$("#timepickerValueStateMessage");

		timepicker.click();

		const inputId = timepicker.shadow$("ui5-input").getProperty("_id");
		const inputStaticAreaItem = browser.$(`.${inputId}`);
		const slot = inputStaticAreaItem.shadow$("ui5-popover").$("#customValueStateMessage");

		assert.notOk(slot.error, "cValue State message slot is working");
	});

	it("tests value state", () => {
		const timepicker = browser.$("#timepickerEmptyValue");
		const button = browser.$("#testBtn");

		// act
		timepicker.click();
		while(timepicker.shadow$("ui5-input").getProperty("value") !== ""){
			timepicker.keys("Backspace");
		}
		button.click();

		// assert
		assert.strictEqual(timepicker.shadow$("ui5-input").getProperty("valueState"), "None", "The value state is None");
	});
});