
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
		});
	});
});