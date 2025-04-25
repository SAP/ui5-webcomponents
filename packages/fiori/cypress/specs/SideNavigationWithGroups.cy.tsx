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
			cy.get("#group1").should("not.have.prop", "expanded");

			cy.get("#group1")
				.shadow()
				.find(".ui5-sn-item")
				.realClick();
			cy.get("#group1").should("have.prop", "expanded", true);
		});
	});
});
