const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Switch general interaction", async () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Switch.html`);
	});

	it("tests change event", async () => {
		const switchEl = await browser.$("#sw");
		const field = await browser.$("#field");

		await switchEl.click();
		await switchEl.keys("Space");
		await switchEl.keys("Enter");

		assert.strictEqual(await field.getProperty("value"), "3", "Change event should be fired 3 times");
	});

	it("tests change event not fired, when disabled", async () => {
		const switchEl = await browser.$("#sw2");
		const field = await browser.$("#field");

		await switchEl.click();
		await switchEl.keys("Space");
		await switchEl.keys("Enter");

		assert.strictEqual(await field.getProperty("value"), "3", "Change event should not be called any more");
	});
});
