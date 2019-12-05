const assert = require("assert");

describe("Item Navigation Tests", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/ItemNavigation.html");
	});

	it("focus does not cycle", () => {
		const firstItem = $("#item1");
		const secondItem = $("#item2");

		browser.pause(2000);
		firstItem.click();
		firstItem.keys("ArrowUp");
		assert.strictEqual(firstItem.isFocused(), true, "first item remains focused - border reached.");

		browser.pause(2000);
		secondItem.click();
		secondItem.keys("ArrowDown");
		assert.strictEqual(secondItem.isFocused(), true, "second item remains focused - border reached.");
	});


	it("vertical focus navigation", () => {
		const firstItem = $("#item3");
		const secondItem = $("#item4");

		// horizontal navigation is allowed is prevented
		firstItem.click();
		firstItem.keys("ArrowRight");
		assert.strictEqual(firstItem.isFocused(), true, "first item remains focused - horizontal navigation prevented.");

		browser.pause(2000);

		// verical navigation is allowed
		firstItem.keys("ArrowDown");
		assert.strictEqual(secondItem.isFocused(), true, "second item is now focused - vertical navigation allowed.");
	});
});