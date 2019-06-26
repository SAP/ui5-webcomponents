const assert = require("chai").assert;

describe("ToggleButton general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/ToggleButton.html");

	it("should fire press event on a normal togglebutton", () => {
		const toggleButton = $("#toggle-button");
		const result = $("#press-result");

		toggleButton.click();
		assert.strictEqual(result.getText(), "ToggleButton: true", "Press event is fired with: { pressed: true }");

		toggleButton.keys("Space");
		assert.strictEqual(result.getText(), "ToggleButton: false", "Press event is fired with: { pressed: false }");

		toggleButton.keys("Enter");
		assert.strictEqual(result.getText(), "ToggleButton: true", "Press event is fired with: { pressed: true }");
	});

	it("should not fire press event on a disabled togglebutton", () => {
		const toggleButton = browser.findElementDeep("#disabled-toggle-button >>> button");
		const result = $("#press-result");

		assert.throws(() => {
			toggleButton.click();
		})
		assert.strictEqual(result.getText(), "ToggleButton: true", "toggle state should not change");

		// don't test space and enter, as wdio always fires a click but the browser not.

		// toggleButton.keys("Space");
		// assert.strictEqual(result.getText(), "ToggleButton: true", "2Press event is fired with: { pressed: true }");

		// toggleButton.keys("Enter");
		// assert.strictEqual(result.getText(), "ToggleButton: true", "3Press event is fired with: { pressed: true }");
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

	it("should not fire press event on a disabled togglebutton", () => {
		const toggleButton = browser.findElementDeep("#disabled-toggle-button >>> button");
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
