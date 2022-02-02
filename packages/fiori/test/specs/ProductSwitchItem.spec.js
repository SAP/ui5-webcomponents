const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("ProductSwitchItem general interaction", async () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ProductSwitchItem.html`);
	});

	it("tests rendering", async () => {
		const productSwitchItem = await browser.$("#productSwitchItem");

		assert.ok(await productSwitchItem.shadow$(".ui5-product-switch-item-icon"), "Icon is rendered.");
		assert.ok(await productSwitchItem.shadow$(".ui5-product-switch-item-title"), "Title is rendered.");
		assert.ok(await productSwitchItem.shadow$(".ui5-product-switch-item-subtitle"), "SubTitle is rendered.");
	});
});