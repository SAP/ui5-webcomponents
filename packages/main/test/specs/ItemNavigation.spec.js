const assert = require("assert");

describe("Item Navigation Tests", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/ItemNavigation.html");
	});

	it("focus does not cycle", () => {
		const firstItem = $("#item1");
		const secondItem = $("#item2");

		firstItem.click();
		firstItem.keys("ArrowLeft");
		firstItem.keys("ArrowUp");
		assert.strictEqual(firstItem.isFocused(), true, "first item remains focused");

		secondItem.click();
		secondItem.keys("ArrowRight");
		secondItem.keys("ArrowDown");
		assert.strictEqual(secondItem.isFocused(), true, "second item remains focused");
	});
});