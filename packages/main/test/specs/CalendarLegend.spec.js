import { assert } from "chai";

describe("Calendar Legend with standard items", () => {
	before(async () => {
		await browser.url(`test/pages/CalendarLegend.html`);
	})

	it("Calendar Legend is rendered", async () => {
		const legend = await browser.$("#calendarLegend").shadow$("ui5-calendar-legend-root");

		assert.ok(legend, "Calendar Legend is rendered");
	})

	// This test shall be removed once Custom Calendar Legend Items are introduced
	it("Calendar Legend could render only up to 4 items", async () => {
		const items = await browser.$$("ui5-cal-legend-standard-item");

		await browser.execute(() => {
			const legend = document.querySelector("#calendarLegend");
			const item = document.createElement("ui5-cal-legend-standard-item");
			item.setAttribute("type", "NonWorking");
			item.textContent = "Today";
			legend.appendChild(item);
		});


		assert.equal(items.length, 4, "Calendar Legend renders only 4 items");
	});

	it("Calendar Legend dont support duplicated items' types.", async () => {
		const legend = await browser.$("#calendarLegend");

		// Adds 2 more items with the same type
		for (let i = 0; i < 2; i++) {
			await browser.execute(() => {
				const legend = document.querySelector("#calendarLegend");
				const item = document.createElement("ui5-cal-legend-standard-item");
				item.setAttribute("type", "Today");
				item.textContent = "Today";
				legend.appendChild(item);
			});
		}

		const items = await legend.$$("ui5-cal-legend-standard-item");

		assert.equal(items.length, 4, "Calendar Legend renders only 4 items");
	});
})