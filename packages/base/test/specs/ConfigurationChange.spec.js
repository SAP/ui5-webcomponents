const assert = require("chai").assert;

describe("Some configuration options can be changed at runtime", () => {
	before(() => {
		browser.url("http://localhost:9191/test-resources/pages/Configuration.html");
	});

	it("Tests that theme can be changed", () => {
		const newTheme = 'sap_belize_hcb';

		const res = browser.executeAsync( async (newTheme, done) => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			await config.setTheme(newTheme);
			return done(config.getTheme());
		}, newTheme);
		assert.strictEqual(res, newTheme, "Theme changed to HCB");
	});

	it("Tests that noConflict can be changed", () => {
		const res = browser.execute( () => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			config.setNoConflict({events: ["selection-change"]});
			return config.getNoConflict();
		});
		assert.strictEqual(res.events.includes("selection-change"), true, "selection-change was successfully registered as a no conflict event");
	});
});
