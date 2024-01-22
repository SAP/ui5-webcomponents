import { assert } from "chai";

async function getTreeItemsInPopover() {
	const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#sn1");
	const items = await browser.$$(`>>>.${staticAreaItemClassName} ui5-responsive-popover .ui5-sn-item`);

	return items;
}

async function getRootItemInPopover() {
	const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#sn1");
	const rootItem = await browser.$(`>>>.${staticAreaItemClassName} ui5-responsive-popover .ui5-sn-root`);

	return rootItem;
}

describe("Component Behavior", () => {
	before(async () => {
		await browser.url(`test/pages/SideNavigation.html`);
	});

	describe("Main functionality", async () => {
		it("Tests selection-change event", async () => {
			const input = await browser.$("#counter");
			const sideNavigation = await browser.$("#sn1");
			let items = await sideNavigation.shadow$$(".ui5-sn-flexible .ui5-sn-item");
			const fixedItems = await sideNavigation.shadow$$(".ui5-sn-fixed .ui5-sn-item");

			await items[0].click();
			await items[3].click();

			assert.strictEqual(await input.getProperty("value"), "2", "Event is fired");

			await fixedItems[0].click();

			assert.strictEqual(await input.getProperty("value"), "3", "Event is fired");

			await sideNavigation.setAttribute("collapsed", "true");
			items = await sideNavigation.shadow$$(".ui5-sn-flexible .ui5-sn-item");

			await items[0].click();

			assert.strictEqual(await input.getProperty("value"), "4", "Event is fired");

			await items[1].click();

			assert.strictEqual(await input.getProperty("value"), "4", "Event is not fired");

			items = await getTreeItemsInPopover();

			await items[1].click();

			assert.strictEqual(await input.getProperty("value"), "5", "Event is fired");

			await sideNavigation.removeAttribute("collapsed");
		});

		it("Tests click event & whole-item-toggleable property", async () => {
			const input = await browser.$("#click-counter");
			const sideNavigation = await browser.$("ui5-side-navigation");
			let items = await sideNavigation.shadow$$(".ui5-sn-flexible .ui5-sn-item-level1");

			await items[0].click();

			assert.strictEqual(await input.getProperty("value"), "6", "Event is fired");

			await items[3].click();

			assert.strictEqual(await input.getProperty("value"), "6", "Event is not fired");
			assert.strictEqual(await items[3].getAttribute("aria-expanded"), "true" ,"Expanded is toggled");

			await items[1].click();
			assert.strictEqual(await input.getProperty("value"), "7", "Event is fired");
		});

		it("Tests header visibility", async () => {
			const sideNavigation = await browser.$("ui5-side-navigation");

			await browser.$("#sn1").setProperty("collapsed", false);
			let showHeader = await sideNavigation.getProperty("showHeader");

			assert.ok(showHeader, "Header is displayed");

			await browser.$("#sn1").setProperty("collapsed", true);
			showHeader = await sideNavigation.getProperty("showHeader");

			assert.notOk(showHeader, "Header is not displayed");

			// clean up
			await browser.$("#sn1").setProperty("collapsed", false);
		});

		it("Tests tooltips when expanded", async () => {
			const sideNavigation = await browser.$("#sn1");
			const renderedItems = await sideNavigation.shadow$$(".ui5-sn-item");

			// items
			assert.strictEqual(await renderedItems[0].getAttribute("title"), await browser.$("#item1").getAttribute("title"), "Title is set as tooltip to root item");
			assert.strictEqual(await renderedItems[1].getAttribute("title"), await browser.$("#item2").getAttribute("text"), "Text is set as tooltip to root item when title is not specified");

			// sub items
			assert.strictEqual(await renderedItems[2].getAttribute("title"), await browser.$("#item21").getAttribute("title"), "Title is set as tooltip to sub item");
			assert.strictEqual(await renderedItems[3].getAttribute("title"), await browser.$("#item22").getAttribute("text"), "Text is set as tooltip to sub item when title is not specified");
		});

		it("Tests tooltips when collapsed", async () => {
			await browser.$("#sn1").setProperty("collapsed", true);

			const sideNavigation = await browser.$("#sn1");
			const renderedItems = await sideNavigation.shadow$$(".ui5-sn-item");

			assert.strictEqual(await renderedItems[0].getAttribute("title"), await browser.$("#item1").getAttribute("title"), "Title is set as tooltip to root item");
			assert.strictEqual(await renderedItems[1].getAttribute("title"), await browser.$("#item2").getAttribute("text"), "Text is set as tooltip to root item when title is not specified");

			await renderedItems[1].click();

			const popoverItems = await getTreeItemsInPopover();

			assert.strictEqual(await popoverItems[0].getAttribute("title"), await browser.$("#item2").getAttribute("text"), "Text is set as tooltip to sub item when title is not specified");
			assert.strictEqual(await popoverItems[1].getAttribute("title"), await browser.$("#item21").getAttribute("title"), "Title is set as tooltip to sub item");

			// clean up
			await browser.$("#sn1").setProperty("collapsed", false);
		});

		it("tests the prevention of the ui5-selection-change event", async () => {
			const sideNavigation = await browser.$("#sn1");
			const items = await sideNavigation.shadow$$(".ui5-sn-item");

			await items[3].click();

			assert.ok(await browser.$("#item22").getProperty("selected"), "new item is selected");
			assert.strictEqual(await items[3].getAttribute("aria-current"), "page", "aria-current is set");

			const selectionChangeCheckbox = await browser.$("#prevent-selection");
			await selectionChangeCheckbox.click();

			await items[0].click();

			assert.notOk(await browser.$("#item1").getProperty("selected"), "new item is not selected");
			assert.notExists(await items[0].getAttribute("aria-current"),  "aria-current is not changed");

			assert.ok(await browser.$("#item22").getProperty("selected"), "initially selected item has not changed");
			assert.strictEqual(await items[3].getAttribute("aria-current"), "page", "aria-current is not changed");

			await selectionChangeCheckbox.click();
		});

		it("tests avoiding re-selecting already selected item", async () => {
			const sideNavigation = await browser.$("#sn1");
			await sideNavigation.setAttribute("collapsed", "true");

			const input = await browser.$("#counter");
			const items = await sideNavigation.shadow$$(".ui5-sn-item");

			await items[0].click();

			const beforeClickingSelectedItem = await input.getProperty("value");

			await items[0].click();

			const afterClickingSelectedItem = await input.getProperty("value");

			assert.strictEqual(afterClickingSelectedItem, beforeClickingSelectedItem, "Event did not fire twice after the already selected item was clicked");

			await sideNavigation.removeAttribute("collapsed");
		});

		it("Tests ACC when expanded", async () => {
			const sideNavigation = await browser.$("#sn1");
			const sideNavigationRoot = await sideNavigation.shadow$(".ui5-sn-root");

			const sideNavigationTree = await sideNavigation.shadow$(".ui5-sn-flexible");
			const sideNavigationFixedTree = await sideNavigation.shadow$(".ui5-sn-fixed");

			const items = await sideNavigation.shadow$$(".ui5-sn-flexible .ui5-sn-item");
			const fixedItems = await sideNavigation.shadow$$(".ui5-sn-fixed .ui5-sn-item");

			assert.strictEqual(await sideNavigationRoot.getTagName(), "nav", "tag name of the SideNavigation root element is correctly set");

			let roleDescription = await browser.executeAsync(done => {
				const sn = document.getElementById("sn1");
				done(sn.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.SIDE_NAVIGATION_LIST_ARIA_ROLE_DESC));
			});

			assert.strictEqual(await sideNavigationTree.getAttribute("aria-roledescription"), roleDescription, "Role description of the SideNavigation tree element is correctly set");
			assert.notExists(await items[0].getAttribute("aria-roledescription"),"Role description of the SideNavigation tree item is not set");

			assert.strictEqual(await sideNavigationTree.getAttribute("aria-roledescription"), roleDescription, "Role description of the SideNavigation tree is correctly set");
			assert.notExists(await items[1].getAttribute("aria-haspopup"), "There is no 'aria-haspopup'");

			// fixed items
			assert.strictEqual(await sideNavigationFixedTree.getAttribute("aria-roledescription"), roleDescription, "Role description of the SideNavigation fixed tree element is correctly set");
			assert.notExists(await fixedItems[0].getAttribute("aria-roledescription"), "Role description of the SideNavigation fixed tree item is not set");
			assert.notExists(await fixedItems[0].getAttribute("aria-haspopup"), "There is no 'aria-haspopup'");
		});

		it("Tests ACC roles and more when collapsed", async () => {
			// prepare
			await browser.url(`test/pages/SideNavigation.html`);

			// act
			const sideNavigation = await browser.$("#sn1");
			await sideNavigation.setProperty("collapsed", true);

			const sideNavigationRoot = await sideNavigation.shadow$(".ui5-sn-root");

			const sideNavigationTree = await sideNavigation.shadow$(".ui5-sn-flexible");
			const sideNavigationFixedTree = await sideNavigation.shadow$(".ui5-sn-fixed");

			const items = await sideNavigation.shadow$$(".ui5-sn-flexible .ui5-sn-item");
			const fixedItems = await sideNavigation.shadow$$(".ui5-sn-fixed .ui5-sn-item");

			assert.strictEqual(await sideNavigationRoot.getTagName(), "nav", "tag name of the SideNavigation root element is correctly set");

			let roleDescription = await browser.executeAsync(done => {
				const sn = document.getElementById("sn1");
				done(sn.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.SIDE_NAVIGATION_COLLAPSED_LIST_ARIA_ROLE_DESC));
			});
			assert.strictEqual(await sideNavigationTree.getAttribute("aria-roledescription"), roleDescription, "Role description of the SideNavigation tree element is correctly set");

			assert.notExists(await items[0].getAttribute("aria-roledescription"), "Role description of the SideNavigation tree item is not set");
			assert.notExists(await items[0].getAttribute("aria-haspopup"), "There is no 'aria-haspopup'");
			assert.strictEqual(await items[1].getAttribute("aria-haspopup"), "tree", "There is 'aria-haspopup' with correct value");

			// fixed items
			assert.strictEqual(await sideNavigationFixedTree.getAttribute("aria-roledescription"), roleDescription, "Role description of the SideNavigation fixed tree element is correctly set");
			assert.notExists(await fixedItems[0].getAttribute("aria-roledescription"), "Role description of the SideNavigation fixed tree item is not set");
			assert.strictEqual(await fixedItems[0].getAttribute("aria-haspopup"), "tree", "There is 'aria-haspopup' with correct value");
			assert.notExists(await fixedItems[1].getAttribute("aria-haspopup"), "There is no 'aria-haspopup'");

			// popup
			await items[1].click();

			const popoverRootItem = await getRootItemInPopover();

			assert.strictEqual(await popoverRootItem.getAttribute("role"), "none", "Role is correctly set");

			// clean up
			await sideNavigation.setProperty("collapsed", false);
		});

		it("Test overflow behavior when collapsed", async () => {
			await browser.url(`test/pages/SideNavigation.html`);
			const sideNavigation = await browser.$("#sn1");

			await sideNavigation.setProperty("collapsed", true);

			// Act: apply new height
			await browser.setWindowSize(500, 450);

			// Check
			let sideNavigationTree = await sideNavigation.shadow$(".ui5-sn-flexible");
			let overflowItem = await sideNavigationTree.shadow$(".ui5-sn-item-overflow");

			// Check
			await overflowItem.waitForDisplayed();
			assert.ok(await overflowItem.isDisplayed(), "Overflow button should be available");

			// Act: apply new height
			await browser.setWindowSize(500, 1000);
			sideNavigationTree = await sideNavigation.shadow$(".ui5-sn-flexible");
			overflowItem = await sideNavigationTree.shadow$(".ui5-sn-item-overflow");

			assert.notOk(await overflowItem.isDisplayed(), "Overflow button should not be available");

		});
	});
});
