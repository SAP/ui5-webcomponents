const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("ProductSwitch general interaction", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ProductSwitch.html`);
	});

	it("tests desktopColumns attribute", () => {
		const productSwitchFourColumn = browser.$("#productSwitchFourColumn");
		const productSwitchThreeColumn = browser.$("#productSwitchThreeColumn");
		const threeColumnPSItemCount = productSwitchThreeColumn.getProperty("items").length;
		const fourColumnPSItemCount = productSwitchFourColumn.getProperty("items").length;
		const fourColumnPSAttrValue = parseInt(productSwitchFourColumn.getAttribute("desktop-columns"));
		const threeColumnPSAttrValue = parseInt(productSwitchThreeColumn.getAttribute("desktop-columns"));

		assert.strictEqual(fourColumnPSItemCount > 6, fourColumnPSAttrValue === 4, "product switch should have 4 columns.");
		assert.strictEqual(threeColumnPSItemCount <= 6, threeColumnPSAttrValue === 3, "product switch should have 3 columns.");
	});
});

describe("ARIA attributes", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ProductSwitch.html`);
	});

	it ("role and aria-label set correctly", () => {
		const productSwitch = $("#productSwitchFourColumn");
		const productSwitchRoot = productSwitch.shadow$(".ui5-product-switch-root");

		assert.strictEqual(productSwitchRoot.getAttribute("role"), "list", "should have role list");
		assert.strictEqual(productSwitchRoot.getAttribute("aria-label"), "Products", "aria-label reference is correct");
	});

	it ("items attributes set correctly", () => {
		let items = $$("#productSwitchThreeColumn > ui5-product-switch-item");

		items.forEach(item => {
			const itemDom = item.shadow$(".ui5-product-switch-item-root");
			
			assert.strictEqual(itemDom.getAttribute("role"), "listitem", "should have role list");
		})
	});
});