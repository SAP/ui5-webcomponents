import Accessor from "../../test/test-elements/Accessor.js";

describe("Framework boot", () => {
	it("Setting property updates attribute, state and DOM", () => {
		cy.mount(<Accessor></Accessor>);

		cy.get("[ui5-test-accessor]")
			.as("testAccessor")
			.invoke("prop", "myProp", true);

		cy.get("@testAccessor")
			.should("have.attr", "my-prop");

		cy.get("@testAccessor")
			.shadow()
			.find("div")
			.should("have.text", "true");

		cy.get("@testAccessor")
			.should("have.prop", "storage", true);

		cy.get("[ui5-test-accessor]")
			.as("testAccessor")
			.invoke("prop", "myProp", false);

		cy.get("@testAccessor")
			.should("not.have.attr", "my-prop");

		cy.get("@testAccessor")
			.shadow()
			.find("div")
			.should("have.text", "false");

		cy.get("@testAccessor")
			.should("have.prop", "storage", false);
	});

	it("Setting attribute updates property, state and DOM", () => {
		cy.mount(<Accessor></Accessor>);

		cy.get("[ui5-test-accessor]")
			.as("testAccessor")
			.invoke("attr", "my-prop", "");

		cy.get("@testAccessor")
			.should("have.attr", "my-prop");

		cy.get("@testAccessor")
			.shadow()
			.find("div")
			.should("have.text", "true");

		cy.get("@testAccessor")
			.should("have.prop", "storage", true);

		cy.get("[ui5-test-accessor]")
			.as("testAccessor")
			.invoke("removeAttr", "my-prop");

		cy.get("@testAccessor")
			.should("not.have.attr", "my-prop");

		cy.get("@testAccessor")
			.shadow()
			.find("div")
			.should("have.text", "false");

		cy.get("@testAccessor")
			.should("have.prop", "storage", false);
	});

	it("should stop searching for accessors when HTMLElement is reached", () => {
		cy.mount(<Accessor></Accessor>);

		cy.get("[ui5-test-accessor]")
			.invoke("prop", "title")
			.should("be.undefined");
	});
});
