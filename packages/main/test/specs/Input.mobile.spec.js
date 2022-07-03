const assert = require("chai").assert;

describe("Typeahead", () => {
	before(async () => {
		await browser.url(`test/pages/Input.html`);
		await browser.emulateDevice('iPhone X');
	});

	it("Should autocomplete the first matched suggestion item", async () => {
		const input = await browser.$("#myInput2");
		const sExpected = "Cozy";
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInput2")

		await input.scrollIntoView();
		await input.click();

		const dialogInput = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".ui5-input-inner-phone");
		await dialogInput.keys("c");
		assert.strictEqual(await dialogInput.getProperty("value"), sExpected, "Value is autocompleted");
	});

	it("Should not perform typeahead when it is disabled", async () => {
		await browser.url(`test/pages/Input.html`);

		const input = await browser.$("#input-disabled-autocomplete");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#input-disabled-autocomplete")

		await input.scrollIntoView();
		await input.click();

		const dialogInput = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".ui5-input-inner-phone");
		await dialogInput.keys("c");

		assert.strictEqual(await dialogInput.getProperty("value"), "c", "Value is not autocompleted");
	});
});