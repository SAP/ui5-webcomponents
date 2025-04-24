import SideNavigation from "../../src/SideNavigation.js";
import SideNavigationGroup from "../../src/SideNavigationGroup.js";
import SideNavigationItem from "../../src/SideNavigationItem.js";

describe("Component Behavior", () => {
	describe("Main functionality", () => {
		it("rendering", () => {
			cy.mount(
				<SideNavigation style="height: 90vh; " id="sn1" collapsed={false}>
					<SideNavigationItem text="Item" />
					<SideNavigationGroup id="group1" expanded text="Group">
						<SideNavigationItem text="Home 1"
							icon="home"
							href="#home"
							title="Home tooltip" />
					</SideNavigationGroup>
				</SideNavigation>);

			cy.get("#group1")
				.shadow()
				.find(".ui5-sn-item")
				.should("exist");

			cy.get("#sn1").invoke("prop", "collapsed", true);

			cy.get("#group1")
				.shadow()
				.find(".ui5-sn-item")
				.should("not.exist");
		});

		it("collapse/expand", () => {
			cy.mount(
				<SideNavigation style="height: 90vh; " id="sn1">
					<SideNavigationItem text="Item" />
					<SideNavigationGroup id="group1" expanded text="Group">
						<SideNavigationItem text="Home 1"
							icon="home"
							href="#home"
							title="Home tooltip" />
					</SideNavigationGroup>
					<SideNavigationItem text="Item" />
					<SideNavigationGroup id="group2" disabled text="Group">
						<SideNavigationItem text="Home 2"
							icon="home"
							href="#home"
							title="Home tooltip" />
					</SideNavigationGroup>
				</SideNavigation>);

			cy.get("#group1").should("have.prop", "expanded", true);

			cy.get("#group1")
				.shadow()
				.find(".ui5-sn-item")
				.realClick();
			cy.get("#group1").should("have.prop", "expanded", false);

			cy.get("#group1")
				.shadow()
				.find(".ui5-sn-item")
				.realClick();
			cy.get("#group1").should("have.prop", "expanded", true);

			cy.get("#group2")
				.shadow()
				.find(".ui5-sn-item")
				.realClick();
			cy.get("#group2").should("not.have.prop", "expanded");
		});
		
	});
});
