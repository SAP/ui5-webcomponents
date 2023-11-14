import { assert } from "chai";

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

	it("title-level", async () => {
		// Arrange
		const illustratedMsg = await browser.$("#illustratedMsg2"),
			  illustratedMsgTitle = await browser.$("#illustratedMsg2").shadow$(".ui5-illustrated-message-root ui5-title"),
			  EXPECTED_TITLE_lEVEL = "H6",
			  NEW_TITLE_LEVEL = "H3",
			  DEFAULT_TITLE_LEVEL = "H2";

		// Assert
		assert.strictEqual(await illustratedMsgTitle.getAttribute("level"), EXPECTED_TITLE_lEVEL, "level is set");

		// Act
		await illustratedMsg.setAttribute("title-level", NEW_TITLE_LEVEL);

		// Assert
		assert.strictEqual(await illustratedMsgTitle.getAttribute("level"), NEW_TITLE_LEVEL, "level is set");

		// Act
		await illustratedMsg.removeAttribute("title-level");

		// Assert
		assert.strictEqual(await illustratedMsgTitle.getAttribute("level"), DEFAULT_TITLE_LEVEL, "level has the default value");

	});

});

describe("Vertical responsiveness", () => {
	before(async () => {
		await browser.url(`test/pages/IllustratedMessage.html`);
	});

	it("content with auto size shrinks to fit the parent container", async () => {

		const newContainerHeight = 300,
			expectedMedia = "dialog",
			illustratedMsg = await browser.$("#illustratedMsg5");

		// Act: apply new height
		await browser.executeAsync(async (newContainerHeight, done) => {
			document.getElementById("container").style.height = newContainerHeight;
			done();
		}, `${newContainerHeight}px`);

		// Check
		const contents = await illustratedMsg.shadow$(".ui5-illustrated-message-root"),
			scrollHeight = await contents.getProperty("scrollHeight"),
			offsetHeight = await contents.getProperty("offsetHeight"),
			illustratedMsgMedia = await illustratedMsg.getProperty("media");
		assert.ok(scrollHeight < newContainerHeight, "root dom fits container");
		assert.strictEqual(scrollHeight, offsetHeight, "no overflow of content");
		assert.strictEqual(illustratedMsgMedia, expectedMedia, "correct media");
	});

	it("content with auto size expands to fit the parent container", async () => {

		const newContainerHeight = 500,
			expectedMedia = "scene",
			illustratedMsg = await browser.$("#illustratedMsg5");

		// Act: apply new height
		await browser.executeAsync(async (newContainerHeight, done) => {
			document.getElementById("container").style.height = newContainerHeight;
			done();
		}, `${newContainerHeight}px`);

		// Check
		const contents = await illustratedMsg.shadow$(".ui5-illustrated-message-root"),
			scrollHeight = await contents.getProperty("scrollHeight"),
			offsetHeight = await contents.getProperty("offsetHeight"),
			illustratedMsgMedia = await illustratedMsg.getProperty("media");
		assert.ok(scrollHeight < newContainerHeight, "root dom fits container");
		assert.strictEqual(scrollHeight, offsetHeight, "no overflow of content");
		assert.strictEqual(illustratedMsgMedia, expectedMedia, "correct media");
	});

	it("content with fixed size fits the parent container", async () => {

		const newContainerHeight = 200,
			expectedMedia = "dialog",
			illustratedMsg = await browser.$("#illustratedMsg5");

		// set fixed size
		illustratedMsg.setProperty("size", "Dialog");

		// Act: apply new height
		await browser.executeAsync(async (newContainerHeight, done) => {
			document.getElementById("container").style.height = newContainerHeight;
			done();
		}, `${newContainerHeight}px`);

		// Check
		const contents = await illustratedMsg.shadow$(".ui5-illustrated-message-root"),
			scrollHeight = await contents.getProperty("scrollHeight"),
			offsetHeight = await contents.getProperty("offsetHeight"),
			illustratedMsgMedia = await illustratedMsg.getProperty("media");
		assert.ok(scrollHeight < newContainerHeight, "root dom fits container");
		assert.strictEqual(scrollHeight, offsetHeight, "no overflow of content");
		assert.strictEqual(illustratedMsgMedia, expectedMedia, "correct media");
	});

	it("shows image with unconstrained height when container has auto height", async () => {

		const newContainerHeight = "auto",
			illustratedMsg = await browser.$("#illustratedMsg5");

		// Act: apply new height
		await browser.executeAsync(async (newContainerHeight, done) => {
			document.getElementById("container").style.height = newContainerHeight;
			done();
		}, newContainerHeight);

		// Check
		const illustration = await illustratedMsg.shadow$(".ui5-illustrated-message-illustration svg");
		const cssHeight = (await illustration.getCSSProperty("height")).value;

		assert.strictEqual(cssHeight, "160px", "svg has expected height");
	});
});