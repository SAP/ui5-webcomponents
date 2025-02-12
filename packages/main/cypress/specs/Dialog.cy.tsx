import "@ui5/webcomponents-base/dist/features/F6Navigation.js";
import Dialog from "../../src/Dialog.js";

describe("Keyboard", () => {
	it("F6 navigation", () => {
		cy.mount(
			<>
				<button data-sap-ui-fastnavgroup="true" id="test"></button>
				<Dialog open={true}>
					<div data-sap-ui-fastnavgroup="true">
						<button id="first">First group focusable</button>
					</div>
					<div data-sap-ui-fastnavgroup="true">
						<button id="second">Second group focusable</button>
					</div>
				</Dialog>
				<button data-sap-ui-fastnavgroup="true"></button>
			</>
		);

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
