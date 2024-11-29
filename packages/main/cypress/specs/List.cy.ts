import { html } from "lit";
import "../../src/List.js";
import type List from "../../src/List.js";

describe("List Tests", () => {
	it("tests 'loadMore' event fired upon infinite scroll", () => {
		cy.mount(html`
		<ui5-list style="height: 300px;"  growing="Scroll">
			<ui5-li>Laptop Lenovo</ui5-li>
			<ui5-li>IPhone 3</ui5-li>
			<ui5-li>HP Monitor 24</ui5-li>
			<ui5-li>Audio cabel</ui5-li>
			<ui5-li>DVD set</ui5-li>
			<ui5-li>HP Monitor 24</ui5-li>
			<ui5-li>Audio cabel</ui5-li>
			<ui5-li id="lastItem">Last Item</ui5-li>
		</ui5-list>`);

		cy.get("[ui5-list]")
			.as("list");

		cy.get<List>("@list")
			.then(list => {
				list.get(0).addEventListener("ui5-load-more", cy.stub().as("loadMore"));
			})
			.shadow()
			.find(".ui5-list-scroll-container")
			.as("scrollContainer")
			.scrollTo("bottom", { duration: 100 });

		cy.get("@loadMore")
			.should("have.been.calledOnce");
	});

	it("Arrow down and up navigation between last item and growing button", () => {
		cy.mount(html`
		<ui5-list id="infiniteScrollEx2" growing="Button">
			<ui5-li>Laptop Lenovo</ui5-li>
			<ui5-li>IPhone 3</ui5-li>
			<ui5-li>HP Monitor 24</ui5-li>
			<ui5-li id="lastItem">Last Item</ui5-li>
		</ui5-list>
		`);

		cy.get("#lastItem")
			.shadow()
			.find("li[role='listitem']")
			.invoke("attr", "tabindex", "0")
			.focus();

		cy.get("#infiniteScrollEx2")
			.realPress("ArrowDown");

		cy.get("#infiniteScrollEx2")
			.shadow()
			.find("[id$=\"growing-btn\"]")
			.should("be.focused");

		cy.get("#infiniteScrollEx2")
			.realPress("ArrowUp");

		cy.get("#lastItem")
			.should("be.focused");
	});

	it("Home key on growing button moves focus to first item", () => {
		cy.mount(html`
		<ui5-list id="infiniteScrollEx2" growing="Button">
			<ui5-li id="firstItem">Laptop Lenovo</ui5-li>
			<ui5-li>IPhone 3</ui5-li>
			<ui5-li>HP Monitor 24</ui5-li>
			<ui5-li id="lastItem">Last Item</ui5-li>
		</ui5-list>
		`);

		cy.get("#infiniteScrollEx2")
			.shadow()
			.find("[id$=\"growing-btn\"]")
			.focus();

		cy.get("#infiniteScrollEx2")
			.realPress("Home");

		cy.get("#firstItem")
			.should("be.focused");
	});

	it("End key navigation moves focus from first item to last item and then to growing button", () => {
		cy.mount(html`
		<ui5-list id="infiniteScrollEx2" growing="Button">
			<ui5-li id="firstItem">Laptop Lenovo</ui5-li>
			<ui5-li>IPhone 3</ui5-li>
			<ui5-li>HP Monitor 24</ui5-li>
			<ui5-li id="lastItem">Last Item</ui5-li>
		</ui5-list>
		`);

		cy.get("#firstItem")
			.shadow()
			.find("li[role='listitem']")
			.invoke("attr", "tabindex", "0")
			.focus();

		cy.get("#infiniteScrollEx2")
			.realPress("End");

		cy.get("#lastItem")
			.should("be.focused");

		cy.get("#infiniteScrollEx2")
			.realPress("End");

		cy.get("#infiniteScrollEx2")
			.shadow()
			.find("[id$='growing-btn']")
			.should("be.focused");
	});
});
