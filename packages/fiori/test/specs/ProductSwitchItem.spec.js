const assert = require("assert");

describe("ProductSwitchItem general interaction", () => {
	browser.url("http://localhost:8081/test-resources/pages/ProductSwitchItem.html");

	it("tests rendering", () => {
		const productSwitchItem = browser.$("#productSwitchItem");

		assert.ok(productSwitchItem.shadow$(".ui5-product-switch-item-icon"), "Icon is rendered.");
		assert.ok(productSwitchItem.shadow$(".ui5-product-switch-item-heading"), "Title is rendered.");
		assert.ok(productSwitchItem.shadow$(".ui5-product-switch-item-subtitle"), "SubTitle is rendered.");
	});
});