const assert = require("chai").assert;


describe("Color Picker general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/ColorPicker.html");
	});

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

	it("tests setting hex input", () => {
		const colorPicker = browser.$("#cp3");
		const redInput = colorPicker.shadow$("#red");
		const hexInput = colorPicker.shadow$(".ui5-color-picker-hex-input");

		redInput.click();
		browser.keys(["Shift", "Tab"]);
		browser.keys("123");
		browser.keys("Tab");

		assert.strictEqual(hexInput.getProperty("value"), "112233", "Shorthand syntax is supported");
	});

	it("tests color property", () => {
		const colorPicker = browser.$("#cp3");
		const hexInput = colorPicker.shadow$(".ui5-color-picker-hex-input");

		colorPicker.setProperty("color", "rgb(0, 255, 0)");
		assert.strictEqual(hexInput.getProperty("value"), "00ff00", "RGB value is parsed correctly");

		colorPicker.setProperty("color", "rgba(255, 0, 255, 1)");
		assert.strictEqual(hexInput.getProperty("value"), "ff00ff", "RGBA value is parsed correctly");

		colorPicker.setProperty("color", "#fafafa");
		assert.strictEqual(hexInput.getProperty("value"), "fafafa", "HEX value is parsed correctly");

		colorPicker.setProperty("color", "#123");
		assert.strictEqual(hexInput.getProperty("value"), "112233", "HEX shorthand value is parsed correctly");

		colorPicker.setProperty("color", "grey");
		assert.strictEqual(hexInput.getProperty("value"), "808080", "CSS values are parsed correctly");
	});

});
