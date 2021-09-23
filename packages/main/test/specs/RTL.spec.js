const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("RTL", () => {
	it("language forces RTL, if RTL not specified", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Button.html?sap-ui-language=he`);

		const buttonRoot = await browser.$("#button1").shadow$(".ui5-button-root");
		assert.strictEqual(await buttonRoot.getProperty("dir"), "rtl", "dir is correctly set");
	});

	it("config forces RTL", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Button.html?sap-ui-rtl=true`);

		const buttonRoot = await browser.$("#button1").shadow$(".ui5-button-root");
		assert.strictEqual(await buttonRoot.getProperty("dir"), "rtl", "dir is correctly set");
	});

	it("config unsets RTL, although rtl language is used", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Button.html?sap-ui-rtl=false&sap-ui-language=he`);

		const buttonRoot = await browser.$("#button1").shadow$(".ui5-button-root");
		assert.notOk(await buttonRoot.getProperty("dir"), "dir is not present");
	});
});
