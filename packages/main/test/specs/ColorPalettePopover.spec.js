const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("ColorPalette interactions", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalettePopover.html`);
	});

	it("Test if focusing first element works on initial open", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalettePopover.html`);
		const colorPaletteButton = await browser.$("#colorPaletteBtn");
		await colorPaletteButton.click();
		const colorPalettePopover = await browser.$("[ui5-color-palette-popover]");
		const responsivePopover = await colorPalettePopover.shadow$("[ui5-responsive-popover]")
		const colorPalette = await responsivePopover.$("[ui5-color-palette]");
		const defaultButton = await colorPalette.shadow$(".ui5-cp-default-color-button");

		assert.ok(await defaultButton.getProperty("focused"),  "Check if the first element is focused");
	});

	it("Test if default color functionality works", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalettePopover.html`);

		const colorPaletteButton = await browser.$("#colorPaletteBtn");
		await colorPaletteButton.click();
		const colorPalettePopover = await browser.$("[ui5-color-palette-popover]");
		const colorPalette = await colorPalettePopover.shadow$("[ui5-responsive-popover]").$("[ui5-color-palette]");
		const defaultButton = await colorPalette.shadow$(".ui5-cp-default-color-button");

		await defaultButton.keys("Space");

		assert.strictEqual(await colorPalette.getProperty("selectedColor"), "green", "Check if selected value is darkgreen");
	});

	it("Test if keyboard navigation on elements works", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalettePopover.html`);
		const colorPaletteButton = await browser.$("#colorPaletteBtn");
		await colorPaletteButton.click();
		const colorPalettePopover = await browser.$("[ui5-color-palette-popover]");
		const colorPalette = await colorPalettePopover.shadow$("[ui5-responsive-popover]").$("[ui5-color-palette]");
		const colorPaletteEntries = await colorPalette.shadow$$("[ui5-color-palette-item]");
		const defaultButton = await colorPalette.shadow$(".ui5-cp-default-color-button");
		const item = colorPaletteEntries[0];

		await defaultButton.keys("ArrowDown");
		await item.keys("Space");

		assert.strictEqual(await colorPalette.getProperty("selectedColor"), "pink", "Check if selected value is pink");
	});

	it("Test if keyboard navigation on elements works", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalettePopover.html`);
		const colorPaletteButton = await browser.$("#colorPaletteBtn");
		await colorPaletteButton.click();
		const colorPalettePopover = await browser.$("[ui5-color-palette-popover]");
		const colorPalette = await colorPalettePopover.shadow$("[ui5-responsive-popover]").$("[ui5-color-palette]");
		const moreColorsButton = await colorPalette.shadow$(".ui5-cp-more-colors");
		const defaultButton = await colorPalette.shadow$(".ui5-cp-default-color-button");

		await defaultButton.keys("ArrowUp");

		assert.ok(await moreColorsButton.getProperty("focused"),  "Check if more colors button is focused");
	});

	it("Tests navigation with recent colors", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalettePopover.html`);

		const colorPaletteButton = await browser.$("#colorPaletteBtn");
		await colorPaletteButton.click();
		const colorPalettePopover = await browser.$("[ui5-color-palette-popover]");
		const colorPalette = await colorPalettePopover.shadow$("[ui5-responsive-popover]").$("[ui5-color-palette]");
		const defaultButton = await colorPalette.shadow$(".ui5-cp-default-color-button");
		const moreColorsButton = await colorPalette.shadow$(".ui5-cp-more-colors");
		const firstRecentColorsElement = await colorPalette.shadow$(".ui5-cp-recent-colors-container [ui5-color-palette-item]");

		await defaultButton.keys("Space");

		await colorPaletteButton.click();

		await defaultButton.keys("ArrowUp");
		await firstRecentColorsElement.keys("ArrowUp");

		assert.ok(await moreColorsButton.getProperty("focused"),  "Check if more colors button is focused");
	});

	it("Test attribute propagation propagation", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ColorPalettePopover.html`);

		const colorPaletteButton = await browser.$("#colorPaletteBtn");
		await colorPaletteButton.click();
		const colorPalettePopover = await browser.$("[ui5-color-palette-popover]");
		const colorPalette = await colorPalettePopover.shadow$("[ui5-responsive-popover]").$("[ui5-color-palette]");

		assert.ok(await colorPalette.getProperty("showDefaultColor"), "Check if default color is on");
		assert.ok(await colorPalette.getProperty("showRecentColors"), "Check if recent colors is on");
		assert.ok(await colorPalette.getProperty("showMoreColors"), "Check if more colors is on");
	});
});
