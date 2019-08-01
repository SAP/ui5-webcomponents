const assert = require('assert');

describe("TabContainer general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/TabContainer.html");

	it("tests itemSelect event", () => {
		const item = browser.findElementDeep("#tabContainer1 >>> .ui5-tc__headerItem:nth-child(3)");
		const result = browser.$("#result");

		const SELECTED_TAB_TEXT = "Laptops";

		item.click();

		assert.strictEqual(result.getText(), SELECTED_TAB_TEXT, "Item text is retrieved correctly.");
	});

	it("scroll works on iconsOnly TabContainer", () => {
		browser.setWindowSize(310, 1080);

		const arrowLeft = browser.findElementDeep("#tabContainerIconOnly >>> .ui5-tc__headerArrowLeft");
		const arrowRight = browser.findElementDeep("#tabContainerIconOnly >>> .ui5-tc__headerArrowRight");

		assert.ok(!arrowLeft.isDisplayed(), "'Left Arrow' should be initially hidden");
		assert.ok(arrowRight.isDisplayed(), "'Right Arrow' should be initially shown");

		arrowRight.click();
		browser.pause(500); // TODO: wait for animation finish. Remove when solved on framework level

		assert.ok(arrowLeft.isDisplayed(), "'Left Arrow' should be shown after 'Right Arrow' click");
		assert.ok(!arrowRight.isDisplayed(), "'Right Arrow' should be hidden after 'Right Arrow' click");

		arrowLeft.click();
		browser.pause(500); // TODO: wait for animation finish. Remove when solved on framework level

		assert.ok(!arrowLeft.isDisplayed(), "'Left Arrow' should be hidden after 'Left Arrow' click");
		assert.ok(arrowRight.isDisplayed(), "'Right Arrow' should be shown after 'Left Arrow' click");
	});

	it("scroll works on textOnly TabContainer", () => {
		browser.setWindowSize(310, 1080);
		browser.findElementDeep("#tabContainerTextOnly").scrollIntoView();

		const arrowLeft = browser.findElementDeep("#tabContainerTextOnly >>> .ui5-tc__headerArrowLeft");
		const arrowRight = browser.findElementDeep("#tabContainerTextOnly >>> .ui5-tc__headerArrowRight");

		assert.ok(!arrowLeft.isDisplayed(), "'Left Arrow' should be initially hidden");
		assert.ok(arrowRight.isDisplayed(), "'Right Arrow' should be initially shown");

		arrowRight.click();
		browser.pause(500); // TODO: wait for animation finish. Remove when solved on framework level

		assert.ok(arrowLeft.isDisplayed(), "'Left Arrow' should be shown after 'Right Arrow' click");
		assert.ok(!arrowRight.isDisplayed(), "'Right Arrow' should be hidden after 'Right Arrow' click");

		arrowLeft.click();
		browser.pause(500); // TODO: wait for animation finish. Remove when solved on framework level

		assert.ok(!arrowLeft.isDisplayed(), "'Left Arrow' should be hidden after 'Left Arrow' click");
		assert.ok(arrowRight.isDisplayed(), "'Right Arrow' should be shown after 'Left Arrow' click");
	});
});
