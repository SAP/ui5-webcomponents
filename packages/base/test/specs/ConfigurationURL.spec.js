const assert = require("chai").assert;

describe("Some settings can be set via URL params", () => {
	browser.url("http://localhost:9191/test-resources/pages/Configuration.html?sap-ui-rtl=true&sap-ui-language=ja&sap-ui-calendarType=Japanese&sap-ui-theme=sap_belize_hcb&sap-ui-animationMode=basic");

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

	it("Tests that theme is applied", () => {
		const res = browser.execute( () => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			return config.getTheme();
		});
		assert.strictEqual(res, 'sap_belize_hcb', "Thems is HCB");
	});

	it("Tests that animationMode is applied", () => {
		const res = browser.execute( () => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			return config.getAnimationMode();
		});
		assert.strictEqual(res, 'basic', "animationMode is basic");
	});
});
