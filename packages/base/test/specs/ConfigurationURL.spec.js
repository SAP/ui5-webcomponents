const assert = require("chai").assert;

describe("Some settings can be set via SAP UI URL params", () => {
	before(() => {
		browser.url("http://localhost:9191/test-resources/pages/Configuration.html?sap-ui-rtl=true&sap-ui-language=ja&sap-ui-calendarType=Japanese&sap-ui-theme=sap_belize_hcb&sap-ui-animationMode=basic");
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


describe("Some settings can be set via SAP URL params", () => {
	before(() => {
		browser.url("http://localhost:9191/test-resources/pages/Configuration.html?sap-language=bg&sap-theme=sap_fiori_3_dark");
	});

	it("Tests that language is applied", () => {
		const res = browser.execute( () => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			return config.getLanguage();
		});
		assert.strictEqual(res, 'bg', "language is bulgarian");
	});

	it("Tests that theme is applied", () => {
		const res = browser.execute( () => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			return config.getTheme();
		});
		assert.strictEqual(res, 'sap_fiori_3_dark', "Thems is Fiori Dark");
	});
});


describe("SAP UI params take precedence over the SAP params", () => {
	before(() => {
		browser.url("http://localhost:9191/test-resources/pages/Configuration.html?sap-language=bg&sap-ui-language=de&sap-theme=sap_fiori_3_dark&sap-theme=sap_fiori_3_hcb");
	});

	it("Tests that language is applied via sap-ui-language", () => {
		const res = browser.execute( () => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			return config.getLanguage();
		});
		assert.strictEqual(res, 'de', "language is german");
	});

	it("Tests that theme is applied via sap-ui-theme", () => {
		const res = browser.execute( () => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			return config.getTheme();
		});
		assert.strictEqual(res, 'sap_fiori_3_hcb', "Thems is Fiori HCB");
	});
});