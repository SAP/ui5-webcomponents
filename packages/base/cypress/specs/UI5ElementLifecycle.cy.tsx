import type UI5Element from "../../src/UI5Element.js";
import Generic from "../../test/test-elements/Generic.js";

describe("Lifecycle works", () => {
	it("Tests that changing a property invalidates", () => {
		const el = document.createElement("ui5-test-generic");

		cy.mount(<div id="container"></div>);

		cy.spy<UI5Element>((el as UI5Element), "onBeforeRendering").as("onBeforeRendering");

		cy.spy<UI5Element>((el as UI5Element), "onAfterRendering").as("onAfterRendering");

		cy.spy<UI5Element>((el as UI5Element), "onEnterDOM").as("onEnterDOM");

		cy.get("#container")
			.then($container => {
				$container.append(el);
			});

		cy.get("@onBeforeRendering")
			.should("have.been.called")
			.and("have.been.calledBefore", "@onAfterRendering")
			.and("have.been.calledBefore", "@onEnterDOM");

		cy.get("@onAfterRendering")
			.should("have.been.called")
			.and("have.been.calledBefore", "@onEnterDOM");

		cy.get("@onEnterDOM")
			.should("have.been.called");
	});

	it("Tests element invalidation callbacks", () => {
		cy.mount(<Generic></Generic>);

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.then($testGeneric => {
				cy.spy<UI5Element>(($testGeneric.get(0) as UI5Element), "onBeforeRendering").as("onBeforeRendering");

				cy.spy<UI5Element>(($testGeneric.get(0) as UI5Element), "onAfterRendering").as("onAfterRendering");
			});

		cy.get("@testGeneric")
			.invoke("prop", "strProp", "some string");

		cy.get("@onBeforeRendering")
			.should("have.been.called")
			.and("have.been.calledBefore", "@onAfterRendering");

		cy.get("@onAfterRendering")
			.should("have.been.called");
	});

	it("Tests element destruction callback", () => {
		const el = document.createElement("ui5-test-generic");

		cy.mount(<div id="container"></div>);

		cy.spy<UI5Element>((el as UI5Element), "onExitDOM").as("onExitDOM");
		cy.spy<UI5Element>((el as UI5Element), "onEnterDOM").as("onEnterDOM");

		cy.get("#container")
			.then($container => {
				$container.append(el);

				return $container;
			});

		cy.get("@onEnterDOM")
			.should("have.been.called");

		cy.wrap(el)
			.then($el => {
				$el.remove();
			});

		cy.get("@onExitDOM")
			.should("have.been.called");
	});
});
