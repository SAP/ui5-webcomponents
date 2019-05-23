const assert = require('assert');

describe("Rendering", () => {
	browser.url('http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Title.html');
	
	it("shadow DOM rendered", () => {
		const title = browser.findElementDeep("#titleH1 >>> .sapMTitle");
		const titleH1Tag = browser.findElementDeep("#titleH1 >>> .sapMTitle >>> h1");
		assert.ok(title, "Title Shadow DOM is rendered");
		assert.ok(titleH1Tag, "h1 tag is rendered for level='H1'");
	});
});