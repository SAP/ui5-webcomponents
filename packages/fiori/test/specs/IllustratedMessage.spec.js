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
		assert.strictEqual(await illustratedMsgSVG.getAttribute("aria-label"), 'undefined' , "aria-label is removed");

		// Act
		await illustratedMsg.setAttribute("accessible-name-ref", "lbl");

		// Assert
		assert.strictEqual(await illustratedMsgSVG.getAttribute("aria-label"), EXPECTED_ARIA_LABEL_NAME, "aria-label is set");

	});

});