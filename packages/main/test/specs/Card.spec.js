const assert = require('assert');
describe("Card general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Card.html");

	it("fires headerPress upon click, Enter and Space", () => {
		const cardHeader = browser.findElementDeep("#card >>> .sapFCardHeader");
		const field = browser.$("#field");

		cardHeader.click();
		cardHeader.keys("Space");
		cardHeader.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "headerPress should be called 3 times");
	});

	it("Uses slotted header instead of properties", () => {
		const cardHeader = browser.findElementDeep(".header-slot-item");

		assert.ok(cardHeader.isDisplayed(), "Content from slot should take advantage");
	});
});