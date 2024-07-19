import { assert } from "chai";

describe("MultiInput events", () => {
	before(async () => {
		await browser.emulateDevice('iPhone X');
	});

	it("Selecting an item from the suggestion list fires change event only once", async () => {
		await browser.url(`test/pages/MultiInput.html`);

		const mi = await browser.$("#suggestion-token");

		await mi.scrollIntoView();
		await mi.click();
		await mi.keys("A");

		await mi.$$("ui5-suggestion-item")[0].click();

		const counter = await browser.$("#suggestion-token-counter");

		//assert
		assert.strictEqual(await counter.getValue(), "1", "The change event is fired once");
	});

	it("Cancelling input does not fire a change event", async () => {
		await browser.url(`test/pages/MultiInput_Suggestions.html`);

		const mi = await browser.$("#suggestion-token");

		await mi.click();
		await mi.keys("A");

		const closeButton = await mi.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-close-btn");
		await  closeButton.click();

		const counter = await browser.$("#suggestion-token-counter");

		//assert
		assert.strictEqual(await counter.getValue(), "0", "The change event is not fired");
	});
});