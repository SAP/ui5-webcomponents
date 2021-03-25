const assert = require("chai").assert;

describe("Metadata can be extended", () => {
	before(() => {
		browser.url("http://localhost:9191/test-resources/pages/AllTestElements.html");
	});

	it("When extending metadata, both own and extended entities exist in the resulting metadata", () => {

		const res = browser.execute( () => {

			const el = document.getElementById("genExt");
			const m = el.constructor.getMetadata();

			const ok = !!m.getProperties().strProp &&
				!!m.getProperties().extProp &&
				!!m.getSlots().default &&
				!!m.getSlots().extSlot;

			return ok;
		});

		assert.strictEqual(res, true, "Metadata properly extended");
	});

	it("When extending metadata, property defaultValue can be modified", () => {

		const res = browser.execute( () => {

			const el = document.getElementById("genExt");
			const m = el.constructor.getMetadata();

			const ok = !!m.getProperties().strProp &&
				m.getProperties().strProp.defaultValue === "Ext";

			return ok;
		});

		assert.strictEqual(res, true, "Property defaultValue changed");
	});

});
