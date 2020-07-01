const assert = require("chai").assert;

describe("Properties", () => {
	browser.url("http://localhost:8080/test-resources/pages/ProgressIndicator.html");

	it("Value validation", () => {
		const progressIndicator = $("#test-progress-indicator");
		const negativeButton = $("#sixthBtn");
		const validButton = $("#thirdBtn");
		const largerButton = $("#seventhBtn");

        validButton.click();
        assert.strictEqual(progressIndicator.validatedValue, 50, "Value visual representation is validate correctly.");

        negativeButton.click();
		assert.strictEqual(progressIndicator.validatedValue, 0, "Value visual representation is limited to 0 and it validated correctly.");

        largerButton.click();
		assert.strictEqual(progressIndicator.validatedValue, 100, "Value visual representation is limited to 100 and it validated correctly.");
	});
});