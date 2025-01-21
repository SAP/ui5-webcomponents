import { html } from "lit";
import "../../src/Input.js";
import type Input from "../../src/Input.js";
import "../../src/features/InputSuggestions.js";
import "../../src/SuggestionItem.js";
import "../../src/SuggestionItemCustom.js";
import "../../src/SuggestionItemGroup.js";

describe("Input Tests", () => {
	it("tets input event prevention", () => {
		cy.mount(html`
			<ui5-input></ui5-input>
		`);

		cy.get("[ui5-input]")
			.as("input");

		cy.get<Input>("@input")
			.then($input => {
				$input.get(0).addEventListener("input", e => {
					e.preventDefault();
					(e.target as Input).value = "test";
				});
			});

		cy.get<Input>("@input")
			.realClick();

		cy.realPress("a");

		cy.get("@input")
			.shadow()
			.find("input")
			.should("have.value", "test");
	});

	it("tests custom suggestion items tabindex", () => {
		cy.mount(html`
			<ui5-input show-suggestions>
				<ui5-suggestion-item-custom text="Item 1">Item 1</ui5-suggestion-item-custom>
				<ui5-suggestion-item-custom text="Item 2">Item 2</ui5-suggestion-item-custom>
				<ui5-suggestion-item-custom text="Item 3">Item 3</ui5-suggestion-item-custom>
			</ui5-input>
		`);

		cy.get("[ui5-input]")
			.as("input");

		cy.get<Input>("@input")
			.shadow()
			.find("input")
			.as("inner");

		cy.get("@inner").realClick();
		cy.get("@inner").type("i");
		cy.get("@inner").realPress("ArrowDown");

		cy.get("@input")
			.find("[ui5-suggestion-item-custom]")
			.shadow()
			.find("li")
			.should("not.have.attr", "tabindex", "0")
			.should("have.attr", "role", "option");
	});

	it("tests regular suggestion items tabindex", () => {
		cy.mount(html`
			<ui5-input show-suggestions>
				<ui5-suggestion-item text="Item 1"></ui5-suggestion-item>
				<ui5-suggestion-item text="Item 2"></ui5-suggestion-item>
				<ui5-suggestion-item text="Item 3"></ui5-suggestion-item>
			</ui5-input>
		`);

		cy.get("[ui5-input]")
			.as("input");

		cy.get<Input>("@input")
			.shadow()
			.find("input")
			.as("inner");

		cy.get("@inner").realClick();
		cy.get("@inner").type("i");
		cy.get("@inner").realPress("ArrowDown");

		cy.get("@input")
			.find("ui5-suggestion-item")
			.shadow()
			.find("li")
			.should("not.have.attr", "tabindex", "0")
			.should("have.attr", "role", "option");
	});

	it("tests suggestion group items tabindex", () => {
		cy.mount(html`
			<ui5-input show-suggestions>
				<ui5-suggestion-item-group header-text="Group 1">
					<ui5-suggestion-item text="Item 1"></ui5-suggestion-item>
					<ui5-suggestion-item text="Item 2"></ui5-suggestion-item>
					<ui5-suggestion-item text="Item 3"></ui5-suggestion-item>
				</ui5-suggestion-item-group>
				<ui5-suggestion-item-group header-text="Group 2">
					<ui5-suggestion-item text="Item 4"></ui5-suggestion-item>
					<ui5-suggestion-item text="Item 5"></ui5-suggestion-item>
					<ui5-suggestion-item text="Item 6"></ui5-suggestion-item>
				</ui5-suggestion-item-group>
			</ui5-input>
		`);

		cy.get("[ui5-input]")
			.as("input");

		cy.get<Input>("@input")
			.shadow()
			.find("input")
			.as("inner");

		cy.get("@inner").realClick();
		cy.get("@inner").type("i");
		cy.get("@inner").realPress("ArrowDown");

		cy.get("@input")
			.find("[ui5-suggestion-item-group]")
			.shadow()
			.find("[ui5-li-group-header]")
			.shadow()
			.find("ul")
			.should("not.have.attr", "tabindex", "0");
	});

	it("tests submit and change event order", () => {
		cy.mount(html`
			<form>
				<ui5-input />
			</form>
		`);

		cy.get("form")
			.as("form");

		cy.get("[ui5-input]")
			.as("input");

		// spy change event
		cy.get<Input>("@input")
			.then($input => {
				$input.get(0).addEventListener("change", cy.spy().as("change"));
			});

		// spy submit event and prevent it
		cy.get("@form")
			.then($form => {
				$form.get(0).addEventListener("submit", e => e.preventDefault());
				$form.get(0).addEventListener("submit", cy.spy().as("submit"));
			});

		// check if submit is triggered after change
		cy.get<Input>("@input")
			.shadow()
			.find("input")
			.type("test{enter}");

		cy.get("@change").should("have.been.calledBefore", cy.get("@submit"));
	});
});
