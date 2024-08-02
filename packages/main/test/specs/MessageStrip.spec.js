import { assert } from "chai";

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

describe("API", () => {
	before(async () => {
		await browser.url(`test/pages/MessageStrip.html`);
	});

	it("test design property", async () => {
		// Arrange
		const messageStripColorSet1 = await browser.$("#colorSet1ColorScheme1");
		const messageStripColorSet2 = await browser.$("#colorSet1ColorScheme2");
		let messageStripDesign1 = await messageStripColorSet1.getProperty("design");
		let messageStripDesign2 = await messageStripColorSet2.getProperty("design");

		// Assert
		assert.strictEqual(messageStripDesign1, "ColorSet1", "Design property should be equal to 'ColorSet1'");
		assert.strictEqual(messageStripDesign2, "ColorSet2", "Design property should be equal to 'ColorSet2'");

		// Act
		await messageStripColorSet1.setProperty("design", "Information");
		let messageStripInformation = await messageStripColorSet1.getProperty("design");

		// Assert
		assert.strictEqual(messageStripInformation, "Information",  "Design property should be changed to 'Information'");
	});

	it("test colorScheme property", async () => {
		// Arrange
		const messageStripWithoutScheme = await browser.$("#defaultColorScheme");
		const messageStripColorScheme = await browser.$("#colorScheme7");
		let messageStripDefaultScheme = await messageStripWithoutScheme.getProperty("colorScheme");
		let messageStripColorScheme7 = await messageStripColorScheme.getProperty("colorScheme");

		// Assert
		assert.strictEqual(messageStripDefaultScheme, "1", "colorScheme property should be equal to '1' by default");
		assert.strictEqual(messageStripColorScheme7, "7", "colorScheme property should be equal to '7'");

		// Act
		await messageStripColorScheme.setProperty("colorScheme", "3");
		let messageStripColorScheme3 = await messageStripColorScheme.getProperty("colorScheme");

		// Assert
		assert.strictEqual(messageStripColorScheme3, "3",  "colorScheme property should be equal to '3' by default'");
	});

	it("Message strip is rendered without icon when design changes from default to a specific color set and scheme", async () => {
		const messageStrip = await browser.$("#ms");
		const btn = await browser.$("#btn");

		await btn.click();

		assert.strictEqual(await messageStrip.shadow$(".ui5-message-strip-icon").isExisting(), false, "Message strip does not render icon");
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
		const customMessageStrip = await browser.$("#colorSet1ColorScheme1");
		let invisibleText = await messageStrip.shadow$(".ui5-hidden-text");
		let customMessageStripInvisibleText = await customMessageStrip.shadow$(".ui5-hidden-text");
		let resourceBundleText = null;

		resourceBundleText = await browser.executeAsync(done => {
			const messageStrip = document.getElementById("messageStrip");
			const msgStripi18nBundle = messageStrip.constructor.i18nBundle;
			done({
				information: `${msgStripi18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.MESSAGE_STRIP_INFORMATION)} ${msgStripi18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.MESSAGE_STRIP_CLOSABLE)}`,
				custom: `${msgStripi18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.MESSAGE_STRIP_CUSTOM)} ${msgStripi18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.MESSAGE_STRIP_CLOSABLE)}`,
			});
		});

		assert.strictEqual(await invisibleText.getText(), resourceBundleText.information, "Hidden element content is correct");
		assert.strictEqual(await customMessageStripInvisibleText.getText(), resourceBundleText.custom, "Hidden element content is correct");
	});
});
