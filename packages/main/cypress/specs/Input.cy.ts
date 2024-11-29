import { html } from "lit";
import "../../src/Input.js";
import type Input from "../../src/Input.js";

describe("Input Tests", () => {
	it("tets input event prevention", () => {
		cy.mount(html`
			<ui5-input></ui5-input>
		`);

		cy.get("[ui5-input]")
			.as("input");

		cy.get<Input>("@input")
			.then($input => {
				$input.get(0).addEventListener("input", e => {
					e.preventDefault();
					(e.target as Input).value = "test";
				});
			});

		cy.get<Input>("@input")
			.realClick();

		cy.realPress("a");

		cy.get("@input")
			.shadow()
			.find("input")
			.should("have.value", "test");
	});
});
