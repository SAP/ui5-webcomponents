Cypress.Commands.add("ui5GetInnerInput", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("datePicker");

	cy.get("@datePicker")
		.shadow()
		.find("ui5-input")
		.shadow()
		.find("input");
});

Cypress.Commands.add("ui5GetPickerDate", { prevSubject: true }, (subject, timestamp) => {
	cy.wrap(subject)
		.as("datePicker");

	cy.get("@datePicker")
		.should("have.attr", "open");

	cy.get("@datePicker")
		.shadow()
		.find("ui5-calendar")
		.as("calendar")
		.should("be.visible");

	cy.get("@calendar")
		.shadow()
		.find("ui5-daypicker")
		.shadow()
		.find(`[data-sap-timestamp='${timestamp}']`);
});
