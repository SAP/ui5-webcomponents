const assert = require("chai").assert;

describe("Properties can only have values, restricted to their types", () => {
	before(async () => {
		await browser.url("test/pages/AllTestElements.html");
	});

	it("String property enforced to string", async () => {
		const el = await browser.$("#gen");
		await el.setProperty("strProp", 5);
		assert.strictEqual(await el.getProperty("strProp"), "5", "String property is string");
	});

});
