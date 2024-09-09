// import { html } from "lit";
import "../../src/Button.js";

describe("Eventing", () => {
	it("Default prevented", () => {
// 		cy.mount(html`<form method="get">
// 	<ui5-button submits>Submit</ui5-button>
// </form>`);

// 		cy.get("form")
// 			.then($item => {
// 				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
// 			});

// 		cy.get("[ui5-button]")
// 			.then($item => {
// 				$item.get(0).addEventListener("click", e => e.preventDefault());
// 			});

// 		cy.get("[ui5-button]")
// 			.realClick();

// 		cy.get("@submit")
// 			.should("have.not.been.called");
	});

// 	it("Default not prevented", () => {
// 		cy.mount(html`<form>
// 	<ui5-button submits>Submit</ui5-button>
// </form>`);

// 		cy.get("form")
// 			.then($item => {
// 				$item.get(0).addEventListener("submit", e => e.preventDefault());
// 				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
// 			});

// 		cy.get("[ui5-button]")
// 			.realClick();

// 		cy.get("@submit")
// 			.should("have.been.called");
// 	});
});
