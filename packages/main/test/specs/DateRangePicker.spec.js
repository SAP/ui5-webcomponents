const assert = require("chai").assert;

describe("DateRangePicker general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/DateRangePicker.html");
	});

	it("Custom Validation Error", () => {
		const daterangepicker = browser.$("#daterange-picker3");

		daterangepicker.click();
		daterangepicker.keys("123123123");
		daterangepicker.keys("Enter");

		assert.strictEqual(daterangepicker.shadow$("ui5-input").getProperty("valueState"), "Error", "The value state is on error");
	});

	it("Custom Validation None", () => {
		browser.url("http://localhost:8080/test-resources/pages/DateRangePicker.html");
		const daterangepicker = browser.$("#daterange-picker3");

		daterangepicker.click();
		daterangepicker.keys("09/09/2020 - 10/10/2020");
		daterangepicker.keys("Enter");

		assert.strictEqual(daterangepicker.shadow$("ui5-input").getProperty("valueState"), "None", "The value state is on none");
	});

	it("Selected dates are updated after value update in the input field", () => {
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
		browser.url("http://localhost:8080/test-resources/pages/DateRangePicker.html");
		const daterangepicker = browser.$("#daterange-picker4");

		daterangepicker.click();
		browser.keys("27/09/2019 - 10/10/2019");
		browser.keys("Enter");

		const res = browser.execute(() => {
			const myDRP = document.getElementById("daterange-picker4");
			const firstDateValue = myDRP.firstDateValue;
			const lastDateValue = myDRP.lastDateValue;

			return {firstDateValue, lastDateValue};
		});

		assert.deepEqual(new Date(res.firstDateValue), new Date(2019, 8, 27), "The first date is in JS Date format");
		assert.deepEqual(new Date(res.lastDateValue), new Date(2019, 9, 10), "The last date is JS Date format");
	});

	it("Initially setting the same date as first & last is possible", () => {
		const daterangepicker = browser.$("#daterange-picker5");

		assert.strictEqual(daterangepicker.getProperty("firstDateValue"), daterangepicker.getProperty("lastDateValue"), "Initially properties are set correctly");
	});

	it("Setting the same date as first & last is possible", () => {
		const daterangepicker = browser.$("#daterange-picker5");

		daterangepicker.setProperty("value", "Aug 5, 2020 - Aug 5, 2020");

		assert.strictEqual(daterangepicker.getProperty("firstDateValue"), daterangepicker.getProperty("lastDateValue"), "Properties are set correctly");
	})

	it("Change event fired once", () => {
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#daterange-picker1");
		const dayPicker = browser.$(`.${staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-daypicker`);
		const dayOne = dayPicker.shadow$(`.ui5-dp-root`).$(".ui5-dp-content").$$("div > .ui5-dp-item" )[5];
		const dayTwo = dayPicker.shadow$(`.ui5-dp-root`).$(".ui5-dp-content").$$("div > .ui5-dp-item" )[15];
		const daterangepicker = browser.$("#daterange-picker1");

		daterangepicker.click();
		browser.keys("F4");

		dayOne.click();
		dayTwo.click();

		assert.strictEqual(browser.$("#labelChange").getHTML(false), "1", "The change event was fired once");
	});

	it("Page up/down increments/decrements day value", () => {
		const dateRangePicker = browser.$("#daterange-picker5");
		dateRangePicker.setAttribute("value", "Jul 16, 2020 @ Jul 29, 2020");
		dateRangePicker.click();
		browser.keys("End");

		browser.keys('PageDown');
		assert.strictEqual(dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 28, 2020");

		browser.keys('PageUp');
		assert.strictEqual(dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 29, 2020");

		browser.keys("Home");
		browser.keys('PageDown');
		assert.strictEqual(dateRangePicker.getAttribute("value"), "Jul 15, 2020 @ Jul 29, 2020");

		browser.keys('PageUp');
		assert.strictEqual(dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 29, 2020");
	});

	it("Page up/down increments/decrements month value", () => {
		const dateRangePicker = browser.$("#daterange-picker5");
		dateRangePicker.setAttribute("value", "Jul 16, 2020 @ Jul 29, 2020");
		dateRangePicker.click();
		browser.keys("End");

		browser.keys(['Shift', 'PageUp']);
		assert.strictEqual(dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Aug 29, 2020");

		browser.keys(['Shift', 'PageDown']);
		assert.strictEqual(dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 29, 2020");

		browser.keys("Home");
		browser.keys(['Shift', 'PageDown']);
		assert.strictEqual(dateRangePicker.getAttribute("value"), "Jun 16, 2020 @ Jul 29, 2020");

		browser.keys(['Shift', 'PageUp']);
		assert.strictEqual(dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 29, 2020");
	});

	it("Page up/down increments/decrements year value", () => {
		const dateRangePicker = browser.$("#daterange-picker5");
		dateRangePicker.setAttribute("value", "Jul 16, 2020 @ Jul 29, 2020");
		dateRangePicker.click();
		browser.keys("End");

		browser.keys(['Control', 'Shift', 'PageUp']);
		assert.strictEqual(dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 29, 2021");

		browser.keys(['Control', 'Shift', 'PageDown']);
		assert.strictEqual(dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 29, 2020");

		browser.keys("Home");
		browser.keys(['Control', 'Shift', 'PageDown']);
		assert.strictEqual(dateRangePicker.getAttribute("value"), "Jul 16, 2019 @ Jul 29, 2020");

		browser.keys(['Control', 'Shift', 'PageUp']);
		assert.strictEqual(dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 29, 2020");
	});

	it("Enter keyboard key confirms the date range in the input field", () => {
		browser.url("http://localhost:8080/test-resources/pages/DateRangePicker.html");
		const dateRangePicker = browser.$("#daterange-picker5");
		dateRangePicker.click();

		browser.keys("Jul 17, 2020 @ Jul 16, 2020");

		browser.keys("Enter");
		assert.strictEqual(dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 17, 2020");
	});

	it("Focus out of the input field confirms the date range", () => {
		browser.url("http://localhost:8080/test-resources/pages/DateRangePicker.html");
		const dateRangePicker = browser.$("#daterange-picker5");
		dateRangePicker.click();
		browser.keys("Jul 17, 2020 @ Jul 16, 2020");

		browser.keys("Tab");
		assert.strictEqual(dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 17, 2020");
	});

	it("Delimiter is part of the format pattern", () => {
		browser.url("http://localhost:8080/test-resources/pages/DateRangePicker.html");
		const daterangepicker = browser.$("#daterange-picker6");

		daterangepicker.click();
		daterangepicker.keys("2020-09-09 - 2020-10-10");
		daterangepicker.keys("Enter");

		assert.strictEqual(daterangepicker.shadow$("ui5-input").getProperty("valueState"), "None", "The value state is on none");
	});

});
