const assert = require('assert');

describe("Rendering", () => {
	browser.url('http://localhost:8080/test-resources/pages/Title.html');

	it("h{n} tags rendered correctly", () => {
		const titleH1Tag = browser.$("#titleH1").shadow$("h1.sapMTitle");
		const titleH2Tag = browser.$("#titleH2").shadow$("h2.sapMTitle");
		const titleH3Tag = browser.$("#titleH3").shadow$("h3.sapMTitle");
		const titleH4Tag = browser.$("#titleH4").shadow$("h4.sapMTitle");
		const titleH5Tag = browser.$("#titleH5").shadow$("h5.sapMTitle");
		const titleH6Tag = browser.$("#titleH6").shadow$("h6.sapMTitle");

		assert.ok(titleH1Tag, "h1 tag is rendered for level='H1'");
		assert.ok(titleH2Tag, "h2 tag is rendered for level='H2'");
		assert.ok(titleH3Tag, "h3 tag is rendered for level='H3'");
		assert.ok(titleH4Tag, "h4 tag is rendered for level='H4'");
		assert.ok(titleH5Tag, "h5 tag is rendered for level='H5'");
		assert.ok(titleH6Tag, "h6 tag is rendered for level='H6'");
	});
});
