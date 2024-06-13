import { html } from 'lit';

const openFunction = () => {
	const menu = document.getElementById("menu");
	menu.open = true;
}

describe("Menu interaction", () => {
	it("Menu opens after button click", () => {
		cy.mount(html`<ui5-button id="btnOpen" @click="${openFunction}">Open Menu</ui5-button>
		<ui5-menu id="menu" opener="btnOpen">
			<ui5-menu-item text="New File"></ui5-menu-item>
		</ui5-menu>`)

		cy.get("[ui5-button]")
			.realClick();

		cy.get("[ui5-menu]")
			.as("menu");

		cy.get("@menu")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("have.attr", "open");
	});

	it("Menu opens after button click", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
		<ui5-menu>
			<ui5-menu-item text="New File"></ui5-menu-item>
		</ui5-menu>`)

		cy.get("[ui5-menu]")
			.as("menu")
			.then($menu => {
				$menu.attr("open", true);
				$menu.attr("opener", "btnOpen");
			});

		cy.get("@menu")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("have.attr", "open");
	});

	it("Menu icons appearance", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
		<ui5-menu open opener="btnOpen">
			<ui5-menu-item text="Item 1.0" icon="open-folder">
				<ui5-menu-item text="1.1"></ui5-menu-item>
			</ui5-menu-item>
			<ui5-menu-item text="Item 2.0"></ui5-menu-item>
		</ui5-menu>`)

		cy.get("[ui5-menu] > [ui5-menu-item]")
			.as("items");

		cy.get("@items")
			.should("have.length", 2)

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

	it("Sub-menu opening", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
		<ui5-menu open opener="btnOpen">
			<ui5-menu-item text="Item 1.0" icon="open-folder">
				<ui5-menu-item text="1.1"></ui5-menu-item>
			</ui5-menu-item>
		</ui5-menu>`)

		cy.get("[ui5-menu]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("have.attr", "open");

		cy.get("[ui5-menu-item][text='Item 1.0']")
			.as("item");

		cy.get("@item")
			.realClick();

		cy.get("@item")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("have.attr", "open");
	});

	it("Enable navigaion over disabled items", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
		<ui5-menu id="menu" opener="btnOpen" open>
			<ui5-menu-item text="Item 1"></ui5-menu-item>
			<ui5-menu-item text="Item 2" disabled></ui5-menu-item>
		</ui5-menu>`)

		cy.get("[ui5-menu] > [ui5-menu-item]")
			.as("items");

		cy.get("@items")
			.eq(0)
			.should("be.focused")

		cy.get("@items")
			.eq(1)
			.realClick()
			.should("be.focused")
			.and("have.attr", "disabled")
	});

	it("Add endContent to a menu item", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
		<ui5-menu id="menu" opener="btnOpen" open>
			<ui5-menu-item text="Item 1">
				<ui5-button slot="endContent">endContent</ui5-button>
			</ui5-menu-item>
		</ui5-menu>`)

		cy.get("[ui5-menu]")
			.as("menu");

		cy.get("@menu")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("have.attr", "open");

		cy.get("@menu")
			.find("[ui5-button]")
			.then(($button) => {
				$button.get(0).addEventListener('click', cy.stub().as('clicked'))
			})

		cy.get("@menu")
			.find("[ui5-button]")
			.realClick();

		cy.get("@menu")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("have.attr", "open");

		cy.get("@clicked")
			.should("have.been.calledOnce");
	});

	it("Menu and Menu items busy indication - with items", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
		<ui5-menu id="menu" opener="btnOpen" open>
			<ui5-menu-item text="Item 1" loading-delay="500" loading>
				<ui5-menu-item text="Item 1.1"></ui5-menu-item>
			</ui5-menu-item>
		</ui5-menu>`)

		cy.get("[ui5-menu] > [ui5-menu-item]")
		.shadow()
		.find("[ui5-list]")
		.should("have.attr", "loading-delay", "500")
		.and("have.attr", "loading")
	});

	it("Menu and Menu items busy indication - without items", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
		<ui5-menu id="menu" opener="btnOpen" open>
			<ui5-menu-item text="Item 1" loading-delay="500" loading></ui5-menu-item>
		</ui5-menu>`)

		cy.get("[ui5-menu] > [ui5-menu-item]")
		.shadow()
		.find("[ui5-busy-indicator]")
		.should("have.attr", "delay", "500")
		.and("have.attr", "active")
	});

	describe("Event firing", () => {
		it("Event firing - 'ui5-item-click' after 'click' on menu item", () => {
			cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
			<ui5-menu open opener="btnOpen">
				<ui5-menu-item text="Item 1.0"></ui5-menu-item>
			</ui5-menu>`)

			cy.get("[ui5-menu-item]:focus")
				.as("item");

			cy.get("[ui5-menu]")
				.then(($item) => {
					$item.get(0).addEventListener('ui5-item-click', cy.stub().as('clicked'))
				})

			cy.get("@item")
				.realClick();

			cy.get("@clicked")
				.should("have.been.calledOnce");
		});

		it("Event firing - 'ui5-item-click' after 'Space' on menu item", () => {
			cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
			<ui5-menu open opener="btnOpen">
				<ui5-menu-item text="Item 1.0"></ui5-menu-item>
			</ui5-menu>`)

			cy.get("[ui5-menu-item]:focus")
				.as("item");

			cy.get("[ui5-menu]")
				.then(($item) => {
					$item.get(0).addEventListener('ui5-item-click', cy.stub().as('clicked'))
				})

			cy.realPress("Space");

			cy.get("@clicked")
				.should("have.been.calledOnce");
		});

		it("Event firing - 'ui5-item-click' after 'Enter' on menu item", () => {
			cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
			<ui5-menu open opener="btnOpen">
				<ui5-menu-item text="Item 1.0"></ui5-menu-item>
			</ui5-menu>`)

			cy.get("[ui5-menu-item]:focus")
				.as("item");

			cy.get("[ui5-menu]")
				.then(($item) => {
					$item.get(0).addEventListener('ui5-item-click', cy.stub().as('clicked'))
				})

			cy.get("@item")
				.realPress("Enter");

			cy.get("@clicked")
				.should("have.been.calledOnce");
		});

		it("Prevent menu closing on item press", () => {
			cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
			<ui5-menu open opener="btnOpen" @ui5-item-click="${(e) => e.preventDefault()}">
				<ui5-menu-item text="Item 1.0"></ui5-menu-item>
			</ui5-menu>`)

			cy.get("[ui5-menu-item]:focus")
				.as("item");

			cy.get("[ui5-menu]")
				.then(($item) => {
					$item.get(0).addEventListener('ui5-item-click', cy.stub().as('clicked'))
				})

			cy.get("@item")
				.realClick();

			cy.get("[ui5-menu]")
				.as("menu");

			cy.get("@clicked")
				.should("have.been.calledOnce");

			cy.get("@menu")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("have.attr", "open");
		});

		it("Events firing on open/close of the menu", () => {
			cy.mount(html`<ui5-button id="btnOpen" @click="${openFunction}">Open Menu</ui5-button>
			<ui5-menu id="menu" opener="btnOpen">
				<ui5-menu-item text="New File"></ui5-menu-item>
			</ui5-menu>`)

			cy.get("[ui5-menu]")
				.then(($item) => {
					$item.get(0).addEventListener('ui5-before-open', cy.stub().as('beforeOpen'))
					$item.get(0).addEventListener('ui5-open', cy.stub().as('open'))
					$item.get(0).addEventListener('ui5-before-close', cy.stub().as('beforeClose'))
					$item.get(0).addEventListener('ui5-close', cy.stub().as('close'))
				})

			cy.get("[ui5-button]")
				.realClick();

			cy.get("[ui5-menu]")
				.as("menu");

			cy.get("@menu")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("have.attr", "open");

			cy.get("@beforeOpen")
				.should("have.been.calledOnce");

			cy.get("@open")
				.should("have.been.calledOnce");

			cy.get("@beforeClose")
				.should("have.not.been.calledOnce");

			cy.get("@close")
				.should("have.not.been.calledOnce");

			cy.realPress("Escape")

			cy.get("@beforeOpen")
				.should("have.been.calledOnce");

			cy.get("@open")
				.should("have.been.calledOnce");

			cy.get("@beforeClose")
				.should("have.been.calledOnce");

			cy.get("@close")
				.should("have.been.calledOnce");
		});

	})

	describe("Accessibility", () => {
		it("Menu and Menu items accessibility attributes", () => {
			cy.mount(html`<ui5-button id="btnOpen">Open Menu</ui5-button>
			<ui5-menu open opener="btnOpen">
				<ui5-menu-item text="Item 1.0" accessible-name="test accessible name">
					<ui5-menu-item text="Item 1.1"></ui5-menu-item>
				</ui5-menu-item>
				<ui5-menu-item text="Item 2.0" accessible-name="test accessible name"></ui5-menu-item>
			</ui5-menu>`)

			cy.get("[ui5-menu]")
				.as("menu");

			cy.get("@menu")
				.shadow()
				.find("[ui5-list]")
				.should("have.attr", "accessible-role", "Menu")

			cy.get("@menu")
				.find("> [ui5-menu-item]")
				.as("items");

			cy.get("@items")
				.eq(0)
				.should("have.attr", "accessible-name", "test accessible name")
				.shadow()
				.find("li")
				.should("have.attr", "role", "menuitem")
				.and("have.attr", "aria-haspopup", "menu")

			cy.get("@items")
				.eq(1)
				.should("have.attr", "accessible-name", "test accessible name")
		});
	})
})