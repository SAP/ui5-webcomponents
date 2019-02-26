const assert = require('assert');

describe("TabContainer general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/TabContainer.html");

	it("tests itemSelect event", () => {
		const item = browser.findElementDeep("#tabContainer1 >>> .sapMITBItem:nth-child(3)");
		const field = browser.$("#field");
		const field2 = browser.$("#field2");
		const field3 = browser.$("#field3");

		const SELECTED_TAB_KEY = "item2";
		const SELECTED_TAB_TEXT = "Tab 2";

		item.click();

		assert.strictEqual(field.getProperty("value"), "1", "itemSelect event should be fired once");
		assert.strictEqual(field2.getProperty("value"), SELECTED_TAB_KEY, "Item data-key is retrieved correctly");
		assert.strictEqual(field3.getProperty("value"), SELECTED_TAB_TEXT, "Item text is retrieved correctly.");
	});

	it("scroll works on iconsOnly TabContainer", () => {
		browser.setWindowSize(250, 1080);

		const arrowLeft = browser.findElementDeep("#tabContainerIconOnly >>> .sapMITBArrowScrollLeft");
		const arrowRight = browser.findElementDeep("#tabContainerIconOnly >>> .sapMITBArrowScrollRight");

		assert.ok(!arrowLeft.isDisplayed(), "'Left Arrow' should be initially hidden");
		assert.ok(arrowRight.isDisplayed(), "'Right Arrow' should be initially shown");

		arrowRight.click();
		browser.pause(300); // TODO: wait for animation finish. Remove when solved on framework level

		assert.ok(arrowLeft.isDisplayed(), "'Left Arrow' should be shown after 'Right Arrow' click");
		assert.ok(!arrowRight.isDisplayed(), "'Right Arrow' should be hidden after 'Right Arrow' click");

		arrowLeft.click();
		browser.pause(300); // TODO: wait for animation finish. Remove when solved on framework level

		assert.ok(!arrowLeft.isDisplayed(), "'Left Arrow' should be hidden after 'Left Arrow' click");
		assert.ok(arrowRight.isDisplayed(), "'Right Arrow' should be shown after 'Left Arrow' click");
	});

	it("scroll works on textOnly TabContainer", () => {
		browser.setWindowSize(250, 1080);
		browser.findElementDeep("#tabContainerTextOnly").scrollIntoView();

		const arrowLeft = browser.findElementDeep("#tabContainerTextOnly >>> .sapMITBArrowScrollLeftTextOnly");
		const arrowRight = browser.findElementDeep("#tabContainerTextOnly >>> .sapMITBArrowScrollRightTextOnly");

		assert.ok(!arrowLeft.isDisplayed(), "'Left Arrow' should be initially hidden");
		assert.ok(arrowRight.isDisplayed(), "'Right Arrow' should be initially shown");

		arrowRight.click();
		browser.pause(300); // TODO: wait for animation finish. Remove when solved on framework level

		assert.ok(arrowLeft.isDisplayed(), "'Left Arrow' should be shown after 'Right Arrow' click");
		assert.ok(!arrowRight.isDisplayed(), "'Right Arrow' should be hidden after 'Right Arrow' click");

		arrowLeft.click();
		browser.pause(300); // TODO: wait for animation finish. Remove when solved on framework level

		assert.ok(!arrowLeft.isDisplayed(), "'Left Arrow' should be hidden after 'Left Arrow' click");
		assert.ok(arrowRight.isDisplayed(), "'Right Arrow' should be shown after 'Left Arrow' click");
	});
});
