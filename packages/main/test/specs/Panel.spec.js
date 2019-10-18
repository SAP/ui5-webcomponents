const assert = require("assert");

describe("Panel general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Panel.html");

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
