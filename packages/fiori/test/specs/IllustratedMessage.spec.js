const assert = require("chai").assert;

describe("IllustratedMessage 'size' property", () => {
	before(async () => {
		await browser.url(`test/pages/IllustratedMessage.html`);
	});

	it("should return correct size", async () => {
		// Arrange
		const illustratedMsg = await browser.$("#illustratedMsg2");
		let illustratedMsgSize = await illustratedMsg.getProperty("size");

		// Assert
		assert.strictEqual(illustratedMsgSize, "Auto", "'size' should be equal to 'Auto' by default");

		// Act
		await illustratedMsg.setProperty("size", "Base");
		illustratedMsgSize = await illustratedMsg.getProperty("size");

		// Assert
		assert.strictEqual(illustratedMsgSize, "Base", "'size' should be equal to 'Base'");

		// Act
		await illustratedMsg.setProperty("size", "Invalid");
		illustratedMsgSize = await illustratedMsg.getProperty("size");

		// Assert
		assert.strictEqual(illustratedMsgSize, "Auto", "'size' should be equal to 'Auto' when invalid value is passed");
	});

	it("should show up properly, when in panel and it expand/collapse", async () => {
		// Arrange
		const illustratedMsg = await browser.$("#illustratedMsg4");
		const panel = await browser.$("#panel1");
		let illustratedMsgMedia = await illustratedMsg.getProperty("media");
		// Act

		await panel.setProperty("collapsed", true);
		illustratedMsgMedia = await illustratedMsg.getProperty("media");

		// Assert
		assert.strictEqual(illustratedMsgMedia, "base", "'media' should be equal to 'base', when the panel is collapsed");

		await panel.setProperty("collapsed", false);
		illustratedMsgMedia = await illustratedMsg.getProperty("media");

		// Assert
		assert.strictEqual(illustratedMsgMedia !== "base", true, "'media' shouldn`t anymore be equal to 'base', when panel is expanded");

	});

});

describe("Accessibility", () => {
	before(async () => {
		await browser.url(`test/pages/IllustratedMessage.html`);
	});


	it("accessible-name-ref", async () => {
		// Arrange
		const illustratedMsg = await browser.$("#illustratedMsg2"),
			  illustratedMsgSVG = await browser.$("#illustratedMsg2").shadow$('.ui5-illustrated-message-illustration svg'),
			  EXPECTED_ARIA_LABEL_NAME = "Text from aria-labelledby";

		// Assert
		assert.strictEqual(await illustratedMsgSVG.getAttribute("aria-label"), EXPECTED_ARIA_LABEL_NAME, "aria-label is set");

		// Act
		await illustratedMsg.removeAttribute("accessible-name-ref");

		// Assert
		assert.strictEqual(await illustratedMsgSVG.hasAttribute("aria-label"), false);

		// Act
		await illustratedMsg.setAttribute("accessible-name-ref", "lbl");

		// Assert
		assert.strictEqual(await illustratedMsgSVG.getAttribute("aria-label"), EXPECTED_ARIA_LABEL_NAME, "aria-label is set");

	});

});