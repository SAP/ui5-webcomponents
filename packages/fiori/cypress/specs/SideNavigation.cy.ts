import { html } from "lit";
import "../../src/SideNavigation.js";
import "../../src/SideNavigationItem.js";
import "../../src/SideNavigationSubItem.js";

describe("Side Navigation Rendering", () => {
	it("Tests rendering in collapsed mode", () => {
		cy.mount(html`
			<ui5-side-navigation id="sideNav" collapsed>
				<ui5-side-navigation-item text="1" id="parentItem">
					<ui5-side-navigation-sub-item text="1.1"></ui5-side-navigation-sub-item>
					<ui5-side-navigation-sub-item text="1.2" design="Action"></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
				<ui5-side-navigation-item text="2" id="parentItem2" design="Action">
					<ui5-side-navigation-sub-item text="2.1"></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
			</ui5-side-navigation>
		`);

		cy.get("#parentItem").realClick();
		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-sub-item][text='1.2']")
			.should("have.attr", "design", "Action");

		cy.get("#parentItem2").realClick();
		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-item][text='2']")
			.should("have.attr", "design", "Action");
	});

	it("Tests rendering of overflow items", () => {
		cy.mount(html`
			<ui5-side-navigation id="sideNav" collapsed>
				<ui5-side-navigation-item text="dummy item"></ui5-side-navigation-item>
				<ui5-side-navigation-item text="1" design="Action"></ui5-side-navigation-item>
				<ui5-side-navigation-item text="2" href="https://sap.com" target="_blank" design="Action"></ui5-side-navigation-item>
				<ui5-side-navigation-item text="3">
					<ui5-side-navigation-sub-item text="3.1" design="Action"></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
			</ui5-side-navigation>
		`);

		cy.get("#sideNav")
			.invoke("attr", "style", "height: 100px");

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-sn-item-overflow:not(.ui5-sn-item-hidden)")
			.realClick();

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu [ui5-navigation-menu-item][text='1']")
			.should("have.attr", "design", "Action");

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu [ui5-navigation-menu-item][text='2']")
			.should("have.attr", "design", "Action");

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu [ui5-navigation-menu-item][text='3.1']")
			.should("have.attr", "design", "Action");
	});
});

describe("Side Navigation interaction", () => {
	it("Tests expanding and collapsing of items", () => {
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

	it("Tests expanding and collapsing of unselectable items with Space and Enter", () => {
		cy.mount(html`
			<ui5-side-navigation>
				<ui5-side-navigation-item id="focusStart" text="focus start"></ui5-side-navigation-item>
				<ui5-side-navigation-item id="unselectableItem" text="1" unselectable>
					<ui5-side-navigation-sub-item text="1.2"></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
			</ui5-side-navigation>
		`);

		// act
		cy.get("#focusStart").realClick();
		cy.realPress("ArrowDown");
		cy.realPress("Space");

		// assert
		cy.get("#unselectableItem").should("be.focused").and("have.attr", "expanded");

		// act
		cy.realPress("Space");

		// assert
		cy.get("#unselectableItem").should("be.focused").and("not.have.attr", "expanded");

		// act
		cy.realPress("Enter");

		// assert
		cy.get("#unselectableItem").should("be.focused").and("have.attr", "expanded");

		// act
		cy.realPress("Enter");

		// assert
		cy.get("#unselectableItem").should("be.focused").and("not.have.attr", "expanded");
	});

	it("Tests isSelectable", () => {
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

	it("Tests 'click' event", () => {
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
			{ element: cy.get("#item"), expectedCallCount: 1 },
			{ element: cy.get("#unselectableItem"), expectedCallCount: 1 },
			{ element: cy.get("#parentItem"), expectedCallCount: 1 },
			{ element: cy.get("#childItem"), expectedCallCount: 1 },
			{ element: cy.get("#unselectableParentItem"), expectedCallCount: 1 },
			{ element: cy.get("#unselectableParentItem").shadow().find(".ui5-sn-item-toggle-icon"), expectedCallCount: 0 },
		].forEach(({ element, expectedCallCount }) => {
			cy.get("#sideNav")
				.then(sideNav => {
					sideNav.get(0).addEventListener("click", cy.stub().as("clickHandler"));
				});
			// act
			element.realClick();

			// assert
			cy.get("@clickHandler").should("have.callCount", expectedCallCount);
		});
	});

	it("Tests 'click' event with Enter and Space", () => {
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
			{ selector: "#item", expectedCallCount: 2 },
			{ selector: "#unselectableItem", expectedCallCount: 2 },
			{ selector: "#parentItem", expectedCallCount: 2 },
			{ selector: "#childItem", expectedCallCount: 2 },
			{ selector: "#unselectableParentItem", expectedCallCount: 2 },
		].forEach(({ selector, expectedCallCount }) => {
			cy.get("#sideNav")
				.then(sideNav => {
					sideNav.get(0).addEventListener("click", cy.stub().as("clickHandler"));
				});

			cy.get(selector)
				.shadow()
				.find(".ui5-sn-item")
				.as("sn-item")
				.should("have.attr", "tabindex");

			// act
			cy.get("@sn-item")
				.focus();

			cy.realPress("Space")
				.realPress("Enter");

			// assert
			cy.get("@clickHandler").should("have.callCount", expectedCallCount);
		});
	});

	it("Tests 'selection-change' event", () => {
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
			{ element: cy.get("#item"), expectedCallCount: 1 },
			{ element: cy.get("#unselectableItem"), expectedCallCount: 0 },
			{ element: cy.get("#parentItem"), expectedCallCount: 1 },
			{ element: cy.get("#childItem"), expectedCallCount: 1 },
			{ element: cy.get("#unselectableParentItem"), expectedCallCount: 0 },
			{ element: cy.get("#unselectableParentItem").shadow().find(".ui5-sn-item-toggle-icon"), expectedCallCount: 0 },
		].forEach(({ element, expectedCallCount }) => {
			cy.get("#sideNav")
				.then(sideNav => {
					sideNav.get(0).addEventListener("ui5-selection-change", cy.stub().as("selectionChangeHandler"));
				});
			// act
			element.realClick();

			// assert
			cy.get("@selectionChangeHandler").should("have.callCount", expectedCallCount);
		});
	});

	it("Tests 'selection-change' event when SideNavigation is collapsed", () => {
		cy.mount(html`
			<ui5-side-navigation id="sideNav" collapsed>
				<ui5-side-navigation-item text="1"></ui5-side-navigation-item>
				<ui5-side-navigation-item id="parentItem" text="2">
					<ui5-side-navigation-sub-item text="2.1"></ui5-side-navigation-sub-item>
					<ui5-side-navigation-sub-item text="2.2" unselectable></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
			</ui5-side-navigation>
		`);

		cy.get("#parentItem").realClick();
		[
			{
				element: cy.get("#sideNav").shadow().find("[ui5-responsive-popover] [ui5-side-navigation-item][text='2']").shadow()
					.find(".ui5-sn-item"),
				expectedCallCount: 1,
			},
			{
				element: cy.get("#sideNav").shadow().find("[ui5-responsive-popover] [ui5-side-navigation-sub-item][text='2.1']"),
				expectedCallCount: 1,
			},
			{
				element: cy.get("#sideNav").shadow().find("[ui5-responsive-popover] [ui5-side-navigation-sub-item][text='2.2']"),
				expectedCallCount: 0,
			},
		].forEach(({ element, expectedCallCount }) => {
			cy.get("#sideNav")
				.then(sideNav => {
					sideNav.get(0).addEventListener("ui5-selection-change", cy.stub().as("selectionChangeHandler"));
				});

			// act
			cy.get("#parentItem").realClick();
			element.realClick();

			// assert
			cy.get("@selectionChangeHandler").should("have.callCount", expectedCallCount);
		});
	});
});

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

	it("SideNavigationItem ariaHasPopup in overflow", () => {
		cy.mount(html`
			<ui5-side-navigation id="sideNav" collapsed>
				<ui5-side-navigation-item id="item" text="1"></ui5-side-navigation-item>
				<ui5-side-navigation-item id="parentItem" text="2">
					<ui5-side-navigation-sub-item id="childItem" text="2.1"></ui5-side-navigation-sub-item>
				</ui5-side-navigation-item>
			</ui5-side-navigation>
		`);

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu")
			.as("overflowMenu");

		cy.get("#sideNav")
			.invoke("attr", "style", "height: 100px");

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-sn-item-overflow:not(.ui5-sn-item-hidden)")
			.realClick();

		// assert
		cy.get("@overflowMenu")
			.find("[ui5-navigation-menu-item][text='1']")
			.shadow()
			.find(".ui5-navigation-menu-item-root")
			.should("not.have.attr", "aria-haspopup");

		cy.get("@overflowMenu")
			.find("[ui5-navigation-menu-item][text='2']")
			.shadow()
			.find(".ui5-navigation-menu-item-root")
			.should("have.attr", "aria-haspopup", "menu");

		cy.get("@overflowMenu")
			.find("[ui5-navigation-menu-item][text='2.1']")
			.shadow()
			.find(".ui5-navigation-menu-item-root")
			.should("not.have.attr", "aria-haspopup");

		// act
		cy.get("#item")
			.invoke("prop", "accessibilityAttributes", {
				hasPopup: "dialog",
			});

		cy.get("#parentItem")
			.invoke("prop", "accessibilityAttributes", {
				hasPopup: "dialog",
			});

		cy.get("#childItem")
			.invoke("prop", "accessibilityAttributes", {
				hasPopup: "dialog",
			});

		// assert
		cy.get("@overflowMenu")
			.find("[ui5-navigation-menu-item][text='1']")
			.shadow()
			.find(".ui5-navigation-menu-item-root")
			.should("have.attr", "aria-haspopup", "dialog");

		cy.get("@overflowMenu")
			.find("[ui5-navigation-menu-item][text='2']")
			.shadow()
			.find(".ui5-navigation-menu-item-root")
			.should("have.attr", "aria-haspopup", "menu");

		cy.get("@overflowMenu")
			.find("[ui5-navigation-menu-item][text='2.1']")
			.shadow()
			.find(".ui5-navigation-menu-item-root")
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
