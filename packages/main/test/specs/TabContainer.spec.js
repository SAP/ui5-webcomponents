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
});