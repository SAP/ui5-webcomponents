import { assert } from "chai";

describe("Notification List Group Item Tests", () => {
	before(async () => {
		await browser.url(`test/pages/NotificationListGroupItem.html`);
	});

	it("tests click growing button", async () => {
		const growingBtn = await browser.$('>>> #notificationListFirstGroup [id$="growing-btn"]');
		await browser.pause(2000);
		assert.ok(await growingBtn.isDisplayed(), "Growing button is visible");

		let groupItems = await browser.$$("#notificationListFirstGroup ui5-li-notification");
		assert.strictEqual(groupItems.length, 3, "group items count is correct");

		await growingBtn.click();
		await browser.pause(2000);

		groupItems = await browser.$$("#notificationListFirstGroup ui5-li-notification");
		assert.strictEqual(groupItems.length, 8, "group items count is correct");
	});
});
