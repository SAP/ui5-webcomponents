import { assert } from "chai";

describe("Menu interaction", () => {
	it("Menu opens after button click", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");

		await openButton.click();

		const menu = await browser.$("#menu");
		const popover = await menu.shadow$("ui5-responsive-popover");
		const _id = await menu.getProperty("_id");
		assert.strictEqual(await popover.getAttribute("id"), `${_id}-menu-rp`, "There is popover for the menu created in the static area");
	});

	it("Menu opens after setting of opener and open", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openerButton = await browser.$("#btnAddOpener");
		const openButton = await browser.$("#btnToggleOpen");

		await openerButton.click();
		await openButton.click();

		const menu = await browser.$("#menu");
		const popover = await menu.shadow$("ui5-responsive-popover");
		const _id = await menu.getProperty("_id");

		assert.strictEqual(await popover.getAttribute("id"), `${_id}-menu-rp`, "There is popover for the menu created in the static area");
	});

	it("Top level menu items appearance", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");
		const menuItems = await browser.$$("#menu > ui5-menu-item");

		await openButton.click();

		assert.strictEqual(await menuItems.length, 7, "There are proper count of menu items in the top level menu");
		assert.strictEqual(await menuItems[0].getAttribute("additional-text"), "Ctrl+Alt+Shift+N", "The first list item has proper additional text set");
		assert.strictEqual(await menuItems[1].getAttribute("disabled"), "true", "The second list item is disabled");
		assert.strictEqual(await menuItems[2].getAttribute("starts-section"), "", "The third list item has separator addded");
		assert.ok(await menuItems[3].$(".ui5-menu-item-icon-end"), "The third list item has sub-items and must have arrow right icon after the text");
		assert.ok(await menuItems[4].$(".ui5-menu-item-dummy-icon"), "The fourth list item has no icon and has dummy div instead of icon");
	});

	it("Sub-menu creation, opening, closing and destroying", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");

		await openButton.click();

		const menuItems = await browser.$$("#menu > ui5-menu-item");

		await menuItems[3].click(); // open sub-menu

		await menuItems[3].shadow$("ui5-responsive-popover").waitForExist({
			timeout: 1000,
			timeoutMsg: "Sub-menu is created"
		})

		assert.ok(await menuItems[3].shadow$("ui5-responsive-popover"), "Submenu created"); // new ui5-menu element is created for the sub-menu
	});

	it("Event firing after 'click' on menu item", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");

		await openButton.click();


		const menuItems = await browser.$$("#menu > ui5-menu-item");
		const selectionInput = await browser.$("#selectionInput");

		await menuItems[0].click({x: 1, y: 1});

		assert.strictEqual(await selectionInput.getAttribute("value"), "New File(selection prevented)", "Click on first item fires an event");
	});

	it("Event firing after [Space] on menu item", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");

		await openButton.click();


		const popover = await browser.$("#menu").shadow$("ui5-responsive-popover");
		const selectionInput = await browser.$("#selectionInput");

		await browser.keys("Space");

		assert.strictEqual(await selectionInput.getAttribute("value"), "New File(selection prevented)", "Pressing [Space] on first item fires an event");
	});

	it("Event firing after [Enter] on menu item", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");

		await openButton.click();

		const selectionInput = await browser.$("#selectionInput");

		await browser.keys("Enter");

		assert.strictEqual(await selectionInput.getAttribute("value"), "New File(selection prevented)", "Pressing [Enter] on first item fires an event");
	});

	it("Events firing on open/close of the menu", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");
		const eventLogger = await browser.$("#eventLogger");

		await openButton.click();
		await browser.pause(100);
		await browser.keys("Escape");

		const eventLoggerValue = await eventLogger.getValue();

		assert.notEqual(eventLoggerValue.indexOf("before-open"), -1, "'before-open' event is fired");
		assert.notEqual(eventLoggerValue.indexOf("open"), -1, "'open' event is fired");
		assert.notEqual(eventLoggerValue.indexOf("before-close"), -1, "'before-close' event is fired");
		assert.notEqual(eventLoggerValue.indexOf("close"), -1, "'close' event is fired");
	});

	it("Menu and Menu items busy indication", async () => {
			await browser.url(`test/pages/Menu.html`);
			const openButton = await browser.$("#btnOpen");
			await openButton.click();

			const menuItems = await browser.$$("#menu > ui5-menu-item");

			await menuItems[2].click();

			// assert.ok(await openMenuList.getProperty("loading"), "Busy property is properly propagated to the ui5-list component.");
			await browser.waitUntil(async () => {
				return await (await menuItems[2].$$("& > ui5-menu-item")).length === 4
			}, 1500, "Two additional nodes have been added.");

			await menuItems[4].click();

			const closeSubmenuPopover = await menuItems[4].shadow$("ui5-responsive-popover");
			const busyIndicator = await closeSubmenuPopover.$("ui5-busy-indicator");
			assert.ok(await busyIndicator.getProperty("active"), "Active attribute is properly set.");
			assert.strictEqual(await busyIndicator.getProperty("size"), "M", "Size attribute is properly set.");
			assert.strictEqual(await busyIndicator.getProperty("delay"), 100, "Delay attribute is properly set.");
		});

		it("Prevent menu closing on item press", async () => {
			await browser.url(`test/pages/Menu.html`);
			const openButton = await browser.$("#btnOpen");
			await openButton.click();

			const newFileItem = await browser.$("#menu > ui5-menu-item[text='New File(selection prevented)']");
			const menuPopover = await browser.$("#menu").shadow$("ui5-responsive-popover");

			await newFileItem.click();

			assert.ok(await menuPopover.getProperty("open"), "Menu is still opened.");

			await browser.keys("Escape");
		});

		it("Enable navigaion over disabled items", async () => {
			await browser.url(`test/pages/Menu.html`);
			const openButton = await browser.$("#btnOpen");
			await openButton.click();

			const menuItem = await browser.$("#menu > ui5-menu-item[text='Preferences']");
			await menuItem.click();

			assert.ok(await menuItem.getProperty("disabled"), "The menu item is disabled");
			assert.ok(await menuItem.matches(":focus"), "The menu item is focused");

			await browser.keys("Escape");
		});

		it("Add endContent to a menu item", async () => {
			await browser.url(`test/pages/Menu.html`);
			const openButton = await browser.$("#btnOpenEndContent");
			await openButton.click();

			const menu = await browser.$("#menuEndContent");
			const menuItem = await browser.$("#menuEndContent > ui5-menu-item[text='New File']");
			const endContent = await menuItem.$$("[ui5-button]");
			const lockButton = await endContent[0];
			await lockButton.click();

			assert.equal(await endContent.length, 3, "The menu item has 3 components in the 'endContent' slot");
			assert.ok(await menuItem.getProperty("disabled"), "The menu item is disabled");
			assert.ok(await menu.getProperty("open"), "The menu remains open");
		});

		it("Focus restored to the menu opener", async () => {
			const openButton = await browser.$("#btnOpen");
			await openButton.click();

			await browser.keys("Escape");
			assert.ok(await openButton.isFocused(), "The oepener button recevied focus");
			assert.ok(await menuItem.matches(":focus"), "The menu item is focused");
		});
	});

describe("Menu Accessibility", () => {
	it("Menu and Menu items accessibility attributes", async () => {
		await browser.url(`test/pages/Menu.html`);
		const openButton = await browser.$("#btnOpen");

		await openButton.click();

		const popover = await browser.$("#menu").shadow$("ui5-responsive-popover");
		const list = await popover.$("ui5-list");
		const menuItem = await browser.$("#menu > ui5-menu-item[text='Open']");
		const menuItem2 = await browser.$("#menu > ui5-menu-item[text='New File(selection prevented)']");

		assert.strictEqual(await list.getAttribute("accessible-role"), "Menu", "There is proper 'menu' role for the menu list");
		assert.strictEqual(await menuItem.shadow$("li").getAttribute("role"), "menuitem", "There is proper 'menuitem' role for the menu list items");
		assert.strictEqual(await menuItem.shadow$("li").getAttribute("aria-haspopup"), "menu", "Popup attribute is properly set");
		assert.strictEqual(await menuItem.getAttribute("accessible-name"), "Choose platform", "Additional description is added");
		assert.strictEqual(
			await menuItem2.getAttribute("accessible-name"),
			"Opens a file explorer",
			"There is additional description added");
	});
});
