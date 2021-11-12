const assert = require("chai").assert;
const PORT = require("./_port.js");
HANDLE_RESIZE_DEBOUNCE_RATE_WAIT = 250; // ms

const getOverflowPopover = async id => {
	const staticAreaItemClassName = await browser.getStaticAreaItemClassName(`#${id}`);
	return browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-overflow-popover");
}

const getOverflowChildProp = async (id, pos, prop) => {
	const popover = await getOverflowPopover(id);

	return browser.executeAsync((popover, pos, prop, done) => {
		done([...popover.querySelectorAll("ui5-li")][pos].getAttribute(prop));
	}, popover, pos, prop);
}

const getCustomActionProp = async (id, pos, prop) => {
	const shellbar = await browser.$(`#${id}`);

	return browser.executeAsync((shellbar, pos, prop, done) => {
		done([...shellbar.shadowRoot.querySelectorAll(".ui5-shellbar-custom-item")][pos].getAttribute(prop));
	}, shellbar, pos, prop);
}

describe("Component Behavior", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ShellBar.html`);
	});


	describe("ui5-shellbar menu", () => {
		it("tests close on content click", async () => {
			const primaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#shellbar")
			const menuPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-menu-popover");
			const firstMenuItem = await menuPopover.$("ui5-list > ui5-li");

			await primaryTitle.click();
			await firstMenuItem.click();

			assert.strictEqual(await menuPopover.getProperty("opened"), false, "Count property propagates to ui5-button");
		});
	});


	describe("ui5-shellbar-item", async () => {
		it("tests count property", async () => {
			const shellbar = await browser.$("#shellbarwithitems");
			const icon = await shellbar.shadow$("ui5-button[data-count]");

			assert.strictEqual(await icon.getAttribute("data-count"), '42', "Count property propagates to ui5-button");
		});

		it("tests if shellbar item invalidates the shellbar", async () => {
			const shellbar = await browser.$("#test-invalidation");
			const item = await browser.$("#test-invalidation-item");

			await item.setProperty("count", "3");

			assert.strictEqual(await shellbar.shadow$(".ui5-shellbar-custom-item").getAttribute("data-count"), "3");

		});

		it("tests 'click' on custom action", async () => {
			const shellbar = await browser.$("#shellbarwithitems");
			const resultInput = await browser.$("#press-input3");
			const customActionIcon1 = await shellbar.shadow$(`.ui5-shellbar-custom-item[icon="accept"]`);
			const customActionIcon2 = await shellbar.shadow$(`.ui5-shellbar-custom-item[icon="alert"]`);

			await customActionIcon1.click();
			assert.strictEqual(await resultInput.getProperty("value"), "accept",
				"click, fired by the first item");

			await customActionIcon2.click();
			assert.strictEqual(await resultInput.getProperty("value"), "warning",
				"click, fired by the second item");
		});
	});

	describe("Responsiveness", () => {

		it("tests XXL Breakpoint 1920px", async () => {

			await browser.setWindowSize(1920, 1080);

			setTimeout(async () => {
				const shellbar = await browser.$("#shellbar");
				const overflowButton = await browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
				const backButton = await browser.$("#shellbar ui5-button[slot='startButton'");
				const primaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button-title");
				const secondaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-secondary-title");
				const searchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-search-button");
				const customActionIcon1 = await browser.$("#shellbar").shadow$(".ui5-shellbar-custom-item");
				const customActionIcon2 = await browser.$("#shellbar").shadow$(".ui5-shellbar-custom-item:nth-child(4)");
				const notificationsIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-bell-button");
				const profileIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-image-button");
				const productSwitchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");

				assert.strictEqual(await shellbar.getProperty("breakpointSize"), "XXL", "XXL Breakpoint class should be set");
				assert.notOk(await overflowButton.isDisplayed(), "Overflow button should be hidden");
				assert.ok(await backButton.isDisplayed(), "Back icon is visible");
				assert.ok(await primaryTitle.isDisplayed(), "Primary title should be visible");
				assert.ok(await secondaryTitle.isDisplayed(), "Secondary title should be visible");
				assert.ok(await searchIcon.isDisplayed(), "Search icon should be visible");
				assert.ok(await customActionIcon1.isDisplayed(), "Custom Action 1 should be visible");
				assert.ok(await customActionIcon2.isDisplayed(), "Custom Action 2 should be visible");
				assert.ok(await notificationsIcon.isDisplayed(), "Notifications icon should be visible");
				assert.ok(await profileIcon.isDisplayed(), "Profile icon should be visible");
				assert.ok(await productSwitchIcon.isDisplayed(), "Product switch should be visible");
			}, HANDLE_RESIZE_DEBOUNCE_RATE_WAIT);
		});

		it("tests XL Breakpoint 1820px", async () => {
			await browser.setWindowSize(1820, 1080);

			setTimeout(async () => {
				const shellbar = await browser.$("#shellbar");

				assert.strictEqual(await shellbar.getProperty("breakpointSize"), "XL", "XL Breakpoint class should be set");
			}, HANDLE_RESIZE_DEBOUNCE_RATE_WAIT);
		});

		it("tests L Breakpoint 1400px", async () => {
			await browser.setWindowSize(1400, 1080);

			setTimeout(async () => {
				const shellbar = await browser.$("#shellbar");
				const overflowButton = await browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
				const backButton = await browser.$("#shellbar ui5-button[slot='startButton'");
				const primaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button-title");
				const secondaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-secondary-title");
				const searchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-search-button");
				const customActionIcon1 = await browser.$("#shellbar").shadow$(".ui5-shellbar-custom-item");
				const customActionIcon2 = await browser.$("#shellbar").shadow$(".ui5-shellbar-custom-item:nth-child(4)");
				const notificationsIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-bell-button");
				const profileIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-image-button");
				const productSwitchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");

				assert.strictEqual(await shellbar.getProperty("breakpointSize"), "L", "L Breakpoint class should be set");
				assert.notOk(await overflowButton.isDisplayed(), "Overflow button should be hidden");
				assert.ok(await backButton.isDisplayed(), "Back icon is visible");
				assert.ok(await primaryTitle.isDisplayed(), "Primary title should be visible");
				assert.ok(await secondaryTitle.isDisplayed(), "Secondary title should be visible");
				assert.ok(await searchIcon.isDisplayed(), "Search icon should be visible");
				assert.ok(await customActionIcon1.isDisplayed(), "Custom Action 1 should be visible");
				assert.ok(await customActionIcon2.isDisplayed(), "Custom Action 2 should be visible");
				assert.ok(await notificationsIcon.isDisplayed(), "Notifications icon should be visible");
				assert.ok(await profileIcon.isDisplayed(), "Profile icon should be visible");
				assert.ok(await productSwitchIcon.isDisplayed(), "Product switch should be visible");
			}, HANDLE_RESIZE_DEBOUNCE_RATE_WAIT);
		});

		it("tests M Breakpoint and overflow 870px", async () => {
			await browser.setWindowSize(870, 1080);

			setTimeout(async () => {
				const shellbar = await browser.$("#shellbar");
				const overflowButton = await browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
				const backButton = await browser.$("#shellbar ui5-button[slot='startButton'");
				const primaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button-title");
				const secondaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-secondary-title");
				const searchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-search-button");
				const customActionIcon1 = await browser.$("#shellbar").shadow$(".ui5-shellbar-custom-item");
				const customActionIcon2 = await browser.$("#shellbar").shadow$(".ui5-shellbar-custom-item:nth-child(2)");
				const notificationsIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-bell-button");
				const profileIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-image-button");
				const productSwitchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");

				const overflowPopover = await getOverflowPopover("shellbar");
				const overflowPopoverItem1Icon = await getOverflowChildProp("shellbar", 0, "icon");
				const overflowPopoverItem2Icon = await getOverflowChildProp("shellbar", 1, "icon");

				await overflowButton.click();

				const listItemsCount = (await overflowPopover.getHTML()).split("</ui5-li>").length - 1;

				assert.strictEqual(await shellbar.getProperty("breakpointSize"), "M", "M Breakpoint class should be set");
				assert.ok(await overflowButton.isDisplayed(), "Overflow button should be visible");
				assert.ok(await backButton.isDisplayed(), "Back icon is visible");
				assert.ok(await primaryTitle.isDisplayed(), "Primary title should be visible");
				assert.notOk(await secondaryTitle.isDisplayed(), "Secondary title should be hidden");
				assert.ok(await searchIcon.isDisplayed(), "Search icon should be visible");
				assert.notOk(await customActionIcon1.isDisplayed(), "Custom Action 1 should be hidden");
				assert.notOk(await customActionIcon2.isDisplayed(), "Custom Action 2 should be hidden");
				assert.ok(await notificationsIcon.isDisplayed(), "Notifications icon should be visible");
				assert.ok(await profileIcon.isDisplayed(), "Profile icon should be visible");
				assert.ok(await productSwitchIcon.isDisplayed(), "Product switch should be visible");
				assert.ok(await overflowPopover.isDisplayedInViewport(), "Overflow popover should be visible");
				assert.strictEqual(listItemsCount, 2, "2 actions should overflow");
				assert.strictEqual(overflowPopoverItem1Icon, await getCustomActionProp("shellbar", 0, "icon"), "Popover items have same sources as corresponding icons");
				assert.strictEqual(overflowPopoverItem2Icon, await getCustomActionProp("shellbar", 1, "icon"), "Popover items have same sources as corresponding icons");
			}, HANDLE_RESIZE_DEBOUNCE_RATE_WAIT);
		});

		it("tests M Breakpoint and overflow 780px", async () => {
			await browser.setWindowSize(780, 1080);

			setTimeout(async () => {
				const shellbar = await browser.$("#shellbar");
				const productSwitchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");
				const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#shellbar")
				const overflowPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-overflow-popover");

				assert.strictEqual(await shellbar.getProperty("breakpointSize"), "M", "M Breakpoint class should be set");

				const listItemsCount = (await overflowPopover.getHTML()).split("</ui5-li>").length - 1;

				assert.strictEqual(listItemsCount, 3, "3 actions should overflow");
				assert.strictEqual(await productSwitchIcon.isDisplayed(), false, "Product switch should be hidden");
			}, HANDLE_RESIZE_DEBOUNCE_RATE_WAIT);
		});

		it("tests M Breakpoint and overflow 710px", async () => {
			await browser.setWindowSize(710, 1080);

			setTimeout(async () => {
				const shellbar = await browser.$("#shellbar");
				const productSwitchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");
				const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#shellbar")
				const overflowPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-overflow-popover");
				const notificationsIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-bell-button");

				assert.strictEqual(await shellbar.getProperty("breakpointSize"), "M", "M Breakpoint class should be set");

				const listItemsCount = (await overflowPopover.getHTML().split("</ui5-li>")).length - 1;

				assert.strictEqual(listItemsCount, 4, "4 actions should overflow");
				assert.strictEqual(await productSwitchIcon.isDisplayed(), false, "Product switch should be hidden");
				assert.strictEqual(await notificationsIcon.isDisplayed(), false, "Notifications should be hidden");
			}, HANDLE_RESIZE_DEBOUNCE_RATE_WAIT);
		});

		it("tests M Breakpoint and overflow 570px", async () => {
			await browser.setWindowSize(570, 1080);

			setTimeout(async () => {
				const overflowButton = await browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
				const searchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-search-button");

				assert.notOk(await searchIcon.isDisplayed(), "Search should be hidden");
				assert.ok(await overflowButton.isDisplayed(), "Overflow should be visible");
			}, HANDLE_RESIZE_DEBOUNCE_RATE_WAIT);
		});

		it("tests S Breakpoint and overflow 510px", async () => {
			await browser.setWindowSize(510, 1080);

			setTimeout(async () => {
				const shellbar = await browser.$("#shellbar");
				const overflowButton = await browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
				const backButton = await browser.$("#shellbar ui5-button[slot='startButton'");
				const primaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button-title");
				const secondaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-secondary-title");
				const searchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-search-button");
				const notificationsIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-bell-button");
				const profileIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-image-button");
				const productSwitchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");
				const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#shellbar")
				const overflowPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-overflow-popover");
				const listItemsCount = await overflowPopover.getHTML().split("</ui5-li>").length - 1;

				assert.strictEqual(await shellbar.getProperty("breakpointSize"), "S", "S Breakpoint class should be set");
				assert.ok(await overflowButton.isDisplayed(), "Overflow button should be visible");
				assert.ok(await backButton.isDisplayed(), "Back icon is visible");
				assert.notOk(await primaryTitle.isDisplayed(), "Primary title should be hidden");
				assert.notOk(await secondaryTitle.isDisplayed(), "Secondary title should be hidden");
				assert.notOk(await searchIcon.isDisplayed(), "Search icon should be hidden");
				assert.notOk(await notificationsIcon.isDisplayed(), "Notifications icon should be hidden");
				assert.ok(await profileIcon.isDisplayed(), "Profile icon should be visible");
				assert.notOk(await productSwitchIcon.isDisplayed(), "Product switch should be hidden");
				assert.strictEqual(listItemsCount, 5, "5 actions should overflow");
			}, HANDLE_RESIZE_DEBOUNCE_RATE_WAIT);
		});
	});

	describe("Events", () => {

		describe("Big screen", () => {
			before(async () => {
				await browser.setWindowSize(1920, 1080);
			});

			it("tests opening of menu", async () => {
				const primaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button");
				const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#shellbar")
				const menuPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-menu-popover");

				await primaryTitle.click();
				assert.ok(await menuPopover.isDisplayedInViewport(), "Menu should be shown");
			});

			it("tests notificationsClick event", async () => {
				const notificationsIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-bell-button");
				const input = await browser.$("#press-input");

				await notificationsIcon.click();


				assert.strictEqual(await input.getValue(), "Notifications", "Input value is set by click event of Notifications icon");
			});

			it("tests profileClick event", async () => {
				const profileIcon = await browser.$("#shellbar").shadow$("[profile-btn]");
				const input = await browser.$("#press-input");

				await profileIcon.click();
				assert.strictEqual(await input.getValue(), "Profile", "Input value is set by click event of Profile");
			});

			it("tests productSwitchClick event", async () => {
				const productSwitchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");
				const input = await browser.$("#press-input");

				await productSwitchIcon.click();
				assert.strictEqual(await input.getValue(), "Product Switch", "Input value is set by click event of Product Switch icon");
			});

			it("tests logoClick event", async () => {
				const logo = await browser.$("#shellbar").shadow$(".ui5-shellbar-logo");
				const input = await browser.$("#press-input");

				await logo.click();
				assert.strictEqual(await input.getValue(), "Logo", "Input value is set by click event of Logo");
			});

			it("tests coPilotPress event", async () => {
				const coPilot = await browser.$("#shellbar").shadow$(".ui5-shellbar-coPilot");
				const input = await browser.$("#press-input");

				await coPilot.click();
				assert.strictEqual(await input.getValue(), "CoPilot", "Input value is set by click event of CoPilot");
			});

			it("tests menuItemClick event", async () => {
				const primaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button");
				const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#shellbar")
				const menuPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-menu-popover");
				const firstMenuItem = await menuPopover.$("ui5-list > ui5-li");
				const secondMenuItem = await menuPopover.$("ui5-list > ui5-li:nth-child(2)");
				const input = await browser.$("#press-input");
				const inputData = await browser.$("#press-data");

				await primaryTitle.click();
				await firstMenuItem.click();

				assert.strictEqual(await input.getValue(), "Application 1", "Input value is set by click event of the first menu item");
				assert.strictEqual(await inputData.getValue(), "key1", "The user defined attributes are available.");

				await primaryTitle.click();
				await secondMenuItem.click();

				assert.strictEqual(await input.getValue(), "Application 2", "Input value is set by click event of the second menu item");
				assert.strictEqual(await inputData.getValue(), "key2", "The user defined attributes are available.");
			});

			it("tests if searchfield toggles when clicking on search icon", async () => {
				const searchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-search-button");
				const searchField = await browser.$("#shellbar").shadow$(".ui5-shellbar-search-field");

				assert.strictEqual(await searchField.isDisplayed(), false, "Search is hidden by default");

				await searchIcon.click();
				assert.ok(await searchField.isDisplayed(), "Search is visible after clicking on icon");

				await searchIcon.click();
				assert.notOk(await searchField.isDisplayed(), "Search is hidden after clicking again on the icon");
			});
		});

		describe("Small screen", () => {
			before(async () => {
				await browser.setWindowSize(510, 1080);
			});

			it("tests logoClick event", async () => {
				const logo = await browser.$("#shellbarWithLogoClick").shadow$(".ui5-shellbar-logo");
				const title = "SAPLabsBulgaria";
				const input = await browser.$("#press-input2");

				await logo.click();
				assert.strictEqual(await input.getValue(), title, "Input value is set by click event of Logo");
			});

			it("tests opening of menu", async () => {
				const primaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button");
				const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#shellbar")
				const menuPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-menu-popover");

				await primaryTitle.click();
				assert.ok(await menuPopover.isDisplayedInViewport(), "Menu should be shown");
			});

			it("tests notificationsClick event", async () => {
				const overflowButton = await browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
				const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#shellbar")
				const overflowPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-overflow-popover");
				const notificationListItem = await overflowPopover.$("ui5-list ui5-li:nth-child(4)");
				const input = await browser.$("#press-input");

				await overflowButton.click();
				await notificationListItem.click();

				assert.strictEqual(await input.getValue(), "Notifications", "Input value is set by click event of Notifications icon");
				assert.ok(await overflowPopover.isDisplayed(), "overflow popover should not be closed");
			});

			it("tests profileClick event", async () => {
				const profileIcon = await browser.$("#shellbar").shadow$("[profile-btn]");
				const input = await browser.$("#press-input");

				await profileIcon.click();
				assert.strictEqual(await input.getValue(), "Profile", "Input value is set by click event of Profile");
			});

			it("tests productSwitchClick event", async () => {
				const overflowButton = await browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
				const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#shellbar")
				const overflowPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-overflow-popover");
				const productSwitchIcon = await overflowPopover.$("ui5-list ui5-li:nth-child(5)");
				const input = await browser.$("#press-input");

				await overflowButton.click();
				await productSwitchIcon.click();

				assert.strictEqual(await input.getValue(), "Product Switch", "Input value is set by click event of Product Switch icon");
			});

			it("tests preventDefault of productSwitchClick event", async () => {
				const overflowButton = await browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
				const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#shellbar")
				const overflowPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-overflow-popover");
				const productSwitchIcon = await overflowPopover.$("ui5-list ui5-li:nth-child(5)");

				await overflowButton.click();
				await productSwitchIcon.click();

				assert.ok(await overflowPopover.isDisplayed(), "overflow popover should not be closed");
			});

			it("tests if searchfield toggles when clicking on search icon", async () => {
				const overflowButton = await browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
				const searchField = await browser.$("#shellbar").shadow$(".ui5-shellbar-search-full-width-wrapper");
				const cancelButton = await browser.$("#shellbar").shadow$(".ui5-shellbar-search-full-width-wrapper .ui5-shellbar-button");
				const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#shellbar")
				const overflowPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-overflow-popover");
				const searchListItem = await overflowPopover.$("ui5-list ui5-li:nth-child(1)");

				assert.notOk(await searchField.isDisplayed(), "Search is hidden by default");

				await overflowButton.click();
				await searchListItem.click();

				assert.ok(await searchField.isDisplayed(), "Search is visible after clicking on the search icon within the overflow");

				await cancelButton.click();
				assert.notOk(await searchField.isDisplayed(), "Search is hidden after clicking on the search icon agian");
			});
		});
	});
});
