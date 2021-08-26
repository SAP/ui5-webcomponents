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


	it("test PageDown and PageUp in grid", () => {
		const itemOnFocus = $("#color_palette_item1");
		const nextFocusedItem = $("#color_palette_item11");

		// act - start from first item and press PageDown.
		itemOnFocus.click();
		itemOnFocus.keys("PageDown");

		// assert - the focus should move to the bottom of the first column - Item 11.
		assert.strictEqual(nextFocusedItem.isFocused(), true, "The 11th item is focused.");


		// act - switch to the next (2nd) column.
		nextFocusedItem.keys("ArrowRight");
		const nextFocusedItem2 = $("#color_palette_item12");

		// assert - focus should go to Item 12
		assert.strictEqual(nextFocusedItem2.isFocused(), true, "The 12th item is focused.");


		// act - press PageUp to move to the top of the 2nd column.
		nextFocusedItem2.keys("PageUp");
		const nextFocusedItem3 = $("#color_palette_item2");
		// assert - focus should go to Item 2
		assert.strictEqual(nextFocusedItem3.isFocused(), true, "The 2th is focused.");
	});
});
