import { assert } from "chai";

describe("Theming works", () => {
	before(async () => {
		await browser.url("test/pages/AllTestElements.html");
	});

	it("Tests that the parameters for the default theme are embedded on boot", async () => {

		const res = await browser.executeAsync(done => {
			const bundle = window['sap-ui-webcomponents-bundle'];
			const dataPropAttr = `data-ui5-component-properties-${bundle.getCurrentRuntimeIndex()}`;
			const style = document.adoptedStyleSheets.find(sh => sh._ui5StyleId === `${dataPropAttr}|@ui5/webcomponents-base-test`).cssRules[0].cssText
			done(style && style.includes("--var1: grey")); // see test/assets/Themes.js
		});

		assert.strictEqual(res, true, "The fiori3 vars are found");
	});

	it("Tests that theme parameters are changed on theme change", async () => {
		const newTheme = 'sap_belize_hcb';

		const res = await browser.executeAsync( async (newTheme, done) => {
			const bundle = window['sap-ui-webcomponents-bundle'];
			const dataPropAttr = `data-ui5-component-properties-${bundle.getCurrentRuntimeIndex()}`;
			const config = bundle.configuration;
			await config.setTheme(newTheme);

			const style = document.adoptedStyleSheets.find(sh => sh._ui5StyleId === `${dataPropAttr}|@ui5/webcomponents-base-test`).cssRules[0].cssText
			const varsFound = style && style.includes("--var1: orange"); // see test/assets/Themes.js
			done(varsFound);
		}, newTheme);

		assert.strictEqual(res, true, "Theme parameters changed");
	});

	it("Tests fallback to default theme when setting unknown theme", async () => {
		const unknownTheme = 'sap_unknown_theme';
		await browser.url(`test/pages/AllTestElements.html?sap-ui-theme=${unknownTheme}`);

		const res = await browser.executeAsync(done => {
			const bundle = window['sap-ui-webcomponents-bundle'];
			const dataPropAttr = `data-ui5-component-properties-${bundle.getCurrentRuntimeIndex()}`;
			const style = document.adoptedStyleSheets.find(sh => sh._ui5StyleId === `${dataPropAttr}|@ui5/webcomponents-base-test`).cssRules[0].cssText
			const varsFound = style && style.includes("--var1: grey"); // "grey" for horizon - see test/assets/Themes.js
			done(varsFound);
		});

		assert.strictEqual(res, true, "Default theme parameters loaded");
	});
});
