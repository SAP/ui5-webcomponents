import type UI5Element from "../../src/UI5Element.js";
import GenericExt from "../../test/test-elements/GenericExt.js";

describe("Invalidation works", () => {
	it("Tests that changing a monitored property of a child invalidates the parent", () => {
		cy.mount(<GenericExt></GenericExt>);

		cy.get("[ui5-test-generic-ext]")
			.then($el => {
				return ($el.get(0).constructor as typeof UI5Element).getMetadata();
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
		cy.mount(<GenericExt></GenericExt>);

		cy.get("[ui5-test-generic-ext]")
			.invoke("attr", "str-prop")
			.should("equal", "Ext");
	});
});
