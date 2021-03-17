const assert = require("chai").assert;

describe("SegmentedButton general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/SegmentedButton.html");
	});

	it("tests if pressed attribute is applied", () => {
		const toggleButton =  browser.$("#segButton1 > ui5-togglebutton:first-child");

		assert.ok(toggleButton.getProperty("pressed"), "ToggleButton has property pressed");
	});

	it("tests if pressed attribute is switched to the newly pressed button", () => {
		const firstToggleButton =  browser.$("#segButton1 > ui5-togglebutton:first-child");
		const lastToggleButton =  browser.$("#segButton1 > ui5-togglebutton:last-child");

		lastToggleButton.click();

		assert.ok(lastToggleButton.getProperty("pressed"), "Last ToggleButton has property pressed");
		assert.ok(!firstToggleButton.getProperty("pressed"), "First ToggleButton should not be pressed anymore");
	});

	it("tests if pressed attribute is applied only to last child when all buttons are pressed", () => {
		const toggleButton1 =  browser.$("#segButton2 > ui5-togglebutton:first-child");
		const toggleButton2 =  browser.$("#segButton2 > ui5-togglebutton:nth-child(2)");
		const toggleButton3 =  browser.$("#segButton2 > ui5-togglebutton:nth-child(3)");
		const toggleButton4 =  browser.$("#segButton2 > ui5-togglebutton:last-child");

		// only last button should be pressed
		assert.ok(!toggleButton1.getProperty("pressed"), "ToggleButton should not be pressed");
		assert.ok(!toggleButton2.getProperty("pressed"), "ToggleButton should not be pressed");
		assert.ok(!toggleButton3.getProperty("pressed"), "ToggleButton should not be pressed");
		assert.ok(toggleButton4.getProperty("pressed"), "ToggleButton has property pressed");

	});

	it("tests initial focus", () => {
		const button1 =  browser.$("#button1");
		const button2 =  browser.$("#button2");
		const toggleButton1 =  browser.$("#testSB1ToggleBtn");
		const toggleButton2 =  browser.$("#testSB2ToggleBtn");

		button1.click();
		button1.keys("Tab");
		assert.ok(toggleButton1.isFocused(), "The first ToggleButton should be focused.");

		button2.click();
		button2.keys("Tab");
		assert.ok(toggleButton2.isFocused(), "The selected ToggleButton should be focused.");
	});
});
