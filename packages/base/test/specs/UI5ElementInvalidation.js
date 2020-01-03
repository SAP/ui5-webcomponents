const assert = require("chai").assert;

describe("Invalidation works", () => {
	browser.url("http://localhost:9191/test-resources/pages/AllTestElements.html");

	it("Tests that changing a property invalidates", () => {

		const res = browser.executeAsync( async (done) => {

			const el = document.getElementById("gen");

			// Exactly 1 invalidation for each property change
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

	it("Tests that setting a property to the same value does not invalidate", () => {

		const res = browser.executeAsync( async (done) => {
			const text = "some value";

			const el = document.getElementById("gen");
			el.strProp = text;
			await window.RenderScheduler.whenFinished();

			let invalidations = 0;

			const original = el._invalidate;
			el._invalidate = () => {
				original.apply(el, arguments);
				invalidations++;
			};

			el.strProp = text;

			await window.RenderScheduler.whenFinished();

			return done(invalidations);
		});

		assert.strictEqual(res, 0, "Not invalidated");
	});

	it("Tests that setting a property of type Object always invalidates", () => {

		const res = browser.executeAsync( async (done) => {
			const obj = {};
			const otherObj = {};

			const el = document.getElementById("gen");
			el.objectProp = obj;
			await window.RenderScheduler.whenFinished();

			let invalidations = 0;

			const original = el._invalidate;
			el._invalidate = () => {
				original.apply(el, arguments);
				invalidations++;
			};

			el.objectProp = otherObj;

			await window.RenderScheduler.whenFinished();

			return done(invalidations);
		});

		assert.strictEqual(res, 1, "Invalidated");
	});

	it("Tests that setting an array property always invalidates", () => {

		const res = browser.executeAsync( async (done) => {
			const arr = [];
			const otherArr = [];

			const el = document.getElementById("gen");
			el.multiProp = arr;
			await window.RenderScheduler.whenFinished();

			let invalidations = 0;

			const original = el._invalidate;
			el._invalidate = () => {
				original.apply(el, arguments);
				invalidations++;
			};

			el.multiProp = otherArr;

			await window.RenderScheduler.whenFinished();

			return done(invalidations);
		});

		assert.strictEqual(res, 1, "Invalidated");
	});

	it("Tests that adding a child invalidates", () => {

		const res = browser.executeAsync( async (done) => {

			const el = document.getElementById("gen");

			// Number of invalidations may vary with children/slots count, so just check for invalidation
			let invalidated = false;

			const original = el._invalidate;
			el._invalidate = () => {
				original.apply(el, arguments);
				invalidated = true;
			};

			const div = document.createElement("div");
			el.appendChild(div);

			await window.RenderScheduler.whenFinished();

			return done(invalidated);
		});

		assert.strictEqual(res, true, "Invalidated");
	});

	it("Tests that removing a child invalidates", () => {

		const res = browser.executeAsync( async (done) => {

			const el = document.getElementById("gen");
			const div = document.createElement("div");
			el.appendChild(div);

			await window.RenderScheduler.whenFinished();

			let invalidated = false;

			const original = el._invalidate;
			el._invalidate = () => {
				original.apply(el, arguments);
				invalidated = true;
			};

			el.removeChild(div);

			await window.RenderScheduler.whenFinished();

			return done(invalidated);
		});

		assert.strictEqual(res, true, "Invalidated");
	});

	it("Tests that modifying textContent invalidates", () => {

		const res = browser.executeAsync( async (done) => {

			const el = document.getElementById("gen");
			el.textContent = "test";
			await window.RenderScheduler.whenFinished();

			// Number of invalidations may vary with children/slots count, so just check for invalidation
			let invalidated = false;

			const original = el._invalidate;
			el._invalidate = () => {
				original.apply(el, arguments);
				invalidated = true;
			};

			el.textContent = "test2";

			await window.RenderScheduler.whenFinished();

			return done(invalidated);
		});

		assert.strictEqual(res, true, "Invalidated");
	});

	it("Tests that modifying nodeValue invalidates", () => {

		const res = browser.executeAsync( async (done) => {

			const el = document.getElementById("gen");
			el.textContent = "test";
			await window.RenderScheduler.whenFinished();

			// Number of invalidations may vary with children/slots count, so just check for invalidation
			let invalidated = false;

			const original = el._invalidate;
			el._invalidate = () => {
				original.apply(el, arguments);
				invalidated = true;
			};

			el.childNodes[0].nodeValue = "test2";

			await window.RenderScheduler.whenFinished();

			return done(invalidated);
		});

		assert.strictEqual(res, true, "Invalidated");
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
