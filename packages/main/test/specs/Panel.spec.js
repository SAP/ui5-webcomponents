const assert = require("assert");

describe("Panel general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Panel.html");

	it("tests expand event upon header click", () => {
		const header = browser.findElementDeep("#panel1 >>> .sapMPanelWrappingDiv");
		const field = browser.$("#field1");

		header.click();
		browser.pause(500);

		header.keys("Space");
		browser.pause(500);

		header.keys("Enter");
		browser.pause(500);

		assert.strictEqual(field.getProperty("value"), "3", "Press should be called 3 times");
	});

	it("tests expand event upon icon click with custom header", () => {
		const icon = browser.findElementDeep("#panel2 >>> ui5-icon");
		const field = browser.$("#field2");

		icon.click();
		browser.pause(500);

		icon.keys("Space");
		browser.pause(500);

		icon.keys("Enter");
		browser.pause(500);

		assert.strictEqual(field.getProperty("value"), "3", "Press should be called 3 times");
	});
});
