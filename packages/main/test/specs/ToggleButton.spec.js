const assert = require("assert");

describe("ToggleButton general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/ToggleButton.html");

	it("should fire press event on a normal togglebutton", () => {
		const toggleButton = $("#toggle-button");
		const result = $("#result");

		toggleButton.click();
		assert.strictEqual(result.getText(), "ToggleButton: true", "Press event is fired with: { pressed: true }");

		toggleButton.keys("Space");
		assert.strictEqual(result.getText(), "ToggleButton: false", "Press event is fired with: { pressed: false }");

		toggleButton.keys("Enter");
		assert.strictEqual(result.getText(), "ToggleButton: true", "Press event is fired with: { pressed: true }");
	});

	it("should not fire press event on a disabled togglebutton", () => {
		const toggleButton = $("#disabled-toggle-button");
		const result = $("#result");

		toggleButton.click();
		assert.strictEqual(result.getText(), "ToggleButton: true", "Press event is fired with: { pressed: true }");

		toggleButton.keys("Space");
		assert.strictEqual(result.getText(), "ToggleButton: true", "Press event is fired with: { pressed: true }");

		toggleButton.keys("Enter");
		assert.strictEqual(result.getText(), "ToggleButton: true", "Press event is fired with: { pressed: true }");
	});
});
