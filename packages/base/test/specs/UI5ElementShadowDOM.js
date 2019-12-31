const assert = require("chai").assert;

describe("The framework can define web components", () => {
	browser.url("http://localhost:9191/test-resources/pages/AllTestElements.html");

	it("Tests that element's Shadow DOM is rendered if it has a template", () => {
		const res = browser.execute(() => {
			return document.getElementById("gen").shadowRoot;
		});

		assert.strictEqual(!!res, true, "Shadow root created");
		assert.strictEqual(browser.$("#gen").shadow$("div>p").isExisting(), true, "Shadow root content created");
	});

	it("Tests that element's Shadow DOM is not rendered if it has no template", () => {
		const res = browser.execute(() => {
			return document.getElementById("noShadow").shadowRoot;
		});

		assert.strictEqual(!!res, false, "Shadow root not created");
	});
});
