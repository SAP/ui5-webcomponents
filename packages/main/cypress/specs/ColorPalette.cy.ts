import { html } from "lit";
import "../../src/ColorPalette.js";
import "../../src/ColorPaletteItem.js";
import "../../src/features/ColorPaletteMoreColors.js";
import type Button from "../../src/Button.js";
import type ColorPalette from "../../src/ColorPalette.js";
import type ColorPicker from "../../src/ColorPicker.js";
import type ColorPaletteItem from "../../src/ColorPaletteItem.js";

describe("Color Palette tests", () => {
	it("internal color picker should have selected colr set on open", () => {
		cy.mount(html`<ui5-color-palette show-more-colors show-recent-colors>
<ui5-color-palette-item id="named" value="red"></ui5-color-palette-item>
<ui5-color-palette-item id="rgba" value="rgba(0, 255, 0, 0.5)"></ui5-color-palette-item>
<ui5-color-palette-item id="rgb" value="rgb(0,0,255)"></ui5-color-palette-item>
<ui5-color-palette-item id="hex" value="#C0FFEE"></ui5-color-palette-item>
</ui5-color-palette>`);

		cy.get("ui5-color-palette")
			.as("colorPalette");

		cy.get("ui5-color-palette")
			.shadow()
			.find(".ui5-cp-more-colors")
			.as("moreColors");

		cy.get<ColorPalette>("@colorPalette")
			.find("#named")
			.realClick();

		cy.get<Button>("@moreColors")
			.realClick();

		cy.get<ColorPalette>("@colorPalette")
			.shadow()
			.find("ui5-color-picker")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#red")
			.as("redColor");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#green")
			.as("greenColor");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#blue")
			.as("blueColor");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#alpha")
			.as("alpha");

		cy.get<ColorPalette>("@colorPalette")
			.shadow()
			.find("ui5-dialog")
			.find("ui5-button")
			.as("okButton");

		cy.get<ColorPaletteItem>("@redColor")
			.should("have.attr", "value", "255");

		cy.get<ColorPaletteItem>("@greenColor")
			.should("have.attr", "value", "0");

		cy.get<ColorPaletteItem>("@blueColor")
			.should("have.attr", "value", "0");

		cy.get<ColorPaletteItem>("@alpha")
			.should("have.attr", "value", "1");

		cy.get<Button>("@okButton")
			.realClick();

		cy.get<ColorPalette>("@colorPalette")
			.find("#rgba")
			.realClick();

		cy.get<Button>("@moreColors")
			.realClick();

		cy.get<ColorPaletteItem>("@redColor")
			.should("have.attr", "value", "0");

		cy.get<ColorPaletteItem>("@greenColor")
			.should("have.attr", "value", "255");

		cy.get<ColorPaletteItem>("@blueColor")
			.should("have.attr", "value", "0");

		cy.get<ColorPaletteItem>("@alpha")
			.should("have.attr", "value", "0.5");

		cy.get<Button>("@okButton")
			.realClick();

		cy.get<ColorPalette>("@colorPalette")
			.find("#rgb")
			.realClick();

		cy.get<Button>("@moreColors")
			.realClick();

		cy.get<ColorPaletteItem>("@redColor")
			.should("have.attr", "value", "0");

		cy.get<ColorPaletteItem>("@greenColor")
			.should("have.attr", "value", "0");

		cy.get<ColorPaletteItem>("@blueColor")
			.should("have.attr", "value", "255");

		cy.get<ColorPaletteItem>("@alpha")
			.should("have.attr", "value", "1");

		cy.get<Button>("@okButton")
			.realClick();

		cy.get<ColorPalette>("@colorPalette")
			.find("#hex")
			.realClick();

		cy.get<Button>("@moreColors")
			.realClick();

		cy.get<ColorPaletteItem>("@redColor")
			.should("have.attr", "value", "192");

		cy.get<ColorPaletteItem>("@greenColor")
			.should("have.attr", "value", "255");

		cy.get<ColorPaletteItem>("@blueColor")
			.should("have.attr", "value", "238");

		cy.get<ColorPaletteItem>("@alpha")
			.should("have.attr", "value", "1");

		cy.get<Button>("@okButton")
			.realClick();
	});
});
