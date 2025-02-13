import NotificationList from "../../src/NotificationList.js";
import NotificationListGroupItem from "../../src/NotificationListGroupItem.js";
import NotificationListItem from "../../src/NotificationListItem.js";

function Sample() {
	return <NotificationList id="nl1">
		<NotificationListGroupItem
			title-text="Group 1"
			id="group1"
			growing="Button">
			<NotificationListItem id="item11" show-close>
				Group 1 Item 1
			</NotificationListItem>
			<NotificationListItem show-close>
				Group 1 Item 2
			</NotificationListItem>
			<NotificationListItem show-close>
				Group 1 Item 3
			</NotificationListItem>
			<NotificationListItem id="item1last" show-close>
				Group 1 Item 4
			</NotificationListItem>
		</NotificationListGroupItem>
		<NotificationListGroupItem
			id="group2"
			title-text="Group 2">
			<NotificationListItem id="item21" show-close>
				Group 2 Item 1
			</NotificationListItem>
			<NotificationListItem show-close>
				Group 2 Item 2
			</NotificationListItem>
			<NotificationListItem show-close>
				Group 2 Item 3
			</NotificationListItem>
			<NotificationListItem id="item2last" show-close>
				Group 2 Item 4
			</NotificationListItem>
		</NotificationListGroupItem>
		<NotificationListGroupItem
			growing="Button"
			title-text="Group 3">
			<NotificationListItem show-close>
				Group 3 Item 1
			</NotificationListItem>
			<NotificationListItem show-close>
				Group 3 Item 2
			</NotificationListItem>
			<NotificationListItem show-close>
				Group 3 Item 3
			</NotificationListItem>
			<NotificationListItem show-close>
				Group 3 Item 4
			</NotificationListItem>
		</NotificationListGroupItem>
	</NotificationList>;
}

describe("Keyboard Navigation", () => {
	beforeEach(() => {
		cy.mount(<Sample />);
	});

	it("tests ArrowUp and ArrowDown", () => {
		cy.realPress("Tab");
		cy.get("#item11").realClick();
		cy.get("#item11").should("be.focused");

		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");
		cy.get("#item1last").should("be.focused");

		cy.realPress("ArrowDown");
		cy.get("#group1")
			.shadow()
			.find("[ui5-notification-group-list]")
			.shadow()
			.find("[ui5-busy-indicator] .ui5-growing-button-inner")
			.should("be.focused");

		cy.realPress("ArrowDown");
		cy.get("#group2").should("be.focused");

		cy.realPress("ArrowDown");
		cy.get("#item21").should("be.focused");

		cy.realPress("ArrowUp");
		cy.get("#group2").should("be.focused");

		cy.realPress("ArrowUp");
		cy.get("#group1")
			.shadow()
			.find("[ui5-notification-group-list]")
			.shadow()
			.find("[ui5-busy-indicator] .ui5-growing-button-inner")
			.should("be.focused");

		cy.realPress("ArrowUp");
		cy.get("#item1last").should("be.focused");
	});

	it("tests Home and End", () => {
		cy.realPress("Tab");
		cy.get("#item11").realClick();
		cy.get("#item11").should("be.focused");

		cy.realPress("End");
		cy.get("#item1last").should("be.focused");

		cy.realPress("End");
		cy.get("#group1")
			.shadow()
			.find("[ui5-notification-group-list]")
			.shadow()
			.find("[ui5-busy-indicator] .ui5-growing-button-inner")
			.should("be.focused");

		cy.realPress("End");
		cy.get("#group1")
			.shadow()
			.find("[ui5-notification-group-list]")
			.shadow()
			.find("[ui5-busy-indicator] .ui5-growing-button-inner")
			.should("be.focused");

		cy.realPress("ArrowDown");
		cy.realPress("End");
		cy.get("#item2last").should("be.focused");

		cy.realPress("End");
		cy.get("#item2last").should("be.focused");

		cy.realPress("Home");
		cy.realPress("ArrowUp");
		cy.get("#group2").should("be.focused");

		cy.realPress("ArrowUp");
		cy.realPress("Home");
		cy.get("#item11").should("be.focused");

		cy.realPress("Home");
		cy.get("#item11").should("be.focused");
	});
});
