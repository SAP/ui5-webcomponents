import { assert } from "chai";

describe("Custom themes can be registered", () => {
	before(async () => {
		await browser.url("test/pages/AllTestElements.html");
	});

	it("Tests that theme parameters are changed on theme change", async () => {
		const newTheme = 'my_custom_theme';

		const res = await browser.executeAsync( async (newTheme, done) => {
			const var1 = "--var1: #555555";

			window.registerThemePropertiesLoader("@ui5/webcomponents-base-test", newTheme, () => `:root{ ${var1}; }`);

			const config = window['sap-ui-webcomponents-bundle'].configuration;
			await config.setTheme(newTheme);

			const style = document.adoptedStyleSheets.find(sh => sh._ui5StyleId === "data-ui5-theme-properties|@ui5/webcomponents-base-test").cssRules[0].cssText;
			const varsFound = style && style.includes(var1);
			done(varsFound);
		}, newTheme);

		assert.strictEqual(res, true, "Theme parameters changed");
	});

});
