import { html } from "lit";
import "../../src/StepInput.js";
import type StepInput from "../../src/StepInput.js";

describe("StepInput Tests", () => {
	it("tets input event prevention", () => {
		cy.mount(html`
			<ui5-step-input></ui5-step-input>
		`);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.then($input => {
				$input.get(0).addEventListener("input", e => {
					e.preventDefault();
					(e.target as StepInput).value = 30;
				});
			});

		cy.get<StepInput>("@stepInput")
			.realClick();

		cy.realPress("1");

		cy.get("@stepInput")
			.shadow()
			.find("ui5-input")
			.shadow()
			.find("input")
			.should("have.value", "30");
	});
});
