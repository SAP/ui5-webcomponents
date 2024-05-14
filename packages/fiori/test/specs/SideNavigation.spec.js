import { assert } from "chai";

async function getTreeItemsInPopover() {
	const items = await browser.$$(`>>>#sn1 [ui5-side-navigation-item], #sn1 [ui5-side-navigation-sub-item]`);

	return items;
}

async function getRenderedTreeItemsInPopover() {
	const items = await browser.$$(`>>>#sn1 .ui5-sn-item`);

	return items;
}

async function getRootItemInPopover() {
	const rootItem = await browser.$(`>>>#sn1 ui5-responsive-popover .ui5-sn-root`);

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

			await browser.$("#item1").click();
			await browser.$("#item21").click();

			assert.strictEqual(await input.getProperty("value"), "2", "Event is fired");

			await browser.$("#fixedItem1").click();

			assert.strictEqual(await input.getProperty("value"), "3", "Event is fired");

			await sideNavigation.setAttribute("collapsed", "true");

			await browser.$("#item1").click();

			assert.strictEqual(await input.getProperty("value"), "4", "Event is fired");

			await browser.$("#item2").click();

			assert.strictEqual(await input.getProperty("value"), "4", "Event is not fired");

			let items = await getTreeItemsInPopover();

			await items[1].click();

			assert.strictEqual(await input.getProperty("value"), "5", "Event is fired");

			await sideNavigation.removeAttribute("collapsed");
		});

		it("Tests click event & whole-item-toggleable property", async () => {
			const input = await browser.$("#click-counter");

			await browser.$("#item1").click();

			assert.strictEqual(await input.getProperty("value"), "6", "Event is fired");

			const item = await browser.$("#item3");
			await item.scrollIntoView();
			await item.click();

			const itemRef = await item.shadow$(".ui5-sn-item");

			assert.strictEqual(await input.getProperty("value"), "6", "Event is not fired");
			assert.strictEqual(await itemRef.getAttribute("aria-expanded"), "true" ,"Expanded is toggled");

			await browser.$("#item2").scrollIntoView();
			await browser.$("#item2").click();
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
			const itemsTitles = await browser.executeAsync(function(done) {
				const result = [...document.querySelectorAll("#sn1 ui5-side-navigation-item,ui5-side-navigation-sub-item")].map(el => el.shadowRoot.querySelector(".ui5-sn-item").title);
				done(result);
			});

			// items
			assert.strictEqual(itemsTitles[0], await browser.$("#item1").getAttribute("tooltip"), "Tooltip is set to root item");
			assert.notOk(itemsTitles[1], "No tooltip");

			// sub items
			assert.strictEqual(itemsTitles[2], await browser.$("#item21").getAttribute("tooltip"), "Tooltip is set to root item");
			assert.notOk(itemsTitles[3], "No tooltip");
		});

		it("Tests tooltips when collapsed", async () => {
			await browser.$("#sn1").setProperty("collapsed", true);

			const itemsTitles = await browser.executeAsync(function(done) {
				const result = [...document.querySelectorAll("#sn1 ui5-side-navigation-item,ui5-side-navigation-sub-item")].map(el => el.shadowRoot.querySelector(".ui5-sn-item")?.title);
				done(result);
			});

			assert.strictEqual(itemsTitles[0], await browser.$("#item1").getAttribute("tooltip"), "Tooltip is set to root item");
			assert.notOk(itemsTitles[1], "No tooltip");

			await browser.$("#item2").click();

			const popoverItemsTitles = await browser.executeAsync(async function(done) {
				const result = [...document.querySelector("#sn1").shadowRoot.querySelector("ui5-responsive-popover").querySelectorAll("ui5-side-navigation-item,ui5-side-navigation-sub-item")].map(el => el.shadowRoot.querySelector(".ui5-sn-item").title);
				done(result);
			});

			assert.notOk(popoverItemsTitles[0], "No tooltip");
			assert.strictEqual(popoverItemsTitles[1], await browser.$("#item21").getAttribute("tooltip"), "Tooltip is set to root item");

			// clean up
			await browser.$("#sn1").setProperty("collapsed", false);
		});

		it("tests the prevention of the ui5-selection-change event", async () => {
			const itemsAriaCurrent = await browser.executeAsync(function(done) {
				const result = [...document.querySelectorAll("#sn1 ui5-side-navigation-item,ui5-side-navigation-sub-item")].map(el => el.shadowRoot.querySelector(".ui5-sn-item")?.getAttribute("aria-current"));
				done(result);
			});

			await browser.$("#item21").click();

			assert.ok(await browser.$("#item21").getProperty("selected"), "new item is selected");
			assert.strictEqual(itemsAriaCurrent[2], "page", "aria-current is set");

			const selectionChangeCheckbox = await browser.$("#prevent-selection");
			await selectionChangeCheckbox.click();

			await browser.$("#item1").click();

			assert.notOk(await browser.$("#item1").getProperty("selected"), "new item is not selected");
			assert.notExists(itemsAriaCurrent[0],  "aria-current is not changed");

			assert.ok(await browser.$("#item21").getProperty("selected"), "initially selected item has not changed");
			assert.strictEqual(itemsAriaCurrent[2], "page", "aria-current is not changed");

			await selectionChangeCheckbox.click();
		});

		it("tests avoiding re-selecting already selected item", async () => {
			const sideNavigation = await browser.$("#sn1");
			await sideNavigation.setAttribute("collapsed", "true");

			const input = await browser.$("#counter");

			await browser.$("#item1").click();

			const beforeClickingSelectedItem = await input.getProperty("value");

			await browser.$("#item1").click();

			const afterClickingSelectedItem = await input.getProperty("value");

			assert.strictEqual(afterClickingSelectedItem, beforeClickingSelectedItem, "Event did not fire twice after the already selected item was clicked");

			await sideNavigation.removeAttribute("collapsed");
		});

		it("Tests ACC when expanded", async () => {
			const sideNavigation = await browser.$("#sn1");
			const sideNavigationRoot = await sideNavigation.shadow$(".ui5-sn-root");

			const sideNavigationTree = await sideNavigation.shadow$(".ui5-sn-flexible");
			const sideNavigationFixedTree = await sideNavigation.shadow$(".ui5-sn-fixed");

			let items = await browser.$$(">>>#sn1 .ui5-sn-item");

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
			assert.notExists(await items[13].getAttribute("aria-roledescription"), "Role description of the SideNavigation fixed tree item is not set");
			assert.notExists(await items[13].getAttribute("aria-haspopup"), "There is no 'aria-haspopup'");
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

			let items = await browser.$$(">>>#sn1 .ui5-sn-item");

			assert.strictEqual(await sideNavigationRoot.getTagName(), "nav", "tag name of the SideNavigation root element is correctly set");

			let roleDescription = await browser.executeAsync(done => {
				const sn = document.getElementById("sn1");
				done(sn.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.SIDE_NAVIGATION_COLLAPSED_LIST_ARIA_ROLE_DESC));
			});
			assert.strictEqual(await sideNavigationTree.getAttribute("aria-roledescription"), roleDescription, "Role description of the SideNavigation tree element is correctly set");

			assert.notExists(await items[1].getAttribute("aria-roledescription"), "Role description of the SideNavigation tree item is not set");
			assert.notExists(await items[1].getAttribute("aria-haspopup"), "There is no 'aria-haspopup'");
			assert.strictEqual(await items[2].getAttribute("aria-haspopup"), "tree", "There is 'aria-haspopup' with correct value");

			// fixed items
			assert.strictEqual(await sideNavigationFixedTree.getAttribute("aria-roledescription"), roleDescription, "Role description of the SideNavigation fixed tree element is correctly set");
			assert.notExists(await items[9].getAttribute("aria-roledescription"), "Role description of the SideNavigation fixed tree item is not set");
			assert.strictEqual(await items[9].getAttribute("aria-haspopup"), "tree", "There is 'aria-haspopup' with correct value");
			assert.notExists(await items[10].getAttribute("aria-haspopup"), "There is no 'aria-haspopup'");

			// popup
			await browser.$("#item2").click();

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

		it("Tests external link items", async () => {
			const item = await browser.$("#externalLinkItem");

			assert.ok(await item.shadow$(".ui5-sn-item-external-link-icon").isExisting(), "External link icon is rendered");
		});
	});
});
