import { assert } from "chai";

describe("RTL", () => {
	it("language forces RTL, if RTL not specified", async () => {
		await browser.url(`test/pages/Switch.html?sap-ui-language=he`);

		assert.strictEqual(await browser.$("#switchAccName").getProperty("effectiveDir"), "rtl", "effectiveDir correctly returns 'rtl'");
	});

	it("config forces RTL", async () => {
		await browser.url(`test/pages/Switch.html?sap-ui-rtl=true`);

		assert.strictEqual(await await browser.$("#switchAccName").getProperty("effectiveDir"), "rtl", "effectiveDir correctly returns 'rtl'");
	});

	it("config unsets RTL, although rtl language is used", async () => {
		await browser.url(`test/pages/Switch.html?sap-ui-rtl=false&sap-ui-language=he`);

		assert.notOk(await browser.$("#switchAccName").getProperty("effectiveDir"), "effectiveDir correctly returns 'undefined'");
	});
});
