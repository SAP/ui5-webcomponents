import { assert } from "chai";

describe("SegmentedButton general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/SegmentedButton.html`);
	});

	it("tests if pressed and tooltip attributes are applied", async () => {
		const segmentedButtonItem =  await browser.$("#segButton1 > ui5-segmented-button-item:first-child");
		const segmentedButtonItemInner = await segmentedButtonItem.shadow$(".ui5-button-root");

		assert.ok(await segmentedButtonItem.getProperty("pressed"), "SegmentedButtonItem has property pressed");
		assert.strictEqual(await segmentedButtonItemInner.getProperty("title"), "Employee",
			"SegmentedButtonItem root element has property title");
	});


	it("tests if pressed attribute is switched to the newly pressed item when selected with enter key", async () => {
		const firstSegmentedButtonItem =  await browser.$("#segButton1 > ui5-segmented-button-item:first-child");
		const secondSegmentedButtonItem =  await browser.$("#segButton1 > ui5-segmented-button-item:nth-child(2)");

		await firstSegmentedButtonItem.click();
		await firstSegmentedButtonItem.keys("ArrowRight");
		await browser.keys("Enter");

		assert.notOk(await firstSegmentedButtonItem.getProperty("pressed"), "First SegmentedButtonItem should not be pressed anymore");
		assert.ok(await secondSegmentedButtonItem.getProperty("pressed"), "Second SegmentedButtonItem has property pressed");
	});

	it("tests if pressed attribute is switched to the newly pressed item when selected with space key", async () => {
		const secondSegmentedButtonItem =  await browser.$("#segButton1 > ui5-segmented-button-item:nth-child(2)");
		const lastSegmentedButtonItem =  await browser.$("#segButton1 > ui5-segmented-button-item:last-child");

		await secondSegmentedButtonItem.keys("ArrowRight");
		await browser.keys("Space");

		assert.notOk(await secondSegmentedButtonItem.getProperty("pressed"), "Second SegmentedButtonItem should not be pressed anymore");
		assert.ok(await lastSegmentedButtonItem.getProperty("pressed"), "Last SegmentedButtonItem has property pressed");
	});

	it("tests if pressed attribute is switched to the newly pressed item when selected with mouse", async () => {
		const firstSegmentedButtonItem =  await browser.$("#segButton1 > ui5-segmented-button-item:first-child");
		const lastSegmentedButtonItem =  await browser.$("#segButton1 > ui5-segmented-button-item:last-child");

		await firstSegmentedButtonItem.click();

		assert.ok(await firstSegmentedButtonItem.getProperty("pressed"), "First SegmentedButtonItem has property pressed");
		assert.notOk(await lastSegmentedButtonItem.getProperty("pressed"), "Last SegmentedButtonItem should not be pressed anymore");
	});

	it("tests if pressed attribute is applied only to last child when all items are pressed", async () => {
		const segmentedButtonItem1 =  await browser.$("#segButton2 > ui5-segmented-button-item:first-child");
		const segmentedButtonItem2 =  await browser.$("#segButton2 > ui5-segmented-button-item:nth-child(2)");
		const segmentedButtonItem3 =  await browser.$("#segButton2 > ui5-segmented-button-item:nth-child(3)");
		const segmentedButtonItem4 =  await browser.$("#segButton2 > ui5-segmented-button-item:last-child");

		// only last item should be pressed
		assert.notOk(await segmentedButtonItem1.getProperty("pressed"), "SegmentedButtonItem should not be pressed");
		assert.notOk(await segmentedButtonItem2.getProperty("pressed"), "SegmentedButtonItem should not be pressed");
		assert.notOk(await segmentedButtonItem3.getProperty("pressed"), "SegmentedButtonItem should not be pressed");
		assert.ok(await segmentedButtonItem4.getProperty("pressed"), "SegmentedButtonItem has property pressed");

	});

	it("tests initial focus", async () => {
		const button1 =  await browser.$("#button1");
		const button2 =  await browser.$("#button2");
		const segmentedButtonItem1 =  await browser.$("#testSB1ToggleBtn");
		const segmentedButtonItem2 =  await browser.$("#testSB2ToggleBtn");

		await button1.click();
		await button1.keys("Tab");
		assert.ok(await segmentedButtonItem1.isFocused(), "The first SegmentedButtonItem should be focused.");

		await button2.click();
		await button2.keys("Tab");
		assert.ok(await segmentedButtonItem2.isFocused(), "The selected SegmentedButtonItem should be focused.");
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
		assert.notOk(await segmentedButtonItem1.getProperty("pressed"), "[step 1] The first SegmentedButtonItem should not be pressed.");
		assert.ok(await segmentedButtonItem2.getProperty("pressed"), "[step 1] The first SegmentedButtonItem should be pressed.");
		assert.notOk(await segmentedButtonItem3.getProperty("pressed"), "[step 1] The first SegmentedButtonItem should not be pressed.");

		await button2.click();
		assert.notOk(await segmentedButtonItem1.getProperty("pressed"), "[step 2] The first SegmentedButtonItem should not be pressed.");
		assert.notOk(await segmentedButtonItem2.getProperty("pressed"), "[step 2] The first SegmentedButtonItem should not be pressed.");
		assert.ok(await segmentedButtonItem3.getProperty("pressed"), "[step 2] The first SegmentedButtonItem should be pressed.");

		await button4.click();
		assert.ok(await segmentedButtonItem1.getProperty("pressed"), "[step 3] The first SegmentedButtonItem should be pressed.");
		assert.notOk(await segmentedButtonItem2.getProperty("pressed"), "[step 3] The first SegmentedButtonItem should not be pressed.");
		assert.notOk(await segmentedButtonItem3.getProperty("pressed"), "[step 3] The first SegmentedButtonItem should not be pressed.");

		await button1.click();
		assert.notOk(await segmentedButtonItem1.getProperty("pressed"), "[step 4] The first SegmentedButtonItem should not be pressed.");
		assert.ok(await segmentedButtonItem2.getProperty("pressed"), "[step 4] The first SegmentedButtonItem should be pressed.");
		assert.notOk(await segmentedButtonItem3.getProperty("pressed"), "[step 4] The first SegmentedButtonItem should not be pressed.");

		await button3.click();
		assert.notOk(await segmentedButtonItem1.getProperty("pressed"), "[step 5] The first SegmentedButtonItem should not be pressed.");
		assert.ok(await segmentedButtonItem2.getProperty("pressed"), "[step 5] The first SegmentedButtonItem should not be pressed.");
		assert.notOk(await segmentedButtonItem3.getProperty("pressed"), "[step 5] The first SegmentedButtonItem should be pressed.");
	});


});
