import UserMenu from "../../src/UserMenu.js";
import UserMenuAccount from "../../src/UserMenuAccount.js";
import UserMenuItem from "../../src/UserMenuItem.js";

import actionSettings from "@ui5/webcomponents-icons/dist/action-settings.js";
import Button from "@ui5/webcomponents/dist/Button.js";

import {
	USER_MENU_MANAGE_ACCOUNT_BUTTON_TXT,
	USER_MENU_OTHER_ACCOUNT_BUTTON_TXT,
} from "../../src/generated/i18n/i18n-defaults.js";

describe("Initial rendering", () => {
	it("tests no config provided", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn"></UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-responsive-popover]").as("responsivePopover");
		cy.get("@responsivePopover").should("exist");
		cy.get("@responsivePopover").find("[ui5-button]").contains("Sign Out");
		cy.get("@responsivePopover").find("[ui5-button]").should("have.length", 1);
	});

	it("tests config show-manage-account", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn" showManageAccount={true}>
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier 1"
						subtitleText="alian.chevalier@sap.com"
						description="Delivery Manager, SAP SE">
					</UserMenuAccount>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-responsive-popover]").as("responsivePopover");
		cy.get("@responsivePopover").should("exist");
		cy.get("@responsivePopover").find("[ui5-button]").contains(USER_MENU_MANAGE_ACCOUNT_BUTTON_TXT.defaultText);
		cy.get("@responsivePopover").find("[ui5-button]").should("have.length", 2);
	});

	it("tests config show-other-accounts", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn" showOtherAccounts={true}>
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier 1"
						subtitleText="alian.chevalier@sap.com"
						description="Delivery Manager, SAP SE"
						selected={true}>
					</UserMenuAccount>
					<UserMenuAccount
						slot="accounts"
						avatarSrc="./../../test/pages/img/man_avatar_1.png"
						titleText="Alain Chevalier 2"
						subtitleText="test.alian.chevalier@sap.com"
						description="Delivery Manager, SAP SE">
					</UserMenuAccount>
				</UserMenu>
			</>
		);

		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-responsive-popover]").as("responsivePopover");
		cy.get("@responsivePopover").should("exist");
		cy.get("@responsivePopover").find("[ui5-panel]").contains(`${USER_MENU_OTHER_ACCOUNT_BUTTON_TXT.defaultText} (1)`);
		cy.get("@responsivePopover").find("[ui5-button]").should("have.length", 1);
	});

	it("tests config show-add-account", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn" showOtherAccounts={true} showAddAccount={true}>
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier 1"
						subtitleText="alian.chevalier@sap.com"
						description="Delivery Manager, SAP SE"
						selected={true}>
					</UserMenuAccount>
					<UserMenuAccount
						slot="accounts"
						avatarInitials="AC"
						titleText="Alain Chevalier 2"
						subtitleText="test.alian.chevalier@sap.com">
					</UserMenuAccount>
				</UserMenu>
			</>
		);

		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-responsive-popover]").as("responsivePopover");
		cy.get("@responsivePopover").should("exist");
		cy.get("@responsivePopover").find(".ui5-pm-add-account-btn").should("exist");
		cy.get("@responsivePopover").find("[ui5-button]").should("have.length", 2);
	});
});

describe("Menu configuration", () => {
	it("tests config items", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn">
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier 1"
						subtitleText="alian.chevalier@sap.com"
						description="Delivery Manager, SAP SE"
					></UserMenuAccount>
					<UserMenuItem text="Setting" data-id="setting"></UserMenuItem>
					<UserMenuItem text="Product-specific account action" data-id="account-action2"></UserMenuItem>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").find("[ui5-user-menu-item]").as("userMenuItems");
		cy.get("@userMenuItems").should("exist");
		cy.get("@userMenuItems").should("have.length", 2);
	});

	it("tests config items with submenu items", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn">
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier 1"
						subtitleText="alian.chevalier@sap.com"
						description="Delivery Manager, SAP SE"
					></UserMenuAccount>

					<UserMenuItem text="Setting" data-id="setting"></UserMenuItem>
					<UserMenuItem text="Product-specific account action" data-id="account-action2"></UserMenuItem>
					<UserMenuItem text="Legal Information">
						<UserMenuItem text="Private Policy" data-id="privacy-policy"></UserMenuItem>
						<UserMenuItem text="Terms of Use" data-id="terms-of-use"></UserMenuItem>
					</UserMenuItem>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").find("[ui5-user-menu-item]").as("userMenuItems");
		cy.get("@userMenuItems").should("exist");
		cy.get("@userMenuItems").find("[ui5-user-menu-item]").as("userSubMenuItems");
		cy.get("@userSubMenuItems").should("exist");
		cy.get("@userSubMenuItems").should("have.length", 2);
	});

	it("tests config items with icon", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn">
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier 1"
						subtitleText="alian.chevalier@sap.com"
						description="Delivery Manager, SAP SE"
					></UserMenuAccount>
					<UserMenuItem icon={actionSettings} text="Setting" data-id="setting"></UserMenuItem>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").find("[ui5-user-menu-item]").as("userMenuItems");
		cy.get("@userMenuItems").should("exist");
		cy.get("@userMenuItems").should("have.length", 1);
		cy.get("@userMenuItems").should("have.attr", "icon", "action-settings");
	});
});

describe("Avatar configuration", () => {
	it("tests default", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn">
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier 1"
						subtitleText="alian.chevalier@sap.com"
						description="Delivery Manager, SAP SE"
					></UserMenuAccount>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-avatar]").as("avatar");
		cy.get("@avatar").should("exist");
		cy.get("@avatar").should("have.length", 1);
		cy.get("@avatar").should("have.attr", "fallback-icon", "person-placeholder");
		cy.get("@avatar").find("[ui5-tag]").should("not.exist");
	});

	it("tests initials", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn">
					<UserMenuAccount
						slot="accounts"
						avatarInitials="AC"
						titleText="Alain Chevalier 1"
						subtitleText="alian.chevalier@sap.com"
						description="Delivery Manager, SAP SE">
					</UserMenuAccount>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-avatar]").as("avatar");
		cy.get("@avatar").should("exist");
		cy.get("@avatar").should("have.length", 1);
		cy.get("@avatar").should("have.attr", "initials", "AC");
	});

	it("tests image", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn">
					<UserMenuAccount
						slot="accounts"
						avatarSrc="./../../test/pages/img/man_avatar_1.png"
						titleText="Alain Chevalier 1"
						subtitleText="alian.chevalier@sap.com"
						description="Delivery Manager, SAP SE"
					></UserMenuAccount>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-avatar]").as("avatar");
		cy.get("@avatar").should("exist");
		cy.get("@avatar").should("have.length", 1);
		cy.get("@avatar").find("img").as("image");
		cy.get("@image").should("have.length", 1);
		cy.get("@image").should("have.attr", "src", "./../../test/pages/img/man_avatar_1.png");
	});

	it("tests showEditButton", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn" showEditButton={true}>
					<UserMenuAccount
						slot="accounts"
						titleText="Alain Chevalier 1"
						subtitleText="alian.chevalier@sap.com"
						description="Delivery Manager, SAP SE">
					</UserMenuAccount>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-avatar]").as("avatar");
		cy.get("@avatar").should("exist");
		cy.get("@avatar").should("have.length", 1);
		cy.get("@avatar").should("have.attr", "fallback-icon", "person-placeholder");
		cy.get("@avatar").find("[ui5-tag]").should("exist");
		cy.get("@avatar").find("[ui5-tag]").should("have.length", 1);
	});
});

describe("Events", () => {
	it("tests avatar-click event", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn">
					<UserMenuAccount slot="accounts" titleText="Alain Chevalier 1"></UserMenuAccount>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu")
			.shadow()
			.find("[ui5-responsive-popover]")
			.find("[ui5-avatar]")
			.as("avatar");

		cy.get("@userMenu")
			.then($avatar => {
				$avatar.get(0).addEventListener("avatar-click", cy.stub().as("clicked"));
			});

		cy.get("@avatar").click();

		cy.get("@clicked").should("have.been.calledOnce");
	});

	it("tests manage-account-click event", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn" showManageAccount={true}>
					<UserMenuAccount slot="accounts" titleText="Alain Chevalier 1"></UserMenuAccount>
				</UserMenu>
			</>
		);

		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu")
			.shadow()
			.find("[ui5-button]")
			.eq(0)
			.as("manageAccountBtn");

		cy.get("@userMenu").then($userMenu => {
			$userMenu.get(0).addEventListener("manage-account-click", cy.stub().as("clicked"));
		});

		cy.get("@manageAccountBtn").click();

		cy.get("@clicked").should("have.been.calledOnce");
	});

	it("tests add-account-click event", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn" showAddAccount={true} showOtherAccounts={true}>
					<UserMenuAccount slot="accounts" titleText="Alain Chevalier 1"></UserMenuAccount>
				</UserMenu>
			</>
		);

		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu")
			.shadow()
			.find(".ui5-pm-add-account-btn")
			.as("addAccountBtn");

		cy.get("@userMenu")
			.then($userMenu => {
				$userMenu.get(0).addEventListener("add-account-click", cy.stub().as("clicked"));
			});

		cy.get("@addAccountBtn").click();

		cy.get("@clicked").should("have.been.calledOnce");
	});

	it("tests change-account event", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn" showOtherAccounts={true}>
					<UserMenuAccount slot="accounts" titleText="Alain Chevalier 1"></UserMenuAccount>
					<UserMenuAccount slot="accounts" titleText="Alain Chevalier 2"></UserMenuAccount>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu")
			.shadow()
			.find("[ui5-panel]")
			.as("otherAccounts");

		cy.get("@userMenu").then($userMenu => {
			$userMenu.get(0).addEventListener("change-account", cy.stub().as("changedAccount"));
		});

		cy.get("@otherAccounts")
			.shadow()
			.find("[ui5-button]")
			.click();

		cy.get("@otherAccounts")
			.find("[ui5-li-custom]")
			.click();

		cy.get("@changedAccount").should("have.been.calledOnce");
		cy.get("@changedAccount").its("args.0.0.detail.prevSelectedAccount").should("have.property", "titleText", "Alain Chevalier 1");
		cy.get("@changedAccount").its("args.0.0.detail.selectedAccount").should("have.property", "titleText", "Alain Chevalier 2");
	});

	it("tests change-account event prevented", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn" showOtherAccounts={true}>
					<UserMenuAccount slot="accounts" titleText="Alain Chevalier 1" avatarSrc="./../../test/pages/img/man_avatar_1.png"></UserMenuAccount>
					<UserMenuAccount slot="accounts" titleText="Alain Chevalier 2"></UserMenuAccount>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu")
			.shadow()
			.find("[ui5-panel]")
			.as("otherAccounts");

		cy.get("@userMenu").then($userMenu => {
			$userMenu.get(0).addEventListener("change-account", e => e.preventDefault());
			$userMenu.get(0).addEventListener("change-account", cy.stub().as("changedAccount"));
		});

		cy.get("@otherAccounts")
			.shadow()
			.find("[ui5-button]")
			.click();

		cy.get("@otherAccounts")
			.find("[ui5-li-custom]")
			.realClick();

		cy.get("@userMenu").shadow().find("[ui5-avatar]").first()
			.as("avatar");
		cy.get("@avatar").should("exist");
		cy.get("@avatar").find("img").as("image");
		cy.get("@image").should("have.length", 1);
		cy.get("@image").should("have.attr", "src", "./../../test/pages/img/man_avatar_1.png");
		cy.get("@avatar").should("have.class", "ui5-pm--selected-account-avatar");
	});

	it("tests item-click event", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn">
					<UserMenuItem text="Setting" data-id="setting"></UserMenuItem>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu")
			.find("[ui5-user-menu-item]")
			.as("userMenuItem");

		cy.get("@userMenu")
			.then($userMenu => {
				$userMenu.get(0).addEventListener("item-click", cy.stub().as("clicked"));
			});

		cy.get("@userMenuItem").click();

		cy.get("@clicked").should("have.been.calledOnce");
		cy.get("@clicked").its("args.0.0.detail.item").should("have.property", "text", "Setting");
	});

	it("tests item-click sub menu event", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn">
					<UserMenuItem text="Setting" data-id="setting">
						<UserMenuItem text="Sub-Setting" data-id="sub-setting"></UserMenuItem>
					</UserMenuItem>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu")
			.find("[ui5-user-menu-item]")
			.as("userMenuItem");

		cy.get("@userMenu")
			.then($userMenu => {
				$userMenu.get(0).addEventListener("item-click", cy.stub().as("clicked"));
			});

		cy.get("@userMenuItem").first().click();

		cy.get("@clicked").should("have.not.been.called");
	});

	it("tests item-click sub menu event", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn">
					<UserMenuItem text="Setting" data-id="setting">
						<UserMenuItem text="Sub-Setting" data-id="sub-setting"></UserMenuItem>
					</UserMenuItem>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu")
			.find("[ui5-user-menu-item]")
			.as("userMenuItem");

		cy.get("@userMenu")
			.then($userMenu => {
				$userMenu.get(0).addEventListener("item-click", cy.stub().as("clicked"));
			});

		cy.get("@userMenuItem").first().click();
		cy.get("@userMenuItem").first().click();

		cy.get("@clicked").should("have.not.been.called");
	});

	it("tests sign-out-click event", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn"></UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").shadow().find("[ui5-button]").as("signOutBtn");

		cy.get("@userMenu")
			.then($userMenu => {
				$userMenu.get(0).addEventListener("sign-out-click", cy.stub().as("clicked"));
			});

		cy.get("@signOutBtn").click();

		cy.get("@clicked").should("have.been.calledOnce");
	});

	it("tests sign-out-click event prevented", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu open={true} opener="openUserMenuBtn"></UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").shadow().find("[ui5-button]").as("signOutBtn");

		cy.get("@userMenu")
			.then($userMenu => {
				$userMenu.get(0).addEventListener("sign-out-click", e => e.preventDefault());
				$userMenu.get(0).addEventListener("sign-out-click", cy.stub().as("clicked"));
			});

		cy.get("@signOutBtn").click();

		cy.get("@userMenu").should("have.attr", "open");
	});

	it("tests open event", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu opener="openUserMenuBtn">
					<UserMenuItem text="Setting" data-id="setting"></UserMenuItem>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu")
			.then($userMenu => {
				$userMenu.get(0).addEventListener("open", cy.stub().as("opened"));
			});

		cy.get("@userMenu")
			.ui5UserMenuOpen();

		cy.get("@opened").should("have.been.calledOnce");
	});

	it("tests close event", () => {
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu opener="openUserMenuBtn"></UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");

		cy.get("@userMenu")
			.then($userMenu => {
				$userMenu.get(0).addEventListener("close", cy.stub().as("closed"));
			});

		cy.get("@userMenu")
			.ui5UserMenuOpen();

		cy.get("@userMenu")
			.ui5UserMenuOpened();
		cy.get("@userMenu").shadow().find("[ui5-button]").as("signOutBtn");
		cy.get("@signOutBtn")
			.click();

		cy.get("@closed").should("have.been.calledOnce");
	});
});

describe("Responsiveness", () => {
	it("test basic structure on phone", () => {
		cy.ui5SimulateDevice("phone");
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu id="userMenuShellBar" open={true}
					opener="openUserMenuBtn"
					showManageAccount={true}
					showAddAccount={true}>
					<UserMenuAccount slot="accounts" titleText="Alain Chevalier 1"></UserMenuAccount>
					<UserMenuItem text="Setting1" data-id="setting1"></UserMenuItem>
				</UserMenu>
			</>
		);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-bar]").as("headerBar");
		cy.get("@headerBar").should("have.class", "ui5-pm-phone-header");
	});

	it("tests scroll on phone", () => {
		cy.ui5SimulateDevice("phone");
		cy.mount(
			<>
				<Button id="openUserMenuBtn">Open User Menu</Button>
				<UserMenu
					id="userMenuShellBar"
					open={true} opener="openUserMenuBtn"
					showManageAccount={true}
					showAddAccount={true}
				>
					<UserMenuAccount slot="accounts" titleText="Alain Chevalier 1"></UserMenuAccount>
					<UserMenuItem text="Setting1" data-id="setting1"></UserMenuItem>
					<UserMenuItem text="Setting2" data-id="setting2"></UserMenuItem>
					<UserMenuItem text="Setting3" data-id="setting3"></UserMenuItem>
					<UserMenuItem text="Setting4" data-id="setting4"></UserMenuItem>
					<UserMenuItem text="Setting5" data-id="setting5"></UserMenuItem>
					<UserMenuItem text="Setting6" data-id="setting6"></UserMenuItem>
					<UserMenuItem text="Setting7" data-id="setting7"></UserMenuItem>
					<UserMenuItem text="Setting8" data-id="setting8"></UserMenuItem>
					<UserMenuItem text="Setting9" data-id="setting9"></UserMenuItem>
					<UserMenuItem text="Setting10" data-id="setting10"></UserMenuItem>
					<UserMenuItem text="Setting11" data-id="setting11"></UserMenuItem>
					<UserMenuItem text="Setting12" data-id="setting12"></UserMenuItem>
					<UserMenuItem text="Setting13" data-id="setting13"></UserMenuItem>
					<UserMenuItem text="Setting14" data-id="setting14"></UserMenuItem>
					<UserMenuItem text="Setting15" data-id="setting15"></UserMenuItem>
					<UserMenuItem text="Setting16" data-id="setting16"></UserMenuItem>
				</UserMenu>
			</>
		);

		cy.get("[ui5-user-menu]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(`div[part="content"]`)
			.scrollTo("bottom");
		cy.get("[ui5-user-menu]").shadow().find("[ui5-bar]").as("headerBar");
		cy.get("@headerBar").find("[ui5-title]").contains("Alain Chevalier 1");
		cy.get("@headerBar").find("[ui5-button]").should("have.length", 2);
	});
});
