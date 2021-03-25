const assert = require("chai").assert;

describe("Configuration script has effect", () => {
	before(() => {
		browser.url("http://localhost:9191/test-resources/pages/ConfigurationScript.html?do-not-change-configuration");
	});

	it("Tests that RTL is applied", () => {
		const res = browser.execute( () => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			return config.getRTL();
		});
		assert.strictEqual(res, true, "RTL is true");
	});

	it("Tests that language is applied", () => {
		const res = browser.execute( () => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			return config.getLanguage();
		});
		assert.strictEqual(res, 'ja', "language is japanese");
	});

	it("Tests that calendarType is applied", () => {
		const res = browser.execute( () => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			return config.getCalendarType();
		});
		assert.strictEqual(res, 'Japanese', "calendarType is japanese");
	});

	it("Tests that formatSettings are applied", () => {
		const res = browser.execute( () => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			return config.getFirstDayOfWeek();
		});
		assert.strictEqual(res, 0, "First day of week is applied");
	});

	it("Tests that theme is applied", () => {
		const res = browser.execute( () => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			return config.getTheme();
		});
		assert.strictEqual(res, 'sap_belize_hcb', "Thems is HCB");
	});

	it("Tests that noConflict is applied", () => {
		const res = browser.execute( () => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			return config.getNoConflict();
		});
		assert.strictEqual(res.events.includes("selection-change"), true, "selectionChange was successfully registered as a no conflict event");
	});

	it("Tests that animationMode is applied", () => {
		const res = browser.execute( () => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			return config.getAnimationMode();
		});
		assert.strictEqual(res, 'basic', "animationMode is basic");
	});
});
