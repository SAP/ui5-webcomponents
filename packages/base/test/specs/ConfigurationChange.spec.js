const assert = require("chai").assert;

describe("Some configuration options can be changed at runtime", () => {
	before(async () => {
		await browser.url("http://localhost:9191/test-resources/pages/Configuration.html");
	});

	it("Tests that theme can be changed", async () => {
		const newTheme = 'sap_belize_hcb';

		const res = await browser.executeAsync( async (newTheme, done) => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			await config.setTheme(newTheme);
			done(config.getTheme());
		}, newTheme);
		assert.strictEqual(res, newTheme, "Theme changed to HCB");
	});

	it("Tests that noConflict can be changed", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			config.setNoConflict({events: ["selection-change"]});
			done(config.getNoConflict());
		});
		assert.include(res.events, "selection-change", "selection-change was successfully registered as a no conflict event");
	});
});
