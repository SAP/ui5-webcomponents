import Button from "../../src/Button.js";
import Menu from "../../src/Menu.js";
import MenuItem from "../../src/MenuItem.js";

import openFolder from "@ui5/webcomponents-icons/dist/open-folder.js";
import addFolder from "@ui5/webcomponents-icons/dist/add-folder.js";
import locked from "@ui5/webcomponents-icons/dist/locked.js";
import favorite from "@ui5/webcomponents-icons/dist/favorite.js";

describe("Menu interaction", () => {
	it("Menu opens after button click", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu id="menu" opener="btnOpen">
					<MenuItem text="New File"></MenuItem>
				</Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.ui5MenuOpen({ opener: "btnOpen" });
	});

	it("Menu opens after button click", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu>
					<MenuItem text="New File"></MenuItem>
				</Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.ui5MenuOpen({ opener: "btnOpen" });
	});

	it("Menu icons appearance", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItem text="Item 1.0" icon={openFolder}>
						<MenuItem text="1.1"></MenuItem>
					</MenuItem>
					<MenuItem text="Item 2.0"></MenuItem>
				</Menu>
			</>
		);

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
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItem text="Item 1.0" icon={openFolder}>
						<MenuItem text="1.1"></MenuItem>
					</MenuItem>
				</Menu>
			</>
		);

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
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu id="menu" opener="btnOpen">
					<MenuItem text="Item 1"></MenuItem>
					<MenuItem text="Item 2" disabled></MenuItem>
				</Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.ui5MenuOpen();

		cy.get("[ui5-menu]")
			.ui5MenuOpened();

		cy.get("[ui5-menu] > [ui5-menu-item]")
			.as("items");

		cy.get("@items")
			.last()
			.should("be.visible")
			.ui5MenuItemClick();

		cy.get("@items")
			.last()
			.should("be.focused")
			.and("have.attr", "disabled");
	});

	it("Add endContent to a menu item", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu id="menu" opener="btnOpen">
					<MenuItem text="Item 1">
						<Button slot="endContent">endContent</Button>
					</MenuItem>
				</Menu>
			</>
		);

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
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu id="menu" opener="btnOpen">
					<MenuItem text="Item 1" loadingDelay={500} loading={true}>
						<MenuItem text="Item 1.1"></MenuItem>
					</MenuItem>
				</Menu>
			</>
		);

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
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu id="menu" opener="btnOpen">
					<MenuItem text="Item 1" loadingDelay={500} loading={true}></MenuItem>
				</Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.ui5MenuOpen();

		cy.get("[ui5-menu] > [ui5-menu-item]")
			.shadow()
			.find("[ui5-busy-indicator]")
			.should("have.attr", "delay", "500")
			.and("have.attr", "active");
	});

	it("Restore focus on close", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu id="menu">
					<MenuItem text="Item 1"></MenuItem>
				</Menu>
			</>
		);

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
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu id="menu" loadingDelay={100} loading={true}></Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.as("menu").then($menu => {
				const menu = $menu.get(0) as Menu;

				menu.addEventListener("ui5-open", () => {
					setTimeout(() => {
						menu.loading = false;

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
			cy.mount(
				<>
					<Button id="btnOpen">Open Menu</Button>
					<Menu opener="btnOpen">
						<MenuItem text="Item 1.0"></MenuItem>
					</Menu>
				</>
			);

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
			cy.mount(
				<>
					<Button id="btnOpen">Open Menu</Button>
					<Menu opener="btnOpen">
						<MenuItem text="Item 1.0"></MenuItem>
					</Menu>
				</>
			);

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
			cy.mount(
				<>
					<Button id="btnOpen">Open Menu</Button>
					<Menu opener="btnOpen">
						<MenuItem text="Item 1.0"></MenuItem>
					</Menu>
				</>
			);

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
			cy.mount(
				<>
					<Button id="btnOpen">Open Menu</Button>
					<Menu opener="btnOpen" onui5-item-click={(e: CustomEvent) => e.preventDefault()}>
						<MenuItem text="Item 1.0"></MenuItem>
					</Menu>
				</>
			);

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
			cy.mount(
				<>
					<Button id="btnOpen">Open Menu</Button>
					<Menu id="menu" opener="btnOpen">
						<MenuItem text="New File"></MenuItem>
					</Menu>
				</>
			);

			// Possible solution is to wait until the opener is visible
			cy.get("[ui5-button]")
				.should("be.visible");

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
			cy.mount(
				<>
					<Button id="btnOpen">Open Menu</Button>
					<Menu opener="btnOpen">
						<MenuItem text="Item 1.0" accessibleName="test accessible name">
							<MenuItem text="Item 1.1"></MenuItem>
						</MenuItem>
						<MenuItem text="Item 2.0" accessibleName="test accessible name"></MenuItem>
						<MenuItem text="Item 3.0" additionalText="Ctrl+A"></MenuItem>
					</Menu>
				</>
			);

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
			cy.mount(
				<>
					<Button id="btnOpen">Open Menu</Button>
					<Menu opener="btnOpen">
						<MenuItem text="Item 1.0" icon={openFolder}>
							<MenuItem text="1.1"></MenuItem>
						</MenuItem>
					</Menu>
				</>
			);

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

		it("Menu items - navigation in endContent", () => {
			cy.mount(
				<>
					<Button id="btnOpen">Open Menu</Button>
					<Menu id="menu" opener="btnOpen">
						<MenuItem id="item2" text="Item 2">
							<Button id="newLock" slot="endContent" icon={locked} design="Transparent" />
							<Button id="newFavorite" slot="endContent" icon={favorite} design="Transparent" />
						</MenuItem>
						<MenuItem text="Item3" additionalText="Ctrl+F" icon={addFolder} />
					</Menu>
				</>
			);

			cy.get("[ui5-menu]")
				.ui5MenuOpen();

			cy.get("[ui5-menu] > [ui5-menu-item]").as("items");
			cy.get("[ui5-menu-item] > [ui5-button]").as("buttons");

			cy.get("@items")
				.first()
				.should("be.focused");

			cy.realPress("ArrowRight");
			cy.get("@buttons").first().should("be.focused");

			cy.realPress("ArrowRight");
			cy.get("@buttons").last().should("be.focused");

			cy.realPress("ArrowRight");
			cy.get("@buttons").last().should("be.focused");

			cy.realPress("ArrowLeft");
			cy.get("@buttons").first().should("be.focused");

			cy.realPress("ArrowLeft");
			cy.get("@buttons").first().should("be.focused");

			cy.realPress("ArrowDown");
			cy.get("@items").last().should("be.focused");
		});
	});
});
