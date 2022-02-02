const assert = require("chai").assert;

describe("Theming works", () => {
	before(async () => {
		await browser.url("http://localhost:9191/test-resources/pages/AllTestElements.html");
	});

	it("Tests that the parameters for the default theme are embedded on boot", async () => {

		const res = await browser.executeAsync(done => {
			const style = document.adoptedStyleSheets.find(sh => sh._ui5StyleId === "data-ui5-theme-properties|@ui5/webcomponents-base-test").cssRules[0].cssText
			done(style && style.includes("--var1: red")); // see test/assets/Themes.js
		});

		assert.strictEqual(res, true, "The fiori3 vars are found");
	});

	it("Tests that theme parameters are changed on theme change", async () => {
		const newTheme = 'sap_belize_hcb';

		const res = await browser.executeAsync( async (newTheme, done) => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			await config.setTheme(newTheme);

			const style = document.adoptedStyleSheets.find(sh => sh._ui5StyleId === "data-ui5-theme-properties|@ui5/webcomponents-base-test").cssRules[0].cssText
			const varsFound = style && style.includes("--var1: orange"); // see test/assets/Themes.js
			done(varsFound);
		}, newTheme);

		assert.strictEqual(res, true, "Theme parameters changed");
	});

});
