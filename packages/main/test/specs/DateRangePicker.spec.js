const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("DateRangePicker general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DateRangePicker.html`);
	});

	it("Custom Validation Error", async () => {
		const daterangepicker = await browser.$("#daterange-picker3");

		await daterangepicker.click();
		await daterangepicker.keys("123123123");
		await daterangepicker.keys("Enter");

		assert.strictEqual(await daterangepicker.shadow$("ui5-input").getProperty("valueState"), "Error", "The value state is on error");
	});

	it("Custom Validation None", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DateRangePicker.html`);
		const daterangepicker = await browser.$("#daterange-picker3");

		await daterangepicker.click();
		await daterangepicker.keys("09/09/2020 - 10/10/2020");
		await daterangepicker.keys("Enter");

		assert.strictEqual(await daterangepicker.shadow$("ui5-input").getProperty("valueState"), "None", "The value state is on none");
	});

	it("Selected dates are updated after value update in the input field", async () => {
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#daterange-picker3");
		const dayPicker = await browser.$(`.${staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-daypicker`);
		const firstDateTimestamp = 1599609600;

		assert.strictEqual(await dayPicker.getProperty("timestamp"), firstDateTimestamp, "The first date is selected");
	});

	it("Is delimiter set", async () => {
		const daterangepicker = await browser.$("#daterange-picker2");

		assert.strictEqual(await daterangepicker.getProperty("delimiter"), "@", "The delimiter is set to @");
	});

	it("startDateValue and endDateValue getter", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DateRangePicker.html`);
		const daterangepicker = await browser.$("#daterange-picker4");

		await daterangepicker.click();
		await browser.keys("27/09/2019 - 10/10/2019");
		await browser.keys("Enter");

		const res = await browser.executeAsync(done => {
			const myDRP = document.getElementById("daterange-picker4");
			const startDateValue = myDRP.startDateValue;
			const endDateValue = myDRP.endDateValue;

			done({startDateValue, endDateValue});
		});

		assert.deepEqual(new Date(res.startDateValue), new Date(2019, 8, 27), "The first date is in JS Date format");
		assert.deepEqual(new Date(res.endDateValue), new Date(2019, 9, 10), "The last date is JS Date format");
	});

	it("Initially setting the same date as first & last is possible", async () => {
		const daterangepicker = await browser.$("#daterange-picker5");

		assert.strictEqual(await daterangepicker.getProperty("startDateValue"), await daterangepicker.getProperty("endDateValue"), "Initially properties are set correctly");
	});

	it("Setting the same date as first & last is possible", async () => {
		const daterangepicker = await browser.$("#daterange-picker5");

		await daterangepicker.setProperty("value", "Aug 5, 2020 - Aug 5, 2020");

		assert.strictEqual(await daterangepicker.getProperty("startDateValue"), await daterangepicker.getProperty("endDateValue"), "Properties are set correctly");
	})

	it("Change event fired once", async () => {
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#daterange-picker1");
		const dayPicker = await browser.$(`.${staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-daypicker`);
		const dayOne = await dayPicker.shadow$(`.ui5-dp-root`).$(".ui5-dp-content").$$("div > .ui5-dp-item" )[5];
		const dayTwo = await dayPicker.shadow$(`.ui5-dp-root`).$(".ui5-dp-content").$$("div > .ui5-dp-item" )[15];
		const daterangepicker = await browser.$("#daterange-picker1");

		await daterangepicker.click();
		await browser.keys("F4");

		await dayOne.click();
		await dayTwo.click();

		assert.strictEqual(await browser.$("#labelChange").getHTML(false), "1", "The change event was fired once");
	});

	it("Page up/down increments/decrements day value", async () => {
		const dateRangePicker = await browser.$("#daterange-picker5");
		await dateRangePicker.setAttribute("value", "Jul 16, 2020 @ Jul 29, 2020");
		await dateRangePicker.click();
		await browser.keys("End");

		await browser.keys('PageDown');
		assert.strictEqual(await dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 28, 2020");

		await browser.keys('PageUp');
		assert.strictEqual(await dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 29, 2020");

		await browser.keys("Home");
		await browser.keys('PageDown');
		assert.strictEqual(await dateRangePicker.getAttribute("value"), "Jul 15, 2020 @ Jul 29, 2020");

		await browser.keys('PageUp');
		assert.strictEqual(await dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 29, 2020");
	});

	it("Page up/down increments/decrements month value", async () => {
		const dateRangePicker = await browser.$("#daterange-picker5");
		await dateRangePicker.setAttribute("value", "Jul 16, 2020 @ Jul 29, 2020");
		await dateRangePicker.click();
		await browser.keys("End");

		await browser.keys(['Shift', 'PageUp']);
		assert.strictEqual(await dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Aug 29, 2020");

		await browser.keys(['Shift', 'PageDown']);
		assert.strictEqual(await dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 29, 2020");

		await browser.keys("Home");
		await browser.keys(['Shift', 'PageDown']);
		assert.strictEqual(await dateRangePicker.getAttribute("value"), "Jun 16, 2020 @ Jul 29, 2020");

		await browser.keys(['Shift', 'PageUp']);
		assert.strictEqual(await dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 29, 2020");
	});

	it("Page up/down increments/decrements year value", async () => {
		const dateRangePicker = await browser.$("#daterange-picker5");
		await dateRangePicker.setAttribute("value", "Jul 16, 2020 @ Jul 29, 2020");
		await dateRangePicker.click();
		await browser.keys("End");

		await browser.keys(['Control', 'Shift', 'PageUp']);
		assert.strictEqual(await dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 29, 2021");

		await browser.keys(['Control', 'Shift', 'PageDown']);
		assert.strictEqual(await dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 29, 2020");

		await browser.keys("Home");
		await browser.keys(['Control', 'Shift', 'PageDown']);
		assert.strictEqual(await dateRangePicker.getAttribute("value"), "Jul 16, 2019 @ Jul 29, 2020");

		await browser.keys(['Control', 'Shift', 'PageUp']);
		assert.strictEqual(await dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 29, 2020");
	});

	it("Enter keyboard key confirms the date range in the input field", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DateRangePicker.html`);
		const dateRangePicker = await browser.$("#daterange-picker5");
		await dateRangePicker.click();

		await browser.keys("Jul 17, 2020 @ Jul 16, 2020");

		await browser.keys("Enter");
		assert.strictEqual(await dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 17, 2020");
	});

	it("Focus out of the input field confirms the date range", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DateRangePicker.html`);
		const dateRangePicker = await browser.$("#daterange-picker5");
		await dateRangePicker.click();
		await browser.keys("Jul 17, 2020 @ Jul 16, 2020");

		await browser.keys("Tab");
		assert.strictEqual(await dateRangePicker.getAttribute("value"), "Jul 16, 2020 @ Jul 17, 2020");
	});

	it("Delimiter is part of the format pattern", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DateRangePicker.html`);
		const daterangepicker = await browser.$("#daterange-picker6");

		await daterangepicker.click();
		await daterangepicker.keys("2020-09-09 - 2020-10-10");
		await daterangepicker.keys("Enter");

		assert.strictEqual(await daterangepicker.shadow$("ui5-input").getProperty("valueState"), "None", "The value state is on none");
	});

	it("Month is not changed in multiselect mode", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DateRangePicker.html`);
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#daterange-picker1");
		const daterangepicker = await browser.$("#daterange-picker1");
		const calendarHeader = await browser.$(`.${staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-calendar-header`);
		const dayPicker = await browser.$(`.${staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-daypicker`);
		const dayOne = await dayPicker.shadow$(`.ui5-dp-root`).$(".ui5-dp-content").$$("div > .ui5-dp-item" )[15];
		const nextButton = await calendarHeader.shadow$(`[data-ui5-cal-header-btn-next]`);
		const monthButton = await calendarHeader.shadow$(`[data-ui5-cal-header-btn-month]`);
		const monthName = monthButton.innerHTML;

		await daterangepicker.click();
		await browser.keys("F4");

		await nextButton.click();
		await nextButton.click();
		await dayOne.click();

		assert.strictEqual(monthButton.innerHTML, monthName, "The month is not changed after selecting the first date in the future");
	});

});
