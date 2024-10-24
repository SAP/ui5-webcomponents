import { html } from "lit";
import "../../src/ShellBar.js";

describe("Responsiveness", () => {
	beforeEach(() => {
		cy.mount(html`
	<ui5-shellbar
			id="shellbar"
			primary-title="Product Title"
			secondary-title="Solution name"
			notifications-count="99+"
			show-notifications
			show-product-switch
	>

		<ui5-toggle-button icon="sap-icon://da" slot="assistant"></ui5-toggle-button>

		<ui5-avatar slot="profile">
			<img src="https://sdk.openui5.org/test-resources/sap/f/images/Woman_avatar_01.png" />
		</ui5-avatar>

		<img slot="logo" src="https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg"/>

		<ui5-button icon="nav-back" slot="startButton" id="start-button"></ui5-button>

		<ui5-shellbar-item id="disc" icon="disconnected" text="Disconnect"></ui5-shellbar-item>
		<ui5-shellbar-item id="call" icon="incoming-call" text="Incoming Calls"></ui5-shellbar-item>

		<ui5-input placeholder="Instructions" slot="searchField" show-suggestions value-state="Information">
			<div slot="valueStateMessage">Instructions</div>
		</ui5-input>

		<ui5-li id="menu-item-1" slot="menuItems" data-key="key1">Application 1</ui5-li>
		<ui5-li id="menu-item-2" slot="menuItems" data-key="key2">Application 2</ui5-li>
		<ui5-li slot="menuItems" data-key="key3">Application 3</ui5-li>
		<ui5-li slot="menuItems" data-key="key4">Application 4</ui5-li>
		<ui5-li slot="menuItems" data-key="key5">Application 5</ui5-li>
	</ui5-shellbar>
`);
	});

	it("tests XXL Breakpoint 1920px", () => {
		cy.viewport(1920, 1080);

		cy.get("#shellbar")
			.as("shellbar")
			.shadow()
			.find(".ui5-shellbar-overflow-button")
			.as("overflowButton");

		cy.get("@shellbar")
			.find("ui5-button[slot='startButton']")
			.as("backButton");

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-menu-button-title")
			.as("primaryTitle");

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-secondary-title")
			.as("secondaryTitle");

		cy.get("@shellbar")
			.find("[slot='searchField']")
			.as("searchField");

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-custom-item")
			.as("customActionIcon1");

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-custom-item:nth-child(3)")
			.as("customActionIcon2");

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-bell-button")
			.as("notificationsIcon");

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-image-button")
			.as("profileIcon");

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-button-product-switch")
			.as("productSwitchIcon");

		cy.get("@overflowButton").should("not.exist");
		cy.get("@backButton").should("be.visible");
		cy.get("@primaryTitle").should("be.visible");
		cy.get("@secondaryTitle").should("be.visible");
		cy.get("@searchField").should("be.visible");
		cy.get("@customActionIcon1").should("be.visible");
		cy.get("@customActionIcon2").should("be.visible");
		cy.get("@notificationsIcon").should("be.visible");
		cy.get("@profileIcon").should("be.visible");
		cy.get("@productSwitchIcon").should("be.visible");
	});
});
