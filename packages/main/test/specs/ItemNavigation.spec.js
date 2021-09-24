const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Item Navigation Tests", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ItemNavigation.html`);
	});

	it("focus does not cycle", async () => {
		const firstItem = await browser.$("#item1");
		const secondItem = await browser.$("#item2");

		await firstItem.click();
		await firstItem.keys("ArrowUp");
		assert.ok(await firstItem.isFocused(), "first item remains focused - border reached.");

		await secondItem.click();
		await secondItem.keys("ArrowDown");
		assert.ok(await secondItem.isFocused(), "second item remains focused - border reached.");
	});


	it("vertical focus navigation", async () => {
		const firstItem = await browser.$("#item3");
		const secondItem = await browser.$("#item4");

		// horizontal navigation is allowed is prevented
		await firstItem.click();
		await firstItem.keys("ArrowRight");
		assert.ok(await firstItem.isFocused(), "first item remains focused - horizontal navigation prevented.");

		// verical navigation is allowed
		await firstItem.keys("ArrowDown");
		assert.ok(await secondItem.isFocused(), "second item is now focused - vertical navigation allowed.");
	});


	it("test PageDown", async () => {
		const itemOnFocus = await browser.$("#pageUpDownList_item1");
		const nextFocusedItem = await browser.$("#pageUpDownList_item11");

		await itemOnFocus.click();
		await itemOnFocus.keys("PageDown");
		assert.ok(await nextFocusedItem.isFocused(), "The 11th item is focused.");

		const itemOnFocus2 = await browser.$("#pageUpDownList_item16");
		const nextFocusedItem2 = await browser.$("#pageUpDownList_item26");

		await itemOnFocus2.click();
		await itemOnFocus2.keys("PageDown");
		assert.ok(await nextFocusedItem2.isFocused(), "The 26th is focused.");
	});


	it("test PageUp", async () => {
		const itemOnFocus = await browser.$("#pageUpDownList_item4");
		const nextFocusedItem = await browser.$("#pageUpDownList_item1");

		await itemOnFocus.click();
		await itemOnFocus.keys("PageUp");
		assert.ok(await nextFocusedItem.isFocused(), "The first item is focused.");

		const itemOnFocus2 = await browser.$("#pageUpDownList_item16");
		const nextFocusedItem2 = await browser.$("#pageUpDownList_item6");

		await itemOnFocus2.click();
		await itemOnFocus2.keys("PageUp");
		assert.ok(await nextFocusedItem2.isFocused(), "The 6th is focused.");
	});
});
