import Avatar from "../../src/Avatar.js";

describe("Accessibility", () => {
	it("checks if initials of avatar are correctly announced", () => {
		const INITIALS = "XS";

		cy.mount(<Avatar id="interactive-avatar" initials={INITIALS} interactive></Avatar>);

		// Store the expected label to compare against
		const expectedLabel = `Avatar ${INITIALS}`;

		// Check if the aria-label is correctly set
		cy.get("#interactive-avatar")
			.shadow()
			.find(".ui5-avatar-root")
			.should("have.attr", "aria-label", expectedLabel);
	});
});
