import { html } from 'lit';
import "../../bundle.esm.js";

describe("Slots work properly", () => {
	it("Tests that properties exist on the element for each slot", () => {
		cy.mount(html`<ui5-test-generic>
		Default slot text
		<span>Default slot content</span>
		<span slot="other">Other slot content 1</span>
		<span slot="other">Other slot content 2</span>
		<span slot="individual">Individual slot content 1</span>
		<span slot="individual">Individual slot content 2</span>
		<span slot="named">Item in slot with propertyName</span>
		<span slot="named">Item in slot with propertyName</span>
	</ui5-test-generic>
		`)

		cy.get("[ui5-test-generic]")
			.as("testGeneric")

		cy.get("@testGeneric")
			.invoke("prop", "default")
			.then(value => {
				return value.length
			})
			.should("be.greaterThan", 0)

		cy.get("@testGeneric")
			.invoke("prop", "other")
			.should("have.length", 2)

		cy.get("@testGeneric")
			.invoke("prop", "individual")
			.should("have.length", 2)

		cy.get("@testGeneric")
			.invoke("prop", "items")
			.should("have.length", 2)

		cy.get("@testGeneric")
			.invoke("prop", "named")
			.should("be.undefined")
	});

	it("Tests that properties exist on the element for each slot", () => {
		cy.mount(html`<ui5-test-generic>
		<span slot="individual">Individual slot content 1</span>
		<span slot="individual">Individual slot content 2</span>
	</ui5-test-generic>
		`)

		cy.get("[slot=individual]")
			.should("not.exist");

		cy.get("[slot=individual-1]")
			.should("exist");

		cy.get("[slot=individual-2]")
			.should("exist");
	});
});