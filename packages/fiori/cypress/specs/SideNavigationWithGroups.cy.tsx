import SideNavigation from "../../src/SideNavigation.js";
import SideNavigationGroup from "../../src/SideNavigationGroup.js";
import SideNavigationItem from "../../src/SideNavigationItem.js";

describe("Component Behavior", () => {
	describe("Main functionality", async () => {
		it("rendering", async () => {
			cy.mount(
				<SideNavigation style="height: 90vh; " id="sn1" collapsed={false}>
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

		it("Tests that visualization is correct when two groups are next to each other", async () => {
			cy.mount(
				<SideNavigation id="sn1" collapsed={false}>
					<SideNavigationGroup id="group1" text="Group 1">
						<SideNavigationItem text="Item 1.1" icon="group"></SideNavigationItem>
					</SideNavigationGroup>
					<SideNavigationGroup id="group2" text="Group 2">
						<SideNavigationItem text="Item 2.1" icon="locate-me" selected></SideNavigationItem>
					</SideNavigationGroup>
					<SideNavigationItem text="Item" icon="locate-me"></SideNavigationItem>
					<SideNavigationGroup id="group3" text="Group 3">
						<SideNavigationItem text="Item 3.1" icon="locate-me"></SideNavigationItem>
					</SideNavigationGroup>
				</SideNavigation>	
			);
		
			cy.get("#group2")
				.should("have.prop", "belowGroup", true);

			cy.get("#group2")
				.shadow()
				.find(".ui5-sn-item-separator").eq(0)
				.should("not.be.visible");

			cy.get("#group3")
				.should("have.prop", "belowGroup", false);
			
			cy.get("#group3")
				.shadow()
				.find(".ui5-sn-item-separator").eq(0)
				.should("be.visible");
		});

		it("collapse/expand", async () => {
			cy.mount(
				<SideNavigation style="height: 90vh; " id="sn1">
					<SideNavigationGroup id="group1" expanded text="Group">
						<SideNavigationItem text="Home 1"
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
		});
	});
});
