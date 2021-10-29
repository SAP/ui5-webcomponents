const assert = require("chai").assert;

describe("Lit HTML key function for #each", async () => {
	before(async () => {
		await browser.url(`test/pages/LitKeyFunction.html`);
	});

	it("LIT HTML does not mess up keys when looping over lists", async () => {
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb");

		// Focus the input
		const input = await browser.$("#mcb").shadow$("[inner-input]");
		await input.click();

		// Type "usa"
		await input.keys("u");
		await input.keys("s");
		await input.keys("a");

		// Click on the first item
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
		const firstItem = await popover.$$(".ui5-multi-combobox-all-items-list > ui5-li")[0];
		await firstItem.click();

		// Open the popover with the arrow
		const icon = await browser.$("#mcb").shadow$("[input-icon]");
		await icon.click();

		// The first item (<empty>) should not be selected
		const newFirstItem = (await popover.$$(".ui5-multi-combobox-all-items-list > ui5-li"))[0];
		const newFirstItemHtml = await newFirstItem.getHTML(false);
		assert.include(newFirstItemHtml, "empty", "First item is <empty>");
		assert.notOk(await newFirstItem.getProperty("selected"), "<empty> is not selected");

		// The last item (USA) should be selected
		const lastItem = (await popover.$$(".ui5-multi-combobox-all-items-list > ui5-li"))[3];
		const lastItemHtml = await lastItem.getHTML(false);
		assert.include(lastItemHtml, "USA", "Last item is USA");
		assert.ok(await lastItem.getProperty("selected"), "USA is  selected");
	});
});
