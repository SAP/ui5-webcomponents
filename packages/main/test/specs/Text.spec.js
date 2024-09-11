import { assert } from "chai";

describe("Text", () => {
	before(async () => {
		await browser.url("test/pages/Text.html");
	});

	it("tests root element is bdi", async () => {
		const rootElement = await browser.$("#text1").shadow$(":first-child");

		assert.strictEqual(await rootElement.getTagName(), "span", "Root item should be span");
	});

	it("tests default wrapping behavior", async () => {
		const text = await browser.$("#text1");

		assert.strictEqual((await text.getCSSProperty("word-wrap")).value, "break-word", "Default wrapping should be break-word");
	});

	it("tests maxLines default behavior", async () => {
		const text = await browser.$("#text1");

		assert.strictEqual((await text.getCSSProperty("-webkit-line-clamp")).value, "none", "-webkit-line-clamp should be 'none'");
	});

	it("tests maxLines", async () => {
		const text = await browser.$("#text2");

		assert.strictEqual((await text.getCSSProperty("-webkit-line-clamp")).value, 1, "-webkit-line-clamp should be 1");
	});

	it("tests emptyIndicatorMode", async () => {
		const text = await browser.$("#emptyText").shadow$(".empty-indicator");
		const label = await browser.$("#emptyText").shadow$(".empty-indicator-aria-label");

		assert.strictEqual(await text.getText(), "–", "'–' should be rendered");
		assert.strictEqual(await label.getText(), "Empty Value", "Aria label is properly set");
	});
});