const assert = require('assert');
describe("Card general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Card.html");

	it("fires headerPress upon click, Enter and Space", () => {
		const cardHeader = browser.findElementDeep("#card >>> .sapFCardHeader");
		const cardHeader2 = browser.findElementDeep("#card2 >>> .sapFCardHeader");
		const field = browser.$("#field");

		cardHeader.click();
		cardHeader.keys("Space");
		cardHeader.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "headerPress should be called 3 times");


		cardHeader2.click();
		cardHeader2.keys("Space");
		cardHeader2.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "events count should remain 3 as the header is not interactive.");
	});
});