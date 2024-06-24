import { html } from 'lit';
import "../../bundle.esm.js";

describe("Lifecycle works", () => {
	it("Tests that changing a property invalidates", () => {
		const el = document.createElement("ui5-test-generic");

		cy.mount(html`<div id="container"></div>`)

		cy.spy(el, "onBeforeRendering").as("onBeforeRendering")

		cy.spy(el, "onAfterRendering").as("onAfterRendering")

		cy.spy(el, "onEnterDOM").as("onEnterDOM")

		cy.get("#container")
			.then($container => {
				$container.append(el);
			})

		cy.get("@onBeforeRendering")
			.should("have.been.called")
			.and("have.been.calledBefore", "@onAfterRendering")
			.and("have.been.calledBefore", "@onEnterDOM")

		cy.get("@onAfterRendering")
			.should("have.been.called")
			.and("have.been.calledBefore", "@onEnterDOM")

		cy.get("@onEnterDOM")
			.should("have.been.called")
	});

	it("Tests element invalidation callbacks", () => {
		cy.mount(html`<ui5-test-generic></ui5-test-generic>`)

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.then($testGeneric => {
				cy.spy($testGeneric.get(0), "onBeforeRendering").as("onBeforeRendering")

				cy.spy($testGeneric.get(0), "onAfterRendering").as("onAfterRendering")
			});

		cy.get("@testGeneric")
			.invoke("prop", "strProp", "some string")

		cy.get("@onBeforeRendering")
			.should("have.been.called")
			.and("have.been.calledBefore", "@onAfterRendering")

		cy.get("@onAfterRendering")
			.should("have.been.called")
	});

	it("Tests that changing a property invalidates", () => {
		const el = document.createElement("ui5-test-generic");

		cy.mount(html`<div id="container"></div>`)

		cy.spy(el, "onExitDOM").as("onExitDOM")

		cy.get("#container")
			.then($container => {
				$container.append(el);

				return $container;
			})

		cy.get(el)
			.then($el => {
				$el.remove();
			})


		cy.get("@onExitDOM")
			.should("have.been.called");
	});
});