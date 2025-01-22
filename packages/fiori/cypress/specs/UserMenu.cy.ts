import { html } from "lit";
import "../../src/UserMenu.js";
import "../../src/UserMenuAccount.js";
import "../../src/UserMenuItem.js";

import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";

import {
	USER_MENU_MANAGE_ACCOUNT_BUTTON_TXT,
	USER_MENU_OTHER_ACCOUNT_BUTTON_TXT,
} from "../../src/generated/i18n/i18n-defaults.js";

describe("Initial rendering", () => {
	it("tests no config provided", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn">
						</ui5-user-menu>`);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-responsive-popover]").as("responsivePopover");
		cy.get("@responsivePopover").should("exist");
		cy.get("@responsivePopover").find("[ui5-button]").contains("Sign Out");
		cy.get("@responsivePopover").find("[ui5-button]").should("have.length", 1);
	});

	it("tests config show-manage-account", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn" show-manage-account>
							<ui5-user-menu-account slot="accounts"
												   title-text="Alain Chevalier 1"
												   subtitle-text="alian.chevalier@sap.com"
												   description="Delivery Manager, SAP SE">
							</ui5-user-menu-account>
						</ui5-user-menu>`);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-responsive-popover]").as("responsivePopover");
		cy.get("@responsivePopover").should("exist");
		cy.get("@responsivePopover").find("[ui5-button]").contains(USER_MENU_MANAGE_ACCOUNT_BUTTON_TXT.defaultText);
		cy.get("@responsivePopover").find("[ui5-button]").should("have.length", 2);
	});

	it("tests config show-other-accounts", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn" show-other-accounts>
							<ui5-user-menu-account slot="accounts"
												   title-text="Alain Chevalier 1"
												   subtitle-text="alian.chevalier@sap.com"
												   description="Delivery Manager, SAP SE"
												   selected>
							</ui5-user-menu-account>
							<ui5-user-menu-account slot="accounts"
												   avatar-initials="AC"
												   title-text="Alain Chevalier 2"
												   subtitle-text="test.alian.chevalier@sap.com">
							</ui5-user-menu-account>
						</ui5-user-menu>`);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-responsive-popover]").as("responsivePopover");
		cy.get("@responsivePopover").should("exist");
		cy.get("@responsivePopover").find("[ui5-panel]").contains(`${USER_MENU_OTHER_ACCOUNT_BUTTON_TXT.defaultText} (1)`);
		cy.get("@responsivePopover").find("[ui5-button]").should("have.length", 1);
	});

	it("tests config show-add-account", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn" show-other-accounts show-add-account>
							<ui5-user-menu-account slot="accounts"
												   title-text="Alain Chevalier 1"
												   subtitle-text="alian.chevalier@sap.com"
												   description="Delivery Manager, SAP SE"
												   selected>
							</ui5-user-menu-account>
							<ui5-user-menu-account slot="accounts"
												   avatar-initials="AC"
												   title-text="Alain Chevalier 2"
												   subtitle-text="test.alian.chevalier@sap.com">
							</ui5-user-menu-account>
						</ui5-user-menu>`);
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
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn">
							<ui5-user-menu-account slot="accounts"
												   title-text="Alain Chevalier 1"
												   subtitle-text="alian.chevalier@sap.com"
												   description="Delivery Manager, SAP SE">
							</ui5-user-menu-account>
							<ui5-user-menu-item text="Setting" data-id="setting"></ui5-user-menu-item>
							<ui5-user-menu-item text="Product-specific account action"
												data-id="account-action2"></ui5-user-menu-item>
						</ui5-user-menu>`);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").find("[ui5-user-menu-item]").as("userMenuItems");
		cy.get("@userMenuItems").should("exist");
		cy.get("@userMenuItems").should("have.length", 2);
	});

	it("tests config items with submenu items", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn">
							<ui5-user-menu-account slot="accounts"
												   title-text="Alain Chevalier 1"
												   subtitle-text="alian.chevalier@sap.com"
												   description="Delivery Manager, SAP SE">
							</ui5-user-menu-account>
							<ui5-user-menu-item text="Setting" data-id="setting"></ui5-user-menu-item>
							<ui5-user-menu-item text="Product-specific account action"
												data-id="account-action2"></ui5-user-menu-item>
							<ui5-user-menu-item text="Legal Information">
								<ui5-user-menu-item text="Private Policy" data-id="privacy-policy"></ui5-user-menu-item>
								<ui5-user-menu-item text="Terms of Use" data-id="terms-of-use"></ui5-user-menu-item>
							</ui5-user-menu-item>
						</ui5-user-menu>`);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").find("[ui5-user-menu-item]").as("userMenuItems");
		cy.get("@userMenuItems").should("exist");
		cy.get("@userMenuItems").find("[ui5-user-menu-item]").as("userSubMenuItems");
		cy.get("@userSubMenuItems").should("exist");
		cy.get("@userSubMenuItems").should("have.length", 2);
	});

	it("tests config items with icon", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn">
							<ui5-user-menu-account slot="accounts"
												   title-text="Alain Chevalier 1"
												   subtitle-text="alian.chevalier@sap.com"
												   description="Delivery Manager, SAP SE">
							</ui5-user-menu-account>
							<ui5-user-menu-item icon="action-settings" text="Setting" data-id="setting"></ui5-user-menu-item>
						</ui5-user-menu>`);
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
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
		<ui5-user-menu open opener="openUserMenuBtn">
			<ui5-user-menu-account slot="accounts"
								   title-text="Alain Chevalier 1"
								   subtitle-text="alian.chevalier@sap.com"
								   description="Delivery Manager, SAP SE">
			</ui5-user-menu-account>
		</ui5-user-menu>`);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-avatar]").as("avatar");
		cy.get("@avatar").should("exist");
		cy.get("@avatar").should("have.length", 1);
		cy.get("@avatar").should("have.attr", "fallback-icon", "person-placeholder");
		cy.get("@avatar").find("[ui5-tag]").should("exist");
		cy.get("@avatar").find("[ui5-tag]").should("have.length", 1);
	});

	it("tests initials", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn">
							<ui5-user-menu-account slot="accounts"
												   avatar-initials="AC"
												   title-text="Alain Chevalier 1"
												   subtitle-text="alian.chevalier@sap.com"
												   description="Delivery Manager, SAP SE">
							</ui5-user-menu-account>
						</ui5-user-menu>`);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-avatar]").as("avatar");
		cy.get("@avatar").should("exist");
		cy.get("@avatar").should("have.length", 1);
		cy.get("@avatar").should("have.attr", "initials", "AC");
	});

	it("tests image", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn">
							<ui5-user-menu-account slot="accounts"
												   avatar-src="./../../test/pages/img/man_avatar_1.png"
												   title-text="Alain Chevalier 1"
												   subtitle-text="alian.chevalier@sap.com"
												   description="Delivery Manager, SAP SE">
							</ui5-user-menu-account>
						</ui5-user-menu>`);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-avatar]").as("avatar");
		cy.get("@avatar").should("exist");
		cy.get("@avatar").should("have.length", 1);
		cy.get("@avatar").find("img").as("image");
		cy.get("@image").should("have.length", 1);
		cy.get("@image").should("have.attr", "src", "./../../test/pages/img/man_avatar_1.png");
	});

	it("tests hideEditAvatar", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
		<ui5-user-menu open opener="openUserMenuBtn" hide-edit-avatar>
			<ui5-user-menu-account slot="accounts"
								   title-text="Alain Chevalier 1"
								   subtitle-text="alian.chevalier@sap.com"
								   description="Delivery Manager, SAP SE">
			</ui5-user-menu-account>
		</ui5-user-menu>`);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-avatar]").as("avatar");
		cy.get("@avatar").should("exist");
		cy.get("@avatar").should("have.length", 1);
		cy.get("@avatar").should("have.attr", "fallback-icon", "person-placeholder");
		cy.get("@avatar").find("[ui5-tag]").should("have.length", 0);
	});
});

describe("Events", () => {
	it("tests avatar-click event", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn">
							<ui5-user-menu-account slot="accounts"
												   title-text="Alain Chevalier 1"
							</ui5-user-menu-account>
						</ui5-user-menu>`);
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
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn" show-manage-account>
							<ui5-user-menu-account slot="accounts"
												   title-text="Alain Chevalier 1"
							</ui5-user-menu-account>
						</ui5-user-menu>`);
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
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn" show-add-account show-other-accounts>
						</ui5-user-menu>`);
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
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn" show-other-accounts>
							<ui5-user-menu-account slot="accounts" title-text="Alain Chevalier 1">
							</ui5-user-menu-account>
							<ui5-user-menu-account slot="accounts" title-text="Alain Chevalier 2">
							</ui5-user-menu-account>
						</ui5-user-menu>`);
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

	it("tests item-click event", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn">
							<ui5-user-menu-item text="Setting" data-id="setting"></ui5-user-menu-item>
						</ui5-user-menu>`);
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

	it("tests sign-out-click event", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn">
						</ui5-user-menu>`);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").shadow().find("[ui5-button]").as("signOutBtn");

		cy.get("@userMenu")
			.then($userMenu => {
				$userMenu.get(0).addEventListener("sign-out-click", cy.stub().as("clicked"));
			});

		cy.get("@signOutBtn").click();

		cy.get("@clicked").should("have.been.calledOnce");
	});

	it("tests open event", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu opener="openUserMenuBtn">
							<ui5-user-menu-item text="Setting" data-id="setting"></ui5-user-menu-item>
						</ui5-user-menu>`);
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
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu opener="openUserMenuBtn">
						</ui5-user-menu>`);
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
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
							<ui5-user-menu id="userMenuShellBar" open opener="openUserMenuBtn">
								<ui5-user-menu-account slot="accounts"
													   title-text="Alain Chevalier 1">
								</ui5-user-menu-account>
								<ui5-user-menu-item text="Setting1" data-id="setting1"></ui5-user-menu-item>
							</ui5-user-menu>`);
		cy.get("[ui5-user-menu]").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-bar]").as("headerBar");
		cy.get("@headerBar").should("have.class", "ui5-pm-phone-header");
	});

	it("tests scroll on phone", () => {
		cy.ui5SimulateDevice("phone");
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
							<ui5-user-menu id="userMenuShellBar" open opener="openUserMenuBtn"
										   show-manage-account
										   show-add-account>
								<ui5-user-menu-account slot="accounts"
													   title-text="Alain Chevalier 1">
								</ui5-user-menu-account>
								<ui5-user-menu-item text="Setting1" data-id="setting1"></ui5-user-menu-item>
								<ui5-user-menu-item text="Setting2" data-id="setting2"></ui5-user-menu-item>
								<ui5-user-menu-item text="Setting3" data-id="setting3"></ui5-user-menu-item>
								<ui5-user-menu-item text="Setting4" data-id="setting4"></ui5-user-menu-item>
								<ui5-user-menu-item text="Setting5" data-id="setting5"></ui5-user-menu-item>
								<ui5-user-menu-item text="Setting6" data-id="setting6"></ui5-user-menu-item>
								<ui5-user-menu-item text="Setting7" data-id="setting7"></ui5-user-menu-item>
								<ui5-user-menu-item text="Setting8" data-id="setting8"></ui5-user-menu-item>
								<ui5-user-menu-item text="Setting9" data-id="setting9"></ui5-user-menu-item>
								<ui5-user-menu-item text="Setting10" data-id="setting10"></ui5-user-menu-item>
								<ui5-user-menu-item text="Setting11" data-id="setting11"></ui5-user-menu-item>
								<ui5-user-menu-item text="Setting12" data-id="setting12"></ui5-user-menu-item>
								<ui5-user-menu-item text="Setting13" data-id="setting13"></ui5-user-menu-item>
								<ui5-user-menu-item text="Setting14" data-id="setting14"></ui5-user-menu-item>
								<ui5-user-menu-item text="Setting15" data-id="setting15"></ui5-user-menu-item>
								<ui5-user-menu-item text="Setting16" data-id="setting16"></ui5-user-menu-item>
							</ui5-user-menu>`);

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
