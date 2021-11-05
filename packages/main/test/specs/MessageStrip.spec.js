const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("MessageStrip general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/MessageStrip.html`);
	});

	it("tests close event", async () => {

		const closeButton = await browser.$("#messageStrip").shadow$(".ui5-message-strip-close-button");
		const input = await browser.$("#inputField");

		await closeButton.click();
		await closeButton.keys("Space");
		await closeButton.keys("Enter");

		assert.strictEqual(await input.getProperty("value"), "3", "Close should be called 3 times");
	});
});
