import { assert } from "chai";

describe("Framework boot", async () => {
	before(async () => {
		await browser.url("test/pages/Boot.html");
	});

	it("Tests theme loading, when registered after 'attachBoot' and 'boot'", async () => {
		await browser.executeAsync(done => {
			window['sap-ui-webcomponents-bundle'].registerThemeProps();
			done();
		});

		const styleElement = await browser.executeAsync(done => {
			return done(document.querySelector("head>style[data-ui5-theme-properties]"));
		});

		assert.ok(styleElement, "style[data-ui5-theme-properties] tag is successfully created and theme applied.");
	});
});