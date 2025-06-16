Cypress.Commands.add("ui5TimePickerGetInnerInput", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("timePicker");

	cy.get("@timePicker")
		.shadow()
		.find("ui5-datetime-input")
		.shadow()
		.find("input")
		.as("innerInput");

	return cy.get("@innerInput");
});

Cypress.Commands.add("ui5TimePickerValueHelpIconPress", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("timePicker");

	cy.get("@timePicker")
		.shadow()
		.find("ui5-datetime-input")
		.find(".ui5-time-picker-input-icon-button")
		.realClick();
});

Cypress.Commands.add("ui5TimePickerGetPopover", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("timePicker");

	cy.get("@timePicker")
		.should("have.attr", "open");

	return cy.get("@timePicker")
		.shadow()
		.find("ui5-responsive-popover")
		.should("be.visible");
});

Cypress.Commands.add("ui5TimePickerGetClock", { prevSubject: true }, (subject, clockType) => {
	cy.wrap(subject)
		.as("timePicker");

	cy.get("@timePicker")
		.should("have.attr", "open");

	return cy.get("@timePicker")
		.shadow()
		.find("ui5-responsive-popover")
		.find("ui5-time-selection-clocks")
		.shadow()
		.find(`ui5-time-picker-clock[data-ui5-clock="${clockType}"]`);
});

Cypress.Commands.add("ui5TimePickerGetSubmitButton", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("timePicker");

	cy.get("@timePicker")
		.should("have.attr", "open");

	return cy.get("@timePicker")
		.shadow()
		.find("ui5-responsive-popover")
		.find("#submit");
});

declare global {
	namespace Cypress {
		interface Chainable {
			ui5TimePickerGetInnerInput(
				this: Chainable<JQuery<Element>>
			): Chainable<JQuery<Element>>;
			ui5TimePickerValueHelpIconPress(
				this: Chainable<JQuery<Element>>
			): Chainable<void>;
			ui5TimePickerGetPopover(
				this: Chainable<JQuery<Element>>
			): Chainable<JQuery<Element>>;
			ui5TimePickerGetClock(
				this: Chainable<JQuery<Element>>,
				clockType: string
			): Chainable<JQuery<Element>>;
			ui5TimePickerGetSubmitButton(
				this: Chainable<JQuery<Element>>
			): Chainable<JQuery<Element>>;
		}
	}
} 