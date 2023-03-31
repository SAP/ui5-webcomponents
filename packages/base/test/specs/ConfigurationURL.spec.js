import { assert } from "chai";

describe("Some settings can be set via SAP UI URL params", () => {
	beforeEach(async () => {
		await browser.url("test/pages/Configuration.html?sap-ui-rtl=true&sap-ui-language=ja&sap-ui-calendarType=Japanese&sap-ui-theme=sap_belize_hcb@https://example.com&sap-ui-animationMode=basic");
	});

	it("Tests that RTL is applied", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getRTL());
		});
		assert.strictEqual(res, true, "RTL is true");
	});

	it("Tests that language is applied", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getLanguage());
		});
		assert.strictEqual(res, 'ja', "language is japanese");
	});

	it("Tests that calendarType is applied", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getCalendarType());
		});
		assert.strictEqual(res, 'Japanese', "calendarType is japanese");
	});

	it("Tests that theme is applied", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getTheme());
		});
		assert.strictEqual(res, 'sap_belize_hcb', "Thems is HCB");
	});

	it("Tests that theme root is applied", async () => {
		let location;
		let res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getThemeRoot());
		});
		assert.strictEqual(res, 'https://example.com/UI5/', "Theme root is https://example.com/UI5");

		await browser.url("test/pages/Configuration.html?sap-ui-theme=sap_belize_hcb@https://another-example.com");

		res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getThemeRoot());
		});
		location = await browser.executeAsync(done => {
			done(window.location);
		});

		assert.strictEqual(res, `${location.origin}/UI5/`, `Theme root is ${location.origin}/UI5/`);

		await browser.url("test/pages/Configuration.html?sap-ui-theme=sap_belize_hcb@./test");

		res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getThemeRoot());
		});

		assert.ok(res.endsWith("/test/UI5/"), `Theme root is set correctly with relative url`);
	});

	it("Tests that animationMode is applied", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getAnimationMode());
		});
		assert.strictEqual(res, 'basic', "animationMode is basic");
	});
});


describe("Some settings can be set via SAP URL params", () => {
	before(async () => {
		await browser.url("test/pages/Configuration.html?sap-language=bg&sap-theme=sap_fiori_3_dark");
	});

	it("Tests that language is applied", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getLanguage());
		});
		assert.strictEqual(res, 'bg', "language is bulgarian");
	});

	it("Tests that theme is applied", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getTheme());
		});
		assert.strictEqual(res, 'sap_fiori_3_dark', "Thems is Fiori Dark");
	});
});


describe("SAP UI params take precedence over the SAP params", () => {
	before(async () => {
		await browser.url("test/pages/Configuration.html?sap-language=bg&sap-ui-language=de&sap-theme=sap_fiori_3_dark&sap-theme=sap_fiori_3_hcb");
	});

	it("Tests that language is applied via sap-ui-language", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getLanguage());
		});
		assert.strictEqual(res, 'de', "language is german");
	});

	it("Tests that theme is applied via sap-ui-theme", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getTheme());
		});
		assert.strictEqual(res, 'sap_fiori_3_hcb', "Thems is Fiori HCB");
	});
});