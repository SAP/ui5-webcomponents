import { assert } from "chai";

describe("Attributes propagation", () => {
	before(async () => {
		await browser.url(`test/pages/Popover.html`);
	});

	it("Header text attribute is propagated", async () => {
		const popover = await browser.$("#pop");
		const selector = "h2=New text";

		await popover.setAttribute("header-text", "New text");
		assert.ok($(selector), "The new header text was set correctly");
	});

	it("Popover arrow", async () => {
		const popover = await browser.$("#pop");
		const btnOpenPopover = await browser.$("#btn");

		await btnOpenPopover.click();

		assert.ok(await popover.shadow$(".ui5-popover-arrow").isDisplayedInViewport(), "Initially popover has arrow.");

		await browser.executeAsync(done => {
			document.getElementById("pop").toggleAttribute("hide-arrow");
			done();
		});

		assert.notOk(await popover.shadow$(".ui5-popover-arrow").isDisplayedInViewport(), "The arrow was hidden.");
	});

});

describe("Popover general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Popover.html`);
	});

	it("tests popover toggling", async () => {
		const btnOpenPopover = await browser.$("#btn");
		const field = await browser.$("#field");

		await btnOpenPopover.click();

		const popover = await browser.$("ui5-popover");
		assert.ok(await popover.isDisplayedInViewport(), "Popover is opened.");

		await field.click();
		assert.notOk(await popover.isDisplayedInViewport(), "Popover is closed.");
	});

	it("tests popover toggling with 'open' attribute", async () => {
		const btnOpenPopover = await browser.$("#btnOpenWithAttr");
		const btnCloseWithAttr = await browser.$("#btnCloseWithAttr");

		await btnOpenPopover.click();

		const popover = await browser.$("#popoverAttr");
		assert.ok(await popover.isDisplayedInViewport(), "Popover is opened.");

		await btnCloseWithAttr.click();
		assert.notOk(await popover.isDisplayedInViewport(), "Popover is closed.");
	});

	it("tests popover is closed after click outside of it after multiple 'open = true'", async () => {
		await browser.executeAsync((done) => {
			const btn = document.getElementById("btn");
			const popover = document.getElementById("pop");

			popover.opener = btn;
			popover.open = true;
			popover.open = true;
			popover.open = true;
			popover.open = true;

			done();
		});

		await browser.$("body").click();
		const popover = await browser.$("#pop");

		assert.notOk(await popover.isDisplayedInViewport(), "Popover is closed.");
	});

	// it("tests if popover auto closes when opener goes out of the viewport", async () => {
	// 	const btnOpenPopover = await browser.$("#btnOpenWithAttr");
	// 	const btnAccNameRef = await browser.$("#btnAccNameRef");

	// 	await btnOpenPopover.click();

	// 	const popover = await browser.$("#popoverAttr");
	// 	assert.ok(await popover.isDisplayedInViewport(), "Popover is opened.");

	// 	await btnAccNameRef.scrollIntoView();
	// 	assert.notOk(await popover.isDisplayedInViewport(), "Popover is closed.");

	// 	await browser.$("#btn").scrollIntoView();
	// });

	it("tests popover does not close with opener", async () => {
		const popover = await browser.$("#quickViewCard");
		const btnOpenPopover = await browser.$("#btnQuickViewCardOpener");
		const btnMoveFocus = await browser.$("#btnMoveFocus");

		await btnOpenPopover.scrollIntoView();

		// assert - the opener is visible
		assert.strictEqual(await btnOpenPopover.isDisplayedInViewport(), true,
			"Opener is available.");

		// act - open popover and hide opener
		await btnOpenPopover.click();

		await browser.pause(500);

		// assert - the popover remains open, although opener is not visible
		assert.strictEqual(await popover.getProperty("open"), true,
			"Popover remains open.");
		assert.strictEqual(await popover.isDisplayedInViewport(), true,
			"Popover remains open.");
		assert.strictEqual(await btnOpenPopover.isDisplayedInViewport(), false,
			"Opener is not available.");

		// close the popover
		await btnMoveFocus.click();
	});

	it("tests clicking inside the popover does not close it", async () => {
		const btnOpenPopover = await browser.$("#btn");
		const btnInPopover = await browser.$("#popbtn");

		await btnOpenPopover.click();

		const popover = await browser.$("ui5-popover");
		assert.ok(await popover.isDisplayedInViewport(), "Popover is opened.");

		await btnInPopover.click();
		assert.ok(await popover.isDisplayedInViewport(), "Popover remains opened.");
	});

	it("tests if overflown content can be reached by scrolling 1", async () => {
		const manyItemsSelect = await browser.$("#many-items");
		const items = await await browser.$$("#many-items ui5-option")

		await manyItemsSelect.click();

		const itemBeforeLastItem = items[items.length - 2];

		assert.notOk(await itemBeforeLastItem.isDisplayedInViewport(), "Last item is not displayed after openining");
	});

	it("tests if overflown content can be reached by scrolling 2", async () => {
		const manyItemsSelect = await browser.$("#many-items");
		const items = await await browser.$$("#many-items ui5-option")
		const itemBeforeLastItem = items[items.length - 2];

		await itemBeforeLastItem.scrollIntoView();

		assert.ok(await itemBeforeLastItem.isDisplayedInViewport(), "Last item is displayed after scrolling");

		await manyItemsSelect.click();
	});

	it("tests if overflown content can be reached by scrolling (with header and arrow) 1", async () => {
		const bigPopover = await browser.$("#big-popover");
		const items = await bigPopover.$$("ui5-li");
		const openBigPopoverButton = await browser.$("#big-popover-button");

		await openBigPopoverButton.click();

		const itemBeforeLastItem = items[items.length - 2];

		assert.notOk(await itemBeforeLastItem.isDisplayedInViewport(), "Last item is not displayed after openining");
	});

	it("tests if overflown content can be reached by scrolling (with header and arrow) 2", async () => {
		const bigPopover = await browser.$("#big-popover");
		const items = await bigPopover.$$("ui5-li");

		const itemBeforeLastItem = items[items.length - 2];

		await itemBeforeLastItem.scrollIntoView();

		assert.ok(await itemBeforeLastItem.isDisplayedInViewport(), "Last item is displayed after scrolling");

		await browser.keys("Escape");
	});

	it("tests modal popover", async () => {
		const btnOpenPopover = await browser.$("#btnPopModal");
		const popoverClose = await browser.$("#modalPopoverClose");
		const popover = await browser.$("#modalPopover");

		await btnOpenPopover.click();
		assert.ok(await popover.getProperty("open"), "Popover is opened.");

		try {
			await browser.$("#btn").click();
		} catch {
			assert.ok(true, "The click was intercepted.");
		}

		assert.ok(await popover.getProperty("open"), "Popover is still opened.");

		await popoverClose.click();
		assert.notOk(await popover.isDisplayedInViewport(), "Popover is closed.");
	});

	it("tests modal popover with no block layer", async () => {
		const btnOpenPopover = await browser.$("#btnPopModalNoLayer");
		const popover = await browser.$("#modalPopoverNoLayer");

		await btnOpenPopover.click();
		assert.ok(await popover.getProperty("open"), "Popover is opened.");

		await browser.keys("Escape");
	});

	it("tests initial focus", async () => {
		const focusedButton = await browser.$("#focusMe");
		const btnOpenPopover = await browser.$("#btnPopFocus");

		await btnOpenPopover.click();

		assert.ok(await focusedButton.matches(":focus"), "The button is focused.");

		await browser.keys("Escape");
	});

	it("tests focus trapping using TAB", async () => {
		const btn = await browser.$("#btn");
		const ff = await browser.$("#first-focusable");

		await btn.click();

		assert.ok(await ff.matches(":focus"), "The first focusable element is focused.");

		// list
		await browser.keys("Tab");

		assert.notOk(await ff.matches(":focus"), "The first focusable element is focused.");

		// button
		await browser.keys("Tab");

		assert.notOk(await ff.matches(":focus"), "The first focusable element is focused.");

		// select
		await browser.keys("Tab");

		// footer button
		await browser.keys("Tab");

		// goes to first focusable again
		await browser.keys("Tab");

		assert.ok(await ff.matches(":focus"), "The first focusable element is focused.");

		await browser.keys("Escape");
	});

	it("tests focus trapping using SHIFT TAB", async () => {
		const btn = await browser.$("#btn");
		const ff = await browser.$("#first-focusable");

		await btn.click();

		assert.ok(await ff.matches(":focus"), "The first focusable element is focused.");

		// footer button
		await browser.keys(["Shift", "Tab"]);

		// select
		await browser.keys(["Shift", "Tab"]);

		// button
		await browser.keys(["Shift", "Tab"]);

		// list
		await browser.keys(["Shift", "Tab"]);

		// header button
		await browser.keys(["Shift", "Tab"]);

		assert.ok(await ff.matches(":focus"), "The first focusable element is focused.");

		await browser.keys("Escape");
	});

	it("tests focus when there is no focusable content", async () => {
		const firstBtn = await browser.$("#firstBtn");
		const popoverId = "popNoFocusableContent";

		await firstBtn.click();

		let activeElementId = await browser.$(await browser.getActiveElement()).getAttribute("id");

		assert.strictEqual(activeElementId, popoverId, "Popover is focused");

		await browser.keys(["Shift", "Tab"]);

		activeElementId = await browser.$(await browser.getActiveElement()).getAttribute("id");

		assert.equal(activeElementId, popoverId, "Popover remains focused");

		await browser.keys("Escape");
	});

	it("tests focus when content, which can't be focused is clicked", async () => {
		await browser.$("#btnOpenPopoverWithDiv").click();
		await browser.$("#divContent").click();

		const popoverId = "popWithDiv";
		const activeElementId = await browser.$(await browser.getActiveElement()).getAttribute("id");

		assert.strictEqual(activeElementId, popoverId, "Popover is focused");

		await browser.keys("Escape");
	});

	it("tests that dynamically created popover is opened", async () => {
		const btnOpenDynamic = await browser.$("#btnOpenDynamic");
		await btnOpenDynamic.click();
		const popover = await browser.$('#dynamic-popover');

		await browser.waitUntil(
			async () => (await popover.getCSSProperty("top")).parsed.value > 0 && (await popover.getCSSProperty("left")).parsed.value > 0,
			{
				timeout: 500,
				timeoutMsg: "popover was not opened after a timeout"
			}
		);

		assert.ok(true, "popover is opened");

		await browser.keys("Escape");
	});

	it("tests that dynamically created popover opened by dynamically created opener is opened", async () => {
		const btnDynamicOpenerAndPopover = await browser.$("#btnDynamicOpenerAndPopover");
		await btnDynamicOpenerAndPopover.click();
		const popover = await browser.$("#dynamic-popover-dynamic-opener0");

		await browser.waitUntil(
			async () => (await popover.getCSSProperty("top")).parsed.value > 0 && (await popover.getCSSProperty("left")).parsed.value > 0,
			{
				timeout: 500,
				timeoutMsg: "popover was not opened after a timeout"
			}
		);

		assert.ok(true, "popover is opened");

		await browser.keys("Escape");
	});

	it("tests that ENTER on list item that opens another popover doesn't trigger click event inside the focused element of that popover", async () => {
		const openChainedPopover1 = await browser.$("#openChainedPopover1");
		await openChainedPopover1.scrollIntoView();
		await openChainedPopover1.click();
		await browser.keys("Enter");

		assert.ok(await browser.$("#chainedPopover2").isDisplayedInViewport(), "'Chained popover 2' opened with ENTER key should remain open")
		assert.notOk(await browser.$("#chainedPopover1").isDisplayedInViewport(), "'Chained popover 1' should be successfully closed")

		await browser.keys("Escape");
		const activeElement = await browser.$(await browser.getActiveElement());

		assert.strictEqual(await activeElement.getAttribute("id"), await openChainedPopover1.getAttribute("id"), "The focus should be correctly restored");
	});

	it("tests clicking on an iframe closes the popover", async () => {
		const btnOpenPopover = await browser.$("#btn");
		await btnOpenPopover.click();

		const popover = await browser.$("#pop");
		const iframe = await browser.$("#clickThisIframe");

		assert.ok(await popover.isDisplayedInViewport(), "Popover is opened.");

		await iframe.click();

		await browser.pause(500);

		assert.notOk(await popover.isDisplayedInViewport(), "Popover is closed.");
	});

	it("tests clicking on an iframe inside a shadow root closes the popover", async () => {
		const btnOpenPopover = await browser.$("#btn");
		await btnOpenPopover.click();

		const popover = await browser.$("#pop");
		const iframe = await browser.$("#host").shadow$("#clickThisIframeInsideShadowRoot");

		assert.ok(await popover.isDisplayedInViewport(), "Popover is opened.");

		await iframe.click();

		await browser.pause(500);

		assert.notOk(await popover.isDisplayedInViewport(), "Popover is closed.");
	});

	it("Test initial focus when content is provided after the header and footer", async () => {
		const listContainerItem = await browser.$("#popoverFocusButton");
		await listContainerItem.scrollIntoView();
		await listContainerItem.click();

		await browser.waitUntil(async () => {
			const activeElement = await browser.$(await browser.getActiveElement());
			return await activeElement.getProperty("id") === "fistButtonInPopover";
		}, {
			timeout: 500,
			timeoutMsg: "the active element must be the button in the content of the popover"
		});

		await browser.keys("Escape");

	});

	it("tests initial focus when the popover is removed from the DOM in the meantime", async () => {
		const createAndRemovePopover = await browser.$("#createAndRemove");
		const result = await browser.$("#createAndRemoveResult");

		await createAndRemovePopover.scrollIntoView();

		await createAndRemovePopover.click();
		await result.waitForDisplayed({ timeout: 3000 })

		assert.strictEqual(await result.getText(), "No uncaught errors", "There is no error.");
	});

	it("tests if the popover is a part of the tab chain", async () => {
		await browser.$("#input1").scrollIntoView();
		await browser.$("#input1").click();
		await browser.keys("Tab");

		assert.ok(await browser.$("#input2").isFocused(), "next input is focused");
	});
});

describe("Opener", () => {
	before(async () => {
		await browser.url(`test/pages/Popover.html`);
	});

	it("tests opener set as ID in the same shadow root", async () => {
		const opener = await browser.$("opener-test-shadow-root-id").shadow$("#lnk");
		const popover = await browser.$("opener-test-shadow-root-id").shadow$("#pop");

		await opener.click();

		assert.ok(await popover.isDisplayedInViewport(), "Popover is opened.");
	});

	it("tests opener set as ID in window.document, while popover is in a shadow root", async () => {
		const opener = await browser.$("#lnkInDocument");
		const popover = await browser.$("opener-test-shadow-root-id-document").shadow$("#pop");

		await opener.click();

		assert.ok(await popover.isDisplayedInViewport(), "Popover is opened.");
	});
});

describe("Initially opened", () => {
	before(async () => {
		await browser.url(`test/pages/PopoverInitiallyOpen.html`);
	});

	it("test :popover-open selector", async () => {
		assert.ok(await browser.$("#popoverOpen").matches(":popover-open"), "popover is opened correctly");
	});

	it("test initial focus", async () => {
		assert.ok(await browser.$("#popoverBtn").matches(":focus"), "initial focus is correct");
	});

	it("test _open", async () => {

		const popoverOpen = await browser.$("#popoverOpen");
		const popover1 = await browser.$("#popover1");
		const popover2 = await browser.$("#popover2");
		const popoverCont1 = await browser.$("#popoverCont1");

		assert.ok(await popoverOpen.getProperty("_opened"), "_opened is set");
		assert.ok(await popover1.getProperty("_opened"), "_opened is set");
		assert.ok(await popover2.getProperty("_opened"), "_opened is set");
		assert.ok(await popoverCont1.getProperty("_opened"), "_opened is set");
	});
});

describe("Acc", () => {
	before(async () => {
		await browser.url(`test/pages/Popover.html`);
	});

	it("tests aria-labelledby and aria-label", async () => {
		const popover = await browser.$("ui5-popover");
		await popover.removeAttribute("accessible-name");
		assert.ok(await popover.shadow$(".ui5-popup-root").getAttribute("aria-labelledby"), "Popover has aria-labelledby.");
		assert.notOk(await popover.shadow$(".ui5-popup-root").getAttribute("aria-label"), "Popover does not have aria-label.");

		await popover.setAttribute("accessible-name", "text");
		assert.notOk(await popover.shadow$(".ui5-popup-root").getAttribute("aria-labelledby"), "Popover does not have aria-labelledby.");
		assert.ok(await popover.shadow$(".ui5-popup-root").getAttribute("aria-label"), "Popover has aria-label.");
	});

	it("tests accessible-name-ref", async () => {
		const popover = await browser.$("#popAccNameRef");
		const expectedText = await browser.$("#lblAccNameRef").getText();

		assert.strictEqual(await popover.shadow$(".ui5-popup-root").getAttribute("aria-label"), expectedText, "aria-label should be the text of the label.");
	});

	it("tests that aria-labelledby is not set when there is no header and no accessible-name-ref", async () => {
		const popoverWithoutHeader = await browser.$("#popoverAttr");

		assert.isNull(await popoverWithoutHeader.shadow$(".ui5-popup-root").getAttribute("aria-labelledby"), "Popover should NOT have aria-labelledby set.");
	});
});

describe("Alignment", () => {
	const EPS = 2; // 2px

	const isHorizontallyCentered = async (element, opener) => {
		const elemRect = {
			...await element.getLocation(),
			...await element.getSize()
		};
		const openerRect = {
			...await opener.getLocation(),
			...await opener.getSize()
		};
		const openerCenter = openerRect.x + openerRect.width / 2;
		const expectedElemX = openerCenter - elemRect.width / 2;

		return Math.abs(elemRect.x - expectedElemX) < EPS;
	}

	const isHorizontallyLeftAligned = async (popover, opener) => {
		const popoverRect = {
			...await popover.getLocation(),
			...await popover.getSize()
		};
		const openerRect = {
			...await opener.getLocation(),
			...await opener.getSize()
		};

		return Math.abs(openerRect.x - popoverRect.x) < EPS;
	}

	const isHorizontallyRightAligned = async (popover, opener) => {
		const popoverRect = {
			...await popover.getLocation(),
			...await popover.getSize()
		};
		const openerRect = {
			...await opener.getLocation(),
			...await opener.getSize()
		};
		const openerRight = openerRect.x + openerRect.width;
		const popoverRight = popoverRect.x + popoverRect.width;

		return Math.abs(openerRight - popoverRight) < EPS;
	}

	describe("Horizontal Alignment", () => {
		before(async () => {
			await browser.url(`test/pages/Popover.html`);
		});

		it("Center", async () => {
			await browser.$("[ui5-radio-button][name='horizontalAlign'][text='Center']").click();
			await browser.$("#horizontalAlignBtn").click();
			const popover = await browser.$("#popoverHorizontalAlign");
			const opener = await browser.$("#targetOpener");

			assert.ok(await isHorizontallyCentered(popover, opener), `Popover should be centered`);
		});

		it("Start", async () => {
			await browser.$("[ui5-radio-button][name='horizontalAlign'][text='Start']").click();
			await browser.$("#horizontalAlignBtn").click();
			const popover = await browser.$("#popoverHorizontalAlign");
			const opener = await browser.$("#targetOpener");

			assert.ok(await isHorizontallyLeftAligned(popover, opener), `Popover should be left aligned`);
		});

		it("End", async () => {
			await browser.$("[ui5-radio-button][name='horizontalAlign'][text='End']").click();
			await browser.$("#horizontalAlignBtn").click();
			const popover = await browser.$("#popoverHorizontalAlign");
			const opener = await browser.$("#targetOpener");

			assert.ok(await isHorizontallyRightAligned(popover, opener), `Popover should be right aligned`);
		});

		it("Center, in RTL", async () => {
			await browser.$("[ui5-radio-button][name='horizontalAlign'][text='Center']").click();
			await browser.$("#rtlCb").click();
			await browser.$("#horizontalAlignBtn").click();
			const popover = await browser.$("#popoverHorizontalAlign");
			const opener = await browser.$("#targetOpener");

			assert.ok(await isHorizontallyCentered(popover, opener), `Popover should be centered`);
		});

		it("Start, in RTL", async () => {
			await browser.$("[ui5-radio-button][name='horizontalAlign'][text='Start']").click();
			await browser.$("#horizontalAlignBtn").click();
			const popover = await browser.$("#popoverHorizontalAlign");
			const opener = await browser.$("#targetOpener");

			assert.ok(isHorizontallyRightAligned(popover, opener), `Popover should be right aligned, flipped by RTL direction`);
		});

		it("End, in RTL", async () => {
			await browser.$("[ui5-radio-button][name='horizontalAlign'][text='End']").click();
			await browser.$("#horizontalAlignBtn").click();
			const popover = await browser.$("#popoverHorizontalAlign");
			const opener = await browser.$("#targetOpener");

			assert.ok(await isHorizontallyLeftAligned(popover, opener), `Popover should be left aligned, flipped by RTL direction`);
		});
	});

	describe("Arrow Horizontal Alignment", () => {
		before(async () => {
			await browser.url(`test/pages/Popover.html`);
		});

		it("Arrow centering when opener has big width", async () => {
			const opener = await browser.$("#btnFullWidthTop");
			await opener.click();
			const popover = await browser.$("#popFullWidthTop");
			const arrow = await popover.shadow$(".ui5-popover-arrow");

			assert.ok(await isHorizontallyCentered(arrow, opener), `Arrow should be centered`);

			await browser.keys("Escape");
		});

		it("Arrow centering when opener is to the left edge", async () => {
			const opener = await browser.$("#btnLeftEdgeTop");
			await opener.click();
			const popover = await browser.$("#popFullWidthTop");
			const arrow = await popover.shadow$(".ui5-popover-arrow");

			assert.ok(await isHorizontallyCentered(arrow, opener), `Arrow should be centered`);

			await browser.keys("Escape");
		});

		it("Arrow centering when opener is to the right edge", async () => {
			const opener = await browser.$("#btnRightEdgeTop");
			await opener.click();
			const popover = await browser.$("#popFullWidthTop");
			const arrow = await popover.shadow$(".ui5-popover-arrow");

			assert.ok(await isHorizontallyCentered(arrow, opener), `Arrow should be centered`);

			await browser.keys("Escape");
		});
	});
});

describe("Responsive paddings", () => {
	let oldScreenHeight, oldScreenWidth;

	before(async () => {
		const browserSize = await browser.getWindowSize();
		oldScreenHeight = browserSize.height;
		oldScreenWidth = browserSize.width;
		await browser.url(`test/pages/Popover.html`);
		await browser.setWindowSize(1000, 400);
	});

	after(async () => {
		await browser.setWindowSize(oldScreenWidth, oldScreenHeight);
	});

	it("tests media-range", async () => {
		const popover = await browser.$("#popXRightWide");
		const btnOpenPopover = await browser.$("#btnOpenXRightWide");

		await btnOpenPopover.click();

		assert.strictEqual(await popover.getAttribute("media-range"), "M", "Popover has correct media range");
	});
});