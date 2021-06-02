const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Rendering", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Title.html`);
	});

	it("h{n} tags rendered correctly", () => {
		const titleH1 = browser.$("#titleH1").shadow$(".ui5-title-root").getHTML();
		const titleH2 = browser.$("#titleH2").shadow$(".ui5-title-root").getHTML();
		const titleH3 = browser.$("#titleH3").shadow$(".ui5-title-root").getHTML();
		const titleH4 = browser.$("#titleH4").shadow$(".ui5-title-root").getHTML();
		const titleH5 = browser.$("#titleH5").shadow$(".ui5-title-root").getHTML();
		const titleH6 = browser.$("#titleH6").shadow$(".ui5-title-root").getHTML();

		assert.ok(titleH1.startsWith("<h1"), "h1 tag is rendered for level='H1'");
		assert.ok(titleH2.startsWith("<h2"), "h2 tag is rendered for level='H2'");
		assert.ok(titleH3.startsWith("<h3"), "h3 tag is rendered for level='H3'");
		assert.ok(titleH4.startsWith("<h4"), "h4 tag is rendered for level='H4'");
		assert.ok(titleH5.startsWith("<h5"), "h5 tag is rendered for level='H5'");
		assert.ok(titleH6.startsWith("<h6"), "h6 tag is rendered for level='H6'");
	});

	it("should wrap the text of the title", () => {
		const wrappingTitle = browser.$("#wrapping-title");
		const truncatedTitle = browser.$("#truncated-title");

		assert.strictEqual(truncatedTitle.getSize().height, 16, "truncated title should be single line");

		assert.ok(wrappingTitle.getSize().height > truncatedTitle.getSize().height, "wrapping title should span more than a single line");
	});
});
