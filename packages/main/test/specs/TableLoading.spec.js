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

		await before.keys("Tab");
		await browser.executeAsync(done => {
			setTimeout(() => {
				done(document.getElementById("table1").shadowRoot.querySelector("#loading").matches(":focus"));
			}, 100);
		});

		await browser.keys("Tab");
		assert.ok(await after.isFocused(), "The input after the table1 is focused.");
	});
});