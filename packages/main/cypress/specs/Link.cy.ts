import { html } from "lit";
import "../../src/Link.js";

describe("Accessibility", () => {
	it("setting accessible-description is applied to button tag", () => {
		cy.mount(html`<ui5-link accessible-description="A long description."></ui5-link>`);

		cy.get("[ui5-link]")
			.shadow()
			.find("a")
			.as("link");

		cy.get("@link")
			.should("have.attr", "aria-description", "A long description.");
	});
});
