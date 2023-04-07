import { assert } from "chai";

async function getTreeItemsInPopover() {
	const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#sn1");
	const items = await browser.$$(`>>>.${staticAreaItemClassName} ui5-responsive-popover ui5-side-navigation ui5-tree-item`);

	return items;
}

async function getItems(selector) {
    const listItems = await browser.$$(`>>>${selector}`);

	const promises = listItems.map(async (item) => {
		const isDisplayed = await item.isDisplayedInViewport();
		return isDisplayed ? item : null;
	},);

	const items = await Promise.all(promises);

	return items.filter((item) => item);
}

describe("Component Behavior", () => {
	before(async () => {
		await browser.url(`test/pages/SideNavigation.html`);
	});

	describe("Main functionality", async () => {
		it("Tests selection-change event", async () => {
			const input = await browser.$("#counter");
			const sideNavigation = await browser.$("ui5-side-navigation");
			let items = await browser.$$(">>>.ui5-sn-items-tree [ui5-tree-item]");
			const fixedItems = await browser.$$(">>>#ui5-sn-fixed-items-tree [ui5-tree-item]");

			await items[0].click();
			await items[3].click();

			assert.strictEqual(await input.getProperty("value"), "2", "Event is fired");

			await fixedItems[0].click();

			assert.strictEqual(await input.getProperty("value"), "3", "Event is fired");

			await sideNavigation.setAttribute("collapsed", "true");
			items = await browser.$$(">>>.ui5-sn-items-tree [ui5-tree-item]");

			await items[0].click();

			assert.strictEqual(await input.getProperty("value"), "4", "Event is fired");

			await items[1].click();

			assert.strictEqual(await input.getProperty("value"), "4", "Event is not fired");

			items = await getTreeItemsInPopover();

			await items[1].click();

			assert.strictEqual(await input.getProperty("value"), "5", "Event is fired");
		});

		it("Tests click event & whole-item-toggleable property", async () => {
			const input = await browser.$("#click-counter");
			let items = await getItems(".ui5-sn-items-tree [ui5-tree-item]");

			await items[0].click();

			assert.strictEqual(await input.getProperty("value"), "7", "Event is fired");

			await items[3].click();

			assert.strictEqual(await input.getProperty("value"), "7", "Event is not fired");
			assert.ok(await items[3].getProperty("expanded"), "Expanded is toggled");

			await items[3].click();

			assert.strictEqual(await input.getProperty("value"), "7", "Event is not fired");
			assert.notOk(await items[3].getProperty("expanded"), "Expanded is toggled");

			await items[1].click();
			assert.strictEqual(await input.getProperty("value"), "8", "Event is fired");

			items = await getTreeItemsInPopover();

			await items[1].click();

			assert.strictEqual(await input.getProperty("value"), "9", "Event is fired");

		});

		it("Tests header visibility", async () => {
			let showHeader = null;

			await browser.$("#sn1").setProperty("collapsed", false);
			showHeader = await browser.$("#sn1").getProperty("showHeader");

			assert.ok(showHeader, "Header is displayed");

			await browser.$("#sn1").setProperty("collapsed", true);
			showHeader = await browser.$("#sn1").getProperty("showHeader");

			assert.notOk(showHeader, "Header is not displayed");

			// clean up
			await browser.$("#sn1").setProperty("collapsed", false);
		});

		it("Tests tooltips when expanded", async () => {
			const sideNavigation = await browser.$("#sn1");
			const items = await sideNavigation.$$("ui5-side-navigation-item");
			const renderedItems = await getItems(".ui5-sn-items-tree [ui5-tree-item]");
			const secondItemSubItems = await items[1].$$("ui5-side-navigation-sub-item");

			assert.strictEqual(await renderedItems[0].getAttribute("title"), await items[0].getAttribute("title"), "Title is set as tooltip to root item");
			assert.strictEqual(await renderedItems[1].getAttribute("title"), await items[1].getAttribute("text"), "Text is set as tooltip to root item when title is not specified");

			// sub items
			assert.strictEqual(await renderedItems[2].getAttribute("title"), await secondItemSubItems[0].getAttribute("title"), "Title is set as tooltip to sub item");
			assert.strictEqual(await renderedItems[3].getAttribute("title"), await secondItemSubItems[1].getAttribute("text"), "Text is set as tooltip to sub item when title is not specified");

			// fixed items
			const fixedItems = await sideNavigation.$$("ui5-side-navigation-item[slot=fixedItems]");
			let renderedFixedItems = await getItems("#ui5-sn-fixed-items-tree [ui5-tree-item]");
			await renderedFixedItems[0].shadow$("ui5-icon.ui5-li-tree-toggle-icon").click(); // expand the item
			renderedFixedItems = await getItems("#ui5-sn-fixed-items-tree [ui5-tree-item]");
			const firstFixedItemSubItems = await fixedItems[0].$$("ui5-side-navigation-sub-item");

			assert.strictEqual(await renderedFixedItems[0].getAttribute("title"), await fixedItems[0].getAttribute("title"), "Title is set as tooltip to root fixed item");
			assert.strictEqual(await renderedFixedItems[2].getAttribute("title"), await firstFixedItemSubItems[1].getAttribute("text"), "Text is set as tooltip to sub item when title is not specified");

			// clean up
			await renderedFixedItems[0].shadow$("ui5-icon.ui5-li-tree-toggle-icon").click(); // collapse the item
		});

		it("Tests tooltips when collapsed", async () => {
			await browser.$("#sn1").setProperty("collapsed", true);
			const sideNavigation = await browser.$("#sn1");
			const items = await sideNavigation.$$("ui5-side-navigation-item");
			const secondItemSubItems = await items[1].$$("ui5-side-navigation-sub-item");
			const renderedItems = await getItems(".ui5-sn-items-tree [ui5-tree-item]");

			assert.strictEqual(await renderedItems[0].getAttribute("title"), await items[0].getAttribute("title"), "Title is set as tooltip to root item");
			assert.strictEqual(await renderedItems[1].getAttribute("title"), await items[1].getAttribute("text"), "Text is set as tooltip to root item when title is not specified");

			await renderedItems[1].click();

			const popoverItems = await getTreeItemsInPopover();

			assert.strictEqual(await popoverItems[0].getAttribute("title"), await items[1].getAttribute("text"), "Text is set as tooltip to sub item when title is not specified");
			assert.strictEqual(await popoverItems[1].getAttribute("title"), await secondItemSubItems[0].getAttribute("title"), "Title is set as tooltip to sub item");

			// clean up
			await browser.$("#sn1").setProperty("collapsed", false);
			await browser.executeAsync(async (done) => {
				// close popover after the test because next call of getItems will return the items from the popover as well
				const staticArea = await document.querySelector("ui5-side-navigation").getStaticAreaItemDomRef();
				const popover = staticArea.querySelector(".ui5-side-navigation-popover");
				popover.addEventListener("ui5-after-close", () => {
					done();
				});

				popover.close();
			});
		});
	
		it("tests the prevention of the ui5-selection-change event", async () => {
			const items = await getItems(".ui5-sn-items-tree [ui5-tree-item]");

			await items[3].click();

			const selectionChangeCheckbox = await browser.$("#prevent-selection");
			await selectionChangeCheckbox.click();

			await items[0].click();

			assert.strictEqual(await items[0].getAttribute("selected"), null, "new item was not selected");

			assert.strictEqual(await items[3].getAttribute("selected"), "true", "initially selected item has not changed");

			await selectionChangeCheckbox.click();
		});

		it("tests avoiding re-selecting already selected item", async () => {
			const sideNavigation = await browser.$("#sn1");
			await sideNavigation.setAttribute("collapsed", "true");

			const input = await browser.$("#counter");
			const items = await getItems(".ui5-sn-items-tree [ui5-tree-item]");

			await items[0].click();

			const beforeClickingSelectedItem = await input.getProperty("value");

			await items[0].click();

			const afterClickingSelectedItem = await input.getProperty("value");

			assert.strictEqual(afterClickingSelectedItem, beforeClickingSelectedItem, "Event did not fire twice after the already selected item was clicked");

			await sideNavigation.removeAttribute("collapsed");
		});

		it("Tests ACC roles and more when expanded", async () => {
			const sideNavigation = await browser.$("#sn1");
			const sideNavigationRoot = await sideNavigation.shadow$(".ui5-sn-root");
			const sideNavigationTree = await sideNavigation.shadow$("ui5-tree").shadow$("ui5-tree-list").shadow$("ul");
			const sideNavigationTreeItem = await  browser.$(">>>.ui5-sn-items-tree [ui5-tree-item] li")
			const sideNavigationFixedItemsTree = await sideNavigation.shadow$$("ui5-tree")[1];
			const sideNavigationFixedItemsTreeElement = sideNavigationFixedItemsTree.shadow$("ui5-tree-list").shadow$("ul");
			const sideNavigationFixedItemsTreeItem = await browser.$(">>>#ui5-sn-fixed-items-tree [ui5-tree-item] li") 

			assert.strictEqual(await sideNavigationRoot.getAttribute("role"), "navigation", "Role of the SideNavigation root element is correctly set");

			let roleDescription = await browser.executeAsync(done => {
				const sn = document.getElementById("sn1");
				done(sn.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.SIDE_NAVIGATION_LIST_ARIA_ROLE_DESC));
			});
			assert.strictEqual(await sideNavigationTree.getAttribute("aria-roledescription"), roleDescription, "Role description of the SideNavigation tree element is correctly set");

			// items
			let roleDescriptionItem = await browser.executeAsync(done => {
				const sn = document.getElementById("sn1");
				done(sn.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.SIDE_NAVIGATION_LIST_ITEMS_ARIA_ROLE_DESC));
			});
			assert.strictEqual(await sideNavigationTreeItem.getAttribute("aria-roledescription"), roleDescriptionItem, "Role description of the SideNavigation tree item is correctly set");
			assert.notExists(await sideNavigationTreeItem.getAttribute("aria-haspopup"), "There is no 'aria-haspopup'");

			// fixed items
			assert.strictEqual(await sideNavigationFixedItemsTreeElement.getAttribute("aria-roledescription"), roleDescription, "Role description of the SideNavigation fixed tree element is correctly set");
			assert.strictEqual(await sideNavigationFixedItemsTreeItem.getAttribute("aria-roledescription"), roleDescriptionItem, "Role description of the SideNavigation fixed tree item is correctly set");
			assert.notExists(await sideNavigationFixedItemsTreeItem.getAttribute("aria-haspopup"), "There is no 'aria-haspopup'");
		});

		it("Tests ACC roles and more when collapsed", async () => {
			// prepare
			await browser.url(`test/pages/SideNavigation.html`);

			// act
			await browser.$("#sn1").setProperty("collapsed", true);

			const sideNavigation = await browser.$("#sn1");
			const sideNavigationRoot = await sideNavigation.shadow$(".ui5-sn-root");
			const sideNavigationTree = await sideNavigation.shadow$("ui5-tree").shadow$("ui5-tree-list").shadow$("ul");
			const sideNavigationTreeItem1 = await browser.$(">>>.ui5-sn-items-tree [ui5-tree-item] li") // with no sub-items
			const sideNavigationTreeItem2 = await browser.$$(">>>.ui5-sn-items-tree [ui5-tree-item] li")[1] // with sub-items
			const sideNavigationFixedItemsTree = await sideNavigation.shadow$$("ui5-tree")[1];
			const sideNavigationFixedItemsTreeElement = sideNavigationFixedItemsTree.shadow$("ui5-tree-list").shadow$("ul");
			const sideNavigationFixedItemsTreeItem1 = await browser.$(">>>#ui5-sn-fixed-items-tree [ui5-tree-item] li") // with sub-items
			const sideNavigationFixedItemsTreeItem2 = await browser.$$(">>>#ui5-sn-fixed-items-tree [ui5-tree-item] li")[1]; // with no sub-items

			assert.strictEqual(await sideNavigationRoot.getAttribute("role"), "navigation", "Role of the SideNavigation root element is correctly set");

			let roleDescription = await browser.executeAsync(done => {
				const sn = document.getElementById("sn1");
				done(sn.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.SIDE_NAVIGATION_COLLAPSED_LIST_ARIA_ROLE_DESC));
			});
			assert.strictEqual(await sideNavigationTree.getAttribute("aria-roledescription"), roleDescription, "Role description of the SideNavigation tree element is correctly set");

			// items
			let roleDescriptionItem = await browser.executeAsync(done => {
				const sn = document.getElementById("sn1");
				done(sn.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.SIDE_NAVIGATION_COLLAPSED_LIST_ITEMS_ARIA_ROLE_DESC));
			});
			assert.strictEqual(await sideNavigationTreeItem1.getAttribute("aria-roledescription"), roleDescriptionItem, "Role description of the SideNavigation tree item is correctly set");
			assert.notExists(await sideNavigationTreeItem1.getAttribute("aria-haspopup"), "There is no 'aria-haspopup'");
			assert.strictEqual(await sideNavigationTreeItem2.getAttribute("aria-haspopup"), "Tree", "There is 'aria-haspopup' with correct value");

			// fixed items
			assert.strictEqual(await sideNavigationFixedItemsTreeElement.getAttribute("aria-roledescription"), roleDescription, "Role description of the SideNavigation fixed tree element is correctly set");
			assert.strictEqual(await sideNavigationFixedItemsTreeItem1.getAttribute("aria-roledescription"), roleDescriptionItem, "Role description of the SideNavigation fixed tree item is correctly set");
			assert.strictEqual(await sideNavigationFixedItemsTreeItem1.getAttribute("aria-haspopup"), "Tree", "There is 'aria-haspopup' with correct value");
			assert.notExists(await sideNavigationFixedItemsTreeItem2.getAttribute("aria-haspopup"), "There is no 'aria-haspopup'");

			// popup
			await sideNavigationTreeItem2.click();

			const popoverItems = await getTreeItemsInPopover();

			// items
			roleDescriptionItem = await browser.executeAsync(done => {
				const sn = document.getElementById("sn1");
				done(sn.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.SIDE_NAVIGATION_LIST_ITEMS_ARIA_ROLE_DESC));
			});

			assert.strictEqual(await popoverItems[0].shadow$("li").getAttribute("aria-roledescription"), roleDescriptionItem, "Role description is correctly set");
			assert.strictEqual(await popoverItems[1].shadow$("li").getAttribute("aria-roledescription"), roleDescriptionItem, "Role description is correctly set");

			// clean up
			await browser.$("#sn1").setProperty("collapsed", false);
		});
	});
});
