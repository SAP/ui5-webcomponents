
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
			const firstItemSubItems = items[1].$$("ui5-side-navigation-sub-item");
		
			assert.strictEqual(items[0].getAttribute("text"), renderedItems[0].getAttribute("title"), "Text is set as tooltip to root item");
			assert.strictEqual(firstItemSubItems[0].getAttribute("text"), renderedItems[2].getAttribute("title"), "Text is set as tooltip to sub item");
		});

		it("Tests tooltips when collapsed", () => {
			browser.$("#sn1").setProperty("collapsed", true);
			const sideNavigation = browser.$("#sn1");
			const items = sideNavigation.$$("ui5-side-navigation-item");
			const renderedItems = sideNavigation.shadow$("ui5-tree").shadow$("ui5-list").$$("ui5-li-tree");

			assert.strictEqual(items[0].getAttribute("text"), renderedItems[0].getAttribute("title"), "Text is set as tooltip to root item");

			renderedItems[1].click();

			const staticAreaItemClassName = browser.getStaticAreaItemClassName("#sn1");
			const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			const popoverItems = popover.$("ui5-list").$$("ui5-li");

			assert.strictEqual(items[1].getAttribute("text"), popoverItems[0].getAttribute("title"));

			// clean up
			browser.$("#sn1").setProperty("collapsed", false);
		});
	});
});