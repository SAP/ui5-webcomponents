import { html } from "lit";
import "../../src/SideNavigation.js";
import "../../src/SideNavigationItem.js";
import "../../src/SideNavigationSubItem.js";

describe("Side Navigation interaction", () => {
	it("Tests expanding and collapsing", () => {
		cy.mount(html`
			<ui5-side-navigation>
				<ui5-side-navigation-item id="item1" text="1" icon="group">
					<ui5-side-navigation-sub-item text="1.1"></ui5-side-navigation-sub-item>
					<ui5-side-navigation-sub-item text="1.2"></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
			</ui5-side-navigation>
		`);

		// act
		cy.get("#item1").shadow().find(".ui5-sn-item-toggle-icon").realClick();

		// assert
		cy.get("#item1").should("have.attr", "expanded");

		// act
		cy.get("#item1").shadow().find(".ui5-sn-item-toggle-icon").realClick();

		// assert
		cy.get("#item1").should("not.have.attr", "expanded");
	});

	it("Tests expanding and collapsing of unselectable items", () => {
		cy.mount(html`
			<ui5-side-navigation>
				<ui5-side-navigation-item id="item1" text="1" unselectable>
					<ui5-side-navigation-sub-item text="2"></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
			</ui5-side-navigation>
		`);

		// act
		cy.get("#item1").shadow().find(".ui5-sn-item-toggle-icon").realClick();

		// assert
		cy.get("#item1").should("have.attr", "expanded");

		// act
		cy.get("#item1").shadow().find(".ui5-sn-item-toggle-icon").realClick();

		// assert
		cy.get("#item1").should("not.have.attr", "expanded");

		// act
		cy.get("#item1").shadow().find(".ui5-sn-item-text").realClick();

		// assert
		cy.get("#item1").should("have.attr", "expanded");

		// act
		cy.get("#item1").shadow().find(".ui5-sn-item-text").realClick();

		// assert
		cy.get("#item1").should("not.have.attr", "expanded");
	});

	it("Tests #isSelectable", () => {
		cy.mount(`
			<ui5-side-navigation>
				<ui5-side-navigation-item id="item1" text="1"></ui5-side-navigation-item>
				<ui5-side-navigation-item id="item2" text="2" disabled></ui5-side-navigation-item>
				<ui5-side-navigation-item id="item3" text="3" design="Action"></ui5-side-navigation-item>
				<ui5-side-navigation-item id="item4" text="4" href="https://sap.com"></ui5-side-navigation-item>
				<ui5-side-navigation-item id="item5" text="5" unselectable></ui5-side-navigation-item>
				<ui5-side-navigation-item>
					<ui5-side-navigation-sub-item id="item6" text="6"></ui5-side-navigation-sub-item>
					<ui5-side-navigation-sub-item id="item7" text="7" unselectable></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
			</ui5-side-navigation>
		`);

		// assert
		[
			{ id: "item1", expectedIsSelectable: true },
			{ id: "item2", expectedIsSelectable: false },
			{ id: "item3", expectedIsSelectable: true },
			{ id: "item4", expectedIsSelectable: true },
			{ id: "item5", expectedIsSelectable: false },
			{ id: "item6", expectedIsSelectable: true },
			{ id: "item7", expectedIsSelectable: false },
		].forEach(({ id, expectedIsSelectable }) => {
			cy.get(`#${id}`)
				.invoke("prop", "isSelectable")
				.should("equal", expectedIsSelectable);
		});
	});
});
