const assert = require("chai").assert;

describe("Properties can only have values, restricted to their types", () => {
	browser.url("http://localhost:9191/test-resources/pages/AllTestElements.html");

	it("String property enforced to string", () => {
		const el = browser.$("#gen");
		el.setProperty("strProp", 5);
		assert.strictEqual(el.getProperty("strProp"), "5", "String property is string");
	});

});
