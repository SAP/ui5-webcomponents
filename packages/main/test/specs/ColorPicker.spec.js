const assert = require("chai").assert;
const PORT = require("./_port.js");


describe("Color Picker general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPicker.html`);
	});

	it("tests color picker rendering", async () => {
		const circle = await browser.$("#cp1").shadow$(".ui5-color-picker-circle");

		assert.ok(circle, "Circle is rendered");
	});

	it("tests change event", async () => {
		const colorPicker = await browser.$("#change-event");
		const redInput = await colorPicker.shadow$("#red");
		const input = await browser.$("#color-input");

		await redInput.click();
		await browser.keys("Tab");
		await browser.keys("0");
		await browser.keys("Tab");

		assert.strictEqual(await input.getProperty("value"), "rgba(255, 0, 255, 1)", "Change event is fired");
	});

	it("tests setting hex input", async () => {
		const colorPicker = await browser.$("#cp3");
		const redInput = await colorPicker.shadow$("#red");
		const hexInput = await colorPicker.shadow$(".ui5-color-picker-hex-input");

		await redInput.click();
		await browser.keys(["Shift", "Tab"]);
		await browser.keys("123");
		await browser.keys("Tab");

		assert.strictEqual(await hexInput.getProperty("value"), "112233", "Shorthand syntax is supported");
	});

	it("tests color property", async () => {
		const colorPicker = await browser.$("#cp3");
		const hexInput = await colorPicker.shadow$(".ui5-color-picker-hex-input");

		await colorPicker.setProperty("color", "rgb(0, 255, 0)");
		assert.strictEqual(await hexInput.getProperty("value"), "00ff00", "RGB value is parsed correctly");

		await colorPicker.setProperty("color", "rgba(255, 0, 255, 1)");
		assert.strictEqual(await hexInput.getProperty("value"), "ff00ff", "RGBA value is parsed correctly");

		await colorPicker.setProperty("color", "#fafafa");
		assert.strictEqual(await hexInput.getProperty("value"), "fafafa", "HEX value is parsed correctly");

		await colorPicker.setProperty("color", "#123");
		assert.strictEqual(await hexInput.getProperty("value"), "112233", "HEX shorthand value is parsed correctly");

		await colorPicker.setProperty("color", "grey");
		assert.strictEqual(await hexInput.getProperty("value"), "808080", "CSS values are parsed correctly");
	});

});
