const assert = require("chai").assert;


describe("Color Picker general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/ColorPicker.html");

	it("tests color picker rendering", () => {
		const circle = browser.$("#cp1").shadow$(".ui5-color-picker-circle");

		assert.ok(circle, "Circle is rendered");
	});

	it("tests change event", () => {
		const colorPicker = browser.$("#change-event");
		const redInput = colorPicker.shadow$("#red");
		const input = browser.$("#color-input");

		redInput.click();
		browser.keys("Tab");
		browser.keys("0");
		browser.keys("Tab");

		assert.strictEqual(input.getProperty("value"), "rgba(255, 0, 255, 1)", "Change event is fired");
	});

});
