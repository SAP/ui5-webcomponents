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
		assert.strictEqual(selectedFilter.id, selectedTab.id, "The IDs of the ui5-tab and the rendered tab matches.");
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

	it("tests start and end overflow behavior", async () => {

		assert.strictEqual(await browser.$("#tabContainerStartAndEndOverflow").getAttribute("tabs-overflow-mode"), "StartAndEnd", "overflow mode is set to StartAndEnd");

		// Resize
		await browser.setWindowSize(1000, 1080);
		const tabcontainer = await browser.$("#tabContainerStartAndEndOverflow");
		const startOverflow = await tabcontainer.shadow$(".ui5-tc__overflow--start");
		assert.strictEqual(await startOverflow.getProperty("innerText"), "+11", "11 tabs in start overflow");

		await browser.setWindowSize(800, 1080);
		assert.strictEqual(await startOverflow.getProperty("innerText"), "+14", "14 tabs in start overflow");

		// Select
		const initiallySelectedItem = await tabcontainer.$("[selected]");
		assert.strictEqual(await initiallySelectedItem.getProperty("text"), "Twenty", "Initially selected item is Twenty");

		await startOverflow.click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#tabContainerStartAndEndOverflow");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const item = await (await popover.$("ui5-list").$$("ui5-li-custom"))[0];

		assert.strictEqual(await item.getProperty("innerText"), "One", "First item in overflow is 1");

		await item.click()
		const newlySelectedItem = await tabcontainer.$("[selected]");

		assert.strictEqual(await newlySelectedItem.getProperty("text"), "One", "Newly selected item is One");
	});

	it("tests end overflow behavior", async () => {

		await browser.setWindowSize(1000, 1080);

		const tabcontainer = await browser.$("#tabContainerEndOverflow");
		const endOverflow = await tabcontainer.shadow$(".ui5-tc__overflow--end");

		// Select
		const initiallySelectedItem = await tabcontainer.$("[selected]");
		assert.strictEqual(await initiallySelectedItem.getProperty("text"), "Thirteen", "Initially selected item is 13");

		await endOverflow.click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#tabContainerEndOverflow");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		await (await popover.$("ui5-list").$$("ui5-li-custom"))[0].click();

		const newlySelectedItem = await tabcontainer.$("[selected]");

		assert.strictEqual(await newlySelectedItem.getProperty("text"), "Twelve", "The first item in the overflow is 12");

	});

	it("tests removing of responsive paddings for the content", async () => {
		const tabContainer = await browser.$(".tabContainerNoContentPaddings");
		const expectedContentPadding = "0px";
		const actualContentPadding = await tabContainer.shadow$(".ui5-tc__content").getCSSProperty("padding-left");

		assert.strictEqual(actualContentPadding.value, expectedContentPadding, "tabContainer has correct padding set on the content");
	});

	it("tests custom overflow buttons via slots", async () => {
		await browser.setWindowSize(1000, 1080);

		const tabContainer = await browser.$("#tabContainerCustomOverflowButtons");
		const startOverflow = await tabContainer.shadow$("slot[name=startOverflowButton]");
		const endOverflow = await tabContainer.shadow$("slot[name=overflowButton]");

		assert.ok(startOverflow.isExisting(), "tabContainer has custom start overflow button");
		assert.ok(endOverflow.isExisting(), "tabContainer has custom end overflow button");

		assert.ok(startOverflow.isDisplayed(), "tabContainer has custom start overflow button displayed");
		assert.ok(endOverflow.isDisplayed(), "tabContainer has custom end overflow button displayed ");

		const startButton = await browser.$("#startOverflowButton");
		startButton.click();
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#tabContainerCustomOverflowButtons");
		let popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		await (await popover.$("ui5-list").$$("ui5-li-custom"))[0].click();

		let newlySelectedItem = await tabContainer.$("[selected]");

		assert.strictEqual(await newlySelectedItem.getProperty("text"), "One", "The first item in the overflow is 1");

		const endButton = await browser.$("#endOverflowButton");
		endButton.click();
		popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		await (await popover.$("ui5-list").$$("ui5-li-custom"))[0].click();

		newlySelectedItem = await tabContainer.$("[selected]");

		assert.strictEqual(await newlySelectedItem.getProperty("text"), "Thirteen", "The first item in the overflow is 13");
	});
});
