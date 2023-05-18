import { assert } from "chai";


describe("Rating Indicator general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/RatingIndicator.html`);
	});

	it("Tests basic rating indicator rendering", async () => {
		const ratingIndicator = await browser.$("#rating-indicator1");

		assert.strictEqual(await ratingIndicator.shadow$$(".ui5-rating-indicator-item").length, 5, "Basic rating indicator renders 5 stars");
	});

	it("Tests max property", async () => {
		const ratingIndicator = await browser.$("#rating-indicator2");

		assert.strictEqual(await ratingIndicator.shadow$$(".ui5-rating-indicator-item").length, 10, "Basic rating indicator renders 10 stars");
	});

	it("Tests clicking on star", async () => {
		const ratingIndicator = await browser.$("#rating-indicator3");
		const thirdStar = await ratingIndicator.shadow$$(".ui5-rating-indicator-item")[2];

		assert.strictEqual(await ratingIndicator.getProperty("value"), 6, "Initial value is applied");

		await thirdStar.click();

		assert.strictEqual(await ratingIndicator.getProperty("value"), 3, "Value is changed on click");
	});

	it("Tests change event", async () => {
		const ratingIndicator = await browser.$("#rating-indicator4");
		const thirdStar = await ratingIndicator.shadow$$(".ui5-rating-indicator-item")[2];
		const input = await browser.$("#change-event");

		assert.strictEqual(await ratingIndicator.getProperty("value"), 6, "Initial value is applied");

		await thirdStar.click();

		assert.strictEqual(await ratingIndicator.getProperty("value"), 3, "Value is changed on click");

		await browser.keys("Enter");

		assert.strictEqual(await ratingIndicator.getProperty("value"), 4, "Value is changed on key press");

		await browser.keys("Space");

		assert.strictEqual(await ratingIndicator.getProperty("value"), 5, "Value is changed on key press");

		await browser.keys("ArrowUp");
		await browser.keys("ArrowRight");

		assert.strictEqual(await ratingIndicator.getProperty("value"), 7, "Value is changed on key press");

		await browser.keys("ArrowLeft");
		await browser.keys("ArrowLeft");
		await browser.keys("ArrowDown");
		await browser.keys("ArrowDown");
		await browser.keys("ArrowDown");
		await browser.keys("ArrowDown");
		await browser.keys("ArrowDown");

		assert.strictEqual(await ratingIndicator.getProperty("value"), 0, "Value is changed on key press");

		await browser.keys("End");

		assert.strictEqual(await ratingIndicator.getProperty("value"), 8, "Value is changed to max on End press");

		await browser.keys("Home");

		assert.strictEqual(await ratingIndicator.getProperty("value"), 0, "Value is changed to 0 on Home press");

		await browser.keys("4");

		assert.strictEqual(await ratingIndicator.getProperty("value"), 4, "Value is changed on numeric key press");

		await browser.keys("9");

		assert.strictEqual(await ratingIndicator.getProperty("value"), 8, "Value is set to max when the number pressed is bigger");

		await browser.keys("Enter");

		assert.strictEqual(await ratingIndicator.getProperty("value"), 0, "Value is set to lowest on enter/space if it was previously max");

		assert.strictEqual(await input.getProperty("value"), "17", "Input event is always fired");
	});

	it("Tests ACC attrs", async () => {
		const ratingIndicator = await browser.$("#rating-indicator1");
		const ratingIndicatorRoot = ratingIndicator.shadow$(".ui5-rating-indicator-root");
		const ratingIndicatorList = ratingIndicator.shadow$(".ui5-rating-indicator-list");
		const thirdStar = await ratingIndicator.shadow$$(".ui5-rating-indicator-item")[2];
		const ratingIndicatorReadOnly = await browser.$("#rating-indicator-readonly").shadow$(".ui5-rating-indicator-root");

		const TOOLTIP = "Rating";
		const ARIA_LABEL = "Hello World";

		assert.strictEqual(await ratingIndicatorRoot.getAttribute("aria-label"), ARIA_LABEL,
			"The aria-label is set");

		assert.strictEqual(await ratingIndicatorRoot.getAttribute("title"), TOOLTIP,
			"The default tooltip is displayed");

		assert.notOk(await ratingIndicatorRoot.getAttribute("aria-readonly"), "The aria-readonly attribute is not presented");
		assert.strictEqual(await ratingIndicatorReadOnly.getAttribute("aria-readonly"), 'true', "The aria-readonly attribute is presented");

		assert.strictEqual(await ratingIndicatorRoot.getAttribute("aria-valuetext"),
			`${await ratingIndicator.getProperty("value")} of ${await ratingIndicator.getProperty("max")}`, "aria-valuetext is set correctly");

		await thirdStar.click();

		assert.strictEqual(await ratingIndicatorRoot.getAttribute("aria-valuetext"),
			"3 of 5", "aria-valuetext is updated correctly");

		assert.strictEqual(await ratingIndicatorList.getAttribute("aria-hidden"), "true", "aria-hidden is set");
	});

	it("Tests ACC attrs - title attribute provided", async () => {
		const ratingIndicator = await browser.$("#rating-indicator-title").shadow$(".ui5-rating-indicator-root");
		const TOOLTIP = "Test";

		assert.strictEqual(await ratingIndicator.getAttribute("title"), TOOLTIP, "The title attribute is rendered in the inner div as well.");
	});
});
