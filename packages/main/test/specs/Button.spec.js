const assert = require("assert");

describe("Button general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Button.html");

	it("tests press event", () => {

		const button = browser.findElementDeep("#button1");
		const field = browser.findElementDeep("#field");

		button.click();
		button.keys("Space");
		button.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "Press should be called 3 times");
	});

	it("tests clicking on disabled button", () => {
		const button = browser.findElementDeep("#button-disabled");
		const field = browser.findElementDeep("#field");

		button.click();
		button.keys("Space");
		button.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "Press should be called 3 times");
	});
});