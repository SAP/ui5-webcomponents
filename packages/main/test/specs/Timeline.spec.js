const assert = require("assert");

describe("Timeline general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Timeline.html");

	it("should fire itemNamePress event on a normal item name", () => {
		const timelineItemName = browser.findElementDeep("#test-item >>> ui5-link");
		const result = $("#result");

		timelineItemName.click();
		assert.strictEqual(result.getText(), "Stanislava Baltova", "Press event is fired");
	});
});
