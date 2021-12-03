const assert = require("chai").assert;

describe("MessageStrip general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/MessageStrip.html");

	it("tests close event", () => {

		const closeButton = browser.$("#messageStrip").shadow$(".ui5-messagestrip-close-button");
		const input = browser.$("#inputField");

		closeButton.click();
		closeButton.keys("Space");
		closeButton.keys("Enter");

		assert.strictEqual(input.getProperty("value"), "3", "Close should be called 3 times");
	});
});

describe("ARIA Support", () => {
	browser.url("http://localhost:8080/test-resources/pages/MessageStrip.html");

	it("Test close button title text", () => {

		const closeButton = browser.$("#messageStrip").shadow$(".ui5-messagestrip-close-button").shadow$("button");
		let resourceBundleText = null;

		resourceBundleText = browser.execute(() => {
			const messageStrip = document.getElementById("messageStrip");
			return messageStrip.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.MESSAGE_STRIP_CLOSE_BUTTON);
		});

		assert.strictEqual(closeButton.getAttribute("title"), resourceBundleText, "Close button title is correct");
	});

	it("Test hidden text element content", () => {

		const messageStrip = browser.$("#messageStrip");
		let invisibleText = messageStrip.shadow$(".ui5-hidden-text");
		let resourceBundleText = null;

		resourceBundleText = browser.execute(() => {
			const messageStrip = document.getElementById("messageStrip");
			const msgStripi18nBundle = messageStrip.i18nBundle;
			return `${msgStripi18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.MESSAGE_STRIP_INFORMATION)} ${msgStripi18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.MESSAGE_STRIP_CLOSABLE)}`;
		});

		assert.strictEqual(invisibleText.getText(), resourceBundleText, "Hidden element content is correct");
	});
});

