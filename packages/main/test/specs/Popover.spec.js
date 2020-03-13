const assert = require("chai").assert;

describe("Attributes propagation", () => {
	browser.url("http://localhost:8080/test-resources/pages/Popover.html");

	it("Header text attribute is propagated", () => {
		const popover = $("#pop");
		const selector = "h2=New text";

		popover.setAttribute("header-text", "New text");
		assert.ok($(selector), "The new header text was set correctly");
	});

	it("Popover arrow", () => {
		const popover = $("#pop");
		const btnOpenPopover = $("#btn");

		btnOpenPopover.click();

		assert.ok(popover.shadow$(".ui5-popover-arr").isDisplayedInViewport(), "Initially popover has arrow.");

		browser.execute(() => {
			document.getElementById("pop").toggleAttribute("no-arrow");
		});

		assert.ok(!popover.shadow$(".ui5-popover-arr").isDisplayedInViewport(), "The arrow was hidden.");
	});

});

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
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#many-items")
		const items = browser.$(`.${staticAreaItemClassName}`).shadow$$("ui5-li");

		manyItemsSelect.click();

		const lastListItem = items[items.length - 1];

		assert.strictEqual(lastListItem.isDisplayedInViewport(), false, "Last item is not displayed after openining");

		lastListItem.scrollIntoView();

		assert.strictEqual(lastListItem.isDisplayedInViewport(), true, "Last item is displayed after scrolling");

		manyItemsSelect.click();
	});

	it("tests if overflown content can be reached by scrolling (with header and arrow)", () => {
		const bigPopover = $("#big-popover");
		const items = bigPopover.$$("ui5-li");
		const openBigPopoverButton = $("#big-popover-button")

		openBigPopoverButton.click();

		const lastListItem = items[items.length - 1];

		assert.strictEqual(lastListItem.isDisplayedInViewport(), false, "Last item is not displayed after openining");

		lastListItem.scrollIntoView();

		assert.strictEqual(lastListItem.isDisplayedInViewport(), true, "Last item is displayed after scrolling");
	});

	it("tests modal popover", () => {
		const btnOpenPopover = $("#btnPopModal");
		const popoverClose = $("#modalPopoverClose");
		const popover = $("#modalPopover");

		btnOpenPopover.click();
		assert.ok(popover.getProperty("opened"), "Popover is opened.");

		try {
			$("#btn").click();
		} catch {
			assert.ok(true, "The click was intercepted.");
		}

		assert.ok(popover.getProperty("opened"), "Popover is still opened.");

		popoverClose.click();
		assert.ok(!popover.isDisplayedInViewport(), "Popover is closed.");
	});

	it("tests initial focus", () => {
		const focusedButton = $("#focusMe");
		const btnOpenPopover = $("#btnPopFocus");

		btnOpenPopover.click();

		assert.ok(focusedButton.getProperty("focused"), "The button is focused.");
	});

	it("tests focus trapping using TAB", () => {
		browser.url("http://localhost:8080/test-resources/pages/Popover.html");

		const btn = $("#btn");
		const ff = $("#first-focusable");

		btn.click();

		assert.ok(ff.getProperty("focused"), "The first focusable element is focused.");

		// list
		browser.keys("Tab");

		assert.ok(!ff.getProperty("focused"), "The first focusable element is focused.");
		
		// button
		browser.keys("Tab");

		assert.ok(!ff.getProperty("focused"), "The first focusable element is focused.");

		// select
		browser.keys("Tab");

		// footer button
		browser.keys("Tab");

		// goes to first focusable again
		browser.keys("Tab");

		assert.ok(ff.getProperty("focused"), "The first focusable element is focused.");
	});

	it("tests focus trapping using SHIFT TAB", () => {
		browser.url("http://localhost:8080/test-resources/pages/Popover.html");

		const btn = $("#btn");
		const ff = $("#first-focusable");

		btn.click();

		assert.ok(ff.getProperty("focused"), "The first focusable element is focused.");

		// footer button
		browser.keys(["Shift", "Tab"]);

		// select
		browser.keys(["Shift", "Tab"]);

		// button
		browser.keys(["Shift", "Tab"]);

		// list
		browser.keys(["Shift", "Tab"]);

		// header button
		browser.keys(["Shift", "Tab"]);

		assert.ok(ff.getProperty("focused"), "The first focusable element is focused.");
	});
});
