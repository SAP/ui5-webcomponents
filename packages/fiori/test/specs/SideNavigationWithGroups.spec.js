import { assert } from "chai";


describe("Component Behavior", () => {
	before(async () => {
		await browser.url(`test/pages/SideNavigationWithGroups.html`);
	});

	it ("Checks for missing dependencies", async() => {
		const { checkMissingDependencies } = await import("@ui5/webcomponents-tools/util/wdio.mjs");
		await checkMissingDependencies(["ui5-side-navigation", "ui5-side-navigation-item", "ui5-side-navigation-sub-item", "ui5-side-navigation-group"]);
	});

	describe("Main functionality", async () => {
		it("rendering", async () => {
			const sideNavigation = await browser.$("#sn1");

			assert.ok(await browser.$("#group1").shadow$(".ui5-sn-item").isExisting(), 'group item is rendered');

			await sideNavigation.setAttribute("collapsed", "true");
			assert.notOk(await browser.$("#group1").shadow$(".ui5-sn-item").isExisting(), 'group item is not rendered');

			await sideNavigation.removeAttribute("collapsed");
		});

		it("collapse/expand", async () => {
			assert.ok(await browser.$("#group1").getProperty("expanded"), "Group is expanded");

			await browser.$("#group1").shadow$(".ui5-sn-item").click();
			assert.notOk(await browser.$("#group1").getProperty("expanded"), "Group is collapsed");

			await browser.$("#group1").shadow$(".ui5-sn-item").click();
			assert.ok(await browser.$("#group1").getProperty("expanded"), "Group is expanded");
		});
	});
});
