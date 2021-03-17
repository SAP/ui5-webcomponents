const assert = require("chai").assert;

describe("Theming works", () => {
	before(() => {
		browser.url("http://localhost:9191/test-resources/pages/AllTestElements.html");
	});

	it("Tests that the parameters for the default theme are embedded on boot", () => {

		const res = browser.execute(() => {
			const style = document.querySelector(`style[data-ui5-theme-properties="@ui5/webcomponents-base-test"]`);
			return style && style.textContent.includes("--var1: red"); // see test/assets/Themes.js
		});

		assert.strictEqual(res, true, "The fiori3 vars are found");
	});

	it("Tests that theme parameters are changed on theme change", () => {
		const newTheme = 'sap_belize_hcb';

		const res = browser.executeAsync( async (newTheme, done) => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			await config.setTheme(newTheme);

			const style = document.querySelector(`style[data-ui5-theme-properties="@ui5/webcomponents-base-test"]`);
			const varsFound = style && style.textContent.includes("--var1: orange"); // see test/assets/Themes.js
			return done(varsFound);
		}, newTheme);

		assert.strictEqual(res, true, "Theme parameters changed");
	});

});
