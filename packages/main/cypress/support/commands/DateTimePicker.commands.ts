Cypress.Commands.add("ui5DateTimePickerOpen", selector => {
	cy.get(selector)
		.then($dateTimePicker => {
			cy.wrap($dateTimePicker).invoke("attr", "open", true);
		});
});

Cypress.Commands.add("ui5DateTimePickerClose", selector => {
	cy.get(selector).invoke("attr", "open", false);
});

Cypress.Commands.add("ui5DateTimePickerGetPopover", selector => {
	return cy.get(selector)
		.shadow()
		.find("ui5-responsive-popover");
});

Cypress.Commands.add("ui5DateTimePickerIsOpen", selector => {
	return cy
		.get(selector)
		.invoke("attr", "open")
		.then(attr => Boolean(attr));
});

Cypress.Commands.add("ui5DateTimePickerGetSubmitButton", selector => {
	return cy.get(selector)
		.shadow()
		.find("ui5-responsive-popover")
		.find("#ok");
});

Cypress.Commands.add("ui5DateTimePickerGetCancelButton", selector => {
	return cy
		.get(selector)
		.shadow()
		.find("ui5-responsive-popover")
		.find("#cancel");
});

Cypress.Commands.add("ui5DateTimePickerTimeSelectionClocksCount", selector => {
	return cy
		.get(selector)
		.shadow()
		.find("ui5-responsive-popover")
		.find("ui5-time-selection-clocks")
		.shadow()
		.find("ui5-time-picker-clock")
		.its("length");
});

Cypress.Commands.add("ui5DateTimePickerPeriodSegmentedButtonCount", selector => {
	return cy
		.get(selector)
		.shadow()
		.find("ui5-responsive-popover")
		.find("ui5-time-selection-clocks")
		.shadow()
		.find("ui5-segmented-button")
		.its("length");
});
