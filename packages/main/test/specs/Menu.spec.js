const assert = require("chai").assert;

describe("Menu interaction", () => {

	it("Menu opens after button click", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");

		openButton.click();
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#menu");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		assert.strictEqual(await popover.getAttribute("id"), `${staticAreaItemClassName}-menu-rp`, "There is popover for the menu created in the static area");
	});

	it("Top level menu items appearance", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");
		const menuItems = await browser.$$("ui5-menu>ui5-menu-item");

		openButton.click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#menu");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const listItems = await popover.$("ui5-list").$$("ui5-li");

		assert.strictEqual(await menuItems.length, 7, "There are proper count of menu items in the top level menu");
		assert.strictEqual(await listItems.length, 7, "There are proper count of list items in the top level menu popover list");
		assert.strictEqual(await listItems[0].getAttribute("additional-text"), await menuItems[0].getAttribute("additional-text"), "The first list item has proper additional text set");
		assert.strictEqual(await listItems[1].getAttribute("disabled"), "true", "The second list item is disabled");
		assert.strictEqual(await listItems[2].getAttribute("starts-section"), "", "The third list item has separator addded");
		assert.ok(await listItems[3].$(".ui5-menu-item-icon-end"), "The third list item has sub-items and must have arrow right icon after the text");
		assert.ok(await listItems[4].$(".ui5-menu-item-dummy-icon"), "The fourth list item has no icon and has dummy div instead of icon");
	});

	it("Sub-menu creation, opening, closing and destroying", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");

		openButton.click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#menu");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const listItems = await popover.$("ui5-list").$$("ui5-li");

		listItems[3].click(); // open sub-menu

		assert.ok(await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-menu-submenus").$("ui5-menu"),
								"The second level sub-menu is being created"); // new ui5-menu element is created for the sub-menu

		await browser.keys("ArrowLeft"); // back to main menu
		await browser.keys("ArrowDown"); // go to the next menu item (close sub-menu)

		assert.strictEqual(await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-menu-submenus").$$("ui5-menu").length, 0,
								"The second level sub-menu is being destroyed"); // sub-menu ui5-menu element is destroyed
	});

	it("Event firing after 'click' on menu item", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");

		openButton.click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#menu");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const listItems = await popover.$("ui5-list").$$("ui5-li");
		const selectionInput = await browser.$("#selectionInput");

		await listItems[0].click({x: 1, y: 1});

		assert.strictEqual(await selectionInput.getAttribute("value"), "New File", "Click on first item fires an event");
	});

	it("Event firing after [Space] on menu item", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");

		openButton.click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#menu");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const listItems = await popover.$("ui5-list").$$("ui5-li");
		const selectionInput = await browser.$("#selectionInput");

		await browser.keys("Space");

		assert.strictEqual(await selectionInput.getAttribute("value"), "New File", "Pressing [Space] on first item fires an event");
	});

	it("Event firing after [Enter] on menu item", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");

		openButton.click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#menu");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const listItems = await popover.$("ui5-list").$$("ui5-li");
		const selectionInput = await browser.$("#selectionInput");

		await browser.keys("Enter");

		assert.strictEqual(await selectionInput.getAttribute("value"), "New File", "Pressing [Enter] on first item fires an event");
	});
});

describe("Menu Accessibility", () => {
	it("Menu and Menu items accessibility attributes", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");
		const menuItems = await browser.$$("ui5-menu>ui5-menu-item");

		openButton.click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#menu");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const list = await popover.$("ui5-list");
		const listItems = await popover.$("ui5-list").$$("ui5-li");

		assert.strictEqual(await list.getAttribute("accessible-role"), "menu", "There is proper 'menu' role for the menu list");
		assert.strictEqual(await listItems[0].getAttribute("accessible-role"), "menuitem", "There is proper 'menuitem' role for the menu list items");
		assert.strictEqual(
			await listItems[0].getAttribute("accessible-name"),
			"New File Opens a file explorer",
			"There is additional description added");
	});
});
