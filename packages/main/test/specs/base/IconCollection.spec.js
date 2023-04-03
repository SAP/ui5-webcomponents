import { assert } from "chai";

describe("Icon collection", () => {
	before(async () => {
		await browser.url("test/pages/base/IconCollection.html");
	});

	it("Tests the icon collection in built-in themes", async () => {
		const result = await browser.executeAsync(done => {
			const bundle = window['sap-ui-webcomponents-bundle'];

			const res = {};
			res.iconCollection = bundle.getEffectiveIconCollection();
			res.isLegacyThemeFamily = bundle.configuration.isLegacyThemeFamily();
			done(res);
		});

		// assert: "SAP-icons-v4" is used in legacy "sap_fiori_3_dark" theme
		assert.strictEqual(result.iconCollection, "SAP-icons-v4",
			"The 'SAP-icons-v4' collection is correctly used in 'sap_fiori_3_dark' theme");
		assert.strictEqual(result.isLegacyThemeFamily, true,
			"The 'sap_fiori_3_dark' is part of legacy theme family");


		// act: setTheme("sap_horizon")
		await browser.executeAsync(async (done) => {
			await window['sap-ui-webcomponents-bundle'].configuration.setTheme("sap_horizon");
			done();
		});

		const result2 = await browser.executeAsync(done => {
			const bundle = window['sap-ui-webcomponents-bundle'];

			const res = {};
			res.iconCollection = bundle.getEffectiveIconCollection();
			res.isLegacyThemeFamily = bundle.configuration.isLegacyThemeFamily();
			done(res);
		});

		// assert:  "SAP-icons-v5" is used in latest "sap_horizon" theme
		assert.strictEqual(result2.iconCollection, "SAP-icons-v5",
			"The 'SAP-icons-v5' collection is correctly used in 'sap_horizon' theme");
		assert.strictEqual(result2.isLegacyThemeFamily, false,
			"The 'sap_horizon' is not part of legacy theme family, it's the latest one");
	});
});

describe("Icon collection in Custom Theme", () => {
	before(async () => {
		// The test page is using custom theme (based on "sap_horizon")
		await browser.url("test/pages/base/IconCollectionInCustomTheme.html");
	});

	it("Tests the icon collection in a custom theme", async () => {
		const result = await browser.executeAsync(done => {
			const bundle = window['sap-ui-webcomponents-bundle'];

			const res = {};
			res.iconCollection = bundle.getEffectiveIconCollection();
			res.isLegacyThemeFamily = bundle.configuration.isLegacyThemeFamily();
			
			done(res);
		});

		assert.strictEqual(result.iconCollection, "SAP-icons-v5",
			"The 'SAP-icons-v5' collection is correctly used in 'redfish' - extending 'sap_horizon'");
		assert.strictEqual(result.isLegacyThemeFamily, false,
			"The 'redfish' custom theme is not part of legacy theme family, as it's extending 'sap_horizon'.");
	});
});