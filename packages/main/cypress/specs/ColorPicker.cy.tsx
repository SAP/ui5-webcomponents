import ColorPicker from "../../src/ColorPicker.js";

describe("Color Picker tests", () => {
	it("should not display color channel inputs and alpha slider in simplified mode", () => {
		cy.mount(<ColorPicker simplified={true}></ColorPicker>);

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

	it("should toggle display to RGB or HSL when button is selected", () => {
		cy.mount(<ColorPicker value="rgba(112, 178, 225, 1)"></ColorPicker>);

		cy.get("ui5-color-picker")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerToggleColorMode();

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#hue")
			.should("have.attr", "value", "205");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#saturation")
			.should("have.attr", "value", "65");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#light")
			.should("have.attr", "value", "66");
	});

	it("should update value when hue is changed via the input field", () => {
		cy.mount(<ColorPicker value="rgba(112, 178, 225, 1)"></ColorPicker>);

		cy.get("ui5-color-picker")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerToggleColorMode();

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerUpdateInput("#hue", "130");

		cy.get<ColorPicker>("@colorPicker")
			.should("have.attr", "value", "rgba(112, 225, 131, 1)");
	});

	it("should update value when saturation is changed via the input field", () => {
		cy.mount(<ColorPicker value="rgba(112, 225, 131, 1)"></ColorPicker>);

		cy.get("ui5-color-picker")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerToggleColorMode();

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerUpdateInput("#saturation", "44");

		cy.get<ColorPicker>("@colorPicker")
			.should("have.attr", "value", "rgba(130, 206, 143, 1)");
	});

	it("should update value when light is changed via the input field", () => {
		cy.mount(<ColorPicker value="rgba(130, 206, 143, 1)"></ColorPicker>);

		cy.get("ui5-color-picker")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerToggleColorMode();

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerUpdateInput("#light", "30");

		cy.get<ColorPicker>("@colorPicker")
			.should("have.attr", "value", "rgba(43, 110, 54, 1)");
	});

	it("should show correct accessibility info for HSL inputs", () => {
		cy.mount(<ColorPicker></ColorPicker>);

		cy.get("ui5-color-picker")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerToggleColorMode();

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#hue")
			.should("have.attr", "accessible-name", "Hue");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#saturation")
			.should("have.attr", "accessible-name", "Saturation");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#light")
			.should("have.attr", "accessible-name", "Light");
	});
});
