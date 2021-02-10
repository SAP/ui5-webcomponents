const assert = require("chai").assert;

describe("Metadata slot invalidateOnChildChange works", () => {
	browser.url("http://localhost:9191/test-resources/pages/AllTestElements.html");

	it("Tests that changing a monitored property of a child invalidates the parent", () => {

		const res = browser.executeAsync( async (done) => {
			const parent = document.getElementById("parent");
			const child = document.getElementById("child1");

			let parentInvalidated = false;

			parent.onInvalidation = () => {
				parentInvalidated = true;
			};

			child.prop1 = "a"; // child1(default slot) prop1 -> invalidates

			await window.RenderScheduler.whenFinished();

			return done(parentInvalidated);
		});

		assert.strictEqual(res, true, "Parent invalidated");
	});

	it("Tests that changing a non-monitored property of a child does not invalidate the parent", () => {

		const res = browser.executeAsync( async (done) => {
			const parent = document.getElementById("parent");
			const child = document.getElementById("child1");

			let parentInvalidated = false;

			parent.onInvalidation = () => {
				parentInvalidated = true;
			};

			child.prop2 = "b"; // child1(default slot) prop 2 -> does not

			await window.RenderScheduler.whenFinished();

			return done(parentInvalidated);
		});

		assert.strictEqual(res, false, "Parent not invalidated");
	});

	it("Tests that listening for all properties works", () => {

		const res = browser.executeAsync( async (done) => {
			const parent = document.getElementById("parent");
			const child = document.getElementById("child2");

			let parentInvalidatedCount = 0;

			parent.onInvalidation = () => {
				parentInvalidatedCount++;
			};

			child.prop1 = "c";
			child.prop2 = "c";
			child.prop3 = "c";

			await window.RenderScheduler.whenFinished();

			return done(parentInvalidatedCount);
		});

		assert.strictEqual(res, 3, "Parent invalidated 3 times");
	});
});
