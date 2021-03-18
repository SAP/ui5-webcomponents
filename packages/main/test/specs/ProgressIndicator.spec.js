const assert = require("chai").assert;

const getValidatedValue = (pi) => {
	return browser.execute((pi) => {
		return pi.validatedValue;
	}, pi);
};

describe("API", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/ProgressIndicator.html");
	});

	it("tests value validation", () => {
		const progressIndicator = $("#test-progress-indicator");
		const negativeButton = $("#sixthBtn");
		const validButton = $("#thirdBtn");
		const largerButton = $("#seventhBtn");

		validButton.click();
		assert.strictEqual(getValidatedValue(progressIndicator), 50, "The value is validated correctly.");

		negativeButton.click();
		assert.strictEqual(getValidatedValue(progressIndicator), 0, "The value is limited to 0 and it is validated correctly.");

		largerButton.click();
		assert.strictEqual(getValidatedValue(progressIndicator), 100, "The value is limited to 100 and it is validated correctly.");
	});
});