const assert = require('assert');

describe("CheckBox general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/CheckBox.html");

	it("tests change event", () => {
		const checkBox = browser.findElementDeep("#cb1");
		const field = browser.findElementDeep("#field");

		checkBox.click();
		checkBox.keys("Space");
		checkBox.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "Select event should be fired 3 times");
	});

	it("tests change event not fired, when disabled", () => {
		const checkBox = browser.findElementDeep("#cb2");
		const field = browser.findElementDeep("#field");

		checkBox.click();
		checkBox.keys("Space");
		checkBox.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "Select event should not be called any more");
	});

	it("tests truncating and wrapping", () => {
		const CHECKBOX_DEFAULT_HEIGHT = 44;
		const truncatingCb = browser.findElementDeep("#truncatingCb >>> .ui5-checkbox-wrapper");
		const wrappingCb = browser.findElementDeep("#wrappingCb");

		const truncatingCbHeight = truncatingCb.getSize("height");
		const wrappingCbHeight = wrappingCb.getSize("height");

		assert.strictEqual(truncatingCbHeight, CHECKBOX_DEFAULT_HEIGHT, "The size of the checkbox is : " + truncatingCbHeight);
		assert.ok(wrappingCbHeight > CHECKBOX_DEFAULT_HEIGHT, "The size of the checkbox is more than: " + CHECKBOX_DEFAULT_HEIGHT);
	});
});