const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("MessageStrip general interaction", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/MessageStrip.html`);
	});

	it("tests close event", () => {

		const closeButton = browser.$("#messageStrip").shadow$(".ui5-messagestrip-close-button");
		const input = browser.$("#inputField");

		closeButton.click();
		closeButton.keys("Space");
		closeButton.keys("Enter");

		assert.strictEqual(input.getProperty("value"), "3", "Close should be called 3 times");
	});
});
