import Link from "../../src/Link.js";

describe("Accessibility", () => {
	it("setting accessible-description is applied to button tag", () => {
		cy.mount(<Link accessibleDescription="A long description."></Link>);

		cy.get("[ui5-link]")
			.shadow()
			.find("a")
			.as("link");

		cy.get("@link")
			.should("have.attr", "aria-description", "A long description.");
	});
});
