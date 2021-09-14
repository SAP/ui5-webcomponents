const assert = require("chai").assert;
const PORT = require("./_port.js");


const getValidatedValue = async (pi) => {
	return browser.executeAsync((pi, done) => {
		done(pi.validatedValue);
	}, pi);
};

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
		assert.strictEqual(await getValidatedValue(progressIndicator), 50, "The value is validated correctly.");

		await negativeButton.click();
		assert.strictEqual(await getValidatedValue(progressIndicator), 0, "The value is limited to 0 and it is validated correctly.");

		await largerButton.click();
		assert.strictEqual(await getValidatedValue(progressIndicator), 100, "The value is limited to 100 and it is validated correctly.");
	});
});