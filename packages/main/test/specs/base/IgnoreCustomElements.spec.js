import { assert } from "chai";

describe("Ignore Custom Elements", () => {
	before(async () => {
		await browser.url("test/pages/base/IgnoreCustomElements.html");
	});

	it("Tests ignore custom elements", async () => {
		const result = await browser.executeAsync(done => {
			const bundle = window['sap-ui-webcomponents-bundle'];

			const res = {};
			res.ignoreApp = bundle.shouldIgnoreCustomElement("app-trip-calendar"); // true - see ignoreCustomElements("app-"); in bundle.js
			res.ignoreMy = bundle.shouldIgnoreCustomElement("my-trip-calendar "); // true - see ignoreCustomElements("my-"); in bundle.js
			res.ignoreUI5 = bundle.shouldIgnoreCustomElement("ui5-card-header"); // false
			done(res);
		});

		assert.ok(result.ignoreApp, "The app-trip-calendar tag is ignored");
		assert.ok(result.ignoreMy, "The my-trip-calendar  tag is ignored");
		assert.notOk(result.ignoreUI5, "The ui5-card-header tag is not ignored");
	});
});