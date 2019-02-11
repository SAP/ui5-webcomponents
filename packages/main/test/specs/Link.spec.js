const assert = require('assert');

describe("General API", () => {
	browser.url('http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Link.html');

	it("should wrap the text of the link", () => {
		const wrappingLabel = browser.findElementDeep("#wrapping-link");
		const truncatingLabel = browser.findElementDeep("#non-wrapping-link");

		assert.ok(wrappingLabel.getSize().height > truncatingLabel.getSize().height);
		assert.strictEqual(truncatingLabel.getSize().height, 16, "truncated label should be single line");
	});

	it("should prevent clicking on disabled link", () => {
		const disLink = browser.findElementDeep("#disabled-link");
		const input = browser.findElementDeep("#helper-input");

		disLink.click();

		assert.strictEqual(input.getValue(), "0", "Click should not be fired and value of input should not be changed");

	});

	it("should trigger press event onclick / enter / space", () => {
		const link = browser.findElementDeep("#link");
		const input = browser.findElementDeep("#helper-input");

		link.click();
		assert.strictEqual(input.getValue(), "1", "Input's value should be increased by 1");

		link.keys("Enter");
		assert.strictEqual(input.getValue(), "2", "Input's value should be increased by 1");

		link.keys("Space");
		assert.strictEqual(input.getValue(), "3", "Input's value should be increased by 1");
	});
});
