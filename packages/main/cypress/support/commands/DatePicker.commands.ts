Cypress.Commands.add("ui5DatePickerGetInnerInput", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.shadow()
		.find("ui5-input")
		.shadow()
		.find("input");
});

Cypress.Commands.add("ui5DatePickerGetPopoverDate", { prevSubject: true }, (subject, timestamp) => {
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

Cypress.Commands.add("ui5DatePickerGetDisplayedDay", { prevSubject: true }, (subject, index) => {
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
		.find(".ui5-dp-content .ui5-dp-item")
		.eq(index);
});

Cypress.Commands.add("ui5DatePickerGetFirstDisplayedDate", { prevSubject: true }, subject => {
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
		.find("div.ui5-dp-item");
});

Cypress.Commands.add("ui5DatePickerGetFirstDisplayedYear", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("datePicker");

	cy.get("@datePicker")
		.should("have.attr", "open");

	cy.get("@datePicker")
		.shadow()
		.find("ui5-calendar")
		.shadow()
		.find("ui5-yearpicker")
		.as("yearPicker")
		.should("be.visible");

	cy.get("@yearPicker")
		.shadow()
		.find("div.ui5-yp-item");
});
Cypress.Commands.add("ui5DatePickerGetDisplayedMonth", { prevSubject: true }, (subject: string, index: number) => {
	cy.wrap(subject)
		.as("datePicker");

	cy.get("@datePicker")
		.should("have.attr", "open");

	cy.get("@datePicker")
		.shadow()
		.find("ui5-calendar")
		.shadow()
		.find("ui5-monthpicker")
		.as("monthPicker")
		.should("be.visible");

	cy.get("@monthPicker")
		.shadow()
		.find(".ui5-mp-root .ui5-mp-item")
		.eq(index);
});

Cypress.Commands.add("ui5DatePickerGetDisplayedYear", { prevSubject: true }, (subject: string, index: number) => {
	cy.wrap(subject)
		.as("datePicker");

	cy.get("@datePicker")
		.should("have.attr", "open");

	cy.get("@datePicker")
		.shadow()
		.find("ui5-calendar")
		.shadow()
		.find("ui5-yearpicker")
		.as("yearPicker")
		.should("be.visible");

	cy.get("@yearPicker")
		.shadow()
		.find(".ui5-yp-root .ui5-yp-item")
		.eq(index);
});

Cypress.Commands.add("ui5DatePickerGetNextButton", { prevSubject: true }, subject => {
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
		.find(".ui5-calheader div[data-ui5-cal-header-btn-next]");
});

Cypress.Commands.add("ui5DatePickerGetPreviousButton", { prevSubject: true }, subject => {
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
		.find(".ui5-calheader div[data-ui5-cal-header-btn-prev]");
});

Cypress.Commands.add("ui5DatePickerGetMonthButton", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("datePicker");

	cy.get("@datePicker")
		.shadow()
		.find("ui5-calendar")
		.as("calendar")
		.should("be.visible");

	return cy.get("@calendar")
		.shadow()
		.find(".ui5-calheader div[data-ui5-cal-header-btn-month]");
});

Cypress.Commands.add("ui5DatePickerGetYearButton", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("datePicker");

	cy.get("@datePicker")
		.shadow()
		.find("ui5-calendar")
		.as("calendar")
		.should("be.visible");

	cy.get("@calendar")
		.shadow()
		.find(".ui5-calheader div[data-ui5-cal-header-btn-year]");
});

Cypress.Commands.add("ui5DatePickerValueHelpIconPress", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("datePicker");

	cy.get("@datePicker")
		.shadow()
		.find("ui5-icon")
		.realClick();
});
