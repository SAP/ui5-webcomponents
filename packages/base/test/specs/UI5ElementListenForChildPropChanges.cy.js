import { html } from 'lit';
import "../../bundle.esm.js";

describe("Invalidation works", () => {
	it("Tests that changing a monitored property of a child invalidates the parent", () => {
		cy.mount(html`<ui5-test-parent>
		<ui5-test-child></ui5-test-child>
	</ui5-test-parent>`)

		cy.get("[ui5-test-parent]")
			.as("testParent")
			.then(el => {
				cy.spy(el.get(0), "onInvalidation").as("invalidations")
			})

		cy.get("[ui5-test-child]")
			.invoke("prop", "prop1", "a");

		cy.get("@invalidations")
			.should("have.been.called")
	});

	it("Tests that changing a non-monitored property of a child does not invalidate the parent", () => {
		cy.mount(html`<ui5-test-parent>
		<ui5-test-child></ui5-test-child>
	</ui5-test-parent>`)

		cy.get("[ui5-test-parent]")
			.as("testParent")
			.then(el => {
				cy.spy(el.get(0), "onInvalidation").as("invalidations")
			})

		cy.get("[ui5-test-child]")
			.invoke("prop", "prop2", "b");

		cy.get("@invalidations")
			.should("have.not.been.called")
	});

	it("Tests that changing a non-monitored property of a child does not invalidate the parent", () => {
		cy.mount(html`<ui5-test-parent>
		<ui5-test-child slot="items"></ui5-test-child>
	</ui5-test-parent>`)

		cy.get("[ui5-test-parent]")
			.as("testParent")
			.then(el => {
				cy.spy(el.get(0), "onInvalidation").as("invalidations")
			})

		cy.get("[ui5-test-child]")
			.invoke("prop", "prop1", "a")
			.invoke("prop", "prop2", "b")
			.invoke("prop", "prop3", "c");

		cy.get("@invalidations")
			.should("have.been.calledThrice")
	});
});