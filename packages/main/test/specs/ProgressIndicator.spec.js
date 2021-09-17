const assert = require("chai").assert;
const PORT = require("./_port.js");


const getValidatedValue = (pi) => {
	return browser.execute((pi) => {
		return pi.validatedValue;
	}, pi);
};

describe("API", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ProgressIndicator.html`);
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

	it("tests displayValue property", () => {
		const progressIndicator = $("#test-progress-indicator");
		const customDisplayValue = "Custom Display Value";
		const originalPercentageValue = getValidatedValue(progressIndicator);
		const valueShadowSpan = progressIndicator.shadow$(".ui5-progress-indicator-value");

		progressIndicator.setAttribute("display-value", customDisplayValue);
		assert.strictEqual(valueShadowSpan.getText(), customDisplayValue,
			"The value span is showing the custom set text by the display-value attribute.");

		progressIndicator.setAttribute("display-value", "");
		assert.strictEqual(valueShadowSpan.getText(), originalPercentageValue + "%",
			"The value is row backed to the originally shown percentage value after the display value is set to empty string.");
	});
});