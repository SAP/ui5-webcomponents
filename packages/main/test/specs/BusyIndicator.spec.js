const assert = require("assert");

describe("Busy Indicator general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/BusyIndicator.html");

	it("tests hide property", () => {
		const indicator = browser.findElementDeep("#indicator1");
		assert.strictEqual(false, indicator.isDisplayed());
	});
});