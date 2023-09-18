import { assert } from "chai";

describe("ProductSwitchItem general interaction", async () => {
	before(async () => {
		await browser.url(`test/pages/ProductSwitchItem.html`);
	});

	it("tests rendering", async () => {
		const productSwitchItem = await browser.$("#productSwitchItem");

		assert.ok(await productSwitchItem.shadow$(".ui5-product-switch-item-icon"), "Icon is rendered.");
		assert.ok(await productSwitchItem.shadow$(".ui5-product-switch-item-title"), "Title is rendered.");
		assert.ok(await productSwitchItem.shadow$(".ui5-product-switch-item-subtitle"), "SubTitle is rendered.");
	});
});

describe("ARIA attributes", () => {
	it("items role set correctly", async () => {
		const productSwitchItem = await browser.$("#productSwitchItem");
		const root = await productSwitchItem.shadow$(".ui5-product-switch-item-root");
		const role = await root.getAttribute("role");
		assert.strictEqual(role, "listitem", "should have role listitem");
	});
});