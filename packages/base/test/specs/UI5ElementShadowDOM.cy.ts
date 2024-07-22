import { html } from 'lit';

import "../../src/test-elements/Generic.js";
import "../../src/test-elements/NoShadowDOM.js";

describe("The framework can define web components", () => {
	it("Tests that element's Shadow DOM is rendered if it has a template", () => {
		cy.mount(html`<ui5-test-generic></ui5-test-generic>`)

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.then($element => {
				return !!$element.get(0).shadowRoot
			})
			.should('be.true')

		cy.get("@testGeneric")
			.shadow()
			.find("div > p")
			.should("exist");
	});

	it("Tests that element's Shadow DOM is not rendered if it has no template", () => {
		cy.mount(html`<ui5-test-no-shadow></ui5-test-no-shadow>`)

		cy.get("[ui5-test-no-shadow]")
			.then($element => {
				return !!$element.get(0).shadowRoot
			})
			.should('be.false')
	});
});