import { assert } from "chai";

describe("Text", () => {
	before(async () => {
		await browser.url("test/pages/Text.html");
	});

	it ("Checks for missing dependencies", async() => {
		const { checkMissingDependencies } = await import("@ui5/webcomponents-tools/util/wdio.mjs");
		await checkMissingDependencies("ui5-text");
	});

	it("tests root element is bdi", async () => {
		const rootElement = await browser.$("#text1").shadow$(":first-child");

		assert.strictEqual(await rootElement.getTagName(), "bdi", "Root item should be bdi");
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
});