import Link from "../../src/Link.js";

describe("Main functionality", () => {
	it("clicking the link works", () => {
		cy.mount(<Link href="#test">Click me</Link>);

		cy.url().should("not.include", "#test");

		cy.get("[ui5-link]")
			.shadow()
			.find("a")
			.as("link")
			.realClick();

		cy.url().should("include", "#test");
	});
});

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
