import Generic from "../../test/test-elements/Generic.js";
import NoShadowDOM from "../../test/test-elements/NoShadowDOM.js";

describe("The framework can define web components", () => {
	it("Tests that element's Shadow DOM is rendered if it has a template", () => {
		cy.mount(<Generic></Generic>);

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.then($element => {
				return !!$element.get(0).shadowRoot;
			})
			.should("be.true");

		cy.get("@testGeneric")
			.shadow()
			.find("div > p")
			.should("exist");
	});

	it("Tests that element's Shadow DOM is not rendered if it has no template", () => {
		cy.mount(<NoShadowDOM></NoShadowDOM>);

		cy.get("[ui5-test-no-shadow]")
			.then($element => {
				return !!$element.get(0).shadowRoot;
			})
			.should("be.false");
	});
});
