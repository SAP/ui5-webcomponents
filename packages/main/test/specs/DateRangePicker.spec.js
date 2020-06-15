const assert = require("chai").assert;

describe("DateRangePicker general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/DateRangePicker.html");

	it("Custom Validation Error", () => {
		const daterangepicker = browser.$("#daterange-picker3");

		daterangepicker.click();
		daterangepicker.keys("123123123");
		daterangepicker.keys("Enter");

		assert.strictEqual(daterangepicker.shadow$("ui5-input").getProperty("valueState"), "Error", "The value state is on error");
	});

	it("Custom Validation None", () => {
		const daterangepicker = browser.$("#daterange-picker3");

		daterangepicker.click();
		daterangepicker.keys("\b\b\b\b\b\b\b\b\b\b\b\b\b");
		daterangepicker.keys("09/09/2019 - 10/10/2019");
		daterangepicker.keys("Enter");

		assert.strictEqual(daterangepicker.shadow$("ui5-input").getProperty("valueState"), "None", "The value state is on none");
	});

	it("Is delimiter set", () => {
		const daterangepicker = browser.$("#daterange-picker2");

		assert.strictEqual(daterangepicker.getProperty("delimiter"), "@", "The delimiter is set to @");
	});

	it("Selected dates is updates after value update in input", () => {
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#daterange-picker3");
		const dayPicker = browser.$(`.${staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-daypicker`);
		const firstDateTimestamp = 1570579200;
		const daterangepicker = browser.$("#daterange-picker3");

		daterangepicker.click();
		daterangepicker.keys("\b\b\b\b\b\b\b\b\b\b\b\b\b");
		daterangepicker.keys("09/09/2019 - 10/10/2019");
		daterangepicker.keys("Enter");

		assert.strictEqual(dayPicker.getProperty("timestamp"), firstDateTimestamp, "The first date is selected");
	});
});