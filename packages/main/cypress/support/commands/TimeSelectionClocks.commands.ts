Cypress.Commands.add("ui5TimeSelectionClocksInnerButton", (timeSelectionClocks, index) => {
	cy.get(timeSelectionClocks)
        .shadow()
        .find("ui5-toggle-spin-button")
        .as("buttons");

	return cy.get("@buttons")
        .eq(index)
        .shadow()
        .find("button");
});

Cypress.Commands.add("ui5TimeSelectionClocksIsActiveClock", (timeSelectionClocks, index) => {
    const hoursArg = index === 0;
    const minutesArg = index === 1;
    const secondsArg = index === 2;

	cy.get(timeSelectionClocks)
        .shadow()
        .find("ui5-time-picker-clock")
        .as("clocks");

    cy.get("@clocks").eq(0).should("have.prop", "active", hoursArg);
    cy.get("@clocks").eq(1).should("have.prop", "active", minutesArg);
    cy.get("@clocks").eq(2).should("have.prop", "active", secondsArg);

    return cy.wrap(true);
});