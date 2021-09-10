const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("ColorPalette interactions", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalettePopover.html`);
	});

	it("Test if focusing first element works on initial open", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalettePopover.html`);
		const colorPaletteButton = browser.$("#colorPaletteBtn");
		colorPaletteButton.click();
		const colorPalettePopover = browser.$("[ui5-color-palette-popover]");
		const responsivePopover = colorPalettePopover.shadow$("[ui5-responsive-popover]")
		const colorPalette = responsivePopover.$("[ui5-color-palette]");
		const defaultButton = colorPalette.shadow$(".ui5-cp-default-color-button");

		assert.strictEqual(defaultButton.getProperty("focused"), true, "Check if the first element is focused");
	});

	it("Test if default color functionality works", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalettePopover.html`);

		const colorPaletteButton = browser.$("#colorPaletteBtn");
		colorPaletteButton.click();
		const colorPalettePopover = browser.$("[ui5-color-palette-popover]");
		const colorPalette = colorPalettePopover.shadow$("[ui5-responsive-popover]").$("[ui5-color-palette]");
		const defaultButton = colorPalette.shadow$(".ui5-cp-default-color-button");

		defaultButton.keys("Space");

		assert.strictEqual(colorPalette.getProperty("selectedColor"), "green", "Check if selected value is darkgreen");
	});

	it("Test if keyboard navigation on elements works", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalettePopover.html`);
		const colorPaletteButton = browser.$("#colorPaletteBtn");
		colorPaletteButton.click();
		const colorPalettePopover = browser.$("[ui5-color-palette-popover]");
		const colorPalette = colorPalettePopover.shadow$("[ui5-responsive-popover]").$("[ui5-color-palette]");
		const colorPaletteEntries = colorPalette.shadow$$("[ui5-color-palette-item]");
		const defaultButton = colorPalette.shadow$(".ui5-cp-default-color-button");
		const item = colorPaletteEntries[0];

		defaultButton.keys("ArrowDown");
		item.keys("Space");

		assert.strictEqual(colorPalette.getProperty("selectedColor"), "pink", "Check if selected value is pink");
	});

	it("Test if keyboard navigation on elements works", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalettePopover.html`);
		const colorPaletteButton = browser.$("#colorPaletteBtn");
		colorPaletteButton.click();
		const colorPalettePopover = browser.$("[ui5-color-palette-popover]");
		const colorPalette = colorPalettePopover.shadow$("[ui5-responsive-popover]").$("[ui5-color-palette]");
		const moreColorsButton = colorPalette.shadow$(".ui5-cp-more-colors");
		const defaultButton = colorPalette.shadow$(".ui5-cp-default-color-button");

		defaultButton.keys("ArrowUp");

		assert.strictEqual(moreColorsButton.getProperty("focused"), true, "Check if more colors button is focused");
	});

	it("Tests navigation with recent colors", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalettePopover.html`);

		const colorPaletteButton = browser.$("#colorPaletteBtn");
		colorPaletteButton.click();
		const colorPalettePopover = browser.$("[ui5-color-palette-popover]");
		const colorPalette = colorPalettePopover.shadow$("[ui5-responsive-popover]").$("[ui5-color-palette]");
		const defaultButton = colorPalette.shadow$(".ui5-cp-default-color-button");
		const moreColorsButton = colorPalette.shadow$(".ui5-cp-more-colors");
		const firstRecentColorsElement = colorPalette.shadow$(".ui5-cp-recent-colors-container [ui5-color-palette-item]");

		defaultButton.keys("Space");

		colorPaletteButton.click();

		defaultButton.keys("ArrowUp");
		firstRecentColorsElement.keys("ArrowUp");

		assert.strictEqual(moreColorsButton.getProperty("focused"), true, "Check if more colors button is focused");
	});

	it("Test attribute propagation propagation", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalettePopover.html`);

		const colorPaletteButton = browser.$("#colorPaletteBtn");
		colorPaletteButton.click();
		const colorPalettePopover = browser.$("[ui5-color-palette-popover]");
		const colorPalette = colorPalettePopover.shadow$("[ui5-responsive-popover]").$("[ui5-color-palette]");

		assert.strictEqual(colorPalette.getProperty("showDefaultColor"), true, "Check if default color is on");
		assert.strictEqual(colorPalette.getProperty("showRecentColors"), true, "Check if recent colors is on");
		assert.strictEqual(colorPalette.getProperty("showMoreColors"), true, "Check if more colors is on");
	});
});
