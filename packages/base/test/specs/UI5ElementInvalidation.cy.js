import { html } from 'lit';
import "../../bundle.esm.js";

describe("Invalidation works", () => {
	it("Tests that changing a property invalidates", () => {
		cy.mount(html`<ui5-test-generic></ui5-test-generic>`)

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.then(el => {
				cy.spy(el.get(0), "onInvalidation").as("invalidations")
			})

		cy.get("@testGeneric")
			.invoke("prop", "strProp", "new value");

		cy.get("@testGeneric")
			.invoke("prop", "boolProp", true);

		cy.get("@invalidations")
			.should("have.been.calledTwice")
	});

	it("Tests that setting a property to the same value does not invalidate", () => {
		cy.mount(html`<ui5-test-generic></ui5-test-generic>`)

		const text = "new value";

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.invoke("prop", "strProp", text)
			.then(el => {
				cy.spy(el.get(0), "onInvalidation").as("invalidations")
			})

		cy.get("@testGeneric")
			.invoke("prop", "strProp", text)

		cy.get("@invalidations")
			.should("have.not.been.called")
	});

	it("Tests that setting a property of type Object always invalidates", () => {
		cy.mount(html`<ui5-test-generic></ui5-test-generic>`)

		const obj = {};
		const otherObj = {};

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.invoke("prop", "objectProp", obj)
			.then(el => {
				cy.spy(el.get(0), "onInvalidation").as("invalidations")
			})

		cy.get("@testGeneric")
			.invoke("prop", "objectProp", otherObj)

		cy.get("@invalidations")
			.should("have.been.calledOnce")
	});

	it("Tests that setting an array property always invalidates", () => {
		cy.mount(html`<ui5-test-generic></ui5-test-generic>`)

		const arr = [];
		const otherArr = [];

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.invoke("prop", "multiProp", arr)
			.then(el => {
				cy.spy(el.get(0), "onInvalidation").as("invalidations")
			})

		cy.get("@testGeneric")
			.invoke("prop", "multiProp", otherArr)

		cy.get("@invalidations")
			.should("have.been.calledOnce")
	});

	it("Tests that adding a child invalidates", () => {
		cy.mount(html`<ui5-test-generic></ui5-test-generic>`)

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.then(el => {
				cy.spy(el.get(0), "onInvalidation").as("invalidations")
			})

		cy.get("@testGeneric")
			.then($testGeneric => {
				const div = document.createElement("div");
				$testGeneric.append(div);
			})

		cy.get("@invalidations")
			.should("have.been.called")
	});

	it("Tests that removing a child invalidates", () => {
		cy.mount(html`<ui5-test-generic></ui5-test-generic>`)

		const div = document.createElement("div");

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.then($testGeneric => {
				$testGeneric.append(div);

				return $testGeneric
			})
			.then($testGeneric => {
				cy.spy($testGeneric.get(0), "onInvalidation").as("invalidations")
			})

		cy.get("@invalidations")
			.should("have.not.been.called")

		cy.get(div)
			.then($div => {
				$div.remove();
			})

		cy.get("@invalidations")
			.should("have.been.called")
	});

	it("Tests that modifying textContent invalidates", () => {
		cy.mount(html`<ui5-test-generic></ui5-test-generic>`)

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.then($testGeneric => {
				$testGeneric.text("test");

				return $testGeneric
			})
			.then($testGeneric => {
				cy.spy($testGeneric.get(0), "onInvalidation").as("invalidations")
			})

		cy.get("@invalidations")
			.should("have.not.been.called")

		cy.get("@testGeneric")
			.then($testGeneric => {
				$testGeneric.text("test2");
			})

		cy.get("@invalidations")
			.should("have.been.called")
	});

	it("Tests that modifying nodeValue invalidates", () => {
		cy.mount(html`<ui5-test-generic></ui5-test-generic>`)

		cy.get("[ui5-test-generic]")
			.as("testGeneric")
			.then($testGeneric => {
				$testGeneric.text("test");

				return $testGeneric
			})
			.then($testGeneric => {
				cy.spy($testGeneric.get(0), "onInvalidation").as("invalidations")
			})

		cy.get("@invalidations")
			.should("have.not.been.called")

		cy.get("@testGeneric")
			.then($testGeneric => {
				$testGeneric.get(0).childNodes[0].nodeValue = "test2";
			})

		cy.get("@invalidations")
			.should("have.been.called")
	});

	it("Tests that multiple invalidations result in a single rendering", () => {
		cy.mount(html`<ui5-test-generic></ui5-test-generic>`)

		cy.get("[ui5-test-generic]")
			.as("testGeneric")

		cy.get("@testGeneric")
			.then($testGeneric => {
				cy.spy($testGeneric.get(0), "onInvalidation").as("invalidations")

				cy.spy($testGeneric.get(0), "_render").as('rendering')
			})

		cy.get("@testGeneric")
			.invoke("prop", "strProp", "new");

		cy.get("@testGeneric")
			.invoke("prop", "strProp", "new2");

		cy.get("@invalidations")
			.should("have.been.calledTwice")

		cy.get("@rendering")
			.should("have.been.calledOnce")
	});
});