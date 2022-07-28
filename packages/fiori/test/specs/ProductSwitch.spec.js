const assert = require("chai").assert;

describe("ProductSwitch general interaction", async () => {
	before(async () => {
		await browser.url(`test/pages/ProductSwitch.html`);
	});

	it("tests desktopColumns attribute", async () => {
		const productSwitchFourColumn = await browser.$("#productSwitchFourColumn");
		const productSwitchThreeColumn = await browser.$("#productSwitchThreeColumn");
		const threeColumnPSItemCount = (await productSwitchThreeColumn.getProperty("items")).length;
		const fourColumnPSItemCount = (await productSwitchFourColumn.getProperty("items")).length;
		const fourColumnPSAttrValue = parseInt(await productSwitchFourColumn.getAttribute("desktop-columns"));
		const threeColumnPSAttrValue = parseInt(await productSwitchThreeColumn.getAttribute("desktop-columns"));

		assert.isAbove(fourColumnPSItemCount, 6, "more than 6 items.");
		assert.strictEqual(fourColumnPSAttrValue, 4, "product switch should have 4 columns.");

		assert.isAtMost(threeColumnPSItemCount, 6, "6 items or less.");
		assert.strictEqual(threeColumnPSAttrValue, 3, "product switch should have 3 columns.");
	});
});

describe("ARIA attributes", () => {
	before(async () => {
		await browser.url(`test/pages/ProductSwitch.html`);
	});

	it ("role and aria-label set correctly", async () => {
		const productSwitch = await browser.$("#productSwitchFourColumn");
		const productSwitchRoot = await productSwitch.shadow$(".ui5-product-switch-root");

		assert.strictEqual(await productSwitchRoot.getAttribute("role"), "list", "should have role list");
		assert.strictEqual(await productSwitchRoot.getAttribute("aria-label"), "Products", "aria-label reference is correct");
	});

	it ("items attributes set correctly", async () => {
		let items = $$("#productSwitchThreeColumn > ui5-product-switch-item");

		items.forEach(async item => {
			const itemDom = await item.shadow$(".ui5-product-switch-item-root");

			assert.strictEqual(await itemDom.getAttribute("role"), "listitem", "should have role list");
		})
	});
});
