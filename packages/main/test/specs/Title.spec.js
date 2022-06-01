const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Rendering", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Title.html`);
	});

	it("h{n} tags rendered correctly", async () => {
		const titleH1 = await browser.$("#titleH1").shadow$(".ui5-title-root").getHTML();
		const titleH2 = await browser.$("#titleH2").shadow$(".ui5-title-root").getHTML();
		const titleH3 = await browser.$("#titleH3").shadow$(".ui5-title-root").getHTML();
		const titleH4 = await browser.$("#titleH4").shadow$(".ui5-title-root").getHTML();
		const titleH5 = await browser.$("#titleH5").shadow$(".ui5-title-root").getHTML();
		const titleH6 = await browser.$("#titleH6").shadow$(".ui5-title-root").getHTML();

		assert.ok(titleH1.startsWith("<h1"), "h1 tag is rendered for level='H1'");
		assert.ok(titleH2.startsWith("<h2"), "h2 tag is rendered for level='H2'");
		assert.ok(titleH3.startsWith("<h3"), "h3 tag is rendered for level='H3'");
		assert.ok(titleH4.startsWith("<h4"), "h4 tag is rendered for level='H4'");
		assert.ok(titleH5.startsWith("<h5"), "h5 tag is rendered for level='H5'");
		assert.ok(titleH6.startsWith("<h6"), "h6 tag is rendered for level='H6'");
	});

	it("should wrap the text of the title", async () => {
		const wrappingTitle = await browser.$("#wrapping-title");
		const truncatedTitle = await browser.$("#truncated-title");

		const truncatedTitleHeight = (await truncatedTitle.getSize()).height;
		assert.strictEqual(truncatedTitleHeight, 16, "truncated title should be single line");

		const wrappingTitleHeight = (await wrappingTitle.getSize()).height;
		assert.isAbove(wrappingTitleHeight, 16, "wrapping title should span more than a single line");
	});
});
