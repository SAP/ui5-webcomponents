import SideNavigation from "../../src/SideNavigation.js";
import SideNavigationItem from "../../src/SideNavigationItem.js";
import SideNavigationSubItem from "../../src/SideNavigationSubItem.js";
import group from "@ui5/webcomponents-icons/dist/group.js";

describe("Side Navigation Rendering", () => {
	it("Tests rendering in collapsed mode", () => {
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem text="1" id="parentItem">
					<SideNavigationSubItem text="1.1" />
					<SideNavigationSubItem text="1.2" design="Action" />
				</SideNavigationItem>
				<SideNavigationItem text="2" id="parentItem2" design="Action">
					<SideNavigationSubItem text="2.1" />
				</SideNavigationItem>
			</SideNavigation>
		);

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
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem text="dummy item"></SideNavigationItem>
				<SideNavigationItem text="1" design="Action"></SideNavigationItem>
				<SideNavigationItem text="2" href="https://sap.com" target="_blank" design="Action"></SideNavigationItem>
				<SideNavigationItem text="3">
					<SideNavigationSubItem text="3.1" design="Action"></SideNavigationSubItem>
				</SideNavigationItem>
			</SideNavigation>
		);

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
		cy.mount(
			<SideNavigation>
				<SideNavigationItem id="item1" text="1" icon={group}>
					<SideNavigationSubItem text="1.1" />
					<SideNavigationSubItem text="1.2" />
				</SideNavigationItem>
			</SideNavigation>
		);

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
		cy.mount(
			<SideNavigation>
				<SideNavigationItem id="item1" text="1" unselectable={true}>
					<SideNavigationSubItem text="2" />
				</SideNavigationItem>
			</SideNavigation>
		);

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
		cy.mount(
			<SideNavigation>
				<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
				<SideNavigationItem id="unselectableItem" text="1" unselectable={true}>
					<SideNavigationSubItem text="1.2" />
				</SideNavigationItem>
			</SideNavigation>
		);

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

	it("Tests expanding and collapsing of unselectable parent item when SideNavigation is collapsed", () => {
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem id="item1" text="1" unselectable={true}>
					<SideNavigationSubItem text="1.1"></SideNavigationSubItem>
				</SideNavigationItem>
			</SideNavigation>
		);

		// act
		cy.get("#item1").realClick();

		// assert
		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-item][text='1']")
			.should("have.attr", "expanded");

		// assert
		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-item][text='1']")
			.realClick();

		// assert
		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-item][text='1']")
			.should("have.attr", "expanded");
	});

	it("Tests isSelectable", () => {
		cy.mount(
			<SideNavigation>
				<SideNavigationItem id="item1" text="1" />
				<SideNavigationItem id="item2" text="2" disabled />
				<SideNavigationItem id="item3" text="3" design="Action" />
				<SideNavigationItem id="item4" text="4" href="https://sap.com" />
				<SideNavigationItem id="item5" text="5" unselectable={true} />
				<SideNavigationItem>
					<SideNavigationSubItem id="item6" text="6" />
					<SideNavigationSubItem id="item7" text="7" unselectable={true} />
				</SideNavigationItem>
			</SideNavigation>
		);

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
		cy.mount(
			<SideNavigation id="sideNav">
				<SideNavigationItem id="item" text="1" />
				<SideNavigationItem id="unselectableItem" text="2" unselectable={true} />
				<SideNavigationItem id="parentItem" text="3">
					<SideNavigationSubItem text="3.1" />
				</SideNavigationItem>
				<SideNavigationItem text="4" expanded={true}>
					<SideNavigationSubItem id="childItem" text="4.1" />
				</SideNavigationItem>
				<SideNavigationItem id="unselectableParentItem" text="5" unselectable={true}>
					<SideNavigationSubItem id="text9" text="5.1" />
				</SideNavigationItem>
			</SideNavigation>
		);

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
		cy.mount(
			<SideNavigation id="sideNav">
				<SideNavigationItem id="item" text="1" />
				<SideNavigationItem id="unselectableItem" text="2" unselectable={true} />
				<SideNavigationItem id="parentItem" text="3">
					<SideNavigationSubItem text="3.1" />
				</SideNavigationItem>
				<SideNavigationItem text="4" expanded={true}>
					<SideNavigationSubItem id="childItem" text="4.1" />
				</SideNavigationItem>
				<SideNavigationItem id="unselectableParentItem" text="5" unselectable={true}>
					<SideNavigationSubItem id="text9" text="5.1" />
				</SideNavigationItem>
			</SideNavigation>
		);

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
		cy.mount(
			<SideNavigation id="sideNav">
				<SideNavigationItem id="item" text="1" />
				<SideNavigationItem id="unselectableItem" text="2" unselectable={true} />
				<SideNavigationItem id="parentItem" text="3">
					<SideNavigationSubItem text="3.1" />
				</SideNavigationItem>
				<SideNavigationItem text="4" expanded={true}>
					<SideNavigationSubItem id="childItem" text="4.1" />
				</SideNavigationItem>
				<SideNavigationItem id="unselectableParentItem" text="5" unselectable={true}>
					<SideNavigationSubItem id="text9" text="5.1" />
				</SideNavigationItem>
			</SideNavigation>
		);

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
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem text="1" />
				<SideNavigationItem id="parentItem" text="2">
					<SideNavigationSubItem text="2.1" />
					<SideNavigationSubItem text="2.2" unselectable={true} />
				</SideNavigationItem>
			</SideNavigation>
		);

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
		cy.mount(
			<SideNavigation>
				<SideNavigationItem id="item1" text="1" />
				<SideNavigationItem id="item2" text="2" expanded={true}>
					<SideNavigationSubItem id="childItem" text="2.1" />
				</SideNavigationItem>
			</SideNavigation>
		);

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
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem id="item1" text="1">
					<SideNavigationSubItem id="childItem" text="1.1" />
				</SideNavigationItem>
			</SideNavigation>
		);
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
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem id="item" text="1"></SideNavigationItem>
				<SideNavigationItem id="parentItem" text="2">
					<SideNavigationSubItem id="childItem" text="2.1"></SideNavigationSubItem>
				</SideNavigationItem>
			</SideNavigation>
		);

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
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem id="item" text="1" />
				<SideNavigationItem id="unselectableItem" text="2" unselectable={true} />
			</SideNavigation>
		);

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
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem id="item" text="1" />
				<SideNavigationItem id="unselectableItem" text="2" unselectable={true} />
			</SideNavigation>
		);

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
