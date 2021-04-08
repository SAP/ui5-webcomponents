const assert = require("chai").assert;

describe("Timeline general interaction", () => {
	before(() => {
		browser.url("http://localhost:8081/test-resources/pages/Timeline.html");
	});

	it("should fire itemNameClick event on a normal item name", () => {
		const timelineItemName = browser.$("#test-item").shadow$("ui5-link");
		const result = $("#result");

		// disable the click test temporarily, wdio click simulation does not trigger the ui5-link click handler
		// and triggering the click on the internal <a> element makes wdio throw an error that it is not clickable
		// timelineItemName.click();
		// assert.strictEqual(result.getText(), "Stanislava Baltova", "Click event is fired");
	});
});
