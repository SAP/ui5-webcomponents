const assert = require("chai").assert;

describe("Metadata slot invalidateOnChildChange works", () => {
	before(async () => {
		await browser.url("test/pages/AllTestElements.html");
	});

	it("Tests that changing a monitored property of a child invalidates the parent", async () => {

		const res = await browser.executeAsync( async (done) => {
			const parent = document.getElementById("parent");
			const child = document.getElementById("child1");

			let parentInvalidated = false;

			parent.onInvalidation = () => {
				parentInvalidated = true;
			};

			child.prop1 = "a"; // child1(default slot) prop1 -> invalidates

			await window["sap-ui-webcomponents-bundle"].renderFinished();

			done(parentInvalidated);
		});

		assert.strictEqual(res, true, "Parent invalidated");
	});

	it("Tests that changing a non-monitored property of a child does not invalidate the parent", async () => {

		const res = await browser.executeAsync( async (done) => {
			const parent = document.getElementById("parent");
			const child = document.getElementById("child1");

			let parentInvalidated = false;

			parent.onInvalidation = () => {
				parentInvalidated = true;
			};

			child.prop2 = "b"; // child1(default slot) prop 2 -> does not

			await window["sap-ui-webcomponents-bundle"].renderFinished();

			done(parentInvalidated);
		});

		assert.strictEqual(res, false, "Parent not invalidated");
	});

	it("Tests that listening for all properties works", async () => {

		const res = await browser.executeAsync( async (done) => {
			const parent = document.getElementById("parent");
			const child = document.getElementById("child2");

			let parentInvalidatedCount = 0;

			parent.onInvalidation = () => {
				parentInvalidatedCount++;
			};

			child.prop1 = "c";
			child.prop2 = "c";
			child.prop3 = "c";

			await window["sap-ui-webcomponents-bundle"].renderFinished();

			done(parentInvalidatedCount);
		});

		assert.strictEqual(res, 3, "Parent invalidated 3 times");
	});
});
