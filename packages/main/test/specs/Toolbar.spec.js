import { assert } from "chai";

describe("Toolbar general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Toolbar.html`);
	});

	it("should open popover when pressing overflow button", async () => {
		const overflowButton = await browser.$("myOverflowBtn");

		await overflowButton.click();

		const popover = await browser.$("ui5-popover");
		assert.strictEqual(await popover.open, true, "click event changed pressed state");
	});
});
