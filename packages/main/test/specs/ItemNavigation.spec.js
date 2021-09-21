const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Item Navigation Tests", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ItemNavigation.html`);
	});

	it("focus does not cycle", () => {
		const firstItem = $("#item1");
		const secondItem = $("#item2");

		firstItem.click();
		firstItem.keys("ArrowUp");
		assert.strictEqual(firstItem.isFocused(), true, "first item remains focused - border reached.");

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

		// verical navigation is allowed
		firstItem.keys("ArrowDown");
		assert.strictEqual(secondItem.isFocused(), true, "second item is now focused - vertical navigation allowed.");
	});


	it("test PageDown", () => {
		const itemOnFocus = $("#pageUpDownList_item1");
		const nextFocusedItem = $("#pageUpDownList_item11");
		
		itemOnFocus.click();
		itemOnFocus.keys("PageDown");
		assert.strictEqual(nextFocusedItem.isFocused(), true, "The 11th item is focused.");

		const itemOnFocus2 = $("#pageUpDownList_item16");
		const nextFocusedItem2 = $("#pageUpDownList_item26");

		itemOnFocus2.click();
		itemOnFocus2.keys("PageDown");
		assert.strictEqual(nextFocusedItem2.isFocused(), true, "The 26th is focused.");
	});


	it("test PageUp", () => {
		const itemOnFocus = $("#pageUpDownList_item4");
		const nextFocusedItem = $("#pageUpDownList_item1");
		
		itemOnFocus.click();
		itemOnFocus.keys("PageUp");
		assert.strictEqual(nextFocusedItem.isFocused(), true, "The first item is focused.");

		const itemOnFocus2 = $("#pageUpDownList_item16");
		const nextFocusedItem2 = $("#pageUpDownList_item6");

		itemOnFocus2.click();
		itemOnFocus2.keys("PageUp");
		assert.strictEqual(nextFocusedItem2.isFocused(), true, "The 6th is focused.");
	});
});
