const assert = require("chai").assert;

describe("Properties can only have values, restricted to their types", () => {
	before(() => {
		browser.url("http://localhost:9191/test-resources/pages/AllTestElements.html");
	});

	it("String property enforced to string", () => {
		const el = browser.$("#gen");
		el.setProperty("strProp", 5);
		assert.strictEqual(el.getProperty("strProp"), "5", "String property is string");
	});

	it("String properties set to null result in empty string", () => {
		const el = browser.$("#nullString");
		el.setPropertyToNull("strProp");
		assert.strictEqual(el.getProperty("strProp"), "", "String property is empty");
	});

	it("String properties set to undefined result in empty string", () => {
		const el = browser.$("#undefinedString");
		el.setProperty("strProp", undefined);
		assert.strictEqual(el.getProperty("strProp"), "", "String property is empty");
	});
});
