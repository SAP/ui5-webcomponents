import { html } from "lit";
import "@ui5/webcomponents-icons/dist/activities.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/da.js";
import "@ui5/webcomponents/dist/ToggleButton.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Switch.js";
import "@ui5/webcomponents/dist/Tag.js";
import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";
import "@ui5/webcomponents/dist/SuggestionItem.js";
import "@ui5/webcomponents/dist/SuggestionItemCustom.js";
import "@ui5/webcomponents/dist/SuggestionItemGroup.js";
import "@ui5/webcomponents/dist/List.js";
import "../../src/ShellBar.js";
import "../../src/ShellBarItem.js";

describe("Responsiveness", () => {
	const basicTemplate = html`
	<ui5-shellbar
			id="shellbar"
			primary-title="Product Title"
			secondary-title="Solution name"
			notifications-count="99+"
			show-notifications
			show-product-switch
	>

		<ui5-toggle-button id="assistant" icon="sap-icon://da" slot="assistant" text="Button3"></ui5-toggle-button>

		<ui5-avatar slot="profile">
			<img src="https://sdk.openui5.org/test-resources/sap/f/images/Woman_avatar_01.png" />
		</ui5-avatar>

		<img slot="logo" src="https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg"/>

		<ui5-button icon="nav-back" slot="startButton" id="start-button"></ui5-button>

		<ui5-shellbar-item id="disc" icon="activities" text="Disconnect"></ui5-shellbar-item>
		<ui5-shellbar-item id="call" icon="sys-help" text="Incoming Calls"></ui5-shellbar-item>

		<ui5-input placeholder="Instructions" slot="searchField" show-suggestions value-state="Information">
			<div slot="valueStateMessage">Instructions</div>
		</ui5-input>

		<ui5-switch design="Textual" text-on="PR0" text-off="PR0" slot="startContent"></ui5-switch>
		<ui5-toggle-button slot="endContent" text="PR2" data-hide-order="2">PR2</ui5-toggle-button>
	</ui5-shellbar>`;

	const templateWithMenuItems = html`
	<ui5-shellbar
			id="shellbar"
			primary-title="Product Title"
			secondary-title="Solution name"
			notifications-count="99+"
			show-notifications
			show-product-switch
	>

		<ui5-toggle-button icon="sap-icon://da" slot="assistant"></ui5-toggle-button>
		<ui5-li id="menu-item-1" slot="menuItems" data-key="key1">Application 1</ui5-li>
		<ui5-li id="menu-item-2" slot="menuItems" data-key="key2">Application 2</ui5-li>
		<ui5-li slot="menuItems" data-key="key3">Application 3</ui5-li>
		<ui5-li slot="menuItems" data-key="key4">Application 4</ui5-li>
		<ui5-li slot="menuItems" data-key="key5">Application 5</ui5-li>
		<ui5-avatar slot="profile">
			<img src="https://sdk.openui5.org/test-resources/sap/f/images/Woman_avatar_01.png" />
		</ui5-avatar>

		<img slot="logo" src="https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg"/>

		<ui5-button icon="nav-back" slot="startButton" id="start-button"></ui5-button>

		<ui5-shellbar-item id="disc" icon="activities" text="Disconnect"></ui5-shellbar-item>
		<ui5-shellbar-item id="call" icon="sys-help" text="Incoming Calls"></ui5-shellbar-item>

		<ui5-input placeholder="Instructions" slot="searchField" show-suggestions value-state="Information">
			<div slot="valueStateMessage">Instructions</div>
		</ui5-input>
	</ui5-shellbar>`;

	const templateWithOnlyOneAction = html`<ui5-shellbar
					id="shellbar"
					primary-title="Product Title"
					secondary-title="Solution name"
					notifications-count="99+"
					show-notifications
					show-product-switch
			>
				<img slot="logo" src="https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg"/>
			</ui5-shellbar>`;
	beforeEach(() => {
		cy.mount(basicTemplate).as("html");

		cy.get("#shellbar")
			.as("shellbar");
	});

	afterEach(() => {
		cy.viewport(1920, 1080);
	});

	it("tests XXL Breakpoint 1920px", () => {
		cy.viewport(1920, 1080);
		cy.get("@shellbar")
			.find("ui5-button[slot='startButton']")
			.as("backButton");

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-title")
			.as("primaryTitle");

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-secondary-title")
			.as("secondaryTitle");

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-search-button")
			.as("searchButton");

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-custom-item")
			.as("customActionIcon1");

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

		cy.get("@shellbar")
			.find("ui5-toggle-button[slot='assistant']")
			.as("assistant");

		cy.get("@backButton").should("be.visible");
		cy.get("@primaryTitle").should("be.visible");
		cy.get("@secondaryTitle").should("be.visible");
		cy.get("@customActionIcon1").should("be.visible");
		cy.get("@notificationsIcon").should("be.visible");
		cy.get("@profileIcon").should("be.visible");
		cy.get("@productSwitchIcon").should("be.visible");
		cy.get("@assistant").should("be.visible");

		cy.get("@searchButton").click();

		cy.get("@shellbar")
			.find("ui5-input[slot='searchField']")
			.as("searchField").should("be.visible");

		cy.get("@searchButton").click();
	});

	it("tests S Breakpoint 320px", () => {
		cy.get("html").viewport("iphone-x");
		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-overflow-button")
			.should("exist");
		cy.get("@shellbar")
			.shadow()
			.get("ui5-switch")
			.should("be.hidden");
	});

	it("tests items visibility in Lean mode", () => {
		cy.get("@shellbar")
			.find("ui5-button[slot='startButton']")
			.as("backButton");

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-search-button")
			.as("searchButton");

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
	});

	it("tests logo and Primary title when no menuItems are presented", () => {
		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-logo-area")
			.as("logoLink");

		cy.get("@logoLink").should("exist");
	});

	it("tests Primary title when menuItems are presented", () => {
		cy.mount(templateWithMenuItems).as("html1");

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-menu-button")
			.as("menuButton");

		cy.get("@menuButton").should("be.visible");
	});

	it("tests XXL Breakpoint Search bar", () => {
		cy.get("@shellbar").invoke("attr", "show-open-search-field", "true");
		cy.viewport(2560, 1080);
		cy.get("[slot='searchField']")
			.should("exist");
	});

	it("Test overflow button not showing, when only one action is presented", () => {
		cy.mount(templateWithOnlyOneAction).as("html1");

		cy.get("html").viewport("iphone-6");
		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-overflow-button")
			.should("be.hidden");
	});
});
