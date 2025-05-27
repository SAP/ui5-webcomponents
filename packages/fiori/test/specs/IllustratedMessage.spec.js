import { assert } from "chai";

describe("IllustratedMessage 'design' property", () => {
	before(async () => {
		await browser.url(`test/pages/IllustratedMessage.html`);
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

describe("Vertical responsiveness", () => {
	before(async () => {
		await browser.url(`test/pages/IllustratedMessage.html`);
	});

	it("content with auto design shrinks to fit the parent container", async () => {

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

	it("content with auto design expands to fit the parent container", async () => {

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

	it("content with fixed design fits the parent container", async () => {

		const newContainerHeight = 250,
			expectedMedia = "dialog",
			illustratedMsg = await browser.$("#illustratedMsg5");

		// set fixed design
		illustratedMsg.setProperty("design", "Dialog");

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

	it("Illustration visible, when container fit content height", async () => {

		const illustratedMsgContainer = await browser.$(".illustratedmessage1auto");
		const illustratedMsg = await browser.$("#illustratedMsg1");
		await illustratedMsg.setProperty("design", "Scene");

		// Act
		await illustratedMsgContainer.setAttribute("style", "height: 440px");
		const illustration = await illustratedMsg.shadow$(".ui5-illustrated-message-illustration svg");

		// Check
		assert.notEqual(await illustration.getProperty("scrollHeight"), 0, "Illustration fits its container inherited height");
		await illustratedMsgContainer.setAttribute("style", "");
	});

	it("Illustration visible, when IM slotted and container has fixed height", async () => {

		const panel = await browser.$("#panel1");
		const illustratedMsg = await browser.$("#illustratedMsg4");
		const illustration = await illustratedMsg.shadow$(".ui5-illustrated-message-illustration svg");

		// Act
		await panel.setAttribute("style", "height: 19rem");

		// Check
		assert.notEqual(await illustration.getProperty("scrollHeight"), 0, "Illustration fits its container inherited height");
		await panel.setAttribute("style", "");
	});
});

describe("Dot design resource handling", () => {
	before(async () => {
		await browser.url(`test/pages/IllustratedMessage.html`);
	});

	it("uses substitute Spot illustration", async () => {

		const illustratedMsg = await browser.$("#illustratedMsg1");

		// Act
		await illustratedMsg.setProperty("name", "TntUnableToLoad"); // set an illustration which doesn't have original Dot SVG
		await illustratedMsg.setProperty("design", "Dot");
		const illustration = await illustratedMsg.shadow$(".ui5-illustrated-message-illustration svg");

		// Check
		assert.strictEqual(await illustration.getProperty("id"), "tnt-Spot-UnableToLoad", "Spot SVG is used when no Dot is present");
	});

	it("uses original Dot illustration", async () => {

		const illustratedMsg = await browser.$("#illustratedMsg1");

		// Act
		await illustratedMsg.setProperty("name", "AddPeople"); // set an illustration which has original Dot SVG
		await illustratedMsg.setProperty("design", "Dot");
		const illustration = await illustratedMsg.shadow$(".ui5-illustrated-message-illustration svg");

		// Check
		assert.strictEqual(await illustration.getProperty("id"), "sapIllus-Dot-AddPeople", "Dot is present, therefore used");
	});

});
