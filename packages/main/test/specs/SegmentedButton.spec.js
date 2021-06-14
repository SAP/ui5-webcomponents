const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("SegmentedButton general interaction", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/SegmentedButton.html`);
	});

	it("tests if pressed attribute is applied", () => {
		const segmentedButtonItem =  browser.$("#segButton1 > ui5-segmented-button-item:first-child");

		assert.ok(segmentedButtonItem.getProperty("pressed"), "SegmentedButtonItem has property pressed");
	});

	it("tests if pressed attribute is switched to the newly pressed item when selected with enter key", () => {
		const firstSegmentedButtonItem =  browser.$("#segButton1 > ui5-segmented-button-item:first-child");
		const secondSegmentedButtonItem =  browser.$("#segButton1 > ui5-segmented-button-item:nth-child(2)");

		firstSegmentedButtonItem.click();
		firstSegmentedButtonItem.keys("ArrowRight");
		browser.keys("Enter");

		assert.ok(!firstSegmentedButtonItem.getProperty("pressed"), "First SegmentedButtonItem should not be pressed anymore");
		assert.ok(secondSegmentedButtonItem.getProperty("pressed"), "Second SegmentedButtonItem has property pressed");
	});

	it("tests if pressed attribute is switched to the newly pressed item when selected with space key", () => {
		const secondSegmentedButtonItem =  browser.$("#segButton1 > ui5-segmented-button-item:nth-child(2)");
		const lastSegmentedButtonItem =  browser.$("#segButton1 > ui5-segmented-button-item:last-child");

		secondSegmentedButtonItem.keys("ArrowRight");
		browser.keys("Space");

		assert.ok(!secondSegmentedButtonItem.getProperty("pressed"), "Second SegmentedButtonItem should not be pressed anymore");
		assert.ok(lastSegmentedButtonItem.getProperty("pressed"), "Last SegmentedButtonItem has property pressed");
	});

	it("tests if pressed attribute is switched to the newly pressed item when selected with mouse", () => {
		const firstSegmentedButtonItem =  browser.$("#segButton1 > ui5-segmented-button-item:first-child");
		const lastSegmentedButtonItem =  browser.$("#segButton1 > ui5-segmented-button-item:last-child");

		firstSegmentedButtonItem.click();

		assert.ok(firstSegmentedButtonItem.getProperty("pressed"), "First SegmentedButtonItem has property pressed");
		assert.ok(!lastSegmentedButtonItem.getProperty("pressed"), "Last SegmentedButtonItem should not be pressed anymore");
	});

	it("tests if pressed attribute is applied only to last child when all items are pressed", () => {
		const segmentedButtonItem1 =  browser.$("#segButton2 > ui5-segmented-button-item:first-child");
		const segmentedButtonItem2 =  browser.$("#segButton2 > ui5-segmented-button-item:nth-child(2)");
		const segmentedButtonItem3 =  browser.$("#segButton2 > ui5-segmented-button-item:nth-child(3)");
		const segmentedButtonItem4 =  browser.$("#segButton2 > ui5-segmented-button-item:last-child");

		// only last item should be pressed
		assert.ok(!segmentedButtonItem1.getProperty("pressed"), "SegmentedButtonItem should not be pressed");
		assert.ok(!segmentedButtonItem2.getProperty("pressed"), "SegmentedButtonItem should not be pressed");
		assert.ok(!segmentedButtonItem3.getProperty("pressed"), "SegmentedButtonItem should not be pressed");
		assert.ok(segmentedButtonItem4.getProperty("pressed"), "SegmentedButtonItem has property pressed");

	});

	it("tests initial focus", () => {
		const button1 =  browser.$("#button1");
		const button2 =  browser.$("#button2");
		const segmentedButtonItem1 =  browser.$("#testSB1ToggleBtn");
		const segmentedButtonItem2 =  browser.$("#testSB2ToggleBtn");

		button1.click();
		button1.keys("Tab");
		assert.ok(segmentedButtonItem1.isFocused(), "The first SegmentedButtonItem should be focused.");

		button2.click();
		button2.keys("Tab");
		assert.ok(segmentedButtonItem2.isFocused(), "The selected SegmentedButtonItem should be focused.");
	});
});
