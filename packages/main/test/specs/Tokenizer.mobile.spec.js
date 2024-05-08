import { assert } from "chai";

async function getResourceBundleTexts(keys) {
	return browser.executeAsync((keys, done) => {
		const tokenizer = document.getElementById("nmore-tokenizer");

		const texts = keys.reduce((result, key) => {
			result[key] = tokenizer.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts[key], 3)
			return result;
		}, {});
		done(texts);

	}, keys);
}

describe("Tokenizer general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Tokenizer.html`);
		await browser.emulateDevice('iPhone X');
	});

	it("n-more picker dialog is properly rendered", async () => {
		const tokenizer = await browser.$("#nmore-tokenizer");
		const nMoreLabel = await tokenizer.shadow$(".ui5-tokenizer-more-text");
		const keys = [
			"TOKENIZER_POPOVER_REMOVE",
		];
		const texts = await getResourceBundleTexts(keys);

		await nMoreLabel.click();

		const nMoreDialog = await tokenizer.shadow$("ui5-responsive-popover");

		assert.ok(await nMoreDialog.getProperty("open"), "More Popover should be open");
		assert.ok(await nMoreDialog.$(".ui5-responsive-popover-footer ui5-button[design='Emphasized']").isDisplayed(), "More Popover OK button is shown");
		assert.ok(await nMoreDialog.$(".ui5-responsive-popover-footer ui5-button[design='Transparent']").isDisplayed(), "More Popover Cancel button is shown");
		assert.strictEqual(await nMoreDialog.$(".ui5-responsive-popover-header .ui5-responsive-popover-header-text").getText(), texts.TOKENIZER_POPOVER_REMOVE, "More Popover title is correctly translated");
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

		const nMoreDialog = await tokenizer.shadow$("ui5-responsive-popover");
		const listItemDeleteButton = await nMoreDialog.$$("ui5-li")[0].shadow$('.ui5-li-deletebtn ui5-button');

		await listItemDeleteButton.click();
		await nMoreDialog.$(".ui5-responsive-popover-footer ui5-button").click();

		const tokens = await tokenizer.$$("ui5-token");

		assert.equal(tokens.length, 4, "should have 4 tokens");
	});
});