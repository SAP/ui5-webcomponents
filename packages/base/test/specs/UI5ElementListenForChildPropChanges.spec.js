const assert = require("chai").assert;

describe("Metadata slot listenFor works", () => {
	browser.url("http://localhost:9191/test-resources/pages/AllTestElements.html");

	it("Tests that changing a listenFor property of a child invalidates the parent", () => {

		const res = browser.executeAsync( async (done) => {
			const parent = document.getElementById("parent");
			const child = document.getElementById("child1");

			const parentInvalidate = parent._invalidate;
			let parentInvalidated = false;

			parent._invalidate = () => {
				parentInvalidate.apply(parent, arguments);
				parentInvalidated = true;
			};

			child.prop1 = "a"; // child1(default slot) prop1 -> invalidates

			await window.RenderScheduler.whenFinished();

			return done(parentInvalidated);
		});

		assert.strictEqual(res, true, "Parent invalidated");
	});

	it("Tests that changing a non-listenFor property of a child does not invalidate the parent", () => {

		const res = browser.executeAsync( async (done) => {
			const parent = document.getElementById("parent");
			const child = document.getElementById("child1");

			const parentInvalidate = parent._invalidate;
			let parentInvalidated = false;

			parent._invalidate = () => {
				parentInvalidate.apply(parent, arguments);
				parentInvalidated = true;
			};

			child.prop2 = "b"; // child1(default slot) prop 2 -> does not

			await window.RenderScheduler.whenFinished();

			return done(parentInvalidated);
		});

		assert.strictEqual(res, false, "Parent not invalidated");
	});

	it("Tests that listenFor include works", () => {

		const res = browser.executeAsync( async (done) => {
			const parent = document.getElementById("parent");
			const child = document.getElementById("child2");

			const parentInvalidate = parent._invalidate;
			let parentInvalidated = false;

			parent._invalidate = () => {
				parentInvalidate.apply(parent, arguments);
				parentInvalidated = true;
			};

			child.prop1 = "c"; // child2(items slot) prop1 invalidates

			await window.RenderScheduler.whenFinished();

			return done(parentInvalidated);
		});

		assert.strictEqual(res, true, "Parent invalidated");
	});

	it("Tests that listenFor exclude works", () => {

		const res = browser.executeAsync( async (done) => {
			const parent = document.getElementById("parent");
			const child = document.getElementById("child2");

			const parentInvalidate = parent._invalidate;
			let parentInvalidated = false;

			parent._invalidate = () => {
				parentInvalidate.apply(parent, arguments);
				parentInvalidated = true;
			};

			child.prop3 = "d"; //child2(items slot) prop3 does not

			await window.RenderScheduler.whenFinished();

			return done(parentInvalidated);
		});

		assert.strictEqual(res, false, "Parent not invalidated");
	});
});
