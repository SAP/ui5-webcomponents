import { assert } from "chai";

describe("Table - loading", async () => {
	before(async () => {
		await browser.url(`test/pages/TableLoading.html`);
	});

	it("tests busy indicator is displayed", async () => {
		const before = await browser.$("#before-table1");
		const table = await browser.$("#table1");
		const after = await browser.$("#after-table1");
		const loading = await table.shadow$("#loading");

		assert.ok(await loading.isExisting(), "The busy indicator is displayed");

		await before.click();
		assert.ok(await before.isFocused(), "The input before the table1 is focused.");

		// let the busy indicator render before pressing tab
		await browser.pause(100);
		await before.keys("Tab");

		const res = await browser.executeAsync(done => {
			// ui5-busy-indicator has a setTimeout using the delay property and this is not awaited automatically by the test
			setTimeout(() => {
				done(document.getElementById("table1").shadowRoot.querySelector("#loading").matches(":focus"));
			}, 100);
		});
		assert.ok(res, "Busy indicator is focused");

		await browser.keys("Tab");
		assert.ok(await after.isFocused(), "The input after the table1 is focused.");
	});
});