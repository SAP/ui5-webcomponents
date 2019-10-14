const assert = require('chai').assert;

describe("General API", () => {
	browser.url('http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Link.html');

	it("should wrap the text of the link", () => {
		const wrappingLabel = browser.$("#wrapping-link");
		const truncatingLabel = browser.$("#non-wrapping-link");

		assert.ok(wrappingLabel.getSize().height > truncatingLabel.getSize().height);
		assert.strictEqual(truncatingLabel.getSize().height, 16, "truncated label should be single line");
	});

	it("should prevent clicking on disabled link", () => {
		const disLink = browser.$("#disabled-link");
		const input = browser.$("#helper-input");

		assert.throws(() => {
			disLink.click();
		});

		assert.strictEqual(input.getValue(), "0", "Click should not be fired and value of input should not be changed");

	});

	it("should trigger click event onclick / enter / space", () => {
		const link = browser.$("#link").shadow$("a");
		const input = browser.$("#helper-input");
		const inputClick = browser.$("#helper-input-click");

		// same as in Timeline.spec.js
		// disable the click test temporarily, wdio click simulation does not trigger the ui5-link click handler
		// and triggering the click on the internal <a> element makes wdio throw an error that it is not clickable

		// link.click();
		// assert.strictEqual(input.getValue(), "1", "click: Input's value should be increased by 1");
		// assert.strictEqual(inputClick.getValue(), "1", "click: Input's value should be increased by 1");

		// same with keys, sending them on ui5-link >>> a does not work, sending them on ui5-link does not trigger click handlers
		// link.keys("Enter");
		// assert.strictEqual(input.getValue(), "1", "enter: Input's value should be increased by 1");
		// assert.strictEqual(inputClick.getValue(), "1", "enter: Input's value should be increased by 1");

	});
});
