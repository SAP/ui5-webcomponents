const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Attributes propagation", () => {
	before(async () => {
		await browser.emulateDevice('iPhone X');
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Input.html`);
	});

	it("Should autocomplete the first matched suggestion item", async () => {
		const input = await browser.$("#myInput2");
		const sExpected = "Cozy";
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInput2")
		const dialogInput = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover ui5-input.ui5-input-inner-phone");
		const innerDialogInput = dialogInput.shadow$("input.ui5-input-inner")

		await input.click();
		await dialogInput.keys("c");

		assert.strictEqual(await dialogInput.getProperty("value"), sExpected, "Value is autocompleted");
	});

	it("Should not perform typeahead when it is disabled", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Input.html`);

		const input = await browser.$("#input-disabled-autocomplete");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#input-disabled-autocomplete")
		const dialogInput = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover ui5-input.ui5-input-inner-phone");
		const innerDialogInput = dialogInput.shadow$("input.ui5-input-inner")

		await input.click();
		await dialogInput.keys("c");

		assert.strictEqual(await dialogInput.getProperty("value"), "c", "Value is not autocompleted");
	});

});