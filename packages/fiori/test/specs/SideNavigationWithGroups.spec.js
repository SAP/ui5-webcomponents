import { assert } from "chai";


describe("Component Behavior", () => {
	before(async () => {
		await browser.url(`test/pages/SideNavigationWithGroups.html`);
	});

	describe("Main functionality", async () => {
		it("collapse/expand", async () => {
			const sideNavigation = await browser.$("#sn1");

			assert.ok(await browser.$("#group1").getProperty("expanded"), "Group is expanded");

			await browser.$("#group1").shadow$(".ui5-sn-item").click();
			assert.notOk(await browser.$("#group1").getProperty("expanded"), "Group is collapsed");

			await browser.$("#group1").shadow$(".ui5-sn-item").click();
			assert.ok(await browser.$("#group1").getProperty("expanded"), "Group is expanded");

			await sideNavigation.setAttribute("collapsed", "true");
			assert.notOk(await browser.$("#group1").shadow$(".ui5-sn-item").isExisting(), 'group item is not rendered');

			await sideNavigation.removeAttribute("collapsed");
		});
	});
});
