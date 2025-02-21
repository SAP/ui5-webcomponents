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

	it("tests setting item no config", () => {
		cy.mount(<Settings open>
			<SettingItem slot="fixedItems" selected>
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
				<SettingView text="Setting3">
				</SettingView>
			</SettingItem>
			<SettingItem text="Fixed" slot="fixedItems">
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
			.find("[ui5-li]").first()
			.as("item");
		cy.get("@item").should("have.attr", "type", "Active");
		cy.get("@settings")
			.then($settings => {
				$settings.get(0).addEventListener("item-select", cy.stub().as("item-select"));
			});

		cy.get("@item").click();

		cy.get("@item-select").should("have.been.calledOnce");
	});

	it("tests open event", () => {
		cy.mount(<><Button id="openSettingsBtn">Settings</Button>
			<Settings>
				<SettingItem text="Setting">
					<SettingView text="Setting1">
					</SettingView>
				</SettingItem>
			</Settings></>);

		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings")
			.then($settings => {
				$settings.get(0).addEventListener("open", cy.stub().as("opened"));
			});

		cy.get("@settings").invoke("attr", "open", true);

		cy.get("@settings").should("have.attr", "open");

		cy.get("@settings").shadow().find("[ui5-dialog]").should("have.attr", "open");
		cy.get("@opened").should("have.been.calledOnce");
	});

	it("tests before close event", () => {
		cy.mount(<Settings open>
			<SettingItem text="Setting">
				<SettingView text="Setting1">
				</SettingView>
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings")
			.then(settings => {
				settings.get(0).addEventListener("before-close", cy.stub().as("beforeClosed"));
			});

		cy.get("@settings").shadow().find("[ui5-toolbar]").shadow()
			.find("[ui5-button]")
			.first()
			.as("closeButton");
		cy.get("@closeButton")
			.click();
		cy.get("@beforeClosed").should("have.been.calledOnce");
	});

	it("tests close event", () => {
		cy.mount(<Settings open>
			<SettingItem text="Setting">
				<SettingView text="Setting1">
				</SettingView>
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings")
			.then(settings => {
				settings.get(0).addEventListener("close", cy.stub().as("closed"));
			});

		cy.get("@settings").shadow().find("[ui5-toolbar]").shadow()
			.find("[ui5-button]")
			.first()
			.as("closeButton");
		cy.get("@closeButton")
			.click();
		cy.get("@closed").should("have.been.calledOnce");
	});

	it("tests back-click event on secondary page", () => {
		cy.mount(<Settings open>
			<SettingItem>
				<SettingView slot="pages">
					<Button id="product1-button">Product 1</Button>
					<Button id="product2-button">Product 2</Button>
				</SettingView>
				<SettingView slot="pages" text="Inner Page" id="notification-second-page" secondary selected>second page content
				</SettingView>
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-setting-item]").as("settingsItem");
		cy.get("@settingsItem")
			.then(settingsItem => {
				settingsItem.get(0).addEventListener("back-click", cy.stub().as("backClicked"));
			});
		cy.get("@settingsItem").shadow()
			.find(".ui5-setting-item-collapse-btn")
			.first()
			.as("backButton");

		cy.get("@backButton")
			.click();

		cy.get("@backClicked").should("have.been.calledOnce");
	});

	it("tests _collapse event on secondary page mobile", () => {
		cy.ui5SimulateDevice("phone");
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
		cy.get("@settings").find("[ui5-setting-item]").as("settingsItem");
		cy.get("@settingsItem")
			.then(settingsItem => {
				settingsItem.get(0).addEventListener("_collapse", cy.stub().as("collapsed"));
			});
		cy.get("@settings")
			.shadow()
			.find("[ui5-dialog]")
			.find("[ui5-list]")
			.as("list");
		cy.get("@list")
			.find("[ui5-li]")
			.as("item");
		cy.get("@item").click();

		cy.get("@settingsItem").shadow()
			.find(".ui5-setting-item-collapse-btn")
			.first()
			.as("backButton");

		cy.get("@backButton")
			.click();

		cy.get("@collapsed").should("have.been.calledOnce");
	});

	it("tests view-select event", () => {
		cy.mount(<Settings open>
			<SettingItem>
				<SettingView text="First tab">
					<Button id="product1-button">Product 1</Button>
					<Button id="product2-button">Product 2</Button>
				</SettingView>
				<SettingView text="Second tab" id="notification-second-page">second tab
				</SettingView>
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-setting-item]").as("settingsItem");
		cy.get("@settingsItem")
			.then(settingsItem => {
				settingsItem.get(0).addEventListener("view-select", cy.stub().as("viewSelected"));
			});

		cy.get("@settingsItem").shadow().find("[ui5-tabcontainer]").as("tabContainer");
		cy.get("@tabContainer").shadow().find(".ui5-tc__header>.ui5-tc__tabStrip>.ui5-tab-strip-item").last()
			.as("secondTab");
		cy.get("@secondTab").click();
		cy.get("@viewSelected").should("have.been.calledOnce");
	});

	it("tests view-select event prevented", () => {
		cy.mount(<Settings open>
			<SettingItem>
				<SettingView text="First tab">
					<Button id="product1-button">Product 1</Button>
					<Button id="product2-button">Product 2</Button>
				</SettingView>
				<SettingView text="Second tab" id="notification-second-page">second tab
				</SettingView>
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-setting-item]").as("settingsItem");
		cy.get("@settingsItem")
			.then(settingsItem => {
				settingsItem.get(0).addEventListener("view-select", e => e.preventDefault());
				settingsItem.get(0).addEventListener("view-select", cy.stub().as("viewSelected"));
			});

		cy.get("@settingsItem").shadow().find("[ui5-tabcontainer]").as("tabContainer");
		cy.get("@tabContainer").shadow().find(".ui5-tc__header>.ui5-tc__tabStrip>.ui5-tab-strip-item").last()
			.as("secondTab");
		cy.get("@secondTab").click();
		cy.get("@viewSelected").should("have.been.calledOnce");
	});

	it("tests search", () => {
		cy.mount(<Settings show-search-field open>
			<SettingItem text="Setting">
				<SettingView text="Setting1">
				</SettingView>
				<SettingView text="Setting2" slot="fixedItems">
				</SettingView>
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").shadow().find("[ui5-dialog]").as("dialog");
		cy.get("@dialog").should("exist");
		cy.get("@dialog").find("[ui5-input]").as("search");
		cy.get("@search").should("have.attr", "placeholder", "Search");
		cy.get("@search").shadow().find("input").type("test");
	});
});

describe("Responsiveness", () => {
	it("test basic structure on phone", () => {
		cy.ui5SimulateDevice("phone");
		cy.mount(<Settings open>
			<SettingItem text="Setting">
				<SettingView text="Setting1">
				</SettingView>
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings")
			.then(settings => {
				settings.get(0).addEventListener("close", cy.stub().as("closed"));
			});
		cy.get("@settings").shadow().find("[ui5-dialog]").should("exist");
		cy.get("@settings").shadow().find("[ui5-toolbar]").should("exist");
		cy.get("@settings").shadow().find("[ui5-toolbar]").shadow()
			.find("[ui5-button]")
			.first()
			.as("closeButton");
		cy.get("@closeButton")
			.click();
		cy.get("@closed").should("have.been.calledOnce");
		cy.get("@settings").should("not.have.attr", "open");
		cy.get("@settings").shadow().find("[ui5-dialog]").should("not.have.attr", "open");
	});

	it("test basic structure on phone", () => {
		cy.ui5SimulateDevice("phone");
		cy.mount(<Settings open>
			<SettingItem text="Setting">
				<SettingView text="Setting1">
				</SettingView>
			</SettingItem>
		</Settings>);
		cy.get("[ui5-settings]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings")
			.then(settings => {
				settings.get(0).addEventListener("close", cy.stub().as("closed"));
			});
		cy.get("@settings").shadow().find("[ui5-dialog]").should("exist");
		cy.get("@settings").shadow().find("[ui5-toolbar]").should("exist");
		cy.get("@settings")
			.shadow()
			.find("[ui5-dialog]")
			.find("[ui5-list]")
			.as("list");
		cy.get("@list")
			.find("[ui5-li]")
			.as("item");
		cy.get("@item").should("have.attr", "type", "Navigation");
		cy.get("@settings").shadow().find("[ui5-toolbar]").shadow()
			.find("[ui5-button]")
			.first()
			.as("closeButton");
		cy.get("@closeButton")
			.click();
		cy.get("@closed").should("have.been.calledOnce");
		cy.get("@settings").should("not.have.attr", "open");
		cy.get("@settings").shadow().find("[ui5-dialog]").should("not.have.attr", "open");
	});

	it("tests setting tabs", () => {
		cy.ui5SimulateDevice("phone");
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
		cy.ui5SimulateDevice("phone");
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
		cy.ui5SimulateDevice("phone");
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
		cy.ui5SimulateDevice("phone");
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
