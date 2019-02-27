const assert = require('assert');

describe("Switch general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Switch.html");

	it("tests change event", () => {
		const switchEl = browser.findElementDeep("#sw");
		const field = browser.findElementDeep("#field");

		switchEl.click();
		switchEl.keys("Space");
		switchEl.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "Change event should be fired 3 times");
	});

	it("tests change event not fired, when disabled", () => {
		const switchEl = browser.findElementDeep("#sw2");
		const field = browser.findElementDeep("#field");

		switchEl.click();
		switchEl.keys("Space");
		switchEl.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "Change event should not be called any more");
	});
});