import { html } from "lit";
import "../../src/List.js";
import "../../src/ListItemStandard.js";
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
			<ui5-list growing="Button">
				<ui5-li>Laptop Lenovo</ui5-li>
				<ui5-li>IPhone 3</ui5-li>
				<ui5-li>HP Monitor 24</ui5-li>
			</ui5-list>
		`);

		cy.get("[ui5-list]")
			.as("list");

		// Click the last item to set focus
		cy.get("@list")
			.find("ui5-li")
			.last()
			.click();

		// Verify the last item is focused
		cy.get("@list")
			.find("ui5-li")
			.last()
			.should("be.focused");

		// Press arrow down once to move focus to the growing button
		cy.realPress("ArrowDown");

		// Verify the growing button is focused
		cy.get("@list")
			.shadow()
			.find("[id$='growing-btn']")
			.should("be.focused");

		// Arrow up once to move focus back to the last item
		cy.realPress("ArrowUp");

		// Verify the last item is focused
		cy.get("@list")
			.find("ui5-li")
			.last()
			.should("be.focused");
	});

	it("Home key on growing button moves focus to first item", () => {
		cy.mount(html`
			<ui5-list growing="Button">
				<ui5-li>Laptop Lenovo</ui5-li>
				<ui5-li>IPhone 3</ui5-li>
				<ui5-li>HP Monitor 24</ui5-li>
			</ui5-list>
		`);

		cy.get("[ui5-list]")
			.as("list");

		// Click the growing button to set focus
		cy.get("@list")
			.shadow()
			.find("[id$='growing-btn']")
			.click();

		// Wait for the growing button to be focused
		cy.get("@list")
			.shadow()
			.find("[id$='growing-btn']")
			.should("be.focused");

		// Press Home key to move focus to the first item
		cy.realPress("Home");

		// Verify the first item is focused
		cy.get("@list")
			.find("ui5-li")
			.first()
			.should("be.focused");
	});

	it("End key navigation moves focus from first item to last item and then to growing button", () => {
		cy.mount(html`
			<ui5-list growing="Button">
				<ui5-li>Laptop Lenovo</ui5-li>
				<ui5-li>IPhone 3</ui5-li>
				<ui5-li>HP Monitor 24</ui5-li>
			</ui5-list>
		`);

		cy.get("[ui5-list]")
			.as("list");

		// Click the first item to set focus
		cy.get("@list")
			.find("ui5-li")
			.first()
			.click();

		// Wait for the first item to be focused
		cy.get("@list")
			.find("ui5-li")
			.first()
			.should("be.focused");

		// Press End key to move focus to the last item
		cy.realPress("End");

		// Verify the last item is focused
		cy.get("@list")
			.find("ui5-li")
			.last()
			.should("be.focused");

		// Press End key again to move focus to the growing button
		cy.realPress("End");

		// Verify the growing button is focused
		cy.get("@list")
			.shadow()
			.find("[id$='growing-btn']")
			.should("be.focused");
	});
});
