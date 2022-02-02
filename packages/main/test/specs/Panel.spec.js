const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Panel general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Panel.html`);
	});

	it("Changing the header text is reflected", async () => {
		const panel = await browser.$( "#panel-fixed");
		const title = await panel.shadow$(".ui5-panel-header-title");
		const sExpected = "Expanded, but not expandable";
		const sNew = "New text";

		assert.strictEqual(await title.getText(), sExpected, "Initially the text is the expected one");

		await browser.$("#panel-fixed").setAttribute("header-text", "New text");

		assert.strictEqual(await title.getText(), sNew, "New text");
	});

	it("Collapsing fixed panel is not possible", async () => {
		const panel = await browser.$( "#panel-fixed");
		const header = await panel.shadow$(".ui5-panel-header");
		const content = await panel.shadow$(".ui5-panel-content");

		assert.ok(await content.isDisplayedInViewport(), "The content is visible");

		await header.click();

		assert.ok(await content.isDisplayedInViewport(), "The content is still visible");

		await header.keys("Space");

		assert.ok(await content.isDisplayedInViewport(), "The content is still visible");

		await header.keys("Enter");

		assert.ok(await content.isDisplayedInViewport(), "The content is still visible");
	});

	it("Collapsing the panel is possible when not fixed", async () => {
		const panel = await browser.$( "#panel-expandable");
		const header = await panel.shadow$(".ui5-panel-header");
		const content = await panel.shadow$(".ui5-panel-content");

		assert.ok(await content.isDisplayedInViewport(), "The content is visible");

		await header.click();

		assert.notOk(await content.isDisplayedInViewport(), "The content is not visible");

		await header.keys("Space");

		assert.ok(await content.isDisplayedInViewport(), "The content is visible");

		await header.keys("Enter");

		assert.notOk(await content.isDisplayedInViewport(), "The content is not visible");
	});

	it("tests toggle event upon header click", async () => {
		const header = await browser.$("#panel1").shadow$(".ui5-panel-header");
		const field = await browser.$("#field1");

		await header.click();

		await browser.waitUntil(async () => await field.getProperty("value") === "1", {
			timeout: 500,
			interval: 100,
			timeoutMsg: "Press called"
		});

		await header.keys("Space");

		await browser.waitUntil(async () => await field.getProperty("value") === "2", {
			timeout: 500,
			interval: 100,
			timeoutMsg: "Press called"
		});

		await header.keys("Enter");

		await browser.waitUntil(async () => await field.getProperty("value") === "3", {
			timeout: 500,
			interval: 100,
			timeoutMsg: "Press called"
		});
	});

	it("tests toggle event upon icon click with custom header", async () => {
		const icon = await browser.$("#panel2").shadow$(".ui5-panel-header-button");
		const field = await browser.$("#field2");

		await icon.click();

		await browser.waitUntil(async () => await field.getProperty("value") === "1", {
			timeout: 500,
			interval: 100,
			timeoutMsg: "Press called"
		});

		await icon.keys("Space");

		await browser.waitUntil(async () => await field.getProperty("value") === "2", {
			timeout: 500,
			interval: 100,
			timeoutMsg: "Press called"
		});

		await icon.keys("Enter");

		await browser.waitUntil(async () => await field.getProperty("value") === "3", {
			timeout: 500,
			interval: 100,
			timeoutMsg: "Press called"
		});
	});

	it("tests toggle expand/collapse animation", async () => {
		const panelWithAnimationIcon = await browser.$("#panel-expandable").shadow$(".ui5-panel-header-button");
		const panelWithoutAnimationIcon = await browser.$("#p1").shadow$(".ui5-panel-header-button");

		assert.ok(await panelWithAnimationIcon.hasClass("ui5-panel-header-button-animated"), "Animation is presented");
		assert.notOk(await panelWithoutAnimationIcon.hasClass("ui5-panel-header-button-animated"), "Animation is turn off");
	});

	describe("Accessibility", async () => {

		it("tests whether aria attributes are set correctly with native header", async () => {
			const panelRoot = await browser.$("#panel1").shadow$(".ui5-panel-root");
			const header = await browser.$("#panel1").shadow$(".ui5-panel-header");
			const title = await browser.$("#panel1").shadow$(".ui5-panel-header-title");
			const button = await browser.$("#panel1").shadow$(".ui5-panel-header-button");

			assert.strictEqual(await panelRoot.getAttribute("role"), "form", "The correct accessible role is applied");

			assert.strictEqual(await button.getTagName(), "ui5-icon", "ui5-icon should be rendered");

			assert.ok(await header.getAttribute("aria-expanded"), "aria-expanded should be set on the header");
			assert.ok(await header.getAttribute("aria-controls"), "aria-controls should be set on the header");
			assert.ok(await header.getAttribute("role"), "role should be set on the header");

			assert.strictEqual(await title.getAttribute("aria-level"), "3", "title aria-level is set to 3 correctly");
		});

		it("tests aria label attributes", async () => {
			const panelWithNativeHeader = await browser.$("#panel-expandable");
			const nativeHeader = await panelWithNativeHeader.shadow$(".ui5-panel-header");
			const panelWithNativeHeaderId = await panelWithNativeHeader.getProperty("_id");

			assert.strictEqual(await nativeHeader.getAttribute("aria-labelledby"),
				`${panelWithNativeHeaderId}-header-title`, "aria-labelledby is correct");

			await browser.$("#panel-expandable").setAttribute("accessible-name", "New accessible name");

			assert.strictEqual(await panelWithNativeHeader.shadow$(".ui5-panel-root").getAttribute("aria-label"), "New accessible name", "aria-label is set correctly");
		});

		it("tests whether aria attributes are set correctly with fixed header", async () => {
			const header = await browser.$("#panel-fixed").shadow$(".ui5-panel-header");

			assert.notOk(await header.getAttribute("aria-expanded"), "aria-expanded shouldn't be set on the fixed header");
			assert.notOk(await header.getAttribute("aria-controls"), "aria-controls shouldn't be set on the fixed header");
			assert.notOk(await header.getAttribute("role"), "role shouldn't be set on the fixed header");
		});

		it("tests whether aria attributes are set correctly in case of custom header", async () => {
			const panelRoot = await browser.$("#panel2").shadow$(".ui5-panel-root");
			const button = await browser.$("#panel2").shadow$(".ui5-panel-header-button").shadow$(".ui5-button-root");
			const header = await browser.$("#panel2").shadow$(".ui5-panel-header");

			assert.notOk(await header.getAttribute("aria-expanded"), "aria-expanded shouldn't be set on the header");
			assert.notOk(await header.getAttribute("aria-controls"), "aria-controls shouldn't be set on the header");

			assert.ok(await button.getAttribute("aria-expanded"), "aria-expanded should be set on the button");
			assert.ok(await button.getAttribute("aria-controls"), "aria-controls should be set on the button");
			assert.ok(await button.getAttribute("title"), "title should be set on the button");

			await browser.$("#panel2").setAttribute("accessible-name", "New accessible name");

			assert.strictEqual(await panelRoot.getAttribute("aria-label"), "New accessible name", "aria-label should be set on the panel");
			assert.notOk(await button.getAttribute("aria-label"), "aria-label should not be set on the button");

			await browser.$("#panel2").setAttribute("use-accessible-name-for-toggle-button", "");

			assert.strictEqual(await button.getAttribute("aria-label"), "New accessible name", "aria-label should be set on the button");
		});
	});
});
