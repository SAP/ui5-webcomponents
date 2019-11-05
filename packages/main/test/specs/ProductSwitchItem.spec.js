const assert = require("assert");

describe("ProductSwitchItem general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/ProductSwitchItem.html");

	it("tests rendering", () => {
		const productSwitchItem = browser.$("#productSwitchItem");

		assert.ok(productSwitchItem.shadow$(".ui5-productswitchitem-icon"), "Icon is rendered.");
		assert.ok(productSwitchItem.shadow$(".ui5-productswitchitem-maintitle"), "Title is rendered.");
		assert.ok(productSwitchItem.shadow$(".ui5-productswitchitem-subtitle"), "SubTitle is rendered.");
	});
});
	