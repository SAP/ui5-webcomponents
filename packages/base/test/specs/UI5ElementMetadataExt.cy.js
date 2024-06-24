import { html } from 'lit';
import "../../bundle.esm.js";

describe("Invalidation works", () => {
	it("Tests that changing a monitored property of a child invalidates the parent", () => {
		cy.mount(html`<ui5-test-generic-ext></ui5-test-generic-ext>`)

		cy.get("[ui5-test-generic-ext]")
			.then($el => {
				return $el.get(0).constructor.getMetadata();
			})
			.as("metadata");

			cy.get("@metadata")
			.invoke("getProperties")
			.its("strProp")
			.should("exist");

			cy.get("@metadata")
			.invoke("getProperties")
			.its("extProp")
			.should("exist");

			cy.get("@metadata")
			.invoke("getSlots")
			.its("default")
			.should("exist");

			cy.get("@metadata")
			.invoke("getSlots")
			.its("extSlot")
			.should("exist");
	});

	it("When extending metadata, property defaultValue can be modified", () => {
		cy.mount(html`<ui5-test-generic-ext></ui5-test-generic-ext>`)

		cy.get("[ui5-test-generic-ext]")
			.then($el => {
				return $el.get(0).constructor.getMetadata();
			})
			.as("metadata");

			cy.get("@metadata")
			.invoke("getProperties")
			.its("strProp")
			.should("exist")
			.its("defaultValue")
			.should("equal", "Ext")
	});
});