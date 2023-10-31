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
})