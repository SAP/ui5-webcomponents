import { html } from "lit";
import "../../src/List.js";
import "../../src/ListItemCustom.js";
import type List from "../../src/List.js";

describe("List Tests", () => {
	it("tests 'item-click' event", () => {
		cy.mount(html`
			<ui5-list class="rootList">
				<ui5-li class="firstItem">Laptop Lenovo</ui5-li>
				<ui5-li>IPhone 3</ui5-li>
				<ui5-li>HP Monitor 24</ui5-li>
				<ui5-li>Audio cabel</ui5-li>
				<ui5-li-custom>
					<ui5-list class="innerList">
						<ui5-li class="nestedItem">Laptop Lenovo</ui5-li>
						<ui5-li>IPhone 3</ui5-li>
					</ui5-list>
				</ui5-li-custom>
			</ui5-list>`);

		cy.get(".rootList")
			.then(list => {
				list.get(0).addEventListener("item-click", cy.stub().as("itemClicked"));
			});

		cy.get(".innerList")
			.then(list => {
				list.get(0).addEventListener("item-click", cy.stub().as("innerListItemClicked"));
			});

		cy.get(".firstItem")
			.realClick();

		cy.get("@itemClicked")
			.should("have.been.called");

		cy.get("@innerListItemClicked")
			.should("have.not.been.called");

		cy.get(".nestedItem")
			.realClick();

		cy.get("@itemClicked")
			.should("have.been.calledOnce");

		cy.get("@innerListItemClicked")
			.should("have.been.called");
	});

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
});
