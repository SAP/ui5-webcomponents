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
			return done(window['sap-ui-webcomponents-bundle'].hasStyle("data-ui5-theme-properties", "@ui5/webcomponents-theming"));
		});

		assert.ok(styleElement, "style are successfully created and theme applied.");
	});
});