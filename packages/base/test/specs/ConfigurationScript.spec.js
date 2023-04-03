import { assert } from "chai";

describe("Configuration script has effect", () => {
	before(async () => {
		await browser.url("test/pages/ConfigurationScript.html?do-not-change-configuration");
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

	it("Tests that formatSettings are applied", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getFirstDayOfWeek());
		});
		assert.strictEqual(res, 0, "First day of week is applied");
	});

	it("Tests that theme is applied", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getTheme());
		});
		assert.strictEqual(res, 'sap_belize_hcb', "Thems is HCB");
	});

	it("Tests that noConflict is applied", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getNoConflict());
		});
		assert.include(res.events, "selection-change", "selectionChange was successfully registered as a no conflict event");
	});

	it("Tests that legacyDateCalendarCustomizing is applied", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getLegacyDateCalendarCustomizing());
		});
		const expectedResult = [
			{
				"dateFormat": "A",
				"islamicMonthStart": "14351201",
				"gregDate": "20140925"
			},
			{
				"dateFormat": "A",
				"islamicMonthStart": "14360101",
				"gregDate": "20141024"
			},
			{
				"dateFormat": "A",
				"islamicMonthStart": "14360201",
				"gregDate": "20141123"
			}
		];
		assert.deepEqual(res, expectedResult, "legacyDateCalendarCustomizing are applied");
	});

	it("Tests that animationMode is applied", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getAnimationMode());
		});
		assert.strictEqual(res, 'basic', "animationMode is basic");
	});
});
