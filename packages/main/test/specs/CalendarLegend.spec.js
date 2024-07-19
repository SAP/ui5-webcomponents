import { assert } from "chai";

describe("Calendar Legend with standard items", () => {
	before(async () => {
		await browser.url(`test/pages/CalendarLegend.html`);
	})

	it("Calendar Legend is rendered", async () => {
		const legend = await browser.$("#calendarLegend").shadow$(".ui5-calendar-legend-root");

		assert.ok(legend, "Calendar Legend is rendered");
	});

	it("Calendar Legend items are rendered", async () => {
		const legend = await browser.$("#calendarLegend").shadow$(".ui5-calendar-legend-root");
		const items = await legend.$$("ui5-calendar-legend-item");
	
		assert.strictEqual(items.length, 4, "Calendar Legend items are rendered");
	});
	

	it("Calendar legend hides Today, when hideToday property provided", async () => {
		const legend = await browser.$("#calendarLegend");
		let items = await legend.shadow$(".ui5-calendar-legend-root").$$("ui5-calendar-legend-item");

		legend.setProperty("hideToday", true);

		// get the items again
		items = await legend.shadow$(".ui5-calendar-legend-root").$$("ui5-calendar-legend-item");

		assert.strictEqual(items.length, 3, "Today item in Calendar Legend is hidden");
	});

	it("Calendar legend hides Selected, when hideSelectedDay property provided", async () => {
		const legend = await browser.$("#calendarLegend");
		let items = await legend.shadow$(".ui5-calendar-legend-root").$$("ui5-calendar-legend-item");

		legend.setProperty("hideSelectedDay", true);

		// get the items again
		items = await legend.shadow$(".ui5-calendar-legend-root").$$("ui5-calendar-legend-item");

		assert.strictEqual(items.length, 2, "Selected item in Calendar Legend is hidden");
	});

	it("Focusing item in Calendar Legend filter the corresponding days in Calendar", async () => {
		const legend = await browser.$("#calendarLegend");
		const items = await legend.shadow$(".ui5-calendar-legend-root").$$("ui5-calendar-legend-item");
		const calendar = await browser.$("#calendar1").shadow$(".ui5-cal-root");

		await items[0].click();
		await browser.keys("ArrowDown");
		await browser.keys("ArrowDown");
		await browser.keys("ArrowDown");

		const dayPicker = await calendar.$("#ui5wc_22-daypicker");
		const filteredDays = await dayPicker.shadow$$("[special-day]");

		assert.strictEqual(filteredDays.length, 12, "Only one day is filtered");
	});

	it("Focusing item in the legend and then focus out, reset filtered days", async () => {
		const legend = await browser.$("#calendarLegend");
		const items = await legend.shadow$(".ui5-calendar-legend-root").$$("ui5-calendar-legend-item");
		const calendar = await browser.$("#calendar1").shadow$(".ui5-cal-root");

		await items[0].click();
		await browser.keys("ArrowDown");
		await browser.keys("ArrowDown");
		await browser.keys("ArrowDown");
		await browser.keys("ArrowDown");

		const dayPicker = await calendar.$("#ui5wc_22-daypicker");
		let filteredDays = await dayPicker.shadow$$("[special-day]");

		assert.strictEqual(filteredDays.length, 12, "Days are filtered");

		await calendar.click();

		// get the items again
		filteredDays = await dayPicker.shadow$$("[special-day]");

		assert.strictEqual(filteredDays.length, 31, "Days are un-filtered")
	});
})