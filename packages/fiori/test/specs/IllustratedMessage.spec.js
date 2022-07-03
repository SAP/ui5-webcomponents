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