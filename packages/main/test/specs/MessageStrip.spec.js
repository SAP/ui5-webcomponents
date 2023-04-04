const assert = require("chai").assert;

describe("MessageStrip general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/MessageStrip.html`);
	});

	it("tests close event", async () => {

		const closeButton = await browser.$("#messageStrip").shadow$(".ui5-message-strip-close-button");
		const input = await browser.$("#inputField");

		await closeButton.click();
		await closeButton.keys("Space");
		await closeButton.keys("Enter");

		assert.strictEqual(await input.getProperty("value"), "3", "Close should be called 3 times");
	});
});

describe("ARIA Support", () => {
	before(async () => {
		await browser.url(`test/pages/MessageStrip.html`);
	});

	it("Test close button title text", async () => {

		const closeButton = await browser.$("#messageStrip").shadow$(".ui5-message-strip-close-button").shadow$("button");
		let resourceBundleText = null;

		resourceBundleText = await browser.executeAsync(done => {
			const messageStrip = document.getElementById("messageStrip");
			done(messageStrip.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.MESSAGE_STRIP_CLOSE_BUTTON));
		});

		assert.strictEqual(await closeButton.getAttribute("title"), resourceBundleText, "Close button title is correct");
	});

	it("Test hidden text element content", async () => {

		const messageStrip = await browser.$("#messageStrip");
		let invisibleText = await messageStrip.shadow$(".ui5-hidden-text");
		let resourceBundleText = null;

		resourceBundleText = await browser.executeAsync(done => {
			const messageStrip = document.getElementById("messageStrip");
			const msgStripi18nBundle = messageStrip.constructor.i18nBundle;
			done(`${msgStripi18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.MESSAGE_STRIP_INFORMATION)} ${msgStripi18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.MESSAGE_STRIP_CLOSABLE)}`);
		});

		assert.strictEqual(await invisibleText.getText(), resourceBundleText, "Hidden element content is correct");
	});
});

