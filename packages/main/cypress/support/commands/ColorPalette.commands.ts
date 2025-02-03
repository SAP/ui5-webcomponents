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
		.find("[ui5-color-picker]")
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
		.find("[ui5-dialog]")
		.find("ui5-button[design=Emphasized]") // The OK button is Emphasized (the Cancel button is Transparent)
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
		.should("be.visible") // Make sure the OK button is rendered before clicking it
		.realClick();

	cy.get("@colorPalette")
		.shadow()
		.find("[ui5-dialog]")
		.should("not.be.visible"); // Make sure the dialog is closed at the end of the command (otherwise the next command will sometimes assert against the old dialog values)
});

Cypress.Commands.add("ui5ColorPaletteNavigateAndCheckSelectedColor", (subject: string, startIndex: number, key: string, expectedValue: string) => {
	cy.get(subject)
		.as("colorPalette");

	cy.get("@colorPalette")
		.find("[ui5-color-palette-item]")
		.eq(startIndex)
		.realClick();

	// @ts-ignore
	cy.realPress(key)
		.realPress("Space");

	cy.get("@colorPalette")
		.find("ui5-color-palette-item[selected]")
		.should("have.value", expectedValue);
});
