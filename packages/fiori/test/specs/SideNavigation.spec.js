
const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Component Behavior", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/SideNavigation.html`);
	});

	describe("Main functionality", async () => {
		it("Tests selection-change event", async () => {
			const input = await browser.$("#counter");
			const sideNavigation = await browser.$("ui5-side-navigation");
			let items = await sideNavigation.shadow$("ui5-tree").shadow$("ui5-list").$$("ui5-li-tree");
			const fixedItems = await (await sideNavigation.shadow$$("ui5-tree"))[1].shadow$("ui5-list").$$("ui5-li-tree");

			await items[0].click();
			await items[3].click();

			assert.strictEqual(await input.getProperty("value"), "2", "Event is fired");

			await fixedItems[0].click();

			assert.strictEqual(await input.getProperty("value"), "3", "Event is fired");

			await sideNavigation.setAttribute("collapsed", "true");
			items = await sideNavigation.shadow$("ui5-tree").shadow$("ui5-list").$$("ui5-li-tree");

			await items[0].click();

			assert.strictEqual(await input.getProperty("value"), "4", "Event is fired");

			await items[1].click();

			assert.strictEqual(await input.getProperty("value"), "4", "Event is not fired");

			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#sn1");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			items = await popover.$("ui5-list").$$("ui5-li");

			await items[1].click();

			assert.strictEqual(await input.getProperty("value"), "5", "Event is fired");
		});

		it("Tests click event & whole-item-toggleable property", async () => {
			const input = await browser.$("#click-counter");
			const sideNavigation = await browser.$("ui5-side-navigation");
			let items = await sideNavigation.shadow$("ui5-tree").shadow$("ui5-list").$$("ui5-li-tree");

			await items[0].click();

			assert.strictEqual(await input.getProperty("value"), "7", "Event is fired");

			await items[3].click();

			assert.strictEqual(await input.getProperty("value"), "7", "Event is not fired");
			assert.strictEqual(await items[3].getProperty("expanded"), true, "Expanded is toggled");

			await items[3].click();

			assert.strictEqual(await input.getProperty("value"), "7", "Event is not fired");
			assert.strictEqual(await items[3].getProperty("expanded"), false, "Expanded is toggled");

            await items[1].click();
            assert.strictEqual(await input.getProperty("value"), "8", "Event is fired");

            const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#sn1");
            const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
            items = await popover.$("ui5-list").$$("ui5-li");

            await items[1].click();

            assert.strictEqual(await input.getProperty("value"), "9", "Event is fired");

        });

		it("Tests header visibility", async () => {
			let showHeader = null;

			showHeader = await browser.executeAsync(done => {
				const sideNavigation = document.querySelector("#sn1");
				sideNavigation.collapsed = false;

				done(sideNavigation.showHeader);
			});

			assert.strictEqual(showHeader, true, "Header is displayed");

			showHeader = await browser.executeAsync(done => {
				const sideNavigation = document.querySelector("#sn1");
				sideNavigation.collapsed = true;

				done(sideNavigation.showHeader);
			});

			assert.strictEqual(showHeader, false, "Header is not displayed");

			// clean up
			await browser.$("#sn1").setProperty("collapsed", false);
		});

		it("Tests tooltips when expanded", async () => {
			const sideNavigation = await browser.$("#sn1");
			const items = await sideNavigation.$$("ui5-side-navigation-item");
			const renderedItems = await sideNavigation.shadow$("ui5-tree").shadow$("ui5-list").$$("ui5-li-tree");
			const secondItemSubItems = await items[1].$$("ui5-side-navigation-sub-item");

			assert.strictEqual(await renderedItems[0].getAttribute("title"), await items[0].getAttribute("title"), "Title is set as tooltip to root item");
			assert.strictEqual(await renderedItems[1].getAttribute("title"), await items[1].getAttribute("text"), "Text is set as tooltip to root item when title is not specified");

			// sub items
			assert.strictEqual(await renderedItems[2].getAttribute("title"), await secondItemSubItems[0].getAttribute("title"), "Title is set as tooltip to sub item");
			assert.strictEqual(await renderedItems[3].getAttribute("title"), await secondItemSubItems[1].getAttribute("text"), "Text is set as tooltip to sub item when title is not specified");

			// fixed items
			const fixedItems = await sideNavigation.$$("ui5-side-navigation-item[slot=fixedItems]");
			let renderedFixedItems = await (await sideNavigation.shadow$$("ui5-tree"))[1].shadow$("ui5-list").$$("ui5-li-tree");
			await renderedFixedItems[0].shadow$("ui5-icon.ui5-li-tree-toggle-icon").click(); // expand the item
			renderedFixedItems = await (await sideNavigation.shadow$$("ui5-tree"))[1].shadow$("ui5-list").$$("ui5-li-tree");
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
			const renderedItems = await sideNavigation.shadow$("ui5-tree").shadow$("ui5-list").$$("ui5-li-tree");

			assert.strictEqual(await renderedItems[0].getAttribute("title"), await items[0].getAttribute("title"), "Title is set as tooltip to root item");
			assert.strictEqual(await renderedItems[1].getAttribute("title"), await items[1].getAttribute("text"), "Text is set as tooltip to root item when title is not specified");

			await renderedItems[1].click();

			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#sn1");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			const popoverItems = await popover.$("ui5-list").$$("ui5-li");

			assert.strictEqual(await popoverItems[0].getAttribute("title"), await items[1].getAttribute("text"), "Text is set as tooltip to sub item when title is not specified");
			assert.strictEqual(await popoverItems[1].getAttribute("title"), await secondItemSubItems[0].getAttribute("title"), "Title is set as tooltip to sub item");

			// clean up
			await browser.$("#sn1").setProperty("collapsed", false);
		});
	});
});