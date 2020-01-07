const assert = require("chai").assert;

describe("Density awareness metadata property", () => {
	browser.url("http://localhost:9191/test-resources/pages/AllTestElements.html");

	it("Tests that compactSize change does not invalidate a normal element", () => {
		const res = browser.executeAsync( async (done) => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			const el = document.getElementById("gen");

			let invalidated = false;

			const original = el._invalidate;
			el._invalidate = () => {
				original.apply(el, arguments);
				invalidated = true;
			};

			config.setCompactSize(true);

			await window.RenderScheduler.whenFinished();

			return done(invalidated);

		});
		assert.strictEqual(res, false, "compactSize changed did not invalidate the element");
	});

	it("Tests that compactSize change invalidates a content density aware element", () => {
		const res = browser.executeAsync( async (done) => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			const el = document.getElementById("aware");

			let invalidated = false;

			const original = el._invalidate;
			el._invalidate = () => {
				original.apply(el, arguments);
				invalidated = true;
			};

			config.setCompactSize(false); // It was set to true by the previous test

			await window.RenderScheduler.whenFinished();

			return done(invalidated);

		});
		assert.strictEqual(res, true, "compactSize changed invalidated the element");
	});
});
