import { html } from "lit";
import "@ui5/webcomponents-base/dist/features/F6Navigation.js";
import "../../src/Dialog.js";

describe("Keyboard", () => {
	it("F6 navigation", () => {
		cy.mount(html`
	<button data-sap-ui-fastnavgroup="true" id="test"></button>
	<ui5-dialog open>
			<div data-sap-ui-fastnavgroup="true">
				<button id="first">First group focusable</button>
			</div>
			<div data-sap-ui-fastnavgroup="true">
				<button id="second">Second group focusable</button>
			</div>
	</ui5-dialog>
	<button data-sap-ui-fastnavgroup="true"></button>`);

		cy.get("#first")
			.should("be.focused");

		cy.realPress(["Shift", "F6"]);

		cy.get("#second")
			.should("be.focused");

		cy.realPress(["Shift", "F6"]);

		cy.get("#first")
			.should("be.focused");

		cy.realPress("F6");

		cy.get("#second")
			.should("be.focused");

		cy.realPress("F6");

		cy.get("#first")
			.should("be.focused");
	});
});
