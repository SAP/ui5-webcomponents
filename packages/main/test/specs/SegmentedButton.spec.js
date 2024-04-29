import { assert } from "chai";

describe("SegmentedButton general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/SegmentedButton.html`);
	});

	it("tests if selected and tooltip attributes are applied", async () => {
		const segmentedButtonItem =  await browser.$("#segButton1 > ui5-segmented-button-item:first-child");
		const segmentedButtonItemInner = await segmentedButtonItem.shadow$(".ui5-segmented-button-item-root");

		assert.ok(await segmentedButtonItem.getProperty("selected"), "SegmentedButtonItem has property selected");
		assert.strictEqual(await segmentedButtonItemInner.getProperty("title"), "Employee",
			"SegmentedButtonItem root element has property title");
	});


	it("tests if selected attribute is switched to the newly selected item when selected with enter key", async () => {
		const firstSegmentedButtonItem =  await browser.$("#segButton1 > ui5-segmented-button-item:first-child");
		const secondSegmentedButtonItem =  await browser.$("#segButton1 > ui5-segmented-button-item:nth-child(2)");

		await firstSegmentedButtonItem.click();
		await firstSegmentedButtonItem.keys("ArrowRight");
		await browser.keys("Enter");

		assert.notOk(await firstSegmentedButtonItem.getProperty("selected"), "First SegmentedButtonItem should not be selected anymore");
		assert.ok(await secondSegmentedButtonItem.getProperty("selected"), "Second SegmentedButtonItem has property selected");
	});

	it("tests if selected attribute is switched to the newly selected item when selected with space key", async () => {
		const secondSegmentedButtonItem =  await browser.$("#segButton1 > ui5-segmented-button-item:nth-child(2)");
		const lastSegmentedButtonItem =  await browser.$("#segButton1 > ui5-segmented-button-item:last-child");

		await secondSegmentedButtonItem.keys("ArrowRight");
		await browser.keys("Space");

		assert.notOk(await secondSegmentedButtonItem.getProperty("selected"), "Second SegmentedButtonItem should not be selected anymore");
		assert.ok(await lastSegmentedButtonItem.getProperty("selected"), "Last SegmentedButtonItem has property selected");
	});

	it("tests if selected attribute is switched to the newly selected item when selected with mouse", async () => {
		const firstSegmentedButtonItem =  await browser.$("#segButton1 > ui5-segmented-button-item:first-child");
		const lastSegmentedButtonItem =  await browser.$("#segButton1 > ui5-segmented-button-item:last-child");

		await firstSegmentedButtonItem.click();

		assert.ok(await firstSegmentedButtonItem.getProperty("selected"), "First SegmentedButtonItem has property selected");
		assert.notOk(await lastSegmentedButtonItem.getProperty("selected"), "Last SegmentedButtonItem should not be selected anymore");
	});

	it("tests if selected attribute is applied only to last child when all items are selected", async () => {
		const segmentedButtonItem1 =  await browser.$("#segButton2 > ui5-segmented-button-item:first-child");
		const segmentedButtonItem2 =  await browser.$("#segButton2 > ui5-segmented-button-item:nth-child(2)");
		const segmentedButtonItem3 =  await browser.$("#segButton2 > ui5-segmented-button-item:nth-child(3)");
		const segmentedButtonItem4 =  await browser.$("#segButton2 > ui5-segmented-button-item:last-child");

		// only last item should be selected
		assert.notOk(await segmentedButtonItem1.getProperty("selected"), "SegmentedButtonItem should not be selected");
		assert.notOk(await segmentedButtonItem2.getProperty("selected"), "SegmentedButtonItem should not be selected");
		assert.notOk(await segmentedButtonItem3.getProperty("selected"), "SegmentedButtonItem should not be selected");
		assert.ok(await segmentedButtonItem4.getProperty("selected"), "SegmentedButtonItem has property selected");

	});

	it("tests initial focus", async () => {
		const button1 =  await browser.$("#button1");
		const button2 =  await browser.$("#button2");
		const segmentedButtonItem1 =  await browser.$("#testSB1ToggleBtn");
		const segmentedButtonItem2 =  await browser.$("#testSB2ToggleBtn");

		await button1.click();
		await button1.keys("Tab");
		assert.ok(await segmentedButtonItem1.matches(":focus"), "The first SegmentedButtonItem should be focused.");

		await button2.click();
		await button2.keys("Tab");
		assert.ok(await segmentedButtonItem2.matches(":focus"), "The selected SegmentedButtonItem should be focused.");
	});

	it("tests programatical item pressing", async () => {
		const button1 =  await browser.$("#progSetButton1");
		const button2 =  await browser.$("#progSetButton2");
		const button3 =  await browser.$("#progSetButton3");
		const button4 =  await browser.$("#progSetButton4");
		const segmentedButtonItem1 =  await browser.$("#sbpItem1");
		const segmentedButtonItem2 =  await browser.$("#sbpItem2");
		const segmentedButtonItem3 =  await browser.$("#sbpItem3");

		await button1.click();
		assert.notOk(await segmentedButtonItem1.getProperty("selected"), "[step 1] The first SegmentedButtonItem should not be selected.");
		assert.ok(await segmentedButtonItem2.getProperty("selected"), "[step 1] The first SegmentedButtonItem should be selected.");
		assert.notOk(await segmentedButtonItem3.getProperty("selected"), "[step 1] The first SegmentedButtonItem should not be selected.");

		await button2.click();
		assert.notOk(await segmentedButtonItem1.getProperty("selected"), "[step 2] The first SegmentedButtonItem should not be selected.");
		assert.notOk(await segmentedButtonItem2.getProperty("selected"), "[step 2] The first SegmentedButtonItem should not be selected.");
		assert.ok(await segmentedButtonItem3.getProperty("selected"), "[step 2] The first SegmentedButtonItem should be selected.");

		await button4.click();
		assert.ok(await segmentedButtonItem1.getProperty("selected"), "[step 3] The first SegmentedButtonItem should be selected.");
		assert.notOk(await segmentedButtonItem2.getProperty("selected"), "[step 3] The first SegmentedButtonItem should not be selected.");
		assert.notOk(await segmentedButtonItem3.getProperty("selected"), "[step 3] The first SegmentedButtonItem should not be selected.");

		await button1.click();
		assert.notOk(await segmentedButtonItem1.getProperty("selected"), "[step 4] The first SegmentedButtonItem should not be selected.");
		assert.ok(await segmentedButtonItem2.getProperty("selected"), "[step 4] The first SegmentedButtonItem should be selected.");
		assert.notOk(await segmentedButtonItem3.getProperty("selected"), "[step 4] The first SegmentedButtonItem should not be selected.");

		await button3.click();
		assert.notOk(await segmentedButtonItem1.getProperty("selected"), "[step 5] The first SegmentedButtonItem should not be selected.");
		assert.ok(await segmentedButtonItem2.getProperty("selected"), "[step 5] The first SegmentedButtonItem should not be selected.");
		assert.notOk(await segmentedButtonItem3.getProperty("selected"), "[step 5] The first SegmentedButtonItem should be selected.");
	});

	it("tests if a selected item could be deselected", async () => {
		const firstSegmentedButtonItem =  await browser.$("#segButtonMulti > ui5-segmented-button-item:first-child");

		await firstSegmentedButtonItem.click();
		assert.ok(await firstSegmentedButtonItem.getProperty("selected"), "First SegmentedButtonItem should be selected");

		await firstSegmentedButtonItem.click();
		assert.notOk(await firstSegmentedButtonItem.getProperty("selected"), "First SegmentedButtonItem should be deselected");
	});

	it("tests if multiple items could be selected", async () => {
		const firstSegmentedButtonItem =  await browser.$("#segButtonMulti > ui5-segmented-button-item:first-child");
		const secondSegmentedButtonItem =  await browser.$("#segButtonMulti > ui5-segmented-button-item:nth-child(1)");

		await firstSegmentedButtonItem.click();
		await secondSegmentedButtonItem.keys("ArrowRight");
		await browser.keys("Space");

		assert.ok(await firstSegmentedButtonItem.getProperty("selected"), "First SegmentedButtonItem should be selected");
		assert.ok(await secondSegmentedButtonItem.getProperty("selected"), "Second SegmentedButtonItem should be selected");
	});
});

describe.only("SegmentedButton accessibility", () => {
	before(async () => {
		await browser.url(`test/pages/SegmentedButton.html`);
	});

	it ("aria-label is correctly set from accessibleName attr", async () => {
		const item = await browser.$("#accBtn1"),
			itemRoot = item.shadow$(".ui5-segmented-button-item-root");

		assert.equal(await itemRoot.getAttribute("aria-label"), await item.getAttribute("accessible-name"), "aria-label should be set according to accessibleName property");
	});

	it("aria-label is correctly set from accessibleNameRef attr", async () => {
		const button = await browser.$("#accBtn2").shadow$(".ui5-segmented-button-item-root");

		assert.strictEqual(await button.getAttribute("aria-label"), "accessible ref text", "aria-label should be set according to accessibleNameRef property");
	});
});

