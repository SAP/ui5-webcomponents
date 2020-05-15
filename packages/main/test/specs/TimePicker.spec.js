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
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#timepicker");
		const timepickerPopover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		// act
		timepicker.setProperty("value", "11:12:13");
		timepicker.shadow$("ui5-input").$(".ui5-timepicker-input-icon-button").click();

		const hoursSliderValue = timepickerPopover.$(".ui5-timepicker-hours-wheelslider").getValue();
		const minutesSliderValue = timepickerPopover.$(".ui5-timepicker-minutes-wheelslider").getValue();
		const secondsSliderValue = timepickerPopover.$(".ui5-timepicker-seconds-wheelslider").getValue();

		// assert
		assert.strictEqual(hoursSliderValue, "11", "Hours are equal");
		assert.strictEqual(minutesSliderValue, "12", "Minutes are equal");
		assert.strictEqual(secondsSliderValue, "13", "Minutes are equal");
	});

	it("tests sliders submit value", () => {
		const timepicker = browser.$("#timepicker");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#timepicker");
		const timepickerPopover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		// act
		timepickerPopover.setProperty("opened", true);
		timepickerPopover.$(".ui5-timepicker-hours-wheelslider").setProperty("value","14");
		timepickerPopover.$(".ui5-timepicker-minutes-wheelslider").setProperty("value","15");
		timepickerPopover.$(".ui5-timepicker-seconds-wheelslider").setProperty("value","16");
		timepickerPopover.$("#submit").click();

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