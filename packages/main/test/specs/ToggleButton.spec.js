const assert = require("chai").assert;

describe("ToggleButton general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/ToggleButton.html");
	});

	it("should fire click event on a normal togglebutton", () => {
		const toggleButton = $("#toggle-button");
		const result = $("#click-result");

		toggleButton.click();
		assert.strictEqual(result.getText(), "ToggleButton: false", "click event changed pressed state");

		toggleButton.keys("Space");
		assert.strictEqual(result.getText(), "ToggleButton: true", "Space triggered click and changed pressed state");

		toggleButton.keys("Enter");
		assert.strictEqual(result.getText(), "ToggleButton: false", "Enter triggered click and changed pressed state");
	});

	it("should not fire click event on a disabled togglebutton", () => {
		const toggleButton = browser.$("#disabled-toggle-button").shadow$("button");
		const result = $("#click-result");

		assert.throws(() => {
			toggleButton.click();
		})
		assert.strictEqual(result.getText(), "ToggleButton: false", "toggle state should not change");

		// don't test space and enter, as wdio always fires a click but the browser not.

		// toggleButton.keys("Space");
		// assert.strictEqual(result.getText(), "ToggleButton: true", "2Press event is fired with: { pressed: true }");

		// toggleButton.keys("Enter");
		// assert.strictEqual(result.getText(), "ToggleButton: true", "3Press event is fired with: { pressed: true }");
	});
});
