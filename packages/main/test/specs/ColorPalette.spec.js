const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("ColorPalette interactions", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalette.html`);
	});

	it("Test if selecting element works", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalette.html`);
		const colorPalette = await browser.$("#cp1");
		const colorPaletteEntries = await colorPalette.$$("[ui5-color-palette-item]");

		await colorPaletteEntries[0].click();

		assert.strictEqual(await colorPalette.getProperty("selectedColor"), "darkblue", "Check if selected value is darkblue");
	});

	it("Test if keyboard navigation on elements works", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalette.html`);
		const colorPalette = await browser.$("#cp1");
		const colorPaletteEntries = await colorPalette.$$("[ui5-color-palette-item]");
		const item = colorPaletteEntries[0];

		await item.click();

		await item.keys("ArrowRight");
		await item.keys("Space");

		assert.strictEqual(await colorPalette.getProperty("selectedColor"), "pink", "Check if selected value is pink");
	});

	it("Test if keyboard navigation on elements works", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalette.html`);
		const colorPalette = await browser.$("#cp1");
		const colorPaletteEntries = await colorPalette.$$("[ui5-color-palette-item]");
		const item = colorPaletteEntries[0];

		await item.click();

		await item.keys("ArrowLeft");
		await item.keys("Space");

		await colorPalette.keys("Space");

		assert.strictEqual(await colorPalette.getProperty("selectedColor"), "#ff6699", "Check if selected value is #ff6699");
	});

	it("Test if keyboard navigation on elements works", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalette.html`);
		const colorPalette = await browser.$("#cp1");
		const colorPaletteEntries = await colorPalette.$$("[ui5-color-palette-item]");
		const item = colorPaletteEntries[0];

		await item.click();

		await item.keys("ArrowUp");
		await item.keys("Space");

		assert.strictEqual(await colorPalette.getProperty("selectedColor"), "orange", "Check if selected value is orange");
	});

	it("Test if keyboard navigation on elements works", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalette.html`);
		const colorPalette = await browser.$("#cp1");
		const colorPaletteEntries = await colorPalette.$$("[ui5-color-palette-item]");
		const item = colorPaletteEntries[9];

		await item.click();

		await item.keys("ArrowDown");
		await item.keys("Space");

		assert.strictEqual(await colorPalette.getProperty("selectedColor"), "darkblue", "Check if selected value is darkblue");
	});

	it("Tests show-more-colors functionality", async () => {
		const colorPalette = await browser.$("#cp3");
		const colorPaletteMoreColorsButton = await colorPalette.shadow$(".ui5-cp-more-colors");

		await colorPaletteMoreColorsButton.click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#cp3");
		const colorPicker = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-color-picker");

		assert.ok(colorPicker, "Color picker is rendered");

		await colorPicker.setProperty("color", "#fafafa");

		// The initial focus is on the HEX input
		await browser.keys("Tab"); // Slider 1
		await browser.keys("Tab"); // Slider 2
		await browser.keys("Tab"); // Red
		await browser.keys("Tab"); // Green
		await browser.keys("Tab"); // Blue
		await browser.keys("Tab"); // Alpha
		await browser.keys("Tab"); // Ok Button

		await browser.keys("Enter"); // Close the dialog & change the value of the color palette

		assert.strictEqual(await colorPalette.getProperty("selectedColor"), "#fafafa", "Custom color is selected from the color picker");
	})

	it("Tests show-recent-colors functionality", async () => {
		const colorPalette = await browser.$("#cp4");
		const colorPaletteEntries = await colorPalette.$$("[ui5-color-palette-item]");

		const colorPaletteRecentColorsWrapper = await colorPalette.shadow$(".ui5-cp-recent-colors-wrapper");
		const colorPaletteRecentColorsWrapperEntries = await colorPaletteRecentColorsWrapper.$$("[ui5-color-palette-item]");

		await colorPaletteEntries[0].click();
		await colorPaletteEntries[1].click();
		await colorPaletteEntries[2].click();
		await colorPaletteEntries[3].click();
		await colorPaletteEntries[4].click();

		assert.strictEqual(colorPaletteRecentColorsWrapperEntries.length, 5, "Only the latest 5 colors are shown");
		assert.strictEqual(await colorPaletteRecentColorsWrapperEntries[0].getProperty("value"), "green");
		assert.strictEqual(await colorPaletteRecentColorsWrapperEntries[1].getProperty("value"), "rgb(0,200,0)");
		assert.strictEqual(await colorPaletteRecentColorsWrapperEntries[2].getProperty("value"), "#444444");
		assert.strictEqual(await colorPaletteRecentColorsWrapperEntries[3].getProperty("value"), "darkblue");
		assert.strictEqual(await colorPaletteRecentColorsWrapperEntries[4].getProperty("value"), "pink");
	});
});
