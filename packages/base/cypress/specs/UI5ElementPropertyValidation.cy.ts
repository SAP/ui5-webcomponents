import "../../test/test-elements/Generic.js";

describe("Properties can only have values, restricted to their types", () => {
	it("String property enforced to string", () => {
		cy.mount(`<ui5-test-generic></ui5-test-generic>`);

		cy.get("[ui5-test-generic]")
			.as("testGeneric");

		cy.get("@testGeneric")
			.invoke("prop", "strProp", 5);

		cy.get("@testGeneric")
			.invoke("prop", "strProp")
			.should("equal", 5);
	});
});
