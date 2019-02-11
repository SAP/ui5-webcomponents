const assert = require("assert");

describe("Panel general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Panel.html");

	it("tests expand event", () => {
		const icon = browser.findElementDeep("#panel1 >>> ui5-icon");
		const field = browser.findElementDeep("#helper-input");

		icon.click();
		browser.pause(500);

		icon.keys("Space");
		browser.pause(500);

		icon.keys("Enter");
		browser.pause(500);

		assert.strictEqual(field.getProperty("value"), "3", "Press should be called 3 times");
	});
});
