const assert = require("chai").assert;

describe("Panel general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Panel.html");
	});

	it("Changing the header text is reflected", () => {
		const panel = browser.$( "#panel-fixed");
		const title = panel.shadow$(".ui5-panel-header-title");
		const sExpected = "Expanded, but not expandable";
		const sNew = "New text";

		assert.strictEqual(title.getText(), sExpected, "Initially the text is the expected one");

		browser.execute(() => {
			document.getElementById("panel-fixed").setAttribute("header-text", "New text");
		});
		browser.pause(500);

		assert.strictEqual(title.getText(), sNew, "New text");
	});

	it("Collapsing fixed panel is not possible", () => {
		const panel = browser.$( "#panel-fixed");
		const header = panel.shadow$(".ui5-panel-header");
		const content = panel.shadow$(".ui5-panel-content");

		assert.ok(content.isDisplayedInViewport(), "The content is visible");

		header.click();
		browser.pause(500);

		assert.ok(content.isDisplayedInViewport(), "The content is still visible");

		header.keys("Space");
		browser.pause(500);

		assert.ok(content.isDisplayedInViewport(), "The content is still visible");

		header.keys("Enter");
		browser.pause(500);

		assert.ok(content.isDisplayedInViewport(), "The content is still visible");
	});

	it("Collapsing the panel is possible when not fixed", () => {
		const panel = browser.$( "#panel-expandable");
		const header = panel.shadow$(".ui5-panel-header");
		const content = panel.shadow$(".ui5-panel-content");

		assert.ok(content.isDisplayedInViewport(), "The content is visible");

		header.click();
		browser.pause(500);

		assert.ok(!content.isDisplayedInViewport(), "The content is not visible");

		header.keys("Space");
		browser.pause(500);

		assert.ok(content.isDisplayedInViewport(), "The content is visible");

		header.keys("Enter");
		browser.pause(500);

		assert.ok(!content.isDisplayedInViewport(), "The content is not visible");
	});

	it("tests toggle event upon header click", () => {
		const header = browser.$("#panel1").shadow$(".ui5-panel-header");
		const field = browser.$("#field1");

		header.click();
		browser.pause(500);

		header.keys("Space");
		browser.pause(500);

		header.keys("Enter");
		browser.pause(500);

		assert.strictEqual(field.getProperty("value"), "3", "Press should be called 3 times");
	});

	it("tests toggle event upon icon click with custom header", () => {
		const icon = browser.$("#panel2").shadow$(".ui5-panel-header-button");
		const field = browser.$("#field2");

		icon.click();
		browser.pause(500);

		icon.keys("Space");
		browser.pause(500);

		icon.keys("Enter");
		browser.pause(500);

		assert.strictEqual(field.getProperty("value"), "3", "Press should be called 3 times");
	});

	describe("Accessibility", () => {

		it("tests whether aria attributes are set correctly with native header", () => {
			const panelRoot = browser.$("#panel1").shadow$(".ui5-panel-root");
			const header = browser.$("#panel1").shadow$(".ui5-panel-header");
			const title = browser.$("#panel1").shadow$(".ui5-panel-header-title");
			const button = browser.$("#panel1").shadow$(".ui5-panel-header-button");

			assert.strictEqual(panelRoot.getAttribute("role"), "form", "The correct accessible role is applied");

			assert.strictEqual(button.getTagName(), "ui5-icon", "ui5-icon should be rendered");

			assert.ok(header.getAttribute("aria-expanded"), "aria-expanded should be set on the header");
			assert.ok(header.getAttribute("aria-controls"), "aria-controls should be set on the header");
			assert.ok(header.getAttribute("role"), "role should be set on the header");

			assert.strictEqual(title.getAttribute("aria-level"), "3", "title aria-level is set to 3 correctly");
		});

		it("tests aria label attributes", () => {
			const panelWithNativeHeader = $("#panel-expandable");
			const nativeHeader = panelWithNativeHeader.shadow$(".ui5-panel-header");
			const panelWithNativeHeaderId = panelWithNativeHeader.getProperty("_id");

			assert.strictEqual(nativeHeader.getAttribute("aria-labelledby"),
				`${panelWithNativeHeaderId}-header-title`, "aria-labelledby is correct");

			browser.execute(() => {
				document.getElementById("panel-expandable").setAttribute("accessible-name", "New accessible name");
			});
			browser.pause(500);

			assert.strictEqual(panelWithNativeHeader.shadow$(".ui5-panel-root").getAttribute("aria-label"), "New accessible name", "aria-label is set correctly");
		});

		it("tests whether aria attributes are set correctly with fixed header", () => {
			const header = browser.$("#panel-fixed").shadow$(".ui5-panel-header");

			assert.ok(!header.getAttribute("aria-expanded"), "aria-expanded shouldn't be set on the fixed header");
			assert.ok(!header.getAttribute("aria-controls"), "aria-controls shouldn't be set on the fixed header");
			assert.ok(!header.getAttribute("role"), "role shouldn't be set on the fixed header");
		});

		it("tests whether aria attributes are set correctly in case of custom header", () => {
			const panelRoot = browser.$("#panel2").shadow$(".ui5-panel-root");
			const button = browser.$("#panel2").shadow$(".ui5-panel-header-button").shadow$(".ui5-button-root");
			const header = browser.$("#panel2").shadow$(".ui5-panel-header");

			assert.ok(!header.getAttribute("aria-expanded"), "aria-expanded shouldn't be set on the header");
			assert.ok(!header.getAttribute("aria-controls"), "aria-controls shouldn't be set on the header");

			assert.ok(button.getAttribute("aria-expanded"), "aria-expanded should be set on the button");
			assert.ok(button.getAttribute("aria-controls"), "aria-controls should be set on the button");
			assert.ok(button.getAttribute("title"), "title should be set on the button");

			browser.execute(() => {
				document.getElementById("panel2").setAttribute("accessible-name", "New accessible name");
			});
			browser.pause(500);

			assert.strictEqual(panelRoot.getAttribute("aria-label"), "New accessible name", "aria-label should be set on the panel");
			assert.ok(!button.getAttribute("aria-label"), "aria-label should not be set on the button");

			browser.execute(() => {
				document.getElementById("panel2").setAttribute("use-accessible-name-for-toggle-button", "");
			});
			browser.pause(500);

			assert.strictEqual(button.getAttribute("aria-label"), "New accessible name", "aria-label should be set on the button");
		});
	});
});
