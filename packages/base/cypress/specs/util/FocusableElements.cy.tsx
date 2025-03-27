import { getFirstFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";
import SideNavigation from "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import SideNavigationItem from "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import SideNavigationSubItem from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Input from "@ui5/webcomponents/dist/Input.js";

describe("FocusableElements", () => {
	it("Tests first focusable element", () => {
		cy.mount(
			<>
				<div id="container">
					<Input tabindex="-1"></Input>
					<br/>
					<SideNavigation>
						<SideNavigationItem
							text="Home"
							icon="home"
							href="#home"
							title="Home tooltip"></SideNavigationItem>
						<SideNavigationItem text="People" href="#people" expanded icon="group">
							<SideNavigationSubItem
								id="subItem1"
								selected
								text="Should be Focused When Open"></SideNavigationSubItem>
							<SideNavigationSubItem text="Sub Item 2"></SideNavigationSubItem>
						</SideNavigationItem>
					</SideNavigation>
					<br/>
					<Button id="buttonId">Close</Button>
				</div>
			</>
		);

		cy.get("#subItem1")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "tabindex", "0");

		cy.get("#container").then( async ($container) => {
		   const firstFocusable = await getFirstFocusableElement($container.get(0));
		   await firstFocusable?.focus();
		});

		cy.get("#subItem1")
			.should("have.focus");
	});
});
