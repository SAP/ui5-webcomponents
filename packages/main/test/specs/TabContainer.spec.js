const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("TabContainer general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/TabContainer.html`);
	});

	it("tests initially selected tab", async () => {
		const tabContainer = await browser.$("#tabContainer1");
		const selectedTab = await tabContainer.$("[selected]");
		const selectedFilter = await tabContainer.shadow$(".ui5-tab-strip-item:nth-child(4)");
		const SELECTION_CSS_CLASS = "ui5-tab-strip-item--selected";

		const selectedFilterHtml = await selectedFilter.getHTML();
		assert.include(selectedFilterHtml, SELECTION_CSS_CLASS, "The item has the selection css class set.");
		assert.strictEqual(selectedFilter.id, selectedTab.id, "The IDs of the ui5-tab and the rendered tab filter matches.");
	});

	it("tests tabSelect event", async () => {
		const item = await browser.$("#tabContainer1").shadow$(".ui5-tab-strip-item:nth-child(3)");
		const result = await browser.$("#result");
		const resultIdx = await browser.$("#resultIdx");

		const SELECTED_TAB_TEXT = "Laptops";
		const SELECTED_TAB_INDEX = "1";

		await item.click();

		assert.strictEqual(await result.getText(), SELECTED_TAB_TEXT, "Tab text is retrieved correctly.");
		assert.strictEqual(await resultIdx.getText(), SELECTED_TAB_INDEX, "Tab index is retrieved correctly.");
	});

	it("tests custom media ranges", async () => {
		await browser.setWindowSize(520, 1080);
		assert.strictEqual(await browser.$("#tabContainerIconOnly").getAttribute("media-range"), "S", "media-range=S");

		await browser.setWindowSize(650, 1080);
		assert.strictEqual(await browser.$("#tabContainerIconOnly").getAttribute("media-range"), "M", "media-range=M");

		await browser.setWindowSize(1350, 1080);
		assert.strictEqual(await browser.$("#tabContainerIconOnly").getAttribute("media-range"), "L", "media-range=L");

		await browser.setWindowSize(1650, 1080);
		assert.strictEqual(await browser.$("#tabContainerIconOnly").getAttribute("media-range"), "XL", "media-range=XL");
	});

	it("scroll works on iconsOnly TabContainer", async () => {
		await browser.setWindowSize(520, 1080);

		const arrowLeft = await browser.$("#tabContainerIconOnly").shadow$(".ui5-tc__headerArrowLeft ui5-button");
		const arrowRight = await browser.$("#tabContainerIconOnly").shadow$(".ui5-tc__headerArrowRight ui5-button");

		assert.notOk(await arrowLeft.isDisplayed(), "'Left Arrow' should be initially hidden");
		assert.ok(await arrowRight.isDisplayed(), "'Right Arrow' should be initially shown");

		await arrowRight.click();

		await arrowLeft.waitForDisplayed({
			timeout: 1000,
			interval: 100,
			timeoutMsg: "'Left Arrow' should be visible after 'Right arrow' click"
		});

		await arrowLeft.click();

		await arrowLeft.waitForDisplayed({
			reverse: true,
			timeout: 1000,
			interval: 100,
			timeoutMsg: "'Left Arrow' should be hidden after 'Left arrow' click"
		});
		await arrowRight.waitForDisplayed({
			timeout: 1000,
			interval: 100,
			timeoutMsg: "'Right Arrow' should be visible  after 'Left arrow' click"
		});
	});

	it("scroll works on textOnly TabContainer", async () => {
		await browser.setWindowSize(520, 1080);

		let arrowLeft = await browser.$("#tabContainerTextOnly").shadow$(".ui5-tc__headerArrowLeft  ui5-button");
		let arrowRight = await browser.$("#tabContainerTextOnly").shadow$(".ui5-tc__headerArrowRight  ui5-button");

		assert.notOk(await arrowLeft.isDisplayed(), "'Left Arrow' should be initially hidden");
		assert.ok(await arrowRight.isDisplayed(), "'Right Arrow' should be initially shown");

		await arrowRight.click();

		await arrowLeft.waitForDisplayed({
			timeout: 1000,
			interval: 100,
			timeoutMsg: "'Left Arrow' should be visible after 'Right arrow' click"
		});

		await arrowLeft.click();

		await arrowLeft.waitForDisplayed({
			reverse: true,
			timeout: 1000,
			interval: 100,
			timeoutMsg: "'Left Arrow' should be hidden after 'Left arrow' click"
		});
		await arrowRight.waitForDisplayed({
			timeout: 1000,
			interval: 100,
			timeoutMsg: "'Right Arrow' should be visible  after 'Left arrow' click"
		});

		// act: open overflow
		const overflowBtn = await browser.$("#tabContainerTextOnly").shadow$(".ui-tc__overflowButton");
		await overflowBtn.click();

		// assert: the overflow popover is open.
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#tabContainerTextOnly")
		const overflowPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		assert.strictEqual(await overflowPopover.isDisplayedInViewport(), true,
			"Popover is open.");

		// act: resize, so the overflow button is not visible
		await browser.setWindowSize(1600, 1080);

		// assert: the overflow popover is closed.
		assert.strictEqual(await overflowPopover.isDisplayedInViewport(), false,
			"Popover is closed.");
	});

	it("tests if content is scrollable when tabcontainer takes limited height by its parent", async () => {
		const { tcHeight, tcScrollHeight } = await browser.executeAsync(done => {
			const scrollableContent = document.getElementById("tc-scrollable-child");

			done({
				tcHeight: scrollableContent.offsetHeight,
				tcScrollHeight: scrollableContent.scrollHeight,
			});
		});

		const { tabHeight, tabScrollHeight } = await browser.executeAsync(done => {
			const scrollableContent = document.getElementById("scrollable-tab").shadowRoot.querySelector("div");

			done({
				tabHeight: scrollableContent.offsetHeight,
				tabScrollHeight: scrollableContent.scrollHeight,
			});
		});

		assert.isBelow(tabHeight, tabScrollHeight, "Tab Content is scrollable");
		assert.isAtLeast(tcHeight, tcScrollHeight, "TabContainer is not scrollable");
	});

	it("tests aria attrs", async () => {
		const tabContainer = await browser.$("#tabContainer1");
		const tab4 = await tabContainer.shadow$(".ui5-tab-strip-item:nth-child(4)");

		// assert: The TabContainer has 8 children, 7 tabs and 1 separator (at position 2)
		// and the separator should be skipped in terms of aria-posinset and aria-setsize,
		// so for child number 4 ("Monitors") we expect the following attributes aria-posinset="3" and aria-setsize="7".
		assert.strictEqual(await tab4.getAttribute("aria-posinset"), "3", "The aria-posinset is correct.");
		assert.strictEqual(await tab4.getAttribute("aria-setsize"), "7", "The aria-setsize is correct.");
	});
});
