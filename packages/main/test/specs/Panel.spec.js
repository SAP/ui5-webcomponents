const assert = require("assert");

describe("Rendering", () => {
	browser.url("http://localhost:8080/test-resources/pages/Panel.html");

	it("A basic panel", () => {
	   const panel = browser.$("#p1");

		assert.ok(panel.isDisplayedInViewport(), "The panel is in the viewport");
		assert.ok(panel.shadow$(".ui5-panel-root"), "Root element is rendered in the DOM");
		assert.ok(panel.shadow$(".ui5-panel-content"), "Content is rendered in the DOM");
		assert.ok(panel.shadow$(".ui5-panel-header"), "Header is rendered in the DOM");
		assert.ok(panel.shadow$(".ui5-panel-header-button"), "Header button is rendered in the DOM");

		assert.strictEqual(panel.shadow$(".ui5-panel-header-title").innerText, undefined, "There is no default title text");
	});

	it("A panel with header text", () => {
		const sExpected = "Fixed and collapsed panel";
		assert.strictEqual(browser.$("#panel-fixed-collapsed").shadow$(".ui5-panel-header-title").getText(), sExpected, "The text of the panel is the correct one");
	});

	it("A panel with 'collapsed' attribute", () => {
		const sExpected = "Fixed and collapsed panel";
		assert.ok(!browser.$("#p1").shadow$(".ui5-panel-content").isDisplayedInViewport(), "The content is not visible");
	});

	it("A panel with 'fixed' attribute", () => {
		const panel = browser.$("#panel-fixed");
		assert.ok(!panel.shadow$(".ui5-panel-header-button-root").isDisplayedInViewport(), "The button is not visible");
		assert.ok(panel.shadow$(".ui5-panel-content").isDisplayedInViewport(), "The content is visible");
	});

	it("A panel with 'fixed' and 'collapsed' attributes", () => {
		const panel = browser.$("#panel-fixed-collapsed");
		assert.ok(!panel.shadow$(".ui5-panel-header-button-root").isDisplayedInViewport(), "The button is not visible");
		assert.ok(!panel.shadow$(".ui5-panel-content").isDisplayedInViewport(), "The content is not visible");
	});


 });

describe("Panel general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/Panel.html");

	it("Changing the 'collapsed' is reflected in the DOM", () => {
		const panel = browser.$("#panel-expandable");
		const header = panel.shadow$(".ui5-panel-header");
		const content = panel.shadow$(".ui5-panel-content");

		assert.ok(content.isDisplayedInViewport(), "The content is visible");

		header.click();
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
			const header = browser.$("#panel1").shadow$(".ui5-panel-header");
			const button = browser.$("#panel1").shadow$(".ui5-panel-header-button");

			assert.ok(!button.getAttribute("aria-expanded"), "aria-expanded shouldn't be set on the button");
			assert.ok(!button.getAttribute("aria-controls"), "aria-controls shouldn't be set on the button");
			assert.ok(!button.getAttribute("title"), "title shouldn't be set on the button");

			assert.ok(header.getAttribute("aria-expanded"), "aria-expanded should be set on the header");
			assert.ok(header.getAttribute("aria-controls"), "aria-controls should be set on the header");
		});

		it("tests whether aria attributes are set correctly in case of custom header", () => {
			const button = browser.$("#panel2").shadow$(".ui5-panel-header-button").shadow$(".ui5-button-root");
			const header = browser.$("#panel2").shadow$(".ui5-panel-header");

			assert.ok(!header.getAttribute("aria-expanded"), "aria-expanded shouldn't be set on the header");
			assert.ok(!header.getAttribute("aria-controls"), "aria-controls shouldn't be set on the header");

			assert.ok(button.getAttribute("aria-expanded"), "aria-expanded should be set on the button");
			assert.ok(button.getAttribute("aria-controls"), "aria-controls should be set on the button");
			assert.ok(button.getAttribute("title"), "title should be set on the button");
		});
	});
});
