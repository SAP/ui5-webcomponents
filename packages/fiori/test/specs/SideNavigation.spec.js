
const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Component Behavior", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/SideNavigation.html`);
	});

	describe("Main functionality", () => {
		it("Tests selection-change event", () => {
			const input = browser.$("#counter");
			const sideNavigation = browser.$("ui5-side-navigation");
			let items = sideNavigation.shadow$("ui5-tree").shadow$("ui5-list").$$("ui5-li-tree");
			const fixedItems = sideNavigation.shadow$$("ui5-tree")[1].shadow$("ui5-list").$$("ui5-li-tree");

			items[0].click();
			items[3].click();

			assert.strictEqual(input.getProperty("value"), "2", "Event is fired");

			fixedItems[0].click();

			assert.strictEqual(input.getProperty("value"), "3", "Event is fired");

			sideNavigation.setAttribute("collapsed", "true");
			items = sideNavigation.shadow$("ui5-tree").shadow$("ui5-list").$$("ui5-li-tree");

			items[0].click();

			assert.strictEqual(input.getProperty("value"), "4", "Event is fired");

			items[1].click();

			assert.strictEqual(input.getProperty("value"), "4", "Event is not fired");

			const staticAreaItemClassName = browser.getStaticAreaItemClassName("#sn1");
			const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			items = popover.$("ui5-list").$$("ui5-li");

			items[1].click();

			assert.strictEqual(input.getProperty("value"), "5", "Event is fired");
		});

		it("Tests click event & whole-item-toggleable property", () => {
			const input = browser.$("#click-counter");
			const sideNavigation = browser.$("ui5-side-navigation");
			let items = sideNavigation.shadow$("ui5-tree").shadow$("ui5-list").$$("ui5-li-tree");

			items[0].click();

			assert.strictEqual(input.getProperty("value"), "7", "Event is fired");

			items[3].click();

			assert.strictEqual(input.getProperty("value"), "7", "Event is not fired");
			assert.strictEqual(items[3].getProperty("expanded"), true, "Expanded is toggled");

			items[3].click();

			assert.strictEqual(input.getProperty("value"), "7", "Event is not fired");
			assert.strictEqual(items[3].getProperty("expanded"), false, "Expanded is toggled");

            items[1].click();
            assert.strictEqual(input.getProperty("value"), "8", "Event is fired");

            const staticAreaItemClassName = browser.getStaticAreaItemClassName("#sn1");
            const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
            items = popover.$("ui5-list").$$("ui5-li");

            items[1].click();

            assert.strictEqual(input.getProperty("value"), "9", "Event is fired");

        });

		it("Tests header visibility", () => {
			let showHeader = null;

			showHeader = browser.execute(() => {
				const sideNavigation = document.querySelector("#sn1");
				sideNavigation.collapsed = false;

				return sideNavigation.showHeader;
			});

			assert.strictEqual(showHeader, true, "Header is displayed");

			showHeader = browser.execute( () => {
				const sideNavigation = document.querySelector("#sn1");
				sideNavigation.collapsed = true;

				return sideNavigation.showHeader;
			});

			assert.strictEqual(showHeader, false, "Header is not displayed");

			// clean up
			browser.$("#sn1").setProperty("collapsed", false);
		});

		it("Tests tooltips when expanded", () => {
			const sideNavigation = browser.$("#sn1");
			const items = sideNavigation.$$("ui5-side-navigation-item");
			const renderedItems = sideNavigation.shadow$("ui5-tree").shadow$("ui5-list").$$("ui5-li-tree");
			const secondItemSubItems = items[1].$$("ui5-side-navigation-sub-item");

			assert.strictEqual(renderedItems[0].getAttribute("title"), items[0].getAttribute("title"), "Title is set as tooltip to root item");
			assert.strictEqual(renderedItems[1].getAttribute("title"), items[1].getAttribute("text"), "Text is set as tooltip to root item when title is not specified");

			// sub items
			assert.strictEqual(renderedItems[2].getAttribute("title"), secondItemSubItems[0].getAttribute("title"), "Title is set as tooltip to sub item");
			assert.strictEqual(renderedItems[3].getAttribute("title"), secondItemSubItems[1].getAttribute("text"), "Text is set as tooltip to sub item when title is not specified");

			// fixed items
			const fixedItems = sideNavigation.$$("ui5-side-navigation-item[slot=fixedItems]");
			let renderedFixedItems = sideNavigation.shadow$$("ui5-tree")[1].shadow$("ui5-list").$$("ui5-li-tree");
			renderedFixedItems[0].shadow$("ui5-icon.ui5-li-tree-toggle-icon").click(); // expand the item
			renderedFixedItems = sideNavigation.shadow$$("ui5-tree")[1].shadow$("ui5-list").$$("ui5-li-tree");
			const firstFixedItemSubItems = fixedItems[0].$$("ui5-side-navigation-sub-item");

			assert.strictEqual(renderedFixedItems[0].getAttribute("title"), fixedItems[0].getAttribute("title"), "Title is set as tooltip to root fixed item");
			assert.strictEqual(renderedFixedItems[2].getAttribute("title"), firstFixedItemSubItems[1].getAttribute("text"), "Text is set as tooltip to sub item when title is not specified");

			// clean up
			renderedFixedItems[0].shadow$("ui5-icon.ui5-li-tree-toggle-icon").click(); // collapse the item
		});

		it("Tests tooltips when collapsed", () => {
			browser.$("#sn1").setProperty("collapsed", true);
			const sideNavigation = browser.$("#sn1");
			const items = sideNavigation.$$("ui5-side-navigation-item");
			const secondItemSubItems = items[1].$$("ui5-side-navigation-sub-item");
			const renderedItems = sideNavigation.shadow$("ui5-tree").shadow$("ui5-list").$$("ui5-li-tree");

			assert.strictEqual(renderedItems[0].getAttribute("title"), items[0].getAttribute("title"), "Title is set as tooltip to root item");
			assert.strictEqual(renderedItems[1].getAttribute("title"), items[1].getAttribute("text"), "Text is set as tooltip to root item when title is not specified");

			renderedItems[1].click();

			const staticAreaItemClassName = browser.getStaticAreaItemClassName("#sn1");
			const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			const popoverItems = popover.$("ui5-list").$$("ui5-li");

			assert.strictEqual(popoverItems[0].getAttribute("title"), items[1].getAttribute("text"), "Text is set as tooltip to sub item when title is not specified");
			assert.strictEqual(popoverItems[1].getAttribute("title"), secondItemSubItems[0].getAttribute("title"), "Title is set as tooltip to sub item");

			// clean up
			browser.$("#sn1").setProperty("collapsed", false);
		});
	});
});