const assert = require("assert");

describe("ProductSwitch general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/ProductSwitch.html");

	it("tests event itemClick", () => {
		const productSwitch = browser.$("#productSwitchFourColumn");
		const input = browser.$("#eventTest");

		productSwitch.click();
		productSwitch.keys("Space");
		productSwitch.keys("Enter");

		assert.strictEqual(input.getProperty("value"), "3", "click should be called 3 times");
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
