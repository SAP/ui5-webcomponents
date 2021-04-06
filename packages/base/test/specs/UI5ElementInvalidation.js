const assert = require("chai").assert;

describe("Invalidation works", () => {
	before(() => {
		browser.url("http://localhost:9191/test-resources/pages/AllTestElements.html");
	});

	it("Tests that changing a property invalidates", () => {

		const res = browser.executeAsync( async (done) => {

			const el = document.getElementById("gen");

			// Exactly 1 invalidation for each property change
			let invalidations = 0;

			el.onInvalidation = () => {
				invalidations++;
			};

			el.strProp = "new value";
			el.boolProp = true;

			await window["sap-ui-webcomponents-bundle"].renderFinished();

			return done(invalidations);
		});

		assert.strictEqual(res, 2, "Invalidated 2 times");
	});

	it("Tests that setting a property to the same value does not invalidate", () => {

		const res = browser.executeAsync( async (done) => {
			const text = "some value";

			const el = document.getElementById("gen");
			el.strProp = text;
			await window["sap-ui-webcomponents-bundle"].renderFinished();

			let invalidations = 0;

			el.onInvalidation = () => {
				invalidations++;
			};

			el.strProp = text;

			await window["sap-ui-webcomponents-bundle"].renderFinished();

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
			await window["sap-ui-webcomponents-bundle"].renderFinished();

			let invalidations = 0;

			el.onInvalidation = () => {
				invalidations++;
			};

			el.objectProp = otherObj;

			await window["sap-ui-webcomponents-bundle"].renderFinished();

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
			await window["sap-ui-webcomponents-bundle"].renderFinished();

			let invalidations = 0;

			el.onInvalidation = () => {
				invalidations++;
			};

			el.multiProp = otherArr;

			await window["sap-ui-webcomponents-bundle"].renderFinished();

			return done(invalidations);
		});

		assert.strictEqual(res, 1, "Invalidated");
	});

	it("Tests that adding a child invalidates", () => {

		const res = browser.executeAsync( async (done) => {

			const el = document.getElementById("gen");

			// Number of invalidations may vary with children/slots count, so just check for invalidation
			let invalidated = false;

			el.onInvalidation = () => {
				invalidated = true;
			};

			const div = document.createElement("div");
			el.appendChild(div);

			await window["sap-ui-webcomponents-bundle"].renderFinished();

			return done(invalidated);
		});

		assert.strictEqual(res, true, "Invalidated");
	});

	it("Tests that removing a child invalidates", () => {

		const res = browser.executeAsync( async (done) => {

			const el = document.getElementById("gen");
			const div = document.createElement("div");
			el.appendChild(div);

			await window["sap-ui-webcomponents-bundle"].renderFinished();

			let invalidated = false;

			el.onInvalidation = () => {
				invalidated = true;
			};

			el.removeChild(div);

			await window["sap-ui-webcomponents-bundle"].renderFinished();

			return done(invalidated);
		});

		assert.strictEqual(res, true, "Invalidated");
	});

	it("Tests that modifying textContent invalidates", () => {

		const res = browser.executeAsync( async (done) => {

			const el = document.getElementById("gen");
			el.textContent = "test";
			await window["sap-ui-webcomponents-bundle"].renderFinished();

			// Number of invalidations may vary with children/slots count, so just check for invalidation
			let invalidated = false;

			el.onInvalidation = () => {
				invalidated = true;
			};

			el.textContent = "test2";

			await window["sap-ui-webcomponents-bundle"].renderFinished();

			return done(invalidated);
		});

		assert.strictEqual(res, true, "Invalidated");
	});

	it("Tests that modifying nodeValue invalidates", () => {

		const res = browser.executeAsync( async (done) => {

			const el = document.getElementById("gen");
			el.textContent = "test";
			await window["sap-ui-webcomponents-bundle"].renderFinished();

			// Number of invalidations may vary with children/slots count, so just check for invalidation
			let invalidated = false;

			el.onInvalidation = () => {
				invalidated = true;
			};

			el.childNodes[0].nodeValue = "test2";

			await window["sap-ui-webcomponents-bundle"].renderFinished();

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

			el.onInvalidation = () => {
				operations.invalidation++;
			};

			const originalRender = el._render;
			el._render = () => {
				originalRender.apply(el, arguments);
				operations.rendering++;
			};

			el.strProp = "new";
			el.strProp = "newer";

			await window["sap-ui-webcomponents-bundle"].renderFinished();

			return done(operations);
		});

		assert.strictEqual(res.invalidation, 2, "Invalidated 2 times");
		assert.strictEqual(res.rendering, 1, "Rendered once");
	});

});
