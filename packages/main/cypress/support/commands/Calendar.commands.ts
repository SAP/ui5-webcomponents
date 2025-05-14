Cypress.Commands.add("ui5CalendarGetDay", (calendarSelector, timestamp) => {
	cy.get(calendarSelector)
		.as("calendar");
	
	cy.get("@calendar")
		.shadow()
		.find("[ui5-daypicker]")
		.as("daypicker");
	
	return cy.get("@daypicker")
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
