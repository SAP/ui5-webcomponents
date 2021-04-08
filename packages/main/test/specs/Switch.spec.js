const assert = require("chai").assert;

describe("Switch general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Switch.html");
	});

	it("tests change event", () => {
		const switchEl = browser.$("#sw");
		const field = browser.$("#field");

		switchEl.click();
		switchEl.keys("Space");
		switchEl.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "Change event should be fired 3 times");
	});

	it("tests change event not fired, when disabled", () => {
		const switchEl = browser.$("#sw2");
		const field = browser.$("#field");

		switchEl.click();
		switchEl.keys("Space");
		switchEl.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "Change event should not be called any more");
	});
});
