const assert = require("chai").assert;

describe("Framework boot", async () => {
	before(async () => {
		await browser.url("test/pages/Boot.html");
	});

	it("Tests theme loading, when attachBoot is called before theme is registered", async () => {
		await browser.executeAsync(done => {
			window['sap-ui-webcomponents-bundle'].registerThemePropsAndBoot();
			done();
		});

		const styleElement = await browser.executeAsync(done => {
			return done(document.querySelector("head>style[data-ui5-theme-properties]"));
		});

		assert.ok(styleElement, "style[data-ui5-theme-properties] tag is successfully created");
	});
});