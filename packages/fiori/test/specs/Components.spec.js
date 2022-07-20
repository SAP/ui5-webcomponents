const assert = require("chai").assert;

const assertBooleanProperty = async (el, prop) => {
	assert.strictEqual(await el.getProperty(prop), false, "the value should be false by default.");
}

const assertHidden = async component => {
	assert.strictEqual(await component.isDisplayedInViewport(), false, "the component is hidden.");
}

describe("General assertions", () => {
	before(async () => {
		await browser.url(`test/pages/Components.html`);
	});

	it("tests components with 'hidden' property are not visible", async () => {
		[
			await browser.$("#shellbar2"),
			await browser.$("#uploadCollection")
		].forEach(assertHidden);
	});
});
