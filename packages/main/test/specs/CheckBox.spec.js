const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("CheckBox general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/CheckBox.html`);
	});

	it("tests checked default value is false", async () => {
		const checkBox = await browser.$("#cb1");

		assert.notOk(await checkBox.getProperty("checked"), "Check if default value for checked is false");
	});

	it("tests change event", async () => {
		const checkBox = await browser.$("#cb1");
		const field = await browser.$("#field");

		await checkBox.click();
		await checkBox.keys("Space");
		await checkBox.keys("Enter");

		assert.strictEqual(await field.getProperty("value"), "3", "Change event should be fired 3 times");
	});

	it("tests change event not fired, when disabled", async () => {
		const checkBox = await browser.$("#cb2");
		const field = await browser.$("#field");

		await checkBox.click();
		await checkBox.keys("Space");
		await checkBox.keys("Enter");

		assert.strictEqual(await field.getProperty("value"), "3", "Change event should not be called any more");
	});

	it("tests truncating and wrapping", async () => {
		const CHECKBOX_DEFAULT_HEIGHT = 44;
		const truncatingCb = await browser.$("#truncatingCb").shadow$(".ui5-checkbox-root");
		const wrappingCb = await browser.$("#wrappingCb");

		const truncatingCbHeight = await truncatingCb.getSize("height");
		const wrappingCbHeight = await wrappingCb.getSize("height");

		assert.strictEqual(truncatingCbHeight, CHECKBOX_DEFAULT_HEIGHT, "The size of the checkbox is : " + truncatingCbHeight);
		assert.isAbove(wrappingCbHeight, CHECKBOX_DEFAULT_HEIGHT, "The size of the checkbox is more than: " + CHECKBOX_DEFAULT_HEIGHT);
	});

	it("tests ui5-icon", async () => {
		const checkboxChecked = await browser.$("#checkboxChecked").shadow$(".ui5-checkbox-icon");

		assert.strictEqual(await checkboxChecked.getAttribute("aria-hidden"), "true", "aria-hidden is set");
	});
});
