import SideNavigationItem from "../../src/SideNavigationItem.js";
import SideNavigation from "../../src/SideNavigation.js";
import SideNavigationSubItem from "../../src/SideNavigationSubItem.js";

import home from "@ui5/webcomponents-icons/dist/home.js";
import group from "@ui5/webcomponents-icons/dist/group.js";
import employeeApprovals from "@ui5/webcomponents-icons/dist/employee-approvals.js";
import employeeRejections from "@ui5/webcomponents-icons/dist/employee-rejections.js";

function sample() {
	return <SideNavigation>
		<SideNavigationItem
			id="item1"
			text="Home"
			icon={home}
			tooltip="Home tooltip"
		></SideNavigationItem>
		<SideNavigationItem id="item2" text="People" icon={group}>
			<SideNavigationSubItem
				id="item21"
				text="From My Team"
				icon={employeeApprovals}
				tooltip="From My Team tooltip"
			></SideNavigationSubItem>
			<SideNavigationSubItem
				id="item22"
				text="From Other Teams"
				icon={employeeRejections}
			></SideNavigationSubItem>
		</SideNavigationItem>
	</SideNavigation>;
}

describe("Side Navigation interaction", () => {
	it("Tests that expand works", () => {
		cy.mount(sample());

		// act
		cy.get("#item2").shadow().find(".ui5-sn-item-toggle-icon").realClick();

		// assert
		cy.get("#item2").should("have.attr", "expanded");
	});
});
