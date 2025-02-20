Cypress.Commands.add("ui5CalendarGetDay", (calendarSelector, timestamp) => {
	return cy.get(calendarSelector)
		.shadow()
		.find("[ui5-daypicker]")
		.shadow()
		.find(`div[data-sap-timestamp=${timestamp}]`);
});

Cypress.Commands.add("ui5CalendarGetMonth", (calendarSelector, timestamp) => {
	return cy.get(calendarSelector)
		.shadow()
		.find("[ui5-monthpicker]")
		.shadow()
		.find(`div[data-sap-timestamp=${timestamp}]`);
});
