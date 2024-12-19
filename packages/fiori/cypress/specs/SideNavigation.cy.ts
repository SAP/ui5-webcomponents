import { html } from "lit";
import "../../src/SideNavigation.js";
import "../../src/SideNavigationItem.js";
import "../../src/SideNavigationSubItem.js";

const sample = html` <ui5-side-navigation>
	<ui5-side-navigation-item
		id="item1"
		text="Home"
		icon="home"
		tooltip="Home tooltip"
	></ui5-side-navigation-item>
	<ui5-side-navigation-item id="item2" text="People" icon="group">
		<ui5-side-navigation-sub-item
			id="item21"
			text="From My Team"
			icon="employee-approvals"
			tooltip="From My Team tooltip"
		></ui5-side-navigation-sub-item>
		<ui5-side-navigation-sub-item
			id="item22"
			text="From Other Teams"
			icon="employee-rejections"
		></ui5-side-navigation-sub-item>
	</ui5-side-navigation-item>
</ui5-side-navigation>`;

describe("Side Navigation interaction", () => {
	it("Tests that expand works", () => {
		cy.mount(sample);

		// act
		cy.get("#item2").shadow().find(".ui5-sn-item-toggle-icon").realClick();

		// assert
		cy.get("#item2").should("have.attr", "expanded");
	});
});
