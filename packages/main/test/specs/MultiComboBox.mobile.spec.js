const assert = require("chai").assert;

describe("Typeahead", () => {
	before(async () => {
		await browser.url(`test/pages/MultiComboBox.html`);
		await browser.emulateDevice('iPhone X');
	});

	it("Should autocomplete the first matched suggestion item", async () => {
		const mcb = await browser.$("#mcb");
		const sExpected = "Cosy";
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb")

		await mcb.click();

		const dialogInput = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".input-root-phone input");

		await dialogInput.click();
		await dialogInput.keys("c");

		assert.strictEqual(await mcb.getProperty("value"), sExpected, "Value is autocompleted");
	});

	it("Should not perform typeahead when it is disabled", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb-no-typeahead");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-no-typeahead");

		await mcb.click();

		const dialogInput = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".input-root-phone input");

		await dialogInput.click();
		await dialogInput.keys("c");

		assert.strictEqual(await mcb.getProperty("value"), "c", "Value is not autocompleted");
	});

	it("Should make a selection on ENTER and discard on ESC", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		let tokens;

		const mcb = await browser.$("#mcb");
		const sExpected = "Cosy";
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb")

		await mcb.click();

		const dialogInput = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".input-root-phone input");

		await dialogInput.click();
		await dialogInput.keys("c");
		await dialogInput.keys("Enter");

		tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

		assert.strictEqual(await mcb.getProperty("value"), "", "Value is autocompleted");
		assert.strictEqual(tokens.length, 1, "should have one token");

		await mcb.click();
		await dialogInput.click();
		await dialogInput.keys("c");
		await dialogInput.keys("Escape");

		assert.strictEqual(await mcb.getProperty("value"), "c", "Value is autocompleted");
	});
}); 