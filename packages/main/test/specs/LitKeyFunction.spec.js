const assert = require("chai").assert;

describe("Lit HTML key function for #each", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/LitKeyFunction.html");
	});

	it("LIT HTML does not mess up keys when looping over lists", () => {
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#mcb");

		// Focus the input
		const input = browser.$("#mcb").shadow$("[inner-input]");
		input.click();

		// Type "usa"
		input.keys("u");
		input.keys("s");
		input.keys("a");

		// Click on the first item
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
		const firstItem = popover.$$(".ui5-multi-combobox-all-items-list > ui5-li")[0];
		firstItem.click();

		// Open the popover with the arrow
		const icon = browser.$("#mcb").shadow$("[input-icon]");
		icon.click();

		// The first item (<empty>) should not be selected
		const newFirstItem = popover.$$(".ui5-multi-combobox-all-items-list > ui5-li")[0];
		assert.ok(newFirstItem.getHTML(false).includes("empty"), "First item is <empty>");
		assert.ok(!newFirstItem.getProperty("selected"), "<empty> is not selected");

		// The last item (USA) should be selected
		const lastItem = popover.$$(".ui5-multi-combobox-all-items-list > ui5-li")[3];
		assert.ok(lastItem.getHTML(false).includes("USA"), "Last item is USA");
		assert.ok(lastItem.getProperty("selected"), "USA is  selected");
	});
});
