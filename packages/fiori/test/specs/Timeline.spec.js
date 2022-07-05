const assert = require("chai").assert;

describe("Timeline general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Timeline.html`);
	});

	it("should fire name-click event on a normal item name", async () => {
		const timelineItemName = await browser.$("ui5-timeline-item").shadow$("ui5-link");
		const result = await browser.$("#result");

		await timelineItemName.click();
		assert.strictEqual(await result.getText(), "Stanislava Baltova", "Click event is fired");
	});

	it("setting accessible-name applied on the host element is reflected on the ul tag", async () => {
		const timeline = await browser.$("#timelineAccName");

		assert.strictEqual(await timeline.shadow$("ul").getAttribute("aria-label"), "Timeline vertical", "Attribute is reflected");
	});
});
