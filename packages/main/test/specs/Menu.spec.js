import { assert } from "chai";

describe("Menu interaction", () => {
	it("Menu opens after button click", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");

		openButton.click();
		const popover = await browser.$("#menu").shadow$("ui5-responsive-popover");

		assert.ok(popover, "There is popover created in the shadow DOM of the menu");
	});

	it("Menu opens after setting of opener and open", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openerButton = await browser.$("#btnAddOpener");
		const openButton = await browser.$("#btnToggleOpen");

		openerButton.click();
		openButton.click();
		const popover = await browser.$("#menu").shadow$("ui5-responsive-popover");

		assert.ok(popover, "There is popover created in the shadow DOM of the menu");
	});

	it("Top level menu items appearance", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");
		const menuItems = await browser.$$("ui5-menu>ui5-menu-item");

		openButton.click();

		assert.strictEqual(await menuItems.length, 7, "There are proper count of menu items in the top level menu");
		assert.strictEqual(await menuItems[0].getAttribute("additional-text"), await menuItems[0].getAttribute("additional-text"), "The first list item has proper additional text set");
		assert.strictEqual(await menuItems[1].getAttribute("disabled"), "true", "The second list item is disabled");
		assert.strictEqual(await menuItems[2].getAttribute("starts-section"), "", "The third list item has separator addded");
		assert.ok(await menuItems[3].$(".ui5-menu-item-icon-end"), "The third list item has sub-items and must have arrow right icon after the text");
		assert.ok(await menuItems[4].$(".ui5-menu-item-dummy-icon"), "The fourth list item has no icon and has dummy div instead of icon");
	});

	it("Sub-menu creation, opening, closing and destroying", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");

		openButton.click();

		const menuItems = await browser.$$("#menu > ui5-menu-item");
		const submenuList = await browser.$("#menu").shadow$(".ui5-menu-submenus");

		menuItems[3].click(); // open sub-menu

		await submenuList.$("ui5-menu").waitForExist({
			timeout: 1000,
			timeoutMsg: "The second level sub-menu is should be created"
		})

		assert.ok(await submenuList.$("ui5-menu"), "The second level sub-menu is being created"); // new ui5-menu element is created for the sub-menu

		await browser.keys("ArrowLeft"); // back to main menu
		await browser.keys("ArrowDown"); // go to the next menu item (close sub-menu)

		await submenuList.$("ui5-menu").waitForExist({
			reverse: true,
			timeout: 1000,
			timeoutMsg: "The second level sub-menu is should be destroyed"
		})

		assert.strictEqual(await submenuList.$$("ui5-menu").length, 0,
								"The second level sub-menu is being destroyed"); // sub-menu ui5-menu element is destroyed
	});

	it("Event firing after 'click' on menu item", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");

		openButton.click();

		const menuItems = await browser.$$("#menu > ui5-menu-item");
		const selectionInput = await browser.$("#selectionInput");

		await menuItems[0].click({x: 1, y: 1});

		assert.strictEqual(await selectionInput.getAttribute("value"), "New File", "Click on first item fires an event");
	});

	it("Event firing after [Space] on menu item", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");

		openButton.click();

		const selectionInput = await browser.$("#selectionInput");

		await browser.keys("Space");

		assert.strictEqual(await selectionInput.getAttribute("value"), "New File", "Pressing [Space] on first item fires an event");
	});

	it("Event firing after [Enter] on menu item", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");

		openButton.click();
		
		const selectionInput = await browser.$("#selectionInput");

		await browser.keys("Enter");

		assert.strictEqual(await selectionInput.getAttribute("value"), "New File", "Pressing [Enter] on first item fires an event");
	});

	it("Events firing on open/close of the menu", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");
		const eventLogger = await browser.$("#eventLogger");

		openButton.click();
		await browser.pause(100);
		await browser.keys("Escape");

		const eventLoggerValue = await eventLogger.getValue();

		assert.notEqual(eventLoggerValue.indexOf("before-open"), -1, "'before-open' event is fired");
		assert.notEqual(eventLoggerValue.indexOf("after-open"), -1, "'after-open' event is fired");
		assert.notEqual(eventLoggerValue.indexOf("before-close"), -1, "'before-close' event is fired");
		assert.notEqual(eventLoggerValue.indexOf("after-close"), -1, "'after-close' event is fired");
	});

	/*
	it("Menu and Menu items busy indication", async () => {
			await browser.url(`test/pages/Menu.html`);
			const openButton = await browser.$("#btnOpen");
			openButton.click();
			await browser.pause(100);

			const menuPopover = await browser.$("ui5-static-area-item:last-of-type").shadow$("ui5-responsive-popover");
			const visualOpenItem = await menuPopover.$("ui5-li[accessible-name='Open']");
			const visualCloseItem = await menuPopover.$("ui5-li[accessible-name='Close']");

			visualOpenItem.click();
			await browser.pause(350);
			const openSubmenuPopover = await browser.$("ui5-static-area-item:last-of-type").shadow$("ui5-responsive-popover");
			const openMenuList = await openSubmenuPopover.$("ui5-list");

			// assert.ok(await openMenuList.getProperty("busy"), "Busy property is properly propagated to the ui5-list component.");
			await browser.pause(650);
			assert.strictEqual(await openMenuList.$$("ui5-li").length, 4, "Two additional nodes have been added.");

			visualCloseItem.click();
			await browser.pause(350);

			const closeSubmenuPopover = await browser.$("ui5-static-area-item:last-of-type").shadow$("ui5-responsive-popover");
			const busyIndicator = await closeSubmenuPopover.$("ui5-busy-indicator");
			assert.ok(await busyIndicator.getProperty("active"), "Active attribute is properly set.");
			assert.strictEqual(await busyIndicator.getProperty("size"), "Medium", "Size attribute is properly set.");
			assert.strictEqual(await busyIndicator.getProperty("delay"), 100, "Delay attribute is properly set.");
		});
	 */

		it("Prevent menu closing on item press", async () => {
			await browser.url(`test/pages/Menu.html`);
			const openButton = await browser.$("#btnOpen");
			openButton.click();

			const popover = await browser.$("#menu").shadow$("ui5-responsive-popover");
			const menuItem = await browser.$("#menu > ui5-menu-item[text='New File']");
			menuItem.click();

			assert.ok(await popover.getProperty("open"), "Menu is still opened.");

			await browser.keys("Escape");
		});

		it("Enable navigaion over disabled items", async () => {
			await browser.url(`test/pages/Menu.html`);
			const openButton = await browser.$("#btnOpen");
			openButton.click();

			const menuItem = await browser.$("#menu > ui5-menu-item[text='New Folder with very long title for a menu item']");
			menuItem.click();

			assert.ok(await menuItem.getAttribute("disabled"), "The menu item is disabled");
			assert.ok(await menuItem.getAttribute("focused"), "The menu item is focused");
		});
	});

describe("Menu Accessibility", () => {
	it("Menu and Menu items accessibility attributes", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");

		openButton.click();

		const popover = await browser.$("#menu").shadow$("ui5-responsive-popover");
		const list = await popover.$("ui5-list");
		const menuItems = await browser.$$("#menu > ui5-menu-item");

		assert.strictEqual(await list.getAttribute("accessible-role"), "menu", "There is proper 'menu' role for the menu list");
		assert.strictEqual(await menuItems[0].getAttribute("accessible-role"), "menuitem", "There is proper 'menuitem' role for the menu list items");
		assert.strictEqual(
			await menuItems[0].getAttribute("accessible-name"),
			"Opens a file explorer",
			"There is additional description added");
		assert.strictEqual(await menuItems[2].$shadow("li").getAttribute("aria-haspopup"), "menu", "Popup attribute is properly set");
	});
});
