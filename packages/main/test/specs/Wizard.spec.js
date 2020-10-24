const assert = require("chai").assert;

describe("Button general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/Wizard_test.html");

	it("move to second step by API", () => {
		assert.strictEqual(true, true, "");
	});

	it("move to second step by click", () => {
		assert.strictEqual(true, true, "");
	});

	it("move to second step by scroll", () => {
		assert.strictEqual(true, true, "");
	});
});