const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("CheckBox general interaction", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/CheckBox.html`);
	});

	it("tests checked default value is false", () => {
		const checkBox = browser.$("#cb1");

		assert.strictEqual(checkBox.getProperty("checked"), false, "Check if default value for checked is false");
	});

	it("tests change event", () => {
		const checkBox = browser.$("#cb1");
		const field = browser.$("#field");

		checkBox.click();
		checkBox.keys("Space");
		checkBox.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "Change event should be fired 3 times");
	});

	it("tests change event not fired, when disabled", () => {
		const checkBox = browser.$("#cb2");
		const field = browser.$("#field");

		checkBox.click();
		checkBox.keys("Space");
		checkBox.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "Change event should not be called any more");
	});

	it("tests truncating and wrapping", () => {
		const CHECKBOX_DEFAULT_HEIGHT = 44;
		const truncatingCb = browser.$("#truncatingCb").shadow$(".ui5-checkbox-root");
		const wrappingCb = browser.$("#wrappingCb");

		const truncatingCbHeight = truncatingCb.getSize("height");
		const wrappingCbHeight = wrappingCb.getSize("height");

		assert.strictEqual(truncatingCbHeight, CHECKBOX_DEFAULT_HEIGHT, "The size of the checkbox is : " + truncatingCbHeight);
		assert.ok(wrappingCbHeight > CHECKBOX_DEFAULT_HEIGHT, "The size of the checkbox is more than: " + CHECKBOX_DEFAULT_HEIGHT);
	});

	it("tests ui5-icon", () => {
		const checkboxChecked = browser.$("#checkboxChecked").shadow$(".ui5-checkbox-icon");

		assert.strictEqual(checkboxChecked.getAttribute("aria-hidden"), "true", "aria-hidden is set");
	});
});
