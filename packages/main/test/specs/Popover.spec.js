const assert = require('assert');

describe("Popover general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/Popover.html");

	it("tests popover toggling", () => {
		const btnOpenPopover = $("#btn");
		const field = $("#field");

		btnOpenPopover.click();

		const popover = browser.$("ui5-popover");
		assert.ok(popover.isDisplayedInViewport(), "Popover is opened.");

		field.click();
		assert.ok(!popover.isDisplayedInViewport(), "Popover is closed.");
	});

	it("tests clicking inside the popover does not close it", () => {
		const btnOpenPopover = $("#btn");
		const btnInPopover = $("#popbtn");

		btnOpenPopover.click();

		const popover = browser.$("ui5-popover");
		assert.ok(popover.isDisplayedInViewport(), "Popover is opened.");

		btnInPopover.click();
		assert.ok(popover.isDisplayedInViewport(), "Popover remains opened.");
	});

	it("tests if overflown content can be reached by scrolling", () => {
		const manyItemsSelect = $("#many-items");
		const items = manyItemsSelect.shadow$$("ui5-li");

		manyItemsSelect.click();

		const lastListItem = items[items.length - 1];
		
		assert.strictEqual(lastListItem.isDisplayedInViewport(), false, "Last item is not displayed after openining");

		lastListItem.scrollIntoView();

		assert.strictEqual(lastListItem.isDisplayedInViewport(), true, "Last item is displayed after scrolling");
	});
});
