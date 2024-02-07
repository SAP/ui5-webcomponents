import { assert } from "chai";

describe("RTL", () => {
	it("tests effectiveDir", async () => {
		await browser.url(`test/pages/RTL.html`);

		assert.strictEqual(await browser.$("#cbRTL").getProperty("effectiveDir"), "rtl", "effectiveDir correctly returns 'rtl'");
		assert.strictEqual(await browser.$("#cbLTR").getProperty("effectiveDir"), "ltr", "effectiveDir correctly returns 'ltr'");
	});
});
