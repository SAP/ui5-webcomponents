const assert = require('chai').assert;

describe("Card general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/Card.html");

	it("tests initial rendering", () => {
		const card = browser.$("#card");

		assert.ok(card, "Has shadow root");
	});

	it("fires headerPress upon click, Enter and Space", () => {
		const cardHeader = browser.$("#card").shadow$(".ui5-card-header");
		const cardHeader2 = browser.$("#card2").shadow$(".ui5-card-header");
		const field = browser.$("#field");

		cardHeader.click();
		cardHeader.keys("Space");
		cardHeader.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "headerPress should be called 3 times");


		cardHeader2.click();
		cardHeader2.keys("Space");
		cardHeader2.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "events count should remain 3 as the header is not interactive.");
	});
});
