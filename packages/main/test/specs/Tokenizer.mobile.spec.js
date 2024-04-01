import { assert } from "chai";

const getTokenizerPopoverId = async (tokenizerId) => {
	return await browser.executeAsync(async (tokenizerId, done) => {
		const staticAreaItem = await (document.querySelector(`#${tokenizerId}`).getStaticAreaItemDomRef());

		done(staticAreaItem.host.classList[0]);
	}, tokenizerId);
}

describe("Tokenizer general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Tokenizer.html`);
		await browser.emulateDevice('iPhone X');
	});

	it("n-more picker dialog is properly rendered", async () => {
		const tokenizer = await browser.$("#nmore-tokenizer");
		const nMoreLabel = await tokenizer.shadow$(".ui5-tokenizer-more-text");

		await nMoreLabel.click();

		const rpoClassName = await getTokenizerPopoverId("nmore-tokenizer");
		const nMoreDialog = await browser.$(`.${rpoClassName}`).shadow$("ui5-responsive-popover");

		assert.ok(await nMoreDialog.getProperty("opened"), "More Popover should be open");
		assert.ok(await nMoreDialog.$(".ui5-responsive-popover-header .ui5-responsive-popover-close-btn").isDisplayed(), "More Popover close button is shown");
		assert.ok(await nMoreDialog.$(".ui5-responsive-popover-footer ui5-button").isDisplayed(), "More Popover OK button is shown");
	});
});

describe("Deleting tokens", () => {
	before(async () => {
		await browser.url(`test/pages/Tokenizer.html`);
		await browser.emulateDevice('iPhone X');
	});

	it("Should fire the ui5-token-delete event when the 'X' is pressed in the n-more picker", async () => {
		const tokenizer = await browser.$("#delete-tokenizer");
		const nMoreLabel = await tokenizer.shadow$(".ui5-tokenizer-more-text");

		await nMoreLabel.click();

		const rpoClassName = await getTokenizerPopoverId("delete-tokenizer");
		const nMoreDialog = await browser.$(`.${rpoClassName}`).shadow$("ui5-responsive-popover");
		const listItemDeleteButton = await nMoreDialog.$$("ui5-li")[0].shadow$('.ui5-li-deletebtn ui5-button');

		await listItemDeleteButton.click();
		await nMoreDialog.$(".ui5-responsive-popover-footer ui5-button").click();

		const tokens = await tokenizer.$$("ui5-token");

		assert.equal(tokens.length, 4, "should have 4 tokens");
	});
});