import { html } from "lit";
import "../../src/SideNavigation.js";
import "../../src/SideNavigationItem.js";
import "../../src/SideNavigationSubItem.js";

describe("Side Navigation Accessibility", () => {
	it("SideNavigationItem ariaHasPopup", () => {
		cy.mount(html`
			<ui5-side-navigation>
				<ui5-side-navigation-item id="item1" text="1"></ui5-side-navigation-item>
				<ui5-side-navigation-item id="item2" text="2" expanded>
					<ui5-side-navigation-sub-item id="childItem" text="2.1"></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
			</ui5-side-navigation>
		`);

		cy.get("#item1")
			.shadow()
			.find(".ui5-sn-item")
			.should("not.have.attr", "aria-haspopup");

		cy.get("#item1")
			.invoke("prop", "accessibilityAttributes", {
				hasPopup: "dialog",
			});

		cy.get("#item1")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-haspopup", "dialog");

		cy.get("#childItem")
			.shadow()
			.find(".ui5-sn-item")
			.should("not.have.attr", "aria-haspopup");

		cy.get("#childItem")
			.invoke("prop", "accessibilityAttributes", {
				hasPopup: "dialog",
			});

		cy.get("#childItem")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-haspopup", "dialog");
	});

	it("SideNavigationItem with sub items ariaHasPopup in collapsed SideNavigation", () => {
		cy.mount(html`
			<ui5-side-navigation id="sideNav" collapsed>
				<ui5-side-navigation-item id="item1" text="1">
					<ui5-side-navigation-sub-item id="childItem" text="1.1"></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
			</ui5-side-navigation>
		`);
		cy.get("#item1").realClick();

		// assert
		cy.get("#item1")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-haspopup", "tree");

		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-item][text='1']")
			.shadow()
			.find(".ui5-sn-item")
			.should("not.have.attr", "aria-haspopup");

		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-sub-item][text='1.1']")
			.shadow()
			.find(".ui5-sn-item")
			.should("not.have.attr", "aria-haspopup");

		// act
		cy.get("#item1")
			.invoke("prop", "accessibilityAttributes", {
				hasPopup: "dialog",
			});
		cy.get("#childItem")
			.invoke("prop", "accessibilityAttributes", {
				hasPopup: "dialog",
			});

		// reopen the popover
		cy.get("#item1").realClick().realClick();

		// assert
		cy.get("#item1")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-haspopup", "tree");

		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-item][text='1']")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-haspopup", "dialog");

		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-sub-item][text='1.1']")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-haspopup", "dialog");
	});

	it("SideNavigationItem aria-role in collapsed SideNavigation", () => {
		cy.mount(html`
			<ui5-side-navigation id="sideNav" collapsed>
				<ui5-side-navigation-item id="item" text="1"></ui5-side-navigation-item>
				<ui5-side-navigation-item id="unselectableItem" text="2" unselectable></ui5-side-navigation-item>
			</ui5-side-navigation>
		`);

		// assert
		cy.get("#item")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "role", "menuitemradio");

		cy.get("#unselectableItem")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "role", "menuitem");
	});

	it("SideNavigationItem aria-checked in collapsed SideNavigation", () => {
		cy.mount(html`
			<ui5-side-navigation id="sideNav" collapsed>
				<ui5-side-navigation-item id="item" text="1"></ui5-side-navigation-item>
				<ui5-side-navigation-item id="unselectableItem" text="2" unselectable></ui5-side-navigation-item>
			</ui5-side-navigation>
		`);

		// assert
		cy.get("#item")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-checked");

		cy.get("#unselectableItem")
			.shadow()
			.find(".ui5-sn-item")
			.should("not.have.attr", "aria-checked");
	});
});

describe("Test cy command assignment", () => {
	it("1. Tests assert with assignment of cy commands and other cy.get", () => {
		cy.mount(html`
			<ui5-side-navigation id="sideNav">
				<ui5-side-navigation-item id="item" text="1"></ui5-side-navigation-item>
				<ui5-side-navigation-item id="unselectableItem" text="2" unselectable></ui5-side-navigation-item>
				<ui5-side-navigation-item id="parentItem" text="3">
					<ui5-side-navigation-sub-item text="3.1"></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
				<ui5-side-navigation-item text="4" expanded>
					<ui5-side-navigation-sub-item id="childItem" text="4.1"></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
				<ui5-side-navigation-item id="unselectableParentItem" text="5" unselectable>
					<ui5-side-navigation-sub-item id="text9" text="5.1"></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
			</ui5-side-navigation>
		`);

		[
			{ element: cy.get("#item").shadow().find(".ui5-sn-item") },
			{ element: cy.get("#unselectableItem").shadow().find(".ui5-sn-item") },
			{ element: cy.get("#parentItem").shadow().find(".ui5-sn-item") },
			{ element: cy.get("#childItem").shadow().find(".ui5-sn-item") },
			{ element: cy.get("#unselectableParentItem").shadow().find(".ui5-sn-item") },
		].forEach(({ element }) => {
			cy.get("#sideNav").then(sideNav => {
				// something, for which cy waits
				sideNav;
			});

			element.should("have.attr", "tabindex");
		});
	});

	it("2. Tests assert with assignment of cy commands without other cy.get", () => {
		cy.mount(html`
			<ui5-side-navigation id="sideNav">
				<ui5-side-navigation-item id="item" text="1"></ui5-side-navigation-item>
				<ui5-side-navigation-item id="unselectableItem" text="2" unselectable></ui5-side-navigation-item>
				<ui5-side-navigation-item id="parentItem" text="3">
					<ui5-side-navigation-sub-item text="3.1"></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
				<ui5-side-navigation-item text="4" expanded>
					<ui5-side-navigation-sub-item id="childItem" text="4.1"></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
				<ui5-side-navigation-item id="unselectableParentItem" text="5" unselectable>
					<ui5-side-navigation-sub-item id="text9" text="5.1"></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
			</ui5-side-navigation>
		`);

		[
			{ element: cy.get("#item").shadow().find(".ui5-sn-item") },
			{ element: cy.get("#unselectableItem").shadow().find(".ui5-sn-item") },
			{ element: cy.get("#parentItem").shadow().find(".ui5-sn-item") },
			{ element: cy.get("#childItem").shadow().find(".ui5-sn-item") },
			{ element: cy.get("#unselectableParentItem").shadow().find(".ui5-sn-item") },
		].forEach(({ element }) => {
			// nothing else to wait for - always fails
			element.should("have.attr", "tabindex");
		});
	});

	it("3. Tests assert without assignment of cy commands", () => {
		cy.mount(html`
			<ui5-side-navigation id="sideNav">
				<ui5-side-navigation-item id="item" text="1"></ui5-side-navigation-item>
				<ui5-side-navigation-item id="unselectableItem" text="2" unselectable></ui5-side-navigation-item>
				<ui5-side-navigation-item id="parentItem" text="3">
					<ui5-side-navigation-sub-item text="3.1"></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
				<ui5-side-navigation-item text="4" expanded>
					<ui5-side-navigation-sub-item id="childItem" text="4.1"></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
				<ui5-side-navigation-item id="unselectableParentItem" text="5" unselectable>
					<ui5-side-navigation-sub-item id="text9" text="5.1"></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
			</ui5-side-navigation>
		`);

		[
			{ selector: "#item" },
			{ selector: "#unselectableItem" },
			{ selector: "#parentItem" },
			{ selector: "#childItem" },
			{ selector: "#unselectableParentItem" },
		].forEach(({ selector }) => {
			cy.get(selector)
				.shadow()
				.find(".ui5-sn-item")
				.should("have.attr", "tabindex");
		});
	});
});
