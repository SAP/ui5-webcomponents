import type SegmentedButtonItem from "../../../src/SegmentedButtonItem.js";

Cypress.Commands.add("ui5SegmentedButtonItemToggleSelect", { prevSubject: true }, (subject, deselect) => {
	const arg = deselect ? "have.attr" : "not.have.attr";
	const arg2 = deselect ? "not.have.attr" : "have.attr";

	cy.wrap(subject)
		.as("segmentedButtonItem")
		.should("be.visible");

	cy.get<SegmentedButtonItem>("@segmentedButtonItem")
		.should(arg, "selected");

	cy.get<SegmentedButtonItem>("@segmentedButtonItem")
		.realClick();

	cy.get<SegmentedButtonItem>("@segmentedButtonItem")
		.should(arg2, "selected");
});
