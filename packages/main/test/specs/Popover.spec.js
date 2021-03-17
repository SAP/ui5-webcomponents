const assert = require("chai").assert;

describe("Attributes propagation", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Popover.html");
	});

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

		assert.ok(popover.shadow$(".ui5-popover-arrow").isDisplayedInViewport(), "Initially popover has arrow.");

		browser.execute(() => {
			document.getElementById("pop").toggleAttribute("no-arrow");
		});

		assert.ok(!popover.shadow$(".ui5-popover-arrow").isDisplayedInViewport(), "The arrow was hidden.");
	});

});

describe("Popover general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Popover.html");
	});

	it("tests popover toggling", () => {
		const btnOpenPopover = $("#btn");
		const field = $("#field");

		btnOpenPopover.click();

		const popover = browser.$("ui5-popover");
		assert.ok(popover.isDisplayedInViewport(), "Popover is opened.");

		field.click();
		assert.ok(!popover.isDisplayedInViewport(), "Popover is closed.");
	});

	it("tests popover does not close with opener", () => {
		const popover = browser.$("#quickViewCard");
		const btnOpenPopover = $("#btnQuickViewCardOpener");
		const btnMoveFocus = $("#btnMoveFocus");

		// assert - the opener is visible
		assert.strictEqual(btnOpenPopover.isDisplayedInViewport(), true,
			"Opener is available.");

		// act - open popover and hide opener
		btnOpenPopover.click();

		browser.pause(500);

		// assert - the popover remains open, although opener is not visible
		assert.strictEqual(popover.getAttribute("open"), "true",
			"Popover remains open.");
		assert.strictEqual(popover.isDisplayedInViewport(), true,
			"Popover remains open.");
		assert.strictEqual(btnOpenPopover.isDisplayedInViewport(), false,
			"Opener is not available.");

		// close the popover
		btnMoveFocus.click();
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
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#many-items");
		const items = browser.$(`.${staticAreaItemClassName}`).shadow$$("ui5-li");

		manyItemsSelect.click();

		const itemBeforeLastItem = items[items.length - 2];

		assert.strictEqual(itemBeforeLastItem.isDisplayedInViewport(), false, "Last item is not displayed after openining");

		itemBeforeLastItem.scrollIntoView();

		assert.strictEqual(itemBeforeLastItem.isDisplayedInViewport(), true, "Last item is displayed after scrolling");

		manyItemsSelect.click();
	});

	it("tests if overflown content can be reached by scrolling (with header and arrow)", () => {
		const bigPopover = $("#big-popover");
		const items = bigPopover.$$("ui5-li");
		const openBigPopoverButton = $("#big-popover-button")

		openBigPopoverButton.click();

		const itemBeforeLastItem = items[items.length - 2];

		assert.strictEqual(itemBeforeLastItem.isDisplayedInViewport(), false, "Last item is not displayed after openining");

		itemBeforeLastItem.scrollIntoView();

		assert.strictEqual(itemBeforeLastItem.isDisplayedInViewport(), true, "Last item is displayed after scrolling");
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

	it("tests modal popover with no block layer", () => {
		const btnOpenPopover = $("#btnPopModalNoLayer");
		const popover = $("#modalPopoverNoLayer");
		const popoverId = popover.getProperty("_id");

		btnOpenPopover.click();
		assert.ok(popover.getProperty("opened"), "Popover is opened.");

		const blockLayerIsCreated = browser.execute( (popoverId) => {
			const staticAreaItems = document.querySelectorAll("ui5-static-area-item");
			let result = false;

			staticAreaItems.forEach(item => {
				if (item.shadowRoot.querySelector(".ui5-block-layer") && item.classList.contains(popoverId)) {
					result = true;
				}
			});

			return result
		}, popoverId);

		assert.notOk(blockLayerIsCreated, "Block layer is not created.");

		browser.keys("Escape");
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

	it("tests focus when there is no focusable content", () => {
		browser.url("http://localhost:8080/test-resources/pages/Popover.html");

		const firstBtn = $("#firstBtn");
		const popoverId = "popNoFocusableContent";

		firstBtn.click();

		let activeElementId = $(browser.getActiveElement()).getAttribute("id");

		assert.strictEqual(activeElementId, popoverId, "Popover is focused");

		browser.keys(["Shift", "Tab"]);

		activeElementId = $(browser.getActiveElement()).getAttribute("id");

		assert.ok(activeElementId, popoverId, "Popover remains focused");
	});

	it("tests focus when content, which can't be focused is clicked", () => {
		browser.url("http://localhost:8080/test-resources/pages/Popover.html");

		$("#btnOpenPopoverWithDiv").click();
		$("#divContent").click();

		const popoverId = "popWithDiv";
		const activeElementId = $(browser.getActiveElement()).getAttribute("id");

		assert.strictEqual(activeElementId, popoverId, "Popover is focused");
	});

	it("tests that dynamically created popover is opened", () => {
		browser.url("http://localhost:8080/test-resources/pages/Popover.html");

		const btnOpenDynamic = $("#btnOpenDynamic");
		btnOpenDynamic.click();
		const popover = $('#dynamic-popover');

		browser.waitUntil(
			() => popover.getCSSProperty("top").parsed.value > 0 && popover.getCSSProperty("left").parsed.value > 0,
			{
				timeout: 500,
				timeoutMsg: "popover was not opened after a timeout"
			}
		);

		assert.ok(true, "popover is opened");
	});
});

describe("Acc", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Popover.html");
	});

	it("tests aria-labelledby and aria-label", () => {
		const popover = browser.$("ui5-popover");
		popover.removeAttribute("aria-label");
		assert.ok(popover.shadow$(".ui5-popup-root").getAttribute("aria-labelledby").length, "Popover has aria-labelledby.");
		assert.ok(!popover.shadow$(".ui5-popup-root").getAttribute("aria-label"), "Popover does not have aria-label.");

		popover.setAttribute("aria-label", "text");
		assert.ok(!popover.shadow$(".ui5-popup-root").getAttribute("aria-labelledby"), "Popover does not have aria-labelledby.");
		assert.ok(popover.shadow$(".ui5-popup-root").getAttribute("aria-label").length, "Popover has aria-label.");
	});
});
