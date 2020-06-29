const assert = require("chai").assert;

describe("Attributes propagation", () => {
	browser.url("http://localhost:8080/test-resources/pages/ProgressIndicator.html");

	it("Header text attribute is propagated", () => {
		const progressIndicator = $("#test-progress-indicator");
		const negativeButton = $("sixthBtn");
		const validButton = $("#thirdBtn");
		const largerButton = $("seventhBtn");

        validButton.click()
        assert.ok(progressIndicator.validateValue, 50, "Value visual representation is validate correctly.");

        negativeButton.click()
		assert.ok(progressIndicator.validateValue, 0, "Value visual representation is limited to 0 and it validated correctly.");

        largerButton.click()
		assert.ok(progressIndicator.validateValue, 100, "Value visual representation is limited to 100 and it validated correctly.");
	});
});