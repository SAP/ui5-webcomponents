import { assert } from "chai";

describe("Some configuration options can be changed at runtime", () => {
	before(async () => {
		await browser.url("test/pages/Configuration.html");
	});

	it("Tests that theme can be changed", async () => {
		const newTheme = 'sap_horizon_hcb';

		const res = await browser.executeAsync(async (newTheme, done) => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			await config.setTheme(newTheme);
			done(config.getTheme());
		}, newTheme);
		assert.strictEqual(res, newTheme, "Theme changed to HCB");
	});

	it("Tests that noConflict can be changed", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			config.setNoConflict({ events: ["selection-change"] });
			done(config.getNoConflict());
		});
		assert.include(res.events, "selection-change", "selection-change was successfully registered as a no conflict event");
	});

	it("Tests that theme is applied", async () => {
		// act: set absolute URL
		let themeRoot = await browser.executeAsync(async done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			await config.setThemeRoot("https://example.com/");

			done(config.getThemeRoot());
		});

		assert.strictEqual(themeRoot, 'https://example.com/', "Theme root is validated and set.");
	});
});
