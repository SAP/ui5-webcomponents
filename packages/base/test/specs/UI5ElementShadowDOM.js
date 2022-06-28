const assert = require("chai").assert;

describe("The framework can define web components", () => {
	before(async () => {
		await browser.url("test/pages/AllTestElements.html");
	});

	it("Tests that element's Shadow DOM is rendered if it has a template", async () => {
		const res = await browser.executeAsync(done => {
			done(document.getElementById("gen").shadowRoot);
		});

		assert.strictEqual(!!res, true, "Shadow root created");
		assert.strictEqual(await browser.$("#gen").shadow$("div>p").isExisting(), true, "Shadow root content created");
	});

	it("Tests that element's Shadow DOM is not rendered if it has no template", async () => {
		const res = await browser.executeAsync(done => {
			done(document.getElementById("noShadow").shadowRoot);
		});

		assert.strictEqual(!!res, false, "Shadow root not created");
	});
});
