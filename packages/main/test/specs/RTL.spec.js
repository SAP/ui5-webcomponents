import { assert } from "chai";

describe("RTL", () => {
	it("language forces RTL, if RTL not specified", async () => {
		await browser.url(`test/pages/Switch.html?sap-ui-language=he`);

		const swRoot = await browser.$("#switchAccName").shadow$(".ui5-switch-root");
		assert.strictEqual(await swRoot.getProperty("dir"), "rtl", "dir is correctly set");
	});

	it("config forces RTL", async () => {
		await browser.url(`test/pages/Switch.html?sap-ui-rtl=true`);

		const swRoot = await browser.$("#switchAccName").shadow$(".ui5-switch-root");
		assert.strictEqual(await swRoot.getProperty("dir"), "rtl", "dir is correctly set");
	});

	it("config unsets RTL, although rtl language is used", async () => {
		await browser.url(`test/pages/Switch.html?sap-ui-rtl=false&sap-ui-language=he`);

		const swRoot = await browser.$("#switchAccName").shadow$(".ui5-switch-root");
		assert.notOk(await swRoot.getProperty("dir"), "dir is not present");
	});
});
