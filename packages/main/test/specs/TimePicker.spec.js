const assert = require("chai").assert;

describe("TimePicker general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/TimePicker.html");

	it("Check sliders value", () => {
		browser.$("#timepicker").setProperty("value", "11:12:13");
		browser.$("#timepicker").shadow$("ui5-input").$(".ui5-timepicker-input-icon-button").click();
		const hoursSliderValue = browser.$$(".ui5wc_1")[0].shadow$$(".ui5-timepicker-popover")[0].$(".ui5-timepicker-hours-wheelslider").getValue();
		const minutesSliderValue = browser.$$(".ui5wc_1")[0].shadow$$(".ui5-timepicker-popover")[0].$(".ui5-timepicker-minutes-wheelslider").getValue();
		const secondsSliderValue = browser.$$(".ui5wc_1")[0].shadow$$(".ui5-timepicker-popover")[0].$(".ui5-timepicker-seconds-wheelslider").getValue();
		assert.strictEqual(hoursSliderValue, "11", "Hours are equal");
		assert.strictEqual(minutesSliderValue, "12", "Minutes are equal");
		assert.strictEqual(secondsSliderValue, "13", "Minutes are equal");
	});

	it("Sliders submit value", () => {
		browser.$$(".ui5wc_1")[0].shadow$$(".ui5-timepicker-popover")[0].setProperty("opened",true);
		browser.$$(".ui5wc_1")[0].shadow$$(".ui5-timepicker-popover")[0].$(".ui5-timepicker-hours-wheelslider").setProperty("value","14");
		browser.$$(".ui5wc_1")[0].shadow$$(".ui5-timepicker-popover")[0].$(".ui5-timepicker-minutes-wheelslider").setProperty("value","15");
		browser.$$(".ui5wc_1")[0].shadow$$(".ui5-timepicker-popover")[0].$(".ui5-timepicker-seconds-wheelslider").setProperty("value","16");

		// browser.$("#timepicker").shadow$$(".ui5-timepicker-popover")[0].setProperty("opened",true);
		browser.$$(".ui5wc_1")[0].shadow$$(".ui5-timepicker-popover")[0].$("#submit").click();

		const textValue = browser.$("#timepicker").shadow$$("#ui5wc_1-inner")[0].getValue();
		
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