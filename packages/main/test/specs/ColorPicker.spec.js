const assert = require("chai").assert;


describe("Color Picker general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/ColorPicker.html`);
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

	it("Alpha value change via the input field", async () => {
		const colorPicker = await browser.$("#cp1");
		const alphaInput = await colorPicker.shadow$("#alpha");

		await colorPicker.setAttribute("color", "rgba(100, 100, 100, 1)");

		await alphaInput.click();
		await browser.keys('Delete');
		await browser.keys("0");
		await browser.keys("Tab");


		assert.strictEqual(await colorPicker.getAttribute("color"), "rgba(100, 100, 100, 0)", "Alpha value propely changed");
	});

	it("Alpha value change via the slider", async () => {
		const colorPicker = await browser.$("#cp1");
		const alphaSliderHandle = await colorPicker.shadow$(".ui5-color-picker-alpha-slider").shadow$(".ui5-slider-handle");
		const stepInput = await browser.$("#changeEventCounter");

		await stepInput.setAttribute("value", 0);
		await colorPicker.scrollIntoView();
		await colorPicker.setAttribute("color", "rgba(183, 61, 61, 1)");

		await alphaSliderHandle.dragAndDrop({ x: 200, y: 0 });

		assert.strictEqual(await colorPicker.getAttribute("color"), "rgba(183, 61, 61, 0.83)", "Alpha value propely changed");
		assert.strictEqual(await stepInput.getAttribute("value"), "1", "Change event gets fired on alpha slider change");
	});

	it("Hue value change via the slider", async () => {
		const colorPicker = await browser.$("#cp1");
		const hueSliderHandle = await colorPicker.shadow$(".ui5-color-picker-hue-slider").shadow$(".ui5-slider-handle");
		const stepInput = await browser.$("#changeEventCounter");

		await colorPicker.scrollIntoView();
		await colorPicker.setAttribute("color", "rgba(183, 61, 61, 0.83)");

		await hueSliderHandle.dragAndDrop({ x: 200, y: 0 });

		assert.strictEqual(await colorPicker.getAttribute("color"), "rgba(183, 61, 182, 0.83)", "Color properly changed");
		assert.strictEqual(await stepInput.getAttribute("value"), "2", "Change event gets fired on hue slider change");
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

	it("Hex value input submit triggers hue value change", async () => {
		const colorPicker = await browser.$("#change-event");
		const hexInput = await colorPicker.shadow$(".ui5-color-picker-hex-input");
		const hueSliderHandle = await colorPicker.shadow$(".ui5-color-picker-hue-slider").shadow$(".ui5-slider-handle");

		await hexInput.doubleClick();
		await browser.keys("0854a0");
		await browser.keys("Enter");

		const color = await colorPicker.getAttribute("color");

		await hueSliderHandle.dragAndDrop({ x: 200, y: 0 });

		await hexInput.doubleClick();
		await browser.keys("0854a0");
		await browser.keys("Enter");

		assert.strictEqual(await colorPicker.getAttribute("color"), color, "Color is changed to the old color");
	});

	it("Hue value remains unchanged when user presses over the main color section", async () => {
		const colorPicker = await browser.$("#change-event");
		const hexInput = await colorPicker.shadow$(".ui5-color-picker-hex-input");
		const mainColorSection = await colorPicker.shadow$(".ui5-color-picker-main-color");

		await hexInput.doubleClick();
		await browser.keys("0a6ed1");
		await browser.keys("Enter");

		const hueValue = await colorPicker.getAttribute("_hue");

		await mainColorSection.click();

		assert.strictEqual(await colorPicker.getAttribute("_hue"), hueValue, "Hue value remained unchanged");
	});

	it("Inner input components accessibility references", async () => {
		const colorPicker = await browser.$("#cp1");
		const hueSlider = await colorPicker.shadow$(".ui5-color-picker-hue-slider");
		const alphaSlider = await colorPicker.shadow$(".ui5-color-picker-alpha-slider");
		const hexInput = await colorPicker.shadow$(".ui5-color-picker-hex-input");
		const redInput = await colorPicker.shadow$("#red");
		const greenInput = await colorPicker.shadow$("#green");
		const blueInput = await colorPicker.shadow$("#blue");
		const alphaInput = await colorPicker.shadow$("#alpha");

		assert.strictEqual(await hueSlider.getAttribute("accessible-name"), "Hue control", "Hue slider accessible-name attribute properly set");
		assert.strictEqual(await alphaSlider.getAttribute("accessible-name"), "Alpha control", "Alpha slider accessible-name attribute properly set");
		assert.strictEqual(await hexInput.getAttribute("accessible-name"), "Hexadecimal", "Hex input accessible-name attribute properly set");
		assert.strictEqual(await redInput.getAttribute("accessible-name"), "Red", "Red input accessible-name attribute properly set");
		assert.strictEqual(await greenInput.getAttribute("accessible-name"), "Green", "Green input accessible-name attribute properly set");
		assert.strictEqual(await blueInput.getAttribute("accessible-name"), "Blue", "Blue input accessible-name attribute properly set");
		assert.strictEqual(await alphaInput.getAttribute("accessible-name"), "Alpha", "Alpha input accessible-name attribute properly set");
	});
});
