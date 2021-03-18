
const assert = require("chai").assert;

const getOverflowPopover = id => {
	const staticAreaItemClassName = browser.getStaticAreaItemClassName(`#${id}`);
	return browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-overflow-popover");
}

const getOverflowChildProp = (id, pos, prop) => {
	const popover = getOverflowPopover(id);

	return browser.execute((popover, pos, prop) => {
		return popover.querySelectorAll("ui5-li")[pos].getAttribute(prop);
	}, popover, pos, prop);
}

const getCustomActionProp = (id, pos, prop) => {
	const shellbar = browser.$(`#${id}`);

	return browser.execute((shellbar, pos, prop) => {
		return shellbar.shadowRoot.querySelectorAll(".ui5-shellbar-custom-item")[pos].getAttribute(prop);
	}, shellbar, pos, prop);
}

describe("Component Behavior", () => {
	before(() => {
		browser.url("http://localhost:8081/test-resources/pages/ShellBar.html");
	});

	describe("ui5-shellbar-item", () => {
		it("tests count property", () => {
			const shellbar = browser.$("#shellbarwithitems");
			const icon = shellbar.shadow$("ui5-button[data-count]");

			assert.strictEqual(icon.getAttribute("data-count"), '42', "Count property propagates to ui5-button");
		});

		it("tests if shellbar item invalidates the shellbar", () => {
			const shellbar = browser.$("#test-invalidation");
			const item = browser.$("#test-invalidation-item");

			item.setProperty("count", "3");

			assert.strictEqual(shellbar.shadow$(".ui5-shellbar-custom-item").getAttribute("data-count"), "3");

		})
	});

	describe("Responsiveness", () => {

		it("tests XXL Breakpoint 1920px", () => {

			browser.setWindowSize(1920, 1080);

			const shellbar = browser.$("#shellbar");
			const overflowButton = browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
			const backButton = browser.$("#shellbar ui5-button[slot='startButton'");
			const primaryTitle = browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button-title");
			const secondaryTitle = browser.$("#shellbar").shadow$(".ui5-shellbar-secondary-title");
			const searchIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-search-button");
			const customActionIcon1 = browser.$("#shellbar").shadow$(".ui5-shellbar-custom-item");
			const customActionIcon2 = browser.$("#shellbar").shadow$(".ui5-shellbar-custom-item:nth-child(4)");
			const notificationsIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-bell-button");
			const profileIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-image-button");
			const productSwitchIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");

			assert.strictEqual(shellbar.getProperty("breakpointSize") === "XXL", true, "XXL Breakpoint class should be set");
			assert.strictEqual(overflowButton.isDisplayed(), false, "Overflow button should be hidden");
			assert.strictEqual(backButton.isDisplayed(), true, "Back icon is visible");
			assert.strictEqual(primaryTitle.isDisplayed(), true, "Primary title should be visible");
			assert.strictEqual(secondaryTitle.isDisplayed(), true, "Secondary title should be visible");
			assert.strictEqual(searchIcon.isDisplayed(), true, "Search icon should be visible");
			assert.strictEqual(customActionIcon1.isDisplayed(), true, "Custom Action 1 should be visible");
			assert.strictEqual(customActionIcon2.isDisplayed(), true, "Custom Action 2 should be visible");
			assert.strictEqual(notificationsIcon.isDisplayed(), true, "Notifications icon should be visible");
			assert.strictEqual(profileIcon.isDisplayed(), true, "Profile icon should be visible");
			assert.strictEqual(productSwitchIcon.isDisplayed(), true, "Product switch should be visible");
		});

		it("tests XL Breakpoint 1820px", () => {
			browser.setWindowSize(1820, 1080);

			const shellbar = browser.$("#shellbar");

			assert.strictEqual(shellbar.getProperty("breakpointSize") === "XL", true, "XL Breakpoint class should be set");
		});

		it("tests L Breakpoint 1400px", () => {
			browser.setWindowSize(1400, 1080);

			const shellbar = browser.$("#shellbar");
			const overflowButton = browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
			const backButton = browser.$("#shellbar ui5-button[slot='startButton'");
			const primaryTitle = browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button-title");
			const secondaryTitle = browser.$("#shellbar").shadow$(".ui5-shellbar-secondary-title");
			const searchIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-search-button");
			const customActionIcon1 = browser.$("#shellbar").shadow$(".ui5-shellbar-custom-item");
			const customActionIcon2 = browser.$("#shellbar").shadow$(".ui5-shellbar-custom-item:nth-child(4)");
			const notificationsIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-bell-button");
			const profileIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-image-button");
			const productSwitchIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");

			assert.strictEqual(shellbar.getProperty("breakpointSize") === "L", true, "L Breakpoint class should be set");
			assert.strictEqual(overflowButton.isDisplayed(), false, "Overflow button should be hidden");
			assert.strictEqual(backButton.isDisplayed(), true, "Back icon is visible");
			assert.strictEqual(primaryTitle.isDisplayed(), true, "Primary title should be visible");
			assert.strictEqual(secondaryTitle.isDisplayed(), true, "Secondary title should be visible");
			assert.strictEqual(searchIcon.isDisplayed(), true, "Search icon should be visible");
			assert.strictEqual(customActionIcon1.isDisplayed(), true, "Custom Action 1 should be visible");
			assert.strictEqual(customActionIcon2.isDisplayed(), true, "Custom Action 2 should be visible");
			assert.strictEqual(notificationsIcon.isDisplayed(), true, "Notifications icon should be visible");
			assert.strictEqual(profileIcon.isDisplayed(), true, "Profile icon should be visible");
			assert.strictEqual(productSwitchIcon.isDisplayed(), true, "Product switch should be visible");
		});

		it("tests M Breakpoint and overflow 870px", () => {
			browser.setWindowSize(870, 1080);

			const shellbar = browser.$("#shellbar");
			const overflowButton = browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
			const backButton = browser.$("#shellbar ui5-button[slot='startButton'");
			const primaryTitle = browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button-title");
			const secondaryTitle = browser.$("#shellbar").shadow$(".ui5-shellbar-secondary-title");
			const searchIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-search-button");
			const customActionIcon1 = browser.$("#shellbar").shadow$(".ui5-shellbar-custom-item");
			const customActionIcon2 = browser.$("#shellbar").shadow$(".ui5-shellbar-custom-item:nth-child(2)");
			const notificationsIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-bell-button");
			const profileIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-image-button");
			const productSwitchIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");

			const overflowPopover =  getOverflowPopover("shellbar");
			const overflowPopoverItem1Icon = getOverflowChildProp("shellbar", 0, "icon");
			const overflowPopoverItem2Icon = getOverflowChildProp("shellbar", 1, "icon");

			overflowButton.click();

			const listItemsCount = overflowPopover.getHTML().split("</ui5-li>").length - 1;

			assert.strictEqual(shellbar.getProperty("breakpointSize") === "M", true, "M Breakpoint class should be set");
			assert.strictEqual(overflowButton.isDisplayed(), true, "Overflow button should be visible");
			assert.strictEqual(backButton.isDisplayed(), true, "Back icon is visible");
			assert.strictEqual(primaryTitle.isDisplayed(), true, "Primary title should be visible");
			assert.strictEqual(secondaryTitle.isDisplayed(), false, "Secondary title should be hidden");
			assert.strictEqual(searchIcon.isDisplayed(), true, "Search icon should be visible");
			assert.strictEqual(customActionIcon1.isDisplayed(), false, "Custom Action 1 should be hidden");
			assert.strictEqual(customActionIcon2.isDisplayed(), false, "Custom Action 2 should be hidden");
			assert.strictEqual(notificationsIcon.isDisplayed(), true, "Notifications icon should be visible");
			assert.strictEqual(profileIcon.isDisplayed(), true, "Profile icon should be visible");
			assert.strictEqual(productSwitchIcon.isDisplayed(), true, "Product switch should be visible");
			assert.strictEqual(overflowPopover.isDisplayedInViewport(), true, "Overflow popover should be visible");
			assert.strictEqual(listItemsCount, 2, "2 actions should overflow");
			assert.strictEqual(overflowPopoverItem1Icon, getCustomActionProp("shellbar", 0, "icon"), "Popover items have same sources as corresponding icons", overflowPopoverItem1Icon);
			assert.strictEqual(overflowPopoverItem2Icon, getCustomActionProp("shellbar", 1, "icon"), "Popover items have same sources as corresponding icons", overflowPopoverItem2Icon);
		});

		it("tests M Breakpoint and overflow 780px", () => {
			browser.setWindowSize(780, 1080);

			const shellbar = browser.$("#shellbar");
			const productSwitchIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");
			const staticAreaItemClassName = browser.getStaticAreaItemClassName("#shellbar")
			const overflowPopover = browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-overflow-popover");

			assert.strictEqual(shellbar.getProperty("breakpointSize") === "M", true, "M Breakpoint class should be set");

			const listItemsCount = overflowPopover.getHTML().split("</ui5-li>").length - 1;

			assert.strictEqual(listItemsCount, 3, "3 actions should overflow");
			assert.strictEqual(productSwitchIcon.isDisplayed(), false, "Product switch should be hidden");
		});

		it("tests M Breakpoint and overflow 710px", () => {
			browser.setWindowSize(710, 1080);

			const shellbar = browser.$("#shellbar");
			const productSwitchIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");
			const staticAreaItemClassName = browser.getStaticAreaItemClassName("#shellbar")
			const overflowPopover = browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-overflow-popover");
			const notificationsIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-bell-button");

			assert.strictEqual(shellbar.getProperty("breakpointSize") === "M", true, "M Breakpoint class should be set");

			const listItemsCount = overflowPopover.getHTML().split("</ui5-li>").length - 1;

			assert.strictEqual(listItemsCount, 4, "4 actions should overflow");
			assert.strictEqual(productSwitchIcon.isDisplayed(), false, "Product switch should be hidden");
			assert.strictEqual(notificationsIcon.isDisplayed(), false, "Notifications should be hidden");
		});

		it("tests M Breakpoint and overflow 570px", () => {
			browser.setWindowSize(570, 1080);

			const overflowButton = browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
			const searchIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-search-button");

			assert.strictEqual(searchIcon.isDisplayed(), false, "Search should be hidden");
			assert.strictEqual(overflowButton.isDisplayed(), true, "Overflow should be visible");
		});

		it("tests S Breakpoint and overflow 510px", () => {
			browser.setWindowSize(510, 1080);

			const shellbar = browser.$("#shellbar");
			const overflowButton = browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
			const backButton = browser.$("#shellbar ui5-button[slot='startButton'");
			const primaryTitle = browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button-title");
			const secondaryTitle = browser.$("#shellbar").shadow$(".ui5-shellbar-secondary-title");
			const searchIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-search-button");
			const notificationsIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-bell-button");
			const profileIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-image-button");
			const productSwitchIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");
			const staticAreaItemClassName = browser.getStaticAreaItemClassName("#shellbar")
			const overflowPopover = browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-overflow-popover");
			const listItemsCount = overflowPopover.getHTML().split("</ui5-li>").length - 1;

			assert.strictEqual(shellbar.getProperty("breakpointSize") === "S", true, "S Breakpoint class should be set");
			assert.strictEqual(overflowButton.isDisplayed(), true, "Overflow button should be visible");
			assert.strictEqual(backButton.isDisplayed(), true, "Back icon is visible");
			assert.strictEqual(primaryTitle.isDisplayed(), false, "Primary title should be hidden");
			assert.strictEqual(secondaryTitle.isDisplayed(), false, "Secondary title should be hidden");
			assert.strictEqual(searchIcon.isDisplayed(), false, "Search icon should be hidden");
			assert.strictEqual(notificationsIcon.isDisplayed(), false, "Notifications icon should be hidden");
			assert.strictEqual(profileIcon.isDisplayed(), true, "Profile icon should be visible");
			assert.strictEqual(productSwitchIcon.isDisplayed(), false, "Product switch should be hidden");
			assert.strictEqual(listItemsCount, 5, "5 actions should overflow");
		});
	});

	describe("Events", () => {

		describe("Big screen", () => {
			before(() => {
				browser.setWindowSize(1920, 1080);
			});

			it("tests opening of menu", () => {
				const primaryTitle = browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button");
				const staticAreaItemClassName = browser.getStaticAreaItemClassName("#shellbar")
				const menuPopover = browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-menu-popover");

				primaryTitle.click();
				assert.ok(menuPopover.isDisplayedInViewport(), "Menu should be shown");
			});

			it("tests notificationsClick event", () => {
				const notificationsIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-bell-button");
				const input = browser.$("#press-input");

				notificationsIcon.click();


				assert.strictEqual(input.getValue(), "Notifications", "Input value is set by click event of Notifications icon");
			});

			it("tests profileClick event", () => {
				const profileIcon = browser.$("#shellbar").shadow$("[profile-btn]");
				const input = browser.$("#press-input");

				profileIcon.click();
				assert.strictEqual(input.getValue(), "Profile", "Input value is set by click event of Profile");
			});

			it("tests productSwitchClick event", () => {
				const productSwitchIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");
				const input = browser.$("#press-input");

				productSwitchIcon.click();
				assert.strictEqual(input.getValue(), "Product Switch", "Input value is set by click event of Product Switch icon");
			});

			it("tests logoClick event", () => {
				const logo = browser.$("#shellbar").shadow$(".ui5-shellbar-logo");
				const input = browser.$("#press-input");

				logo.click();
				assert.strictEqual(input.getValue(), "Logo", "Input value is set by click event of Logo");
			});

			it("tests coPilotPress event", () => {
				const coPilot = browser.$("#shellbar").shadow$(".ui5-shellbar-coPilot");
				const input = browser.$("#press-input");

				coPilot.click();
				assert.strictEqual(input.getValue(), "CoPilot", "Input value is set by click event of CoPilot");
			});

			it("tests menuItemClick event", () => {
				const primaryTitle = browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button");
				const staticAreaItemClassName = browser.getStaticAreaItemClassName("#shellbar")
				const menuPopover = browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-menu-popover");
				const firstMenuItem = menuPopover.$("ui5-list > ui5-li");
				const secondMenuItem = menuPopover.$("ui5-list > ui5-li:nth-child(2)");
				const input = browser.$("#press-input");
				const inputData = browser.$("#press-data");

				primaryTitle.click();
				firstMenuItem.click();

				assert.strictEqual(input.getValue(), "Application 1", "Input value is set by click event of the first menu item");
				assert.strictEqual(inputData.getValue(), "key1", "The user defined attributes are available.");

				secondMenuItem.click();

				assert.strictEqual(input.getValue(), "Application 2", "Input value is set by click event of the second menu item");
				assert.strictEqual(inputData.getValue(), "key2", "The user defined attributes are available.");
			});

			it("tests if searchfield toggles when clicking on search icon", () => {
				const searchIcon = browser.$("#shellbar").shadow$(".ui5-shellbar-search-button");
				const searchField = browser.$("#shellbar").shadow$(".ui5-shellbar-search-field");

				assert.strictEqual(searchField.isDisplayed(), false, "Search is hidden by default");

				searchIcon.click();
				assert.strictEqual(searchField.isDisplayed(), true, "Search is visible after clicking on icon");

				searchIcon.click();
				assert.strictEqual(searchField.isDisplayed(), false, "Search is hidden after clicking again on the icon");
			});
		});

		describe("Small screen", () => {
			before(() => {
				browser.setWindowSize(510, 1080);
			});

			it("tests logoClick event", () => {
				const logo = browser.$("#shellbarWithLogoClick").shadow$(".ui5-shellbar-logo");
				const title = "SAPLabsBulgaria";
				const input = browser.$("#press-input2");

				logo.click();
				assert.strictEqual(input.getValue(), title, "Input value is set by click event of Logo");
			});

			it("tests opening of menu", () => {
				const primaryTitle = browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button");
				const staticAreaItemClassName = browser.getStaticAreaItemClassName("#shellbar")
				const menuPopover = browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-menu-popover");

				primaryTitle.click();
				assert.ok(menuPopover.isDisplayedInViewport(), "Menu should be shown");
			});

			it("tests notificationsClick event", () => {
				const overflowButton = browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
				const staticAreaItemClassName = browser.getStaticAreaItemClassName("#shellbar")
				const overflowPopover = browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-overflow-popover");
				const notificationListItem = overflowPopover.$("ui5-list ui5-li:nth-child(4)");
				const input = browser.$("#press-input");

				overflowButton.click();
				notificationListItem.click();

				assert.strictEqual(input.getValue(), "Notifications", "Input value is set by click event of Notifications icon");
				assert.ok(overflowPopover.isDisplayed(), "overflow popover should not be closed");
			});

			it("tests profileClick event", () => {
				const profileIcon = browser.$("#shellbar").shadow$("[profile-btn]");
				const input = browser.$("#press-input");

				profileIcon.click();
				assert.strictEqual(input.getValue(), "Profile", "Input value is set by click event of Profile");
			});

			it("tests productSwitchClick event", () => {
				const overflowButton = browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
				const staticAreaItemClassName = browser.getStaticAreaItemClassName("#shellbar")
				const overflowPopover = browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-overflow-popover");
				const productSwitchIcon = overflowPopover.$("ui5-list ui5-li:nth-child(5)");
				const input = browser.$("#press-input");

				overflowButton.click();
				productSwitchIcon.click();

				assert.strictEqual(input.getValue(), "Product Switch", "Input value is set by click event of Product Switch icon");
			});

			it("tests preventDefault of productSwitchClick event", () => {
				const overflowButton = browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
				const staticAreaItemClassName = browser.getStaticAreaItemClassName("#shellbar")
				const overflowPopover = browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-overflow-popover");
				const productSwitchIcon = overflowPopover.$("ui5-list ui5-li:nth-child(5)");

				overflowButton.click();
				productSwitchIcon.click();

				assert.ok(overflowPopover.isDisplayed(), "overflow popover should not be closed");
			});

			it("tests if searchfield toggles when clicking on search icon", () => {
				const overflowButton = browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
				const searchField = browser.$("#shellbar").shadow$(".ui5-shellbar-search-full-width-wrapper");
				const cancelButton = browser.$("#shellbar").shadow$(".ui5-shellbar-search-full-width-wrapper .ui5-shellbar-button");
				const staticAreaItemClassName = browser.getStaticAreaItemClassName("#shellbar")
				const overflowPopover = browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-shellbar-overflow-popover");
				const searchListItem = overflowPopover.$("ui5-list ui5-li:nth-child(1)");

				assert.strictEqual(searchField.isDisplayed(), false, "Search is hidden by default");

				overflowButton.click();
				searchListItem.click();

				assert.strictEqual(searchField.isDisplayed(), true, "Search is visible after clicking on the search icon within the overflow");

				cancelButton.click();
				assert.strictEqual(searchField.isDisplayed(), false, "Search is hidden after clicking on the search icon agian");
			});
		});
	});
});
