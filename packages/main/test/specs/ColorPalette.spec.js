const assert = require("chai").assert;

describe("ColorPalette interactions", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/ColorPalette.html");
	});

	it("Test if selecting element works", () => {
		browser.url("http://localhost:8080/test-resources/pages/ColorPalette.html");
		const colorPalette = browser.$("#cp1");
		const colorPaletteEntries = colorPalette.$$("[ui5-color-palette-item]");

		colorPaletteEntries[0].click();

		assert.strictEqual(colorPalette.getProperty("value"), "darkblue", "Check if selected value is darkblue");
	});

	it("Test if keyboard navigation on elements works", () => {
		browser.url("http://localhost:8080/test-resources/pages/ColorPalette.html");
		const colorPalette = browser.$("#cp1");
		const colorPaletteEntries = colorPalette.$$("[ui5-color-palette-item]");
		const item = colorPaletteEntries[0];

		item.click();

		item.keys("ArrowRight");
		item.keys("Space");

		assert.strictEqual(colorPalette.getProperty("value"), "pink", "Check if selected value is pink");
	});

	it("Test if keyboard navigation on elements works", () => {
		browser.url("http://localhost:8080/test-resources/pages/ColorPalette.html");
		const colorPalette = browser.$("#cp1");
		const colorPaletteEntries = colorPalette.$$("[ui5-color-palette-item]");
		const item = colorPaletteEntries[0];

		item.click();

		item.keys("ArrowLeft");
		item.keys("Space");

		colorPalette.keys("Space");

		assert.strictEqual(colorPalette.getProperty("value"), "#ff6699", "Check if selected value is #ff6699");
	});

	it("Test if keyboard navigation on elements works", () => {
		browser.url("http://localhost:8080/test-resources/pages/ColorPalette.html");
		const colorPalette = browser.$("#cp1");
		const colorPaletteEntries = colorPalette.$$("[ui5-color-palette-item]");
		const item = colorPaletteEntries[0];

		item.click();

		item.keys("ArrowUp");
		item.keys("Space");

		assert.strictEqual(colorPalette.getProperty("value"), "orange", "Check if selected value is orange");
	});

	it("Test if keyboard navigation on elements works", () => {
		browser.url("http://localhost:8080/test-resources/pages/ColorPalette.html");
		const colorPalette = browser.$("#cp1");
		const colorPaletteEntries = colorPalette.$$("[ui5-color-palette-item]");
		const item = colorPaletteEntries[9];

		item.click();

		item.keys("ArrowDown");
		item.keys("Space");

		assert.strictEqual(colorPalette.getProperty("value"), "darkblue", "Check if selected value is darkblue");
	});

	it("Tests more-colors functionality", () => {
		const colorPalette = browser.$("#cp3");
		const colorPaletteMoreColorsButton = colorPalette.shadow$(".ui5-cp-more-colors");

		colorPaletteMoreColorsButton.click();

		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#cp3");
		const colorPicker = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-color-picker");

		assert.ok(colorPicker, "Color picker is rendered");

		colorPicker.setProperty("color", "#fafafa");

		// The initial focus is on the HEX input
		browser.keys("Tab"); // Red
		browser.keys("Tab"); // Green
		browser.keys("Tab"); // Blue
		browser.keys("Tab"); // Alpha
		browser.keys("Tab"); // Ok Button

		browser.keys("Enter"); // Close the dialog & change the value of the color palette

		assert.strictEqual(colorPalette.getProperty("value"), "#fafafa", "Custom color is selected from the color picker");
	})
});
