import { html } from "lit";
import "../../src/Button.js";
import "../../src/Menu.js";
import "../../src/MenuItem.js";
import type MenuItem from "../../src/MenuItem.js";

describe("Menu interaction", () => {
	it("Menu opens after button click", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
		<ui5-menu id="menu" opener="btnOpen">
			<ui5-menu-item text="New File"></ui5-menu-item>
		</ui5-menu>`);

		cy.get("[ui5-menu]")
			.ui5MenuOpen({ opener: "btnOpen" });
	});

	it("Menu opens after button click", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
		<ui5-menu>
			<ui5-menu-item text="New File"></ui5-menu-item>
		</ui5-menu>`);

		cy.get("[ui5-menu]")
			.ui5MenuOpen({ opener: "btnOpen" });
	});

	it("Menu icons appearance", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
		<ui5-menu opener="btnOpen">
			<ui5-menu-item text="Item 1.0" icon="open-folder">
				<ui5-menu-item text="1.1"></ui5-menu-item>
			</ui5-menu-item>
			<ui5-menu-item text="Item 2.0"></ui5-menu-item>
		</ui5-menu>`);

		cy.get("[ui5-menu]")
			.ui5MenuOpen();

		cy.get("[ui5-menu] > [ui5-menu-item]")
			.as("items");

		cy.get("@items")
			.should("have.length", 2);

		cy.get("@items")
			.eq(0)
			.shadow()
			.find("[ui5-icon].ui5-menu-item-icon-end")
			.should("exist");

		cy.get("@items")
			.eq(1)
			.shadow()
			.find(".ui5-menu-item-dummy-icon")
			.should("exist");
	});

	it("Restore focus to previous element after close", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
		<ui5-menu opener="btnOpen">
			<ui5-menu-item text="Item 1.0" icon="open-folder">
				<ui5-menu-item text="1.1"></ui5-menu-item>
			</ui5-menu-item>
		</ui5-menu>`);

		cy.get("[ui5-menu]")
			.ui5MenuOpen();

		cy.get("[ui5-menu]")
			.ui5MenuOpened();

		cy.get("[ui5-menu-item][text='Item 1.0']")
			.as("item")
			.ui5MenuItemClick();

		cy.get("@item")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("have.attr", "open");
	});

	it("Enable navigaion over disabled items", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
		<ui5-menu id="menu" opener="btnOpen">
			<ui5-menu-item text="Item 1"></ui5-menu-item>
			<ui5-menu-item text="Item 2" disabled></ui5-menu-item>
		</ui5-menu>`);

		cy.get("[ui5-menu]")
			.ui5MenuOpen();

		cy.get("[ui5-menu]")
			.ui5MenuOpened();

		cy.get("[ui5-menu] > [ui5-menu-item]")
			.as("items");

		cy.get("@items")
			.eq(1)
			.should("be.visible")
			.ui5MenuItemClick();

		cy.get("@items")
			.eq(1)
			.should("be.focused")
			.and("have.attr", "disabled");
	});

	it("Add endContent to a menu item", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
		<ui5-menu id="menu" opener="btnOpen">
			<ui5-menu-item text="Item 1">
				<ui5-button slot="endContent">endContent</ui5-button>
			</ui5-menu-item>
		</ui5-menu>`);

		cy.get("[ui5-menu]")
			.ui5MenuOpen();

		cy.get("[ui5-menu]")
			.as("menu")
			.ui5MenuOpened();

		cy.get("@menu")
			.find("[ui5-button]")
			.then($button => {
				$button.get(0).addEventListener("click", cy.stub().as("clicked"));
			});

		cy.get("@menu")
			.find("[ui5-button]")
			.realClick();

		cy.get("@menu")
			.ui5MenuOpened();

		cy.get("@clicked")
			.should("have.been.calledOnce");
	});

	it("Menu and Menu items busy indication - with items", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
		<ui5-menu id="menu" opener="btnOpen">
			<ui5-menu-item text="Item 1" loading-delay="500" loading>
				<ui5-menu-item text="Item 1.1"></ui5-menu-item>
			</ui5-menu-item>
		</ui5-menu>`);

		cy.get("[ui5-menu]")
			.ui5MenuOpen();

		cy.get("[ui5-menu]")
			.ui5MenuOpened();

		cy.get("[ui5-menu] > [ui5-menu-item]")
			.shadow()
			.find("[ui5-list]")
			.should("have.attr", "loading-delay", "500")
			.and("have.attr", "loading");
	});

	it("Menu and Menu items busy indication - without items", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
		<ui5-menu id="menu" opener="btnOpen">
			<ui5-menu-item text="Item 1" loading-delay="500" loading></ui5-menu-item>
		</ui5-menu>`);

		cy.get("[ui5-menu]")
			.ui5MenuOpen();

		cy.get("[ui5-menu] > [ui5-menu-item]")
			.shadow()
			.find("[ui5-busy-indicator]")
			.should("have.attr", "delay", "500")
			.and("have.attr", "active");
	});

	it("Restore focus on close", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
		<ui5-menu id="menu">
			<ui5-menu-item text="Item 1"></ui5-menu-item>
		</ui5-menu>`);

		cy.get("#btnOpen")
			.as("button")
			.realClick();

		cy.get("@button")
			.should("be.focused");

		cy.get("[ui5-menu]")
			.as("menu")
			.ui5MenuOpen({
				opener: "btnOpen",
			});

		cy.get("[ui5-menu]")
			.ui5MenuOpened();

		cy.get("[ui5-menu-item]")
			.ui5MenuItemPress("Space");

		cy.get("@button")
			.should("be.focused");
	});

	it("Set focus on first item", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
		<ui5-menu id="menu" loading loading-delay="100">
		</ui5-menu>`);

		cy.get("[ui5-menu]")
			.as("menu").then($menu => {
				const menu = $menu.get(0) as Menu;

				menu.addEventListener("ui5-before-open", () => {
					setTimeout(() => {
						menu.loading = false;
						menu.loadingDelay = 0;

						const oneNode = document.createElement("ui5-menu-item") as MenuItem;
						oneNode.text = "Open from Amazon Cloud";

						const twoNode = document.createElement("ui5-menu-item") as MenuItem;
						twoNode.text = "Open from Google Cloud";

						menu.append(oneNode, twoNode);
						menu.focus();
					}, 1000);
				});
			});

		cy.get("@menu").ui5MenuOpen({
			opener: "btnOpen",
		});

		cy.get("[ui5-menu]")
			.ui5MenuOpened();

		cy.get("[ui5-menu-item][text='Open from Amazon Cloud']").as("item");

		cy.get("@item")
			.should("be.focused");
	});

	describe("Event firing", () => {
		it("Event firing - 'ui5-item-click' after 'click' on menu item", () => {
			cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
			<ui5-menu opener="btnOpen">
				<ui5-menu-item text="Item 1.0"></ui5-menu-item>
			</ui5-menu>`);

			cy.get("[ui5-menu]")
				.ui5MenuOpen();

			cy.get("[ui5-menu]")
				.then($item => {
					$item.get(0).addEventListener("ui5-item-click", cy.stub().as("clicked"));
				});

			cy.get("[ui5-menu]")
				.ui5MenuOpened();

			cy.get("[ui5-menu-item]")
				.ui5MenuItemClick();

			cy.get("@clicked")
				.should("have.been.calledOnce");
		});

		it("Event firing - 'ui5-item-click' after 'Space' on menu item", () => {
			cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
			<ui5-menu opener="btnOpen">
				<ui5-menu-item text="Item 1.0"></ui5-menu-item>
			</ui5-menu>`);

			cy.get("[ui5-menu]")
				.ui5MenuOpen();

			cy.get("[ui5-menu]")
				.then($menu => {
					$menu.get(0).addEventListener("ui5-item-click", cy.stub().as("clicked"));
				});

			cy.get("[ui5-menu]")
				.ui5MenuOpened();

			cy.get("[ui5-menu-item]")
				.ui5MenuItemPress("Space");

			cy.get("@clicked")
				.should("have.been.calledOnce");
		});

		it("Event firing - 'ui5-item-click' after 'Enter' on menu item", () => {
			cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
			<ui5-menu opener="btnOpen">
				<ui5-menu-item text="Item 1.0"></ui5-menu-item>
			</ui5-menu>`);

			cy.get("[ui5-menu]")
				.ui5MenuOpen();

			cy.get("[ui5-menu]")
				.then($item => {
					$item.get(0).addEventListener("ui5-item-click", cy.stub().as("clicked"));
				});

			cy.get("[ui5-menu]")
				.ui5MenuOpened();

			cy.get("[ui5-menu-item]")
				.ui5MenuItemPress("Enter");

			cy.get("@clicked")
				.should("have.been.calledOnce");
		});

		it("Prevent menu closing on item press", () => {
			cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
			<ui5-menu opener="btnOpen" @ui5-item-click="${(e: CustomEvent) => e.preventDefault()}">
				<ui5-menu-item text="Item 1.0"></ui5-menu-item>
			</ui5-menu>`);

			cy.get("[ui5-menu]")
				.ui5MenuOpen();

			cy.get("[ui5-menu]")
				.as("menu")
				.then($item => {
					$item.get(0).addEventListener("ui5-item-click", cy.stub().as("clicked"));
				});

			cy.get("@menu")
				.ui5MenuOpened();

			cy.get("[ui5-menu-item]:focus")
				.as("item");

			cy.get("@item")
				.ui5MenuItemClick();

			cy.get("@clicked")
				.should("have.been.calledOnce");

			cy.get("@menu")
				.ui5MenuOpened();
		});

		it("Events firing on open/close of the menu", () => {
			cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
			<ui5-menu id="menu" opener="btnOpen">
				<ui5-menu-item text="New File"></ui5-menu-item>
			</ui5-menu>`);

			cy.get("[ui5-menu]")
				.then($item => {
					$item.get(0).addEventListener("ui5-before-open", cy.stub().as("beforeOpen"));
					$item.get(0).addEventListener("ui5-open", cy.stub().as("open"));
					$item.get(0).addEventListener("ui5-before-close", cy.stub().as("beforeClose"));
					$item.get(0).addEventListener("ui5-close", cy.stub().as("close"));
				});

			cy.get("[ui5-menu]")
				.as("menu")
				.ui5MenuOpen();

			cy.get("@beforeOpen")
				.should("have.been.calledOnce");

			cy.get("@open")
				.should("have.been.calledOnce");

			cy.get("@beforeClose")
				.should("have.not.been.calledOnce");

			cy.get("@close")
				.should("have.not.been.calledOnce");

			cy.get("@menu")
				.ui5MenuOpened();

			cy.get("[ui5-menu-item]:focus")
				.ui5MenuItemClick();

			cy.get("@beforeOpen")
				.should("have.been.calledOnce");

			cy.get("@open")
				.should("have.been.calledOnce");

			cy.get("@beforeClose")
				.should("have.been.calledOnce");

			cy.get("@close")
				.should("have.been.calledOnce");

			cy.get("@menu")
				.should("not.have.attr", "open");
		});
	});

	describe("Accessibility", () => {
		it("Menu and Menu items accessibility attributes", () => {
			cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
			<ui5-menu opener="btnOpen">
				<ui5-menu-item text="Item 1.0" accessible-name="test accessible name">
					<ui5-menu-item text="Item 1.1"></ui5-menu-item>
				</ui5-menu-item>
				<ui5-menu-item text="Item 2.0" accessible-name="test accessible name"></ui5-menu-item>
				<ui5-menu-item text="Item 3.0" additional-text="Ctrl+A"></ui5-menu-item>
			</ui5-menu>`);

			cy.get("[ui5-menu]")
				.ui5MenuOpen();

			cy.get("[ui5-menu]")
				.as("menu");

			cy.get("@menu")
				.shadow()
				.find("[ui5-list]")
				.should("have.attr", "accessible-role", "Menu");

			cy.get("@menu")
				.find("> [ui5-menu-item]")
				.as("items");

			cy.get("@items")
				.eq(0)
				.should("have.attr", "accessible-name", "test accessible name")
				.shadow()
				.find("li")
				.should("have.attr", "role", "menuitem")
				.and("have.attr", "aria-haspopup", "menu");

			cy.get("@items")
				.eq(1)
				.should("have.attr", "accessible-name", "test accessible name");

			cy.get<MenuItem[]>("@items")
				.eq<MenuItem>(2)
				.then($el => {
					$el.get(0).accessibilityAttributes = {
						ariaKeyShortcuts: "Ctrl+A",
						role: "alertdialog",
					};
				});

			cy.get("@items")
				.eq(2)
				.shadow()
				.find("li")
				.should("have.attr", "aria-keyshortcuts", "Ctrl+A");

			cy.get("@items")
				.eq(2)
				.shadow()
				.find("li")
				.should("have.attr", "role", "alertdialog");

			cy.get("@items")
				.eq(2)
				.shadow()
				.find("li .ui5-li-additional-text")
				.should("have.attr", "aria-hidden", "true");
		});

		it("Menu popover has an accessible name", () => {
			cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
			<ui5-menu opener="btnOpen">
				<ui5-menu-item text="Item 1.0" icon="open-folder">
					<ui5-menu-item text="1.1"></ui5-menu-item>
				</ui5-menu-item>
			</ui5-menu>`);

			cy.get("[ui5-menu]")
				.ui5MenuOpen();

			cy.get("[ui5-menu]")
				.ui5MenuOpened();

			cy.get("[ui5-menu]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("have.attr", "accessible-name", "Select an option from the menu");

			cy.get("[ui5-menu-item][text='Item 1.0']")
				.as("item")
				.ui5MenuItemClick();

			cy.get("@item")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("have.attr", "accessible-name", "Select an option from the menu");
		});
	});
});
