import { assert } from "chai";
const HANDLE_RESIZE_DEBOUNCE_RATE_WAIT = 250; // ms

const getOverflowPopover = async id => {
	return browser.$(`#${id}`).shadow$(".ui5-shellbar-overflow-popover");
}

describe("Component Behavior", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/ShellBar.html`);
	});

	describe("Accessibility", () => {
		it("tests accessibilityTexts property", async () => {
			const PROFILE_BTN_CUSTOM_TOOLTIP = "John Dow";
			const LOGO_CUSTOM_TOOLTIP = "Custom logo title";
			const sb = await browser.$("#sbAcc");

			assert.strictEqual(await sb.getProperty("_profileText"), PROFILE_BTN_CUSTOM_TOOLTIP,
				"Profile button tooltip can be customized.");
			assert.strictEqual(await sb.getProperty("_logoText"), LOGO_CUSTOM_TOOLTIP,
				"Logo tooltip can be customized.");
		});

		it("tests acc default roles", async () => {
			const sb = await browser.$("#sbAcc");
			const logoDOM = await sb.shadow$(".ui5-shellbar-logo-area");

			// assert
			assert.strictEqual(await logoDOM.getAttribute("role"), "link",
				"Logo has the correct default role.");
		});

		it("tests acc custom roles", async () => {
			const sb = await browser.$("#sb");
			const logoDOM = await sb.shadow$(".ui5-shellbar-logo-area");

			// assertHANDLE_RESIZE_DEBOUNCE_RATE_WAIT
			assert.strictEqual(await logoDOM.getAttribute("role"), "link",
				"Logo has the correct custom role.");
		});

		it("tests accessibilityAttributes property", async () => {
			const NOTIFICATIONS_BTN_ARIA_HASPOPUP = "dialog";
			const sb = await browser.$("#sbAccAttr");
			const accAttrs = await sb.getProperty("accInfo");

			assert.strictEqual(accAttrs.notifications.accessibilityAttributes.hasPopup, NOTIFICATIONS_BTN_ARIA_HASPOPUP,
				"Notifications aria-haspopup could be customized.");
		});
	});

	describe("ui5-shellbar menu", () => {
		it("tests prevents close on content click", async () => {
			const primaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button");
			const menuPopover = await browser.$(`#shellbar`).shadow$(".ui5-shellbar-menu-popover");
			const firstMenuItem = await menuPopover.$("ui5-list > ui5-li");
			const checkBox = await browser.$("#checkKeepPopoverOpen");

			await checkBox.setProperty("checked", true);

			await primaryTitle.click();
			await firstMenuItem.click();

			assert.strictEqual(await menuPopover.getProperty("open"), true, "Popover remains open");
		});

		it("tests close on content click", async () => {
			const primaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button");
			const menuPopover = await browser.$(`#shellbar`).shadow$(".ui5-shellbar-menu-popover");
			const firstMenuItem = await menuPopover.$("ui5-list > ui5-li");
			const checkBox = await browser.$("#checkKeepPopoverOpen");

			await checkBox.setProperty("checked", false);

			await primaryTitle.click();
			await firstMenuItem.click();

			assert.strictEqual(await menuPopover.getProperty("open"), false, "Popover is closed");
		});
	});

	describe("ui5-shellbar-item", async () => {
		it("tests the stable-dom-ref attribute", async () => {
			const shellbar = await browser.$("#shellbarwithitems");
			const innerButtonWithStableDomRef = await shellbar.shadow$(`[data-ui5-stable="schedule"]`);

			assert.ok(await innerButtonWithStableDomRef.isExisting(), "There is indeed an element in the Shellbar's shadow root with an attribute, matching the stable dom ref");
		});

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

			await browser.setWindowSize(1920, 1680);

			await browser.pause(HANDLE_RESIZE_DEBOUNCE_RATE_WAIT);

			const assistant = await browser.$("#shellbar ui5-toggle-button[slot='assistant'");
			const shellbar = await browser.$("#shellbar");
			const overflowButton = await browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
			const backButton = await browser.$("#shellbar ui5-button[slot='startButton'");
			const primaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button-title");
			const secondaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-secondary-title");
			const searchField = await browser.$("#shellbar [slot='searchField']");
			const customActionIcon1 = await browser.$("#shellbar").shadow$(".ui5-shellbar-custom-item");
			const notificationsIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-bell-button");
			const profileIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-image-button");
			const productSwitchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");

			assert.ok(await assistant.isDisplayed(), "assistant is visible");
			assert.strictEqual(await shellbar.getProperty("breakpointSize"), "XXL", "XXL Breakpoint class should be set");
			assert.notOk(await overflowButton.isDisplayed(), "Overflow button should be hidden");
			assert.ok(await backButton.isDisplayed(), "Back icon is visible");
			assert.ok(await primaryTitle.isDisplayed(), "Primary title should be visible");
			assert.ok(await secondaryTitle.isDisplayed(), "Secondary title should be visible");
			assert.ok(await searchField.isDisplayed(), "Search field should be visible");
			assert.ok(await customActionIcon1.isDisplayed(), "Custom Action 1 should be visible");
			assert.ok(await notificationsIcon.isDisplayed(), "Notifications icon should be visible");
			assert.ok(await profileIcon.isDisplayed(), "Profile icon should be visible");
			assert.ok(await productSwitchIcon.isDisplayed(), "Product switch should be visible");
		});

		it("tests XL Breakpoint 1820px", async () => {
			await browser.setWindowSize(1820, 1680);

			await browser.pause(HANDLE_RESIZE_DEBOUNCE_RATE_WAIT);

			const shellbar = await browser.$("#shellbar");

			assert.strictEqual(await shellbar.getProperty("breakpointSize"), "XL", "XL Breakpoint class should be set");
		});

		it("tests L Breakpoint 1400px", async () => {
			await browser.setWindowSize(1400, 1680);

			await browser.pause(HANDLE_RESIZE_DEBOUNCE_RATE_WAIT);

			const assistant = await browser.$("#shellbar ui5-toggle-button[slot='assistant'");
			const shellbar = await browser.$("#shellbar");
			const overflowButton = await browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
			const backButton = await browser.$("#shellbar ui5-button[slot='startButton'");
			const primaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button-title");
			const secondaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-secondary-title");
			const searchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-search-button");
			const customActionIcon1 = await browser.$("#shellbar").shadow$(".ui5-shellbar-custom-item");
			const notificationsIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-bell-button");
			const profileIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-image-button");
			const productSwitchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");

			assert.ok(await assistant.isDisplayed(), "assistant is visible");
			assert.strictEqual(await shellbar.getProperty("breakpointSize"), "L", "L Breakpoint class should be set");
			assert.notOk(await overflowButton.isDisplayed(), "Overflow button should be hidden");
			assert.ok(await backButton.isDisplayed(), "Back icon is visible");
			assert.ok(await primaryTitle.isDisplayed(), "Primary title should be visible");
			assert.ok(await secondaryTitle.isDisplayed(), "Secondary title should be visible");
			assert.ok(await searchIcon.isDisplayed(), "Search icon should be visible");
			assert.ok(await customActionIcon1.isDisplayed(), "Custom Action 1 should be visible");
			assert.ok(await notificationsIcon.isDisplayed(), "Notifications icon should be visible");
			assert.ok(await profileIcon.isDisplayed(), "Profile icon should be visible");
			assert.ok(await productSwitchIcon.isDisplayed(), "Product switch should be visible");
		});

		it("tests M Breakpoint 870px", async () => {
			await browser.setWindowSize(810, 1680);

			await browser.pause(HANDLE_RESIZE_DEBOUNCE_RATE_WAIT);

			const assistant = await browser.$("#shellbar ui5-toggle-button[slot='assistant'");
			const shellbar = await browser.$("#shellbar");
			const backButton = await browser.$("#shellbar ui5-button[slot='startButton'");
			const primaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button-title");
			const searchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-search-button");
			const notificationsIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-bell-button");
			const profileIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-image-button");
			const productSwitchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");

			assert.ok(await assistant.isDisplayed(), "assistant is visible");
			assert.strictEqual(await shellbar.getProperty("breakpointSize"), "M", "M Breakpoint class should be set");
			assert.ok(await backButton.isDisplayed(), "Back icon is visible");
			assert.ok(await primaryTitle.isDisplayed(), "Primary title should be visible");
			assert.ok(await searchIcon.isDisplayed(), "Search icon should be visible");
			assert.ok(await notificationsIcon.isDisplayed(), "Notifications icon should be visible");
			assert.ok(await profileIcon.isDisplayed(), "Profile icon should be visible");
			assert.ok(await productSwitchIcon.isDisplayed(), "Product switch should be visible");
		});

		it("tests M Breakpoint 780px", async () => {
			await browser.setWindowSize(780, 1680);

			await browser.pause(HANDLE_RESIZE_DEBOUNCE_RATE_WAIT);

			const shellbar = await browser.$("#shellbar");

			assert.strictEqual(await shellbar.getProperty("breakpointSize"), "M", "M Breakpoint class should be set");
		});

		it("tests M Breakpoint 710px", async () => {
			await browser.setWindowSize(710, 1680);

			await browser.pause(HANDLE_RESIZE_DEBOUNCE_RATE_WAIT);

			const shellbar = await browser.$("#shellbar");

			assert.strictEqual(await shellbar.getProperty("breakpointSize"), "M", "M Breakpoint class should be set");
		});

		it("tests M Breakpoint and overflow 570px", async () => {
			await browser.setWindowSize(570, 1080);

			await browser.pause(HANDLE_RESIZE_DEBOUNCE_RATE_WAIT);
			const overflowButton = await browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
			const searchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-search-button");

			assert.ok(await searchIcon.isDisplayed(), "Search should be visible");
			assert.ok(await overflowButton.isDisplayed(), "Overflow should be visible");
		});

		it("tests S Breakpoint and overflow 510px", async () => {
			await browser.setWindowSize(510, 1680);

			await browser.pause(HANDLE_RESIZE_DEBOUNCE_RATE_WAIT);

			const assistant = await browser.$("[slot='assistant']");
			const shellbar = await browser.$("#shellbar");
			const overflowButton = await browser.$("#shellbar").shadow$(".ui5-shellbar-overflow-button");
			const backButton = await browser.$("#shellbar ui5-button[slot='startButton'");
			const primaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button-title");
			const secondaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-secondary-title");
			const searchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-search-button");
			const notificationsIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-bell-button");
			const profileIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-image-button");
			const productSwitchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");
			const overflowPopover = await browser.$(`#shellbar`).shadow$(".ui5-shellbar-overflow-popover");
			const listItemsCount = (await overflowPopover.getHTML()).split("</ui5-li>").length - 1;

			assert.ok(await assistant.isDisplayed(), "assistant is visible");
			assert.strictEqual(await shellbar.getProperty("breakpointSize"), "S", "S Breakpoint class should be set");
			assert.ok(await overflowButton.isDisplayed(), "Overflow button should be visible");
			assert.ok(await backButton.isDisplayed(), "Back icon is visible");
			assert.notOk(await primaryTitle.isDisplayed(), "Primary title should be hidden");
			assert.notOk(await secondaryTitle.isDisplayed(), "Secondary title should be hidden");
			assert.ok(await searchIcon.isDisplayed(), "Search icon should be visible");
			assert.ok(await notificationsIcon.isDisplayed(), "Notifications icon should be hidden");
			assert.ok(await profileIcon.isDisplayed(), "Profile icon should be visible");
			assert.ok(await productSwitchIcon.isDisplayed(), "Product switch should be hidden");
			assert.strictEqual(listItemsCount, 2, "2 actions should overflow");
		});
	});

	describe("Events", () => {

		describe("Big screen", () => {
			beforeEach(async () => {
				await browser.setWindowSize(1920, 1680);
			});

			it("tests opening of menu", async () => {
				const primaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button");
				const menuPopover = await browser.$(`#shellbar`).shadow$(".ui5-shellbar-menu-popover");

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

			it("tests search-button-click event", async () => {
				await browser.setWindowSize(870, 1680); // search icon is not visible on XXL breakpoint
				await browser.pause(HANDLE_RESIZE_DEBOUNCE_RATE_WAIT);

				const searchIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-search-button");
				const input = await browser.$("#press-input");

				await searchIcon.click();
				assert.strictEqual(await input.getValue(), "Search Button", "Input value is set by click event of Search Button");
			});

			it("tests search-button-click event", async () => {
				await browser.setWindowSize(870, 1680); // search icon is not visible on XXL breakpoint
				await browser.pause(HANDLE_RESIZE_DEBOUNCE_RATE_WAIT);

				const searchButton  = await browser.$("#sb").shadow$(".ui5-shellbar-search-button");
				const searchField  = await browser.$("#sb").shadow$(".ui5-shellbar-search-field");
				assert.strictEqual(await searchField.isDisplayed(), false, "Search is hidden by default");

				await searchButton .click();
				assert.notOk(await searchField.isDisplayed(), "Search field should not be opened");
			});


			it("tests menuItemClick event", async () => {
				const primaryTitle = await browser.$("#shellbar").shadow$(".ui5-shellbar-menu-button");

				const menuPopover = await browser.$(`#shellbar`).shadow$(".ui5-shellbar-menu-popover");
				const firstMenuItem = await menuPopover.$("ui5-list > ui5-li");
				const secondMenuItem = await menuPopover.$("ui5-list > ui5-li:nth-child(2)");
				const input = await browser.$("#press-input");
				const inputData = await browser.$("#press-data");

				await primaryTitle.click();
				await firstMenuItem.click();

				assert.strictEqual(await input.getValue(), "Application 1", "Input value is set by click event of the first menu item");
				assert.strictEqual(await inputData.getValue(), "key1", "The user defined attributes are available.");

				await input.setProperty("value", "");
				await inputData.setProperty("value", "");

				await primaryTitle.click();
				await secondMenuItem.click();

				assert.strictEqual(await input.getValue(), "Application 2", "Input value is set by click event of the second menu item");
				assert.strictEqual(await inputData.getValue(), "key2", "The user defined attributes are available.");
			});

			it("tests if searchfield toggles when altering the showSearchField property", async () => {
				const searchField = await browser.$("#shellbar").shadow$(".ui5-shellbar-search-full-width-wrapper");
				const shellBar = await browser.$("#shellbar");

				//assert.ok(await searchField.isDisplayed(), "Search is shown by default");

				await shellBar.setProperty('showSearchField', false);
				assert.notOk(await searchField.isDisplayed(), "Search is invisible after altering the showSearchField property of the ShellBar");
				await shellBar.setProperty('showSearchField', true); // Clean Up
			});
		});

		describe("Small screen", () => {
			beforeEach(async () => {
				await browser.setWindowSize(510, 1680);
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

				const menuPopover = await browser.$(`#shellbar`).shadow$(".ui5-shellbar-menu-popover");

				await primaryTitle.click();
				assert.ok(await menuPopover.isDisplayedInViewport(), "Menu should be shown");
			});

			it("tests profileClick event", async () => {
				const profileIcon = await browser.$("#shellbar").shadow$("[profile-btn]");
				const input = await browser.$("#press-input");

				await profileIcon.click();
				assert.strictEqual(await input.getValue(), "Profile", "Input value is set by click event of Profile");
			});

			it("tests productSwitchClick event", async () => {

				const psIcon = await browser.$("#shellbar").shadow$(".ui5-shellbar-button-product-switch");
				const input = await browser.$("#press-input");

				await psIcon.click();

				assert.strictEqual(await input.getValue(), "Product Switch", "Input value is set by click event of Product Switch icon");
			});

			it("tests preventDefault of click on a button with default behavior prevented", async () => {
				const overflowButton = await browser.$("#shellbarWithStartContent").shadow$(".ui5-shellbar-overflow-button");

				const overflowPopover = await browser.$(`#shellbarWithStartContent`).shadow$(".ui5-shellbar-overflow-popover");
				const notificationsIcon = await overflowPopover.$("ui5-list ui5-li:nth-child(3)");

				await overflowButton.click();
				await notificationsIcon.click();

				assert.ok(await overflowPopover.isDisplayed(), "overflow popover should not be closed");
			});
		});
	});
});
