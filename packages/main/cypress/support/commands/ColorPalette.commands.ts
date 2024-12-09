Cypress.Commands.add("ui5ColorPaletteCheckSelectedColor", { prevSubject: true }, (subject, colorPaletteItem, values) => {
	cy.get(subject)
		.as("colorPalette");

	cy.get("ui5-color-palette")
		.shadow()
		.find(".ui5-cp-more-colors")
		.as("moreColors");

	cy.get("@colorPalette")
		.find(colorPaletteItem)
		.realClick();

	cy.get("@moreColors")
		.realClick();

	cy.get("@colorPalette")
		.shadow()
		.find("ui5-color-picker")
		.as("colorPicker");

	cy.get("@colorPicker")
		.shadow()
		.find("#red")
		.as("redColor");

	cy.get("@colorPicker")
		.shadow()
		.find("#green")
		.as("greenColor");

	cy.get("@colorPicker")
		.shadow()
		.find("#blue")
		.as("blueColor");

	cy.get("@colorPicker")
		.shadow()
		.find("#alpha")
		.as("alpha");

	cy.get("@colorPalette")
		.shadow()
		.find("ui5-dialog")
		.find("ui5-button")
		.as("okButton");

	cy.get("@redColor")
		.should("have.attr", "value", values.r);

	cy.get("@greenColor")
		.should("have.attr", "value", values.g);

	cy.get("@blueColor")
		.should("have.attr", "value", values.b);

	cy.get("@alpha")
		.should("have.attr", "value", values.a);

	cy.get("@okButton")
		.realClick();
});
