const assert = require("chai").assert;


describe("Button general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/RatingIndicator.html");

	it("Tests basic rating indicator rendering", () => {
		const ratingIndicator = browser.$("#rating-indicator1");

		assert.strictEqual(ratingIndicator.shadow$$(".icon").length, 5, "Basic rating indicator renders 5 stars");
	});

	it("Tests max-value property", () => {
		const ratingIndicator = browser.$("#rating-indicator2");

		assert.strictEqual(ratingIndicator.shadow$$(".icon").length, 10, "Basic rating indicator renders 5 stars");
	});

	it("Tests clicking on star", () => {
		const ratingIndicator = browser.$("#rating-indicator3");
		const thirdStar = ratingIndicator.shadow$$(".icon")[2];

		assert.strictEqual(ratingIndicator.getProperty("value"), 6, "Initial value is applied");

		thirdStar.click();
		
		assert.strictEqual(ratingIndicator.getProperty("value"), 3, "Value is changed on click");
	});

	it("Tests input event", () => {
		const ratingIndicator = browser.$("#rating-indicator4");
		const thirdStar = ratingIndicator.shadow$$(".icon")[2];
		const input = browser.$("#input-event");

		assert.strictEqual(ratingIndicator.getProperty("value"), 6, "Initial value is applied");
		
		thirdStar.click();

		assert.strictEqual(ratingIndicator.getProperty("value"), 3, "Value is changed on click");

		browser.keys("Enter");

		assert.strictEqual(ratingIndicator.getProperty("value"), 4, "Value is changed on key press");

		browser.keys("Space");

		assert.strictEqual(ratingIndicator.getProperty("value"), 5, "Value is changed on key press");

		browser.keys("ArrowUp");
		browser.keys("ArrowRight");

		assert.strictEqual(ratingIndicator.getProperty("value"), 7, "Value is changed on key press");

		browser.keys("ArrowLeft");
		browser.keys("ArrowLeft");
		browser.keys("ArrowDown");
		browser.keys("ArrowDown");
		browser.keys("ArrowDown");
		browser.keys("ArrowDown");
		browser.keys("ArrowDown");

		assert.strictEqual(ratingIndicator.getProperty("value"), 0, "Value is changed on key press");

		assert.strictEqual(input.getProperty("value"), "12", "Input event is always fired")
	});

	it("Tests change event", () => {
		const ratingIndicator = browser.$("#rating-indicator5");
		const thirdStar = ratingIndicator.shadow$$(".icon")[2];
		const input = browser.$("#change-event");

		thirdStar.click();
		browser.keys("Tab");

		assert.strictEqual(input.getProperty("value"), "1", "Change event is thrown once");
	});
});
