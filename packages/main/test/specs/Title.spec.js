const assert = require('assert');

describe("Rendering", () => {
	browser.url('http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Title.html');
	
	it("h{n} tags rendered correctly", () => {
		const titleH1Tag = browser.findElementDeep("#titleH1 >>> h1.sapMTitle");
		const titleH2Tag = browser.findElementDeep("#titleH2 >>> h2.sapMTitle");
		const titleH3Tag = browser.findElementDeep("#titleH3 >>> h3.sapMTitle");
		const titleH4Tag = browser.findElementDeep("#titleH4 >>> h4.sapMTitle");
		const titleH5Tag = browser.findElementDeep("#titleH5 >>> h5.sapMTitle");
		const titleH6Tag = browser.findElementDeep("#titleH6 >>> h6.sapMTitle");

		assert.ok(titleH1Tag, "h1 tag is rendered for level='H1'");
		assert.ok(titleH2Tag, "h2 tag is rendered for level='H1'");
		assert.ok(titleH3Tag, "h3 tag is rendered for level='H1'");
		assert.ok(titleH4Tag, "h4 tag is rendered for level='H1'");
		assert.ok(titleH5Tag, "h5 tag is rendered for level='H1'");
		assert.ok(titleH6Tag, "h6 tag is rendered for level='H1'");
	});
});