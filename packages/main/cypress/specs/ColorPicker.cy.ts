import { html } from "lit";
import "../../src/ColorPicker.js";
import type ColorPicker from "../../src/ColorPicker.js";

describe("Color Picker tests", () => {
	it("should not display color channel inputs and alpha slider in simplified mode", () => {
		cy.mount(html`<ui5-color-picker simplified></ui5-color-picker>`);

		cy.get("ui5-color-picker")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find(".ui5-color-picker-hex-input")
			.should("exist");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#red")
			.should("not.exist");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#alpha")
			.should("not.exist");
	});
});
