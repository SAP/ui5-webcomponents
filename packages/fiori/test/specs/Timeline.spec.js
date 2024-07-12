import { assert } from "chai";

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

	it("Item within Timeline Item is rendered", async () => {
		const timeline = await browser.$("#testTimeline");
		const timelineItem = await timeline.$("#testTimelineItem").shadow$("ui5-tli-desc");

		assert.ok(timelineItem, "Item within Timeline Item is rendered");
	})
});

describe("Timeline with group items interactions", () => {
	before(async () => {
		await browser.url(`test/pages/Timeline.html`);
	});

	it("Group items are rendered", async () => {
		const timeline = await browser.$("#verticalWithGrps");
		const groupItem = await timeline.$$("ui5-timeline-group-item[group-name='Events']");
		const groupItemsLength = await groupItem[0].$$("ui5-timeline-item").length;


		assert.strictEqual(groupItemsLength, 4, "Group items are rendered");
	})

	it("Group items are collapsed on button click", async () => {
		const timeline = await browser.$("#verticalWithGrps");
		const groupItem = await timeline.$$("ui5-timeline-group-item[group-name='Events']");
		const groupItemButton = await groupItem[0].shadow$("ui5-toggle-button");

		await groupItemButton.click();

		await browser.keys("Tab");

		const nextGroupItem = await timeline.$$("ui5-timeline-group-item[group-name='Meetings']");
		const nextGroupItemButton = nextGroupItem[0].shadow$("ui5-toggle-button");

		assert.ok(nextGroupItemButton.matches(":focus"), "Items are hidden on group collapse");
	})
})
