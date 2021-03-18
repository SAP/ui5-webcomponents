const assert = require("chai").assert;

describe("TabContainer general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/TabContainer.html");
	});

	it("tests initially selected tab", () => {
		const tabContainer = browser.$("#tabContainer1");
		const selectedTab = tabContainer.$("[selected]");
		const selectedFilter = tabContainer.shadow$(".ui5-tab-strip-item:nth-child(4)");
		const SELECTION_CSS_CLASS = "ui5-tab-strip-item--selected";

		assert.ok(selectedFilter.getHTML().indexOf(SELECTION_CSS_CLASS) > -1, "The item has the selection css class set.");
		assert.strictEqual(selectedFilter.id, selectedTab.id, "The IDs of the ui5-tab and the rendered tab filter matches.");
	});

	it("tests tabSelect event", () => {
		const item = browser.$("#tabContainer1").shadow$(".ui5-tab-strip-item:nth-child(3)");
		const result = browser.$("#result");
		const resultIdx = browser.$("#resultIdx");

		const SELECTED_TAB_TEXT = "Laptops";
		const SELECTED_TAB_INDEX = "1";

		item.click();

		assert.strictEqual(result.getText(), SELECTED_TAB_TEXT, "Tab text is retrieved correctly.");
		assert.strictEqual(resultIdx.getText(), SELECTED_TAB_INDEX, "Tab index is retrieved correctly.");
	});

	it("tests custom media ranges", () => {
		browser.setWindowSize(520, 1080);
		assert.strictEqual($("#tabContainerIconOnly").getAttribute("media-range"), "S", "media-range=S");

		browser.setWindowSize(650, 1080);
		assert.strictEqual($("#tabContainerIconOnly").getAttribute("media-range"), "M", "media-range=M");

		browser.setWindowSize(1350, 1080);
		assert.strictEqual($("#tabContainerIconOnly").getAttribute("media-range"), "L", "media-range=L");

		browser.setWindowSize(1650, 1080);
		assert.strictEqual($("#tabContainerIconOnly").getAttribute("media-range"), "XL", "media-range=XL");
	});

	it("scroll works on iconsOnly TabContainer", () => {
		browser.setWindowSize(520, 1080);

		const arrowLeft = $("#tabContainerIconOnly").shadow$(".ui5-tc__headerArrowLeft ui5-button");
		const arrowRight = $("#tabContainerIconOnly").shadow$(".ui5-tc__headerArrowRight ui5-button");

		assert.ok(!arrowLeft.isDisplayed(), "'Left Arrow' should be initially hidden");
		assert.ok(arrowRight.isDisplayed(), "'Right Arrow' should be initially shown");

		arrowRight.click();
		browser.pause(1000); // TODO: wait for animation finish. Remove when solved on framework level

		assert.ok(arrowLeft.isDisplayed(), "'Left Arrow' should be visible after 'Right arrow' click");

		arrowLeft.click();
		browser.pause(1000); // TODO: wait for animation finish. Remove when solved on framework level

		assert.ok(!arrowLeft.isDisplayed(), "'Left Arrow' should be hidden after 'Left arrow' click");
		assert.ok(arrowRight.isDisplayed(), "'Right Arrow' should be visible  after 'Left arrow' click");
	});

	it("scroll works on textOnly TabContainer", () => {
		browser.setWindowSize(520, 1080);

		let arrowLeft = browser.$("#tabContainerTextOnly").shadow$(".ui5-tc__headerArrowLeft  ui5-button");
		let arrowRight = browser.$("#tabContainerTextOnly").shadow$(".ui5-tc__headerArrowRight  ui5-button");

		assert.ok(!arrowLeft.isDisplayed(), "'Left Arrow' should be initially hidden");
		assert.ok(arrowRight.isDisplayed(), "'Right Arrow' should be initially shown");

		arrowRight.click();
		browser.pause(1000); // TODO: wait for animation finish. Remove when solved on framework level

		assert.ok(arrowLeft.isDisplayed(), "'Left Arrow' should be visible after 'Right arrow' click");

		arrowLeft.click();
		browser.pause(1000); // TODO: wait for animation finish. Remove when solved on framework level

		assert.ok(!arrowLeft.isDisplayed(), "'Left Arrow' should be hidden after 'Left arrow' click");
		assert.ok(arrowRight.isDisplayed(), "'Right Arrow' should be visible  after 'Left arrow' click");

		// act: open overflow
		const overflowBtn = browser.$("#tabContainerTextOnly").shadow$(".ui-tc__overflowButton");
		overflowBtn.click();

		// assert: the overflow popover is open.
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#tabContainerTextOnly")
		const overflowPopover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		assert.strictEqual(overflowPopover.isDisplayedInViewport(), true,
			"Popover is open.");

		// act: resize, so the overflow button is not visible
		browser.setWindowSize(1400, 1080);
		browser.pause(500);

		// assert: the overflow popover is closed.
		assert.strictEqual(overflowPopover.isDisplayedInViewport(), false,
			"Popover is closed.");
	});

	it("tests if content is scrollable when tabcontainer takes limited height by its parent", () => {
		const { tcHeight, tcScrollHeight } = browser.execute(() => {
			const scrollableContent = document.getElementById("tc-scrollable-child");

			return {
				tcHeight: scrollableContent.offsetHeight,
				tcScrollHeight: scrollableContent.scrollHeight,
			}
		});

		const { tabHeight, tabScrollHeight } = browser.execute(() => {
			const scrollableContent = document.getElementById("scrollable-tab").shadowRoot.querySelector("div");

			return {
				tabHeight: scrollableContent.offsetHeight,
				tabScrollHeight: scrollableContent.scrollHeight,
			}
		});

		assert.ok(tabHeight < tabScrollHeight, "Tab Content is scrollable");
		assert.ok(tcHeight >= tcScrollHeight, "TabContainer is not scrollable scrollable");
	});

	it("tests aria attrs", () => {
		const tabContainer = browser.$("#tabContainer1");
		const tab4 = tabContainer.shadow$(".ui5-tab-strip-item:nth-child(4)");

		// assert: The TabContainer has 8 children, 7 tabs and 1 separator (at position 2)
		// and the separator should be skipped in terms of aria-posinset and aria-setsize,
		// so for child number 4 ("Monitors") we expect the following attributes aria-posinset="3" and aria-setsize="7".
		assert.strictEqual(tab4.getAttribute("aria-posinset"), "3", "The aria-posinset is correct.");
		assert.strictEqual(tab4.getAttribute("aria-setsize"), "7", "The aria-setsize is correct.");
	});
});
