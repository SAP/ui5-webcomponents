const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("API", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ProgressIndicator.html`);
	});

	it("tests value validation", async () => {
		const progressIndicator = await browser.$("#test-progress-indicator");
		const negativeButton = await browser.$("#sixthBtn");
		const validButton = await browser.$("#thirdBtn");
		const largerButton = await browser.$("#seventhBtn");

		await validButton.click();
		assert.strictEqual(await progressIndicator.getProperty("validatedValue"), 50, "The value is validated correctly.");

		await negativeButton.click();
		assert.strictEqual(await progressIndicator.getProperty("validatedValue"), 0, "The value is limited to 0 and it is validated correctly.");

		await largerButton.click();
		assert.strictEqual(await progressIndicator.getProperty("validatedValue"), 100, "The value is limited to 100 and it is validated correctly.");
	});

	it("tests displayValue property", async () => {
		const progressIndicator = await browser.$("#test-progress-indicator");
		const customDisplayValue = "Custom Display Value";
		const originalPercentageValue = await progressIndicator.getProperty("validatedValue");
		const valueShadowSpan = await progressIndicator.shadow$(".ui5-progress-indicator-value");

		await progressIndicator.setAttribute("display-value", customDisplayValue);
		assert.strictEqual(await valueShadowSpan.getText(), customDisplayValue,
			"The value span is showing the custom set text by the display-value attribute.");

		await progressIndicator.setAttribute("display-value", "");
		assert.strictEqual(await valueShadowSpan.getText(), originalPercentageValue + "%",
			"The value is row backed to the originally shown percentage value after the display value is set to empty string.");
	});
});
