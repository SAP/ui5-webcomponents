const assert = require("chai").assert;

describe("Invalidation works", () => {
	browser.url("http://localhost:9191/test-resources/pages/GenericElement.html");

	it("Tests that changing a property invalidates", () => {

		const res = browser.executeAsync( async (done) => {

			const el = document.getElementById("gen");

			let invalidations = 0;

			const original = el._invalidate;
			el._invalidate = () => {
				original.apply(el, arguments);
				invalidations++;
			};

			el.strProp = "new value";
			el.boolProp = true;

			await window.RenderScheduler.whenFinished();

			return done(invalidations);
		});

		assert.strictEqual(res, 2, "Invalidated 2 times");
	});

	it("Tests that adding/removing a child invalidates", () => {

		const res = browser.executeAsync( async (done) => {

			const el = document.getElementById("gen");

			let invalidations = 0;

			const original = el._invalidate;
			el._invalidate = () => {
				original.apply(el, arguments);
				invalidations++;
			};

			const div = document.createElement("div");
			el.appendChild(div);
			el.removeChild(div);

			await window.RenderScheduler.whenFinished();

			return done(invalidations);
		});

		assert.strictEqual(res, 2, "Invalidated 2 times");
	});

	it("Tests that multiple invalidations result in a single rendering", () => {

		const res = browser.executeAsync( async (done) => {

			const el = document.getElementById("gen");

			const operations = {
				invalidation: 0,
				rendering: 0,
			};

			const originalInvalidate = el._invalidate;
			el._invalidate = () => {
				originalInvalidate.apply(el, arguments);
				operations.invalidation++;
			};

			const originalRender = el._render;
			el._render = () => {
				originalRender.apply(el, arguments);
				operations.rendering++;
			};

			el.strProp = "new";
			el.strProp = "newer";

			await window.RenderScheduler.whenFinished();

			return done(operations);
		});

		assert.strictEqual(res.invalidation, 2, "Invalidated 2 times");
		assert.strictEqual(res.rendering, 1, "Rendered once");
	});

});
