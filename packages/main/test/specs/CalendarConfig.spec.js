import { assert } from "chai";

describe("Calendar general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/CalendarConfig.html`);
	});

	it("Calendar type configured", async () => {
		const calendar = await browser.$("#cal1");

		// Component primaryCalendarType and secondaryCalendarType are not set
		assert.strictEqual(await calendar.getProperty("primaryCalendarType"), null, 
			"Primary calendar type is not set.");
		assert.strictEqual(await calendar.getProperty("secondaryCalendarType"),null,
			"Secondary calendar type is not set.");

		// Configured calendar types are effectively used
		assert.strictEqual(await calendar.getProperty("_primaryCalendarType"), "Islamic", 
			"Primary calendar configured.");
		assert.strictEqual(await calendar.getProperty("_secondaryCalendarType"), "Gregorian",
			"Secondary calendar configured.");
	});
});
