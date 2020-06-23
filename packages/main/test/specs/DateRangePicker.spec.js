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
		daterangepicker.keys("09/09/2020 - 10/10/2020");
		daterangepicker.keys("Enter");

		assert.strictEqual(daterangepicker.shadow$("ui5-input").getProperty("valueState"), "None", "The value state is on none");
	});

	it("Selected dates is updates after value update in input", () => {
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#daterange-picker3");
		const dayPicker = browser.$(`.${staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-daypicker`);
		const firstDateTimestamp = 1599609600;

		assert.strictEqual(dayPicker.getProperty("timestamp"), firstDateTimestamp, "The first date is selected");
	});

	it("Is delimiter set", () => {
		const daterangepicker = browser.$("#daterange-picker2");

		assert.strictEqual(daterangepicker.getProperty("delimiter"), "@", "The delimiter is set to @");
	});

	it("firstDateValue and lastDateValue getter", () => {
		const daterangepicker = browser.$("#daterange-picker4");

		daterangepicker.click();
		daterangepicker.keys("\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b");
		daterangepicker.keys("09/09/2019 - 10/10/2019");
		daterangepicker.keys("Enter");

		const res = browser.execute(() => {
			const myDRP = document.getElementById("daterange-picker4");
			const firstDateValue = myDRP.firstDateValue;
			const lastDateValue = myDRP.lastDateValue;

			return {firstDateValue, lastDateValue};
		});

		assert.strictEqual(res.firstDateValue, "2019-09-09T00:00:00.000Z", "The first date is in JS Date format");
		assert.strictEqual(res.lastDateValue, "2019-10-10T00:00:00.000Z", "The last date is JS Date format");
	});

	it("Change event fired once", () => {
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#daterange-picker1");
		const dayPicker = browser.$(`.${staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-daypicker`);
		const dayOne = dayPicker.shadow$(`.ui5-dp-root`).$(".ui5-dp-content").$(".ui5-dp-items-container").$$(".ui5-dp-item")[5];
		const dayTwo = dayPicker.shadow$(`.ui5-dp-root`).$(".ui5-dp-content").$(".ui5-dp-items-container").$$(".ui5-dp-item")[15];
		const daterangepicker = browser.$("#daterange-picker1");

		daterangepicker.click();
		daterangepicker.keys("F4");

		dayOne.click();
		dayTwo.click();

		assert.strictEqual(browser.$("#labelChange").getHTML(false), "1", "The change event was fired once");
	});
});