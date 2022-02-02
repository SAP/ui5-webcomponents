const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Timeline general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Timeline.html`);
	});

	it("should fire name-click event on a normal item name", async () => {
		const timelineItemName = await browser.$("ui5-timeline-item").shadow$("ui5-link");
		const result = await browser.$("#result");

		await timelineItemName.click();
		assert.strictEqual(await result.getText(), "Stanislava Baltova", "Click event is fired");
	});
});
