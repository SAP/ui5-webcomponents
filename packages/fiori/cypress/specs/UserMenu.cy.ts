import { html } from "lit";
import "../../src/UserMenu.js";
import "../../src/UserMenuAccount.js";
import "../../src/UserMenuItem.js";
import "../../src/ShellBar.js";

import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";

describe("Initial rendering", () => {
	it("tests no config provided", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn">
						</ui5-user-menu>`);
		cy.get("ui5-user-menu").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-responsive-popover]").as("responsivePopover");
		cy.get("@responsivePopover").should("exist");
		cy.get("@responsivePopover").find("ui5-button").contains("Sign Out");
		cy.get("@responsivePopover").find("ui5-button").should("have.length", 1);
	});

	it("tests config show-manage-account", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn" show-manage-account>
							<ui5-user-menu-account slot="accounts"
												   title-text="Alain Chevalier 1"
												   additional-text="alian.chevalier@sap.com"
												   description="Delivery Manager, SAP SE">
							</ui5-user-menu-account>
						</ui5-user-menu>`);
		cy.get("ui5-user-menu").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-responsive-popover]").as("responsivePopover");
		cy.get("@responsivePopover").should("exist");
		cy.get("@responsivePopover").find("ui5-button").contains("Manage account");
		cy.get("@responsivePopover").find("ui5-button").should("have.length", 2);
	});

	it("tests config show-other-accounts", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn" show-other-accounts>
							<ui5-user-menu-account slot="accounts"
												   title-text="Alain Chevalier 1"
												   additional-text="alian.chevalier@sap.com"
												   description="Delivery Manager, SAP SE"
												   selected>
							</ui5-user-menu-account>
							<ui5-user-menu-account slot="accounts"
												   initials="AC"
												   title-text="Alain Chevalier 2"
												   additional-text="test.alian.chevalier@sap.com">
							</ui5-user-menu-account>
						</ui5-user-menu>`);
		cy.get("ui5-user-menu").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-responsive-popover]").as("responsivePopover");
		cy.get("@responsivePopover").should("exist");
		cy.get("@responsivePopover").find("ui5-panel").contains("Other accounts (1)");
		cy.get("@responsivePopover").find("ui5-button").should("have.length", 1);
	});

	it("tests config show-add-account", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn" show-other-accounts show-add-account>
							<ui5-user-menu-account slot="accounts"
												   title-text="Alain Chevalier 1"
												   additional-text="alian.chevalier@sap.com"
												   description="Delivery Manager, SAP SE"
												   selected>
							</ui5-user-menu-account>
							<ui5-user-menu-account slot="accounts"
												   initials="AC"
												   title-text="Alain Chevalier 2"
												   additional-text="test.alian.chevalier@sap.com">
							</ui5-user-menu-account>
						</ui5-user-menu>`);
		cy.get("ui5-user-menu").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-responsive-popover]").as("responsivePopover");
		cy.get("@responsivePopover").should("exist");
		cy.get("@responsivePopover").find(".ui5-pm-add-account-btn").should("exist");
		cy.get("@responsivePopover").find("ui5-button").should("have.length", 2);
	});
});

describe("Menu configuration", () => {
	it("tests config items", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn">
							<ui5-user-menu-account slot="accounts"
												   title-text="Alain Chevalier 1"
												   additional-text="alian.chevalier@sap.com"
												   description="Delivery Manager, SAP SE">
							</ui5-user-menu-account>
							<ui5-user-menu-item text="Setting" data-id="setting"></ui5-user-menu-item>
							<ui5-user-menu-item text="Product-specific account action"
												data-id="account-action2"></ui5-user-menu-item>
						</ui5-user-menu>`);
		cy.get("ui5-user-menu").as("userMenu");
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
												   additional-text="alian.chevalier@sap.com"
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
		cy.get("ui5-user-menu").as("userMenu");
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
												   additional-text="alian.chevalier@sap.com"
												   description="Delivery Manager, SAP SE">
							</ui5-user-menu-account>
							<ui5-user-menu-item icon="action-settings" text="Setting" data-id="setting"></ui5-user-menu-item>
						</ui5-user-menu>`);
		cy.get("ui5-user-menu").as("userMenu");
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
								   additional-text="alian.chevalier@sap.com"
								   description="Delivery Manager, SAP SE">
			</ui5-user-menu-account>
		</ui5-user-menu>`);
		cy.get("ui5-user-menu").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-avatar]").as("avatar");
		cy.get("@avatar").should("exist");
		cy.get("@avatar").should("have.length", 1);
		cy.get("@avatar").should("have.attr", "fallback-icon", "person-placeholder");
	});

	it("tests initials", () => {
		cy.mount(html`<ui5-button id="openUserMenuBtn">Open User Menu</ui5-button>
						<ui5-user-menu open opener="openUserMenuBtn">
							<ui5-user-menu-account slot="accounts"
												   initials="AC"
												   title-text="Alain Chevalier 1"
												   additional-text="alian.chevalier@sap.com"
												   description="Delivery Manager, SAP SE">
							</ui5-user-menu-account>
						</ui5-user-menu>`);
		cy.get("ui5-user-menu").as("userMenu");
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
												   avatar="./../../test/pages/img/man_avatar_1.png"
												   title-text="Alain Chevalier 1"
												   additional-text="alian.chevalier@sap.com"
												   description="Delivery Manager, SAP SE">
							</ui5-user-menu-account>
						</ui5-user-menu>`);
		cy.get("ui5-user-menu").as("userMenu");
		cy.get("@userMenu").should("exist");
		cy.get("@userMenu").shadow().find("[ui5-avatar]").as("avatar");
		cy.get("@avatar").should("exist");
		cy.get("@avatar").should("have.length", 1);
		cy.get("@avatar").find("img").as("image");
		cy.get("@image").should("have.length", 1);
		cy.get("@image").should("have.attr", "src", "./../../test/pages/img/man_avatar_1.png");
	});
});