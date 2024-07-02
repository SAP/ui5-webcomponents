import { html } from 'lit';
import "../../bundle.esm.js";

describe("Framework boot", () => {
	it("Setting property updates attribute, state and DOM", () => {
		cy.mount(html`<ui5-test-accessor></ui5-test-accessor>`);

		cy.get("[ui5-test-accessor]")
			.as("testAccessor")
			.invoke("prop", "myProp", true)

		cy.get("@testAccessor")
			.should("have.attr", "my-prop");

		cy.get("@testAccessor")
			.shadow()
			.find("div")
			.should("have.text", "true");

		cy.get("@testAccessor")
			.invoke("prop", "storage")
			.should("be.true");

		cy.get("[ui5-test-accessor]")
			.as("testAccessor")
			.invoke("prop", "myProp", false)

		cy.get("@testAccessor")
			.should("not.have.attr", "my-prop");

		cy.get("@testAccessor")
			.shadow()
			.find("div")
			.should("have.text", "false");

		cy.get("@testAccessor")
			.invoke("prop", "storage")
			.should("be.false");
	});

	it("Setting attribute updates property, state and DOM", () => {
		cy.mount(html`<ui5-test-accessor></ui5-test-accessor>`);

		cy.get("[ui5-test-accessor]")
			.as("testAccessor")
			.invoke("attr", "my-prop", "")

		cy.get("@testAccessor")
			.should("have.attr", "my-prop");

		cy.get("@testAccessor")
			.shadow()
			.find("div")
			.should("have.text", "true");

		cy.get("@testAccessor")
			.invoke("prop", "storage")
			.should("be.true");

		cy.get("[ui5-test-accessor]")
			.as("testAccessor")
			.invoke("removeAttr", "my-prop")

		cy.get("@testAccessor")
			.should("not.have.attr", "my-prop");

		cy.get("@testAccessor")
			.shadow()
			.find("div")
			.should("have.text", "false");

		cy.get("@testAccessor")
			.invoke("prop", "storage")
			.should("be.false");
	});

	it("should stop searching for accessors when HTMLElement is reached", () => {
		cy.mount(html`<ui5-test-accessor></ui5-test-accessor>`);

		cy.get("[ui5-test-accessor]")
			.invoke("prop", "title")
			.should("be.undefined");
	});
});