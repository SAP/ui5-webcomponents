const assert = require("chai").assert;

describe("TimePicker general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/TimePicker.html");
	
	it("Is default value today", () => {
		const textValue = browser.$("#timepicker").shadow$$("#__ui5Timepicker1-inner")[0].getValue();
		const today = new Date();

		assert.strictEqual(Number(textValue.substring(0,2)), today.getHours(), "Hours are equal");
		assert.strictEqual(Number(textValue.substring(3,5)), today.getMinutes(), "Minutes are equal");
	});

	it("Check sliders value", () => {
		browser.$("#timepicker").setProperty("value","11:12:13");
		const hoursSliderValue = browser.$("#timepicker").shadow$$(".ui5-timepicker-popover")[0].$(".ui5-timepicker-hours-slider").getValue();
		const minutesSliderValue = browser.$("#timepicker").shadow$$(".ui5-timepicker-popover")[0].$(".ui5-timepicker-minutes-slider").getValue();
		const secondsSliderValue = browser.$("#timepicker").shadow$$(".ui5-timepicker-popover")[0].$(".ui5-timepicker-seconds-slider").getValue();
		
		assert.strictEqual(hoursSliderValue, "11", "Hours are equal");
		assert.strictEqual(minutesSliderValue, "12", "Minutes are equal");
		assert.strictEqual(secondsSliderValue, "13", "Minutes are equal");
	});

	it("Sliders submit value", () => {
		browser.$("#timepicker").shadow$$(".ui5-timepicker-popover")[0].$(".ui5-timepicker-hours-slider").setProperty("value","14");
		browser.$("#timepicker").shadow$$(".ui5-timepicker-popover")[0].$(".ui5-timepicker-minutes-slider").setProperty("value","15");
		browser.$("#timepicker").shadow$$(".ui5-timepicker-popover")[0].$(".ui5-timepicker-seconds-slider").setProperty("value","16");

		browser.$("#timepicker").shadow$$(".ui5-timepicker-popover")[0].setProperty("opened",true);
		browser.$("#timepicker").shadow$$(".ui5-timepicker-popover")[0].$("#submit").click();

		const textValue = browser.$("#timepicker").shadow$$("#__ui5Timepicker1-inner")[0].getValue();
		
		assert.strictEqual(textValue.substring(0,2), "14", "Hours are equal");
		assert.strictEqual(textValue.substring(3,5), "15", "Minutes are equal");
	});

	it("Wrong value submit", () => {
		browser.$("#timepicker").click();
		browser.$("#timepicker").keys("123123123");
		browser.$("#timepicker").keys("Enter");

		assert.strictEqual(browser.$("#timepicker").shadow$("ui5-input").getProperty("valueState"), "Error", "The value state is on error");
	});
});