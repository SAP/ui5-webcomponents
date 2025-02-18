import ShellBar from "../../src/ShellBar.js";
import ShellBarItem from "../../src/ShellBarItem.js";
import activities from "@ui5/webcomponents-icons/dist/activities.js";
import navBack from "@ui5/webcomponents-icons/dist/nav-back.js";
import sysHelp from "@ui5/webcomponents-icons/dist/sys-help.js";
import da from "@ui5/webcomponents-icons/dist/da.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Switch from "@ui5/webcomponents/dist/Switch.js";

const RESIZE_THROTTLE_RATE = 300; // ms

describe("Responsiveness", () => {
	function basicTemplate() {
		return <ShellBar
			id="shellbar"
			primaryTitle="Product Title"
			secondaryTitle="Solution name"
			notificationsCount="99+"
			showNotifications={true}
			showProductSwitch={true}
		>
			{/* <ToggleButton id="assistant" icon={da} slot="assistant" text="Button3"></ToggleButton> */}
			<ToggleButton id="assistant" icon={da} slot="assistant">Button3</ToggleButton>

			<Avatar slot="profile">
				<img src="https://sdk.openui5.org/test-resources/sap/f/images/Woman_avatar_01.png" />
			</Avatar>

			<img slot="logo" src="https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg"/>

			<Button icon={navBack} slot="startButton" id="start-button"></Button>

			<ShellBarItem id="disc" icon={activities} text="Disconnect"></ShellBarItem>
			<ShellBarItem id="call" icon={sysHelp} text="Incoming Calls"></ShellBarItem>

			<Input placeholder="Instructions" slot="searchField" showSuggestions={true} valueState="Information">
				<div slot="valueStateMessage">Instructions</div>
			</Input>

			<Switch design="Textual" textOn="PR0" textOff="PR0" slot="startContent"></Switch>
			{/* <ToggleButton slot="endContent" text="PR2" data-hide-order="2">PR2</ToggleButton> */}
			<ToggleButton slot="endContent" data-hide-order="2">PR2</ToggleButton>
		</ShellBar>;
	}

	function templateWithMenuItems() {
		return <ShellBar
			id="shellbar"
			primaryTitle="Product Title"
			secondaryTitle="Solution name"
			notificationsCount="99+"
			showNotifications={true}
			showProductSwitch={true}
		>
			<ToggleButton icon={da} slot="assistant"></ToggleButton>
			<ListItemStandard id="menu-item-1" slot="menuItems" data-key="key1">Application 1</ListItemStandard>
			<ListItemStandard id="menu-item-2" slot="menuItems" data-key="key2">Application 2</ListItemStandard>
			<ListItemStandard slot="menuItems" data-key="key3">Application 3</ListItemStandard>
			<ListItemStandard slot="menuItems" data-key="key4">Application 4</ListItemStandard>
			<ListItemStandard slot="menuItems" data-key="key5">Application 5</ListItemStandard>
			<Avatar slot="profile">
				<img src="https://sdk.openui5.org/test-resources/sap/f/images/Woman_avatar_01.png" />
			</Avatar>

			<img slot="logo" src="https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg"/>

			<Button icon={navBack} slot="startButton" id="start-button"></Button>

			<ShellBarItem id="disc" icon={activities} text="Disconnect"></ShellBarItem>
			<ShellBarItem id="call" icon={sysHelp} text="Incoming Calls"></ShellBarItem>

			<Input placeholder="Instructions" slot="searchField" showSuggestions={true} valueState="Information">
				<div slot="valueStateMessage">Instructions</div>
			</Input>
		</ShellBar>;
	}

	function templateWithOnlyOneAction() {
		return <ShellBar
			id="shellbar"
			primaryTitle="Product Title"
			secondaryTitle="Solution name"
			notificationsCount="99+"
			showNotifications={true}
			showProductSwitch={true}
		>
			<img slot="logo" src="https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg"/>
		</ShellBar>;
	}
	beforeEach(() => {
		cy.mount(basicTemplate()).as("html");

		// breakpoints are set on resize event
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(RESIZE_THROTTLE_RATE);

		cy.get("#shellbar")
			.as("shellbar");
	});

	it("tests XL Breakpoint 1920px", () => {
		cy.viewport(1920, 1080);

		cy.get("@shellbar").should("have.prop", "breakpointSize", "XL");

		cy.get("@shellbar").find("ui5-toggle-button[slot='assistant']").as("assistant");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-overflow-button").as("overflowButton");
		cy.get("@shellbar").find("ui5-button[slot='startButton']").as("backButton");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-title").as("primaryTitle");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-secondary-title").as("secondaryTitle");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-custom-item").as("customActionIcon1");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-bell-button").as("notificationsIcon");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-image-button").as("profileIcon");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-button-product-switch").as("productSwitchIcon");

		cy.get("@assistant").should("be.visible");
		cy.get("@overflowButton").should("not.be.visible");
		cy.get("@backButton").should("be.visible");
		cy.get("@primaryTitle").should("be.visible");
		cy.get("@secondaryTitle").should("be.visible");
		cy.get("@customActionIcon1").should("be.visible");
		cy.get("@notificationsIcon").should("be.visible");
		cy.get("@profileIcon").should("be.visible");
		cy.get("@productSwitchIcon").should("be.visible");
	});

	it("tests M Breakpoint and overflow 500px", () => {
		cy.viewport(500, 1680);

		cy.get("@shellbar").shadow().find(".ui5-shellbar-overflow-button").as("overflowButton");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-search-button").as("searchIcon");

		cy.get("@searchIcon").should("be.visible");
		cy.get("@overflowButton").should("be.visible");
	});

	it("tests XL Breakpoint 1820px", () => {
		cy.viewport(1820, 1680);

		cy.get("@shellbar").should("have.prop", "breakpointSize", "L");
	});

	it("tests L Breakpoint 1400px", () => {
		cy.viewport(1400, 1680);

		cy.get("@shellbar").should("have.prop", "breakpointSize", "L");

		cy.get("@shellbar").find("ui5-toggle-button[slot='assistant']").as("assistant");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-overflow-button").as("overflowButton");
		cy.get("@shellbar").find("ui5-button[slot='startButton']").as("backButton");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-title").as("primaryTitle");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-secondary-title").as("secondaryTitle");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-search-button").as("searchIcon");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-custom-item").as("customActionIcon1");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-bell-button").as("notificationsIcon");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-image-button").as("profileIcon");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-button-product-switch").as("productSwitchIcon");

		cy.get("@assistant").should("be.visible");
		cy.get("@overflowButton").should("not.be.visible");
		cy.get("@backButton").should("be.visible");
		cy.get("@primaryTitle").should("be.visible");
		cy.get("@secondaryTitle").should("be.visible");
		cy.get("@searchIcon").should("be.visible");
		cy.get("@customActionIcon1").should("be.visible");
		cy.get("@notificationsIcon").should("be.visible");
		cy.get("@profileIcon").should("be.visible");
		cy.get("@productSwitchIcon").should("be.visible");
	});

	it("tests M Breakpoint 870px", () => {
		cy.viewport(870, 1680);

		cy.get("@shellbar").should("have.prop", "breakpointSize", "M");

		cy.get("@shellbar").find("ui5-toggle-button[slot='assistant']").as("assistant");
		cy.get("@shellbar").find("ui5-button[slot='startButton']").as("backButton");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-title").as("primaryTitle");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-search-button").as("searchIcon");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-bell-button").as("notificationsIcon");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-image-button").as("profileIcon");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-button-product-switch").as("productSwitchIcon");

		cy.get("@assistant").should("be.visible");
		cy.get("@backButton").should("be.visible");
		cy.get("@primaryTitle").should("be.visible");
		cy.get("@searchIcon").should("be.visible");
		cy.get("@notificationsIcon").should("be.visible");
		cy.get("@profileIcon").should("be.visible");
		cy.get("@productSwitchIcon").should("be.visible");
	});

	it("tests S Breakpoint and overflow 510px", () => {
		cy.viewport(510, 1680);

		cy.get("@shellbar").should("have.prop", "breakpointSize", "S");

		cy.get("@shellbar").find("[slot='assistant']").as("assistant");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-overflow-button").as("overflowButton");
		cy.get("@shellbar").find("ui5-button[slot='startButton']").as("backButton");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-search-button").as("searchIcon");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-bell-button").as("notificationsIcon");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-image-button").as("profileIcon");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-button-product-switch").as("productSwitchIcon");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-overflow-popover").as("overflowPopover");

		cy.get("@assistant").should("be.visible");
		cy.get("@overflowButton").should("be.visible");
		cy.get("@backButton").should("be.visible");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-title").should("not.exist");
		cy.get("@shellbar").shadow().find(".ui5-shellbar-secondary-title").should("not.exist");
		cy.get("@searchIcon").should("be.visible");
		cy.get("@notificationsIcon").should("be.visible");
		cy.get("@profileIcon").should("be.visible");
		cy.get("@productSwitchIcon").should("be.visible");

		cy.get("@overflowPopover").find("ui5-li").should("have.length", 2);
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
		cy.mount(templateWithMenuItems()).as("html1");

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
		cy.mount(templateWithOnlyOneAction()).as("html1");

		cy.get("html").viewport("iphone-6");
		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-overflow-button")
			.should("be.hidden");
	});
});
