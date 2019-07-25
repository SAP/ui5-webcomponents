const assert = require('assert');

describe("Component Behaviour", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/ShellBar.html");

	describe("Responsiveness", () => {

		it("tests XXL Breakpoint 1920px", () => {

			browser.setWindowSize(1920, 1080);

			const shellbar = browser.findElementDeep("#shellbar");
			const overflowButton = browser.findElementDeep("#shellbar >>> .ui5-shellbar-overflow-button");
			const backButton = browser.findElementDeep("#shellbar ui5-icon");
			const primaryTitle = browser.findElementDeep("#shellbar >>> .ui5-shellbar-menu-button-title");
			const secondaryTitle = browser.findElementDeep("#shellbar >>> .ui5-shellbar-secondary-title");
			const searchIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-search-button");
			const customActionIcon1 = browser.findElementDeep("#shellbar >>> .ui5-shellbar-custom-item:first-child");
			const customActionIcon2 = browser.findElementDeep("#shellbar >>> .ui5-shellbar-custom-item:nth-child(2)");
			const notificationsIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-bell-button");
			const profileIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-image-button");
			const productSwitchIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-button-product-switch");

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

			const shellbarWrapper = browser.findElementDeep("#shellbar >>> div");
			const shellbar = browser.findElementDeep("#shellbar");

			assert.strictEqual(shellbar.getProperty("breakpointSize") === "XL", true, "XL Breakpoint class should be set");
		});

		it("tests L Breakpoint 1400px", () => {
			browser.setWindowSize(1400, 1080);

			const shellbar = browser.findElementDeep("#shellbar");			
			const overflowButton = browser.findElementDeep("#shellbar >>> .ui5-shellbar-overflow-button");
			const backButton = browser.findElementDeep("#shellbar ui5-icon");
			const primaryTitle = browser.findElementDeep("#shellbar >>> .ui5-shellbar-menu-button-title");
			const secondaryTitle = browser.findElementDeep("#shellbar >>> .ui5-shellbar-secondary-title");
			const searchIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-search-button");
			const customActionIcon1 = browser.findElementDeep("#shellbar >>> .ui5-shellbar-custom-item:first-child");
			const customActionIcon2 = browser.findElementDeep("#shellbar >>> .ui5-shellbar-custom-item:nth-child(2)");
			const notificationsIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-bell-button");
			const profileIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-image-button");
			const productSwitchIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-button-product-switch");

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

			const shellbar = browser.findElementDeep("#shellbar");
			const shellbarWrapper = browser.findElementDeep("#shellbar >>> div");
			const overflowButton = browser.findElementDeep("#shellbar >>> .ui5-shellbar-overflow-button");
			const backButton = browser.findElementDeep("#shellbar ui5-icon");
			const primaryTitle = browser.findElementDeep("#shellbar >>> .ui5-shellbar-menu-button-title");
			const secondaryTitle = browser.findElementDeep("#shellbar >>> .ui5-shellbar-secondary-title");
			const searchIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-search-button");
			const customActionIcon1 = browser.findElementDeep("#shellbar >>> .ui5-shellbar-custom-item:first-child");
			const customActionIcon2 = browser.findElementDeep("#shellbar >>> .ui5-shellbar-custom-item:nth-child(2)");
			const notificationsIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-bell-button");
			const profileIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-image-button");
			const productSwitchIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-button-product-switch");
			const overflowPopover = browser.findElementDeep("#shellbar >>> .ui5-shellbar-overflow-popover");
			const overflowPopoverItem1 = browser.findElementDeep("#shellbar >>> .ui5-shellbar-overflow-popover ui5-li:first-child");
			const overflowPopoverItem2 = browser.findElementDeep("#shellbar >>> .ui5-shellbar-overflow-popover ui5-li:nth-child(2)");

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
			assert.strictEqual(overflowPopover.isDisplayed(), true, "Overflow popover should be visible");
			assert.strictEqual(listItemsCount, 2, "2 actions should overflow");
			assert.strictEqual(overflowPopoverItem1.getProperty("icon"), customActionIcon1.getProperty("src"), "Popover items have same sources as corresponding icons");
			assert.strictEqual(overflowPopoverItem2.getProperty("icon"), customActionIcon2.getProperty("src"), "Popover items have same sources as corresponding icons");

		});

		it("tests M Breakpoint and overflow 780px", () => {
			browser.setWindowSize(780, 1080);

			const shellbar = browser.findElementDeep("#shellbar");
			const productSwitchIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-button-product-switch");
			const overflowPopover = browser.findElementDeep("#shellbar >>> .ui5-shellbar-overflow-popover");

			assert.strictEqual(shellbar.getProperty("breakpointSize") === "M", true, "M Breakpoint class should be set");

			const listItemsCount = overflowPopover.getHTML().split("</ui5-li>").length - 1;

			assert.strictEqual(listItemsCount, 3, "3 actions should overflow");
			assert.strictEqual(productSwitchIcon.isDisplayed(), false, "Product switch should be hidden");
		});

		it("tests M Breakpoint and overflow 710px", () => {
			browser.setWindowSize(710, 1080);

			const shellbar = browser.findElementDeep("#shellbar");
			const productSwitchIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-button-product-switch");
			const overflowPopover = browser.findElementDeep("#shellbar >>> .ui5-shellbar-overflow-popover");
			const notificationsIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-bell-button");

			assert.strictEqual(shellbar.getProperty("breakpointSize") === "M", true, "M Breakpoint class should be set");

			const listItemsCount = overflowPopover.getHTML().split("</ui5-li>").length - 1;

			assert.strictEqual(listItemsCount, 4, "4 actions should overflow");
			assert.strictEqual(productSwitchIcon.isDisplayed(), false, "Product switch should be hidden");
			assert.strictEqual(notificationsIcon.isDisplayed(), false, "Notifications should be hidden");
		});

		it("tests M Breakpoint and overflow 570px", () => {
			browser.setWindowSize(570, 1080);

			const overflowButton = browser.findElementDeep("#shellbar >>> .ui5-shellbar-overflow-button");
			const searchIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-search-button");

			assert.strictEqual(searchIcon.isDisplayed(), false, "Search should be hidden");
			assert.strictEqual(overflowButton.isDisplayed(), true, "Overflow should be visible");
		});

		it("tests S Breakpoint and overflow 510px", () => {
			browser.setWindowSize(510, 1080);

			const shellbar = browser.findElementDeep("#shellbar");
			const overflowButton = browser.findElementDeep("#shellbar >>> .ui5-shellbar-overflow-button");
			const backButton = browser.findElementDeep("#shellbar ui5-icon");
			const primaryTitle = browser.findElementDeep("#shellbar >>> .ui5-shellbar-menu-button-title");
			const secondaryTitle = browser.findElementDeep("#shellbar >>> .ui5-shellbar-secondary-title");
			const searchIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-search-button");
			const notificationsIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-bell-button");
			const profileIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-image-button");
			const productSwitchIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-button-product-switch");
			const overflowPopover = browser.findElementDeep("#shellbar >>> .ui5-shellbar-overflow-popover");
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
				const primaryTitle = browser.findElementDeep("#shellbar >>> .ui5-shellbar-menu-button");
				const menuPopover = browser.findElementDeep("#shellbar >>> .ui5-shellbar-menu-popover");
	
				primaryTitle.click();
				assert.ok(menuPopover.isDisplayedInViewport(), "Menu should be shown");
			});

			it("tests notificationsPress event", () => {
				const notificationsIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-bell-button");
				const input = browser.findElementDeep("#press-input");

				notificationsIcon.click();


				assert.strictEqual(input.getValue(), "Notifications", "Input value is set by click event of Notifications icon");
			});

			it("tests profilePress event", () => {
				const profileIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-image-button");
				const input = browser.findElementDeep("#press-input");

				profileIcon.click();
				assert.strictEqual(input.getValue(), "Profile", "Input value is set by click event of Profile");
			});

			it("tests productSwitchPress event", () => {
				const productSwitchIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-button-product-switch");
				const input = browser.findElementDeep("#press-input");

				productSwitchIcon.click();
				assert.strictEqual(input.getValue(), "Product Switch", "Input value is set by click event of Product Switch icon");
			});

			it("tests logoPress event", () => {
				const logo = browser.findElementDeep("#shellbar >>> .ui5-shellbar-logo");
				const input = browser.findElementDeep("#press-input");

				logo.click();
				assert.strictEqual(input.getValue(), "Logo", "Input value is set by click event of Logo");
			});

			it("tests coPilotPress event", () => {
				const coPilot = browser.findElementDeep("#shellbar >>> .ui5-shellbar-coPilot");
				const input = browser.findElementDeep("#press-input");

				coPilot.click();
				assert.strictEqual(input.getValue(), "CoPilot", "Input value is set by click event of CoPilot");
			});

			it("tests menuItemPress event", () => {
				const primaryTitle = browser.findElementDeep("#shellbar >>> .ui5-shellbar-menu-button");
				const firstMenuItem = browser.findElementDeep("#shellbar #menu-item-1");
				const secondMenuItem = browser.findElementDeep("#shellbar #menu-item-2");
				const input = browser.findElementDeep("#press-input");
	
				primaryTitle.click();
				firstMenuItem.click();

				assert.strictEqual(input.getValue(), "Application 1", "Input value is set by click event of the first menu item");

				secondMenuItem.click();

				assert.strictEqual(input.getValue(), "Application 2", "Input value is set by click event of the second menu item");
			});

			it("tests if searchfield appears when clicking on search icon", () => {
				const searchIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-search-button");
				const searchField = browser.findElementDeep("#shellbar ui5-input");
				const blockLayer = browser.findElementDeep("#shellbar >>> .ui5-shellbar-block-layer");

				assert.strictEqual(searchField.isDisplayed(), false, "Search is hidden by default");

				searchIcon.click();
				assert.strictEqual(searchField.isDisplayed(), true, "Search is visible after clicking on icon");

				// focus out the input
				blockLayer.click();
				assert.strictEqual(searchField.isDisplayed(), false, "Search is hidden when focussed out");
			});
		});

		describe("Small screen", () => {
			before(() => {
				browser.setWindowSize(510, 1080);
			});

			it("tests opening of menu", () => {
				const primaryTitle = browser.findElementDeep("#shellbar >>> .ui5-shellbar-menu-button");
				const menuPopover = browser.findElementDeep("#shellbar >>> .ui5-shellbar-menu-popover");
	
				primaryTitle.click();
				assert.ok(menuPopover.isDisplayedInViewport(), "Menu should be shown");
			});

			it("tests notificationsPress event", () => {
				const overflowButton = browser.findElementDeep("#shellbar >>> .ui5-shellbar-overflow-button");
				const notificationListItem = browser.findElementDeep("#shellbar >>> ui5-list ui5-li:nth-child(4)");
				const input = browser.findElementDeep("#press-input");

				overflowButton.click();
				notificationListItem.click();

				assert.strictEqual(input.getValue(), "Notifications", "Input value is set by click event of Notifications icon");
			});

			it("tests profilePress event", () => {
				const profileIcon = browser.findElementDeep("#shellbar >>> .ui5-shellbar-image-button");
				const input = browser.findElementDeep("#press-input");

				profileIcon.click();
				assert.strictEqual(input.getValue(), "Profile", "Input value is set by click event of Profile");
			});

			it("tests productSwitchPress event", () => {
				const overflowButton = browser.findElementDeep("#shellbar >>> .ui5-shellbar-overflow-button");
				const productSwitchIcon = browser.findElementDeep("#shellbar >>> ui5-list ui5-li:nth-child(5)");
				const input = browser.findElementDeep("#press-input");

				overflowButton.click();
				productSwitchIcon.click();

				assert.strictEqual(input.getValue(), "Product Switch", "Input value is set by click event of Product Switch icon");
			});

			it("tests if searchfield appears when clicking on search icon", () => {
				const searchListItem = browser.findElementDeep("#shellbar >>> ui5-list ui5-li:nth-child(1)");
				const searchField = browser.findElementDeep("#shellbar ui5-input");
				const blockLayer = browser.findElementDeep("#shellbar >>> .ui5-shellbar-block-layer");
				const overflowButton = browser.findElementDeep("#shellbar >>> .ui5-shellbar-overflow-button");

				assert.strictEqual(searchField.isDisplayed(), false, "Search is hidden by default");

				overflowButton.click();
				searchListItem.click();

				assert.strictEqual(searchField.isDisplayed(), true, "Search is visible after clicking on icon");

				// focus out the input
				blockLayer.click();
				assert.strictEqual(searchField.isDisplayed(), false, "Search is hidden when focussed out");
			});
		});
	});
});