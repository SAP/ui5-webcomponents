import SettingItem from "../../src/SettingItem.js";
import SettingView from "../../src/SettingView.js";
import Settings from "../../src/Settings.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Text from "@ui5/webcomponents/dist/Text.js";

describe("Initial rendering", () => {
	it("tests no config provided", () => {
		cy.mount(<Settings open>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").shadow().find("[ui5-dialog]").as("dialog");
		cy.get("@dialog").should("exist");
		cy.get("@dialog").find("[ui5-toolbar]").as("toolbar");
		cy.get("@toolbar").should("exist");
		cy.get("@toolbar").find("[ui5-toolbar-button]").should("have.length", 1);
		cy.get("@dialog").find("div").should("have.class", "ui5-sd-content");
		cy.get("@dialog").find("div").should("have.class", "ui5-sd-side");
	});

	it("tests header-title provided", () => {
		cy.mount(<Settings header-title="Settings" open>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").shadow().find("[ui5-dialog]").as("dialog");
		cy.get("@dialog").should("exist");
		cy.get("@dialog").find("[ui5-title]").contains("Settings");
		cy.get("@dialog").find("[ui5-title]").should("have.length", 1);
	});

	it("tests show-search-field provided", () => {
		cy.mount(<Settings show-search-field open>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").shadow().find("[ui5-dialog]").as("dialog");
		cy.get("@dialog").should("exist");
		cy.get("@dialog").find("[ui5-input]").should("have.length", 1);
		cy.get("@dialog").find("[ui5-input]").should("have.attr", "placeholder", "Search");
	});

	it("tests setting item no config", () => {
		cy.mount(<Settings open>
			<SettingItem>
				<SettingView>
				</SettingView>
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-setting-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").find("[ui5-setting-view]").as("settingView");
		cy.get("@settingView").should("exist");
	});

	it("tests setting with button", () => {
		cy.mount(<Settings open>
			<SettingItem>
				<SettingView>
					<Button>Setting 3 Content 1</Button>
				</SettingView>
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-setting-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").find("[ui5-setting-view]").as("settingView");
		cy.get("@settingView").should("exist");
		cy.get("@settingView").find("[ui5-button]").should("have.length", 1);
		cy.get("@settingView").find("[ui5-button]").contains("Setting 3 Content 1");
	});

	it("tests setting text", () => {
		cy.mount(<Settings open>
			<SettingItem text="Setting">
				<SettingView text="Setting1">
				</SettingView>
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-setting-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").should("have.attr", "text", "Setting");
		cy.get("@settingItem").find("[ui5-setting-view]").as("settingView");
		cy.get("@settingView").should("exist");
		cy.get("@settingView").should("have.attr", "text", "Setting1");
	});

	it("tests setting tooltip", () => {
		cy.mount(<Settings open>
			<SettingItem text="Setting" tooltip="Setting tooltip">
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-setting-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").should("have.attr", "text", "Setting");
		cy.get("@settingItem").should("have.attr", "tooltip", "Setting tooltip");
	});

	it("tests setting icon", () => {
		cy.mount(<Settings open>
			<SettingItem icon="accessibility">
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-setting-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").should("have.attr", "icon", "accessibility");
	});

	it("tests setting header-title", () => {
		cy.mount(<Settings open>
			<SettingItem header-title="Header title | Setting 3">
				<SettingView text="Setting1">
				</SettingView>
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-setting-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").shadow().find("[ui5-title]").as("title");
		cy.get("@title").should("have.length", 1);
		cy.get("@title").contains("Header title | Setting 3");
	});

	it("tests setting tabs", () => {
		cy.mount(<Settings open>
			<SettingItem>
				<SettingView text="Setting1">
						 </SettingView>
				<SettingView text="Setting2">
				</SettingView>
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-setting-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").find("[ui5-setting-view]").as("settingViews");
		cy.get("@settingViews").should("exist");
		cy.get("@settingViews").should("have.length", 2);
		cy.get("@settingItem").shadow().find("[ui5-tabcontainer]").should("exist");
	});

	it("tests setting page", () => {
		cy.mount(<Settings open>
			<SettingItem>
				<SettingView text="Setting1" slot="pages">
						 </SettingView>
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-setting-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").find("[ui5-setting-view]").as("settingViews");
		cy.get("@settingViews").should("exist");
		cy.get("@settingViews").should("have.length", 1);
		cy.get("@settingItem").shadow().find("[ui5-tabcontainer]").should("not.exist");
	});

	it("tests setting page with secondary", () => {
		cy.mount(<Settings open>
			<SettingItem>
				<SettingView slot="pages">
					<Button id="product1-button">Product 1</Button>
					<Button id="product2-button">Product 2</Button>
				</SettingView>
				<SettingView slot="pages" text="Inner Page" id="notification-second-page" secondary>second page content
				</SettingView>
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-setting-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").find("[ui5-setting-view]").as("settingViews");
		cy.get("@settingViews").should("exist");
		cy.get("@settingViews").should("have.length", 2);
		cy.get("@settingItem").shadow().find("[ui5-tabcontainer]").should("not.exist");
	});

	it("tests setting page secondary selected", () => {
		cy.mount(<Settings open>
			<SettingItem>
				<SettingView slot="pages" text="Inner Page" id="notification-second-page" secondary selected>
					<Text>second page content</Text>
				</SettingView>
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-setting-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").find("[ui5-setting-view]").as("settingViews");
		cy.get("@settingViews").should("exist");
		cy.get("@settingViews").should("have.length", 1);
		cy.get("@settingItem").shadow().find("[ui5-tabcontainer]").should("not.exist");
		cy.get("@settingItem").find("[ui5-text]").should("exist");
		cy.get("@settingItem").shadow().find("[ui5-button]").as("navigateBackButton");
		cy.get("@navigateBackButton").should("exist");
		cy.get("@navigateBackButton").should("have.attr", "icon", "nav-back");
	});
});

describe("Events", () => {
	it("tests item-select", () => {
		cy.mount(<Settings open>
			<SettingItem text="Setting">
				<SettingView text="Setting1">
				</SettingView>
				<SettingView text="Setting2">
				</SettingView>
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings")
			.shadow()
			.find("[ui5-dialog]")
			.find("[ui5-list]")
			.as("list");
		cy.get("@list")
			.find("[ui5-li]")
			.as("item");
		cy.get("@settings")
			.then($settings => {
				$settings.get(0).addEventListener("item-select", cy.stub().as("item-select"));
			});

		cy.get("@item").click();

		cy.get("@item-select").should("have.been.calledOnce");
	});
});
