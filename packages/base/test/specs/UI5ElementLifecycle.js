const assert = require("chai").assert;

describe("Lifecycle works", () => {
	before(async () => {
		await browser.url("test/pages/AllTestElements.html");
	});

	it("Tests element creation callbacks", async () => {

		const res = await browser.executeAsync( async (done) => {
			const creationCallbacks = ["onBeforeRendering", "onAfterRendering", "onEnterDOM"];
			const calledCallbacks = [];

			const el = document.createElement("ui5-test-generic");

			creationCallbacks.forEach(callback => {
				const original = el[callback];
				el[callback] = () => {
					calledCallbacks.push(callback);
					original.call(el);
				};
			});

			document.body.appendChild(el);
			await window["sap-ui-webcomponents-bundle"].renderFinished();

			done(calledCallbacks);
		});

		assert.strictEqual(res.length, 3, "All 3 callbacks called");
		assert.strictEqual(res[0], "onBeforeRendering", "onBeforeRendering called first");
		assert.strictEqual(res[1], "onAfterRendering", "onAfterRendering called second");
		assert.strictEqual(res[2], "onEnterDOM", "onEnterDOM called third");
	});

	it("Tests element invalidation callbacks", async () => {

		const res = await browser.executeAsync( async (done) => {
			const invalidationCallbacks = ["onBeforeRendering", "onAfterRendering"];
			const calledCallbacks = [];

			const el = document.createElement("ui5-test-generic");
			document.body.appendChild(el);

			await window["sap-ui-webcomponents-bundle"].renderFinished();

			el.strProp = "some string";

			invalidationCallbacks.forEach(callback => {
				const original = el[callback];
				el[callback] = () => {
					calledCallbacks.push(callback);
					original.call(el);
				};
			});

			await window["sap-ui-webcomponents-bundle"].renderFinished();

			done(calledCallbacks);
		});

		assert.strictEqual(res.length, 2, "All 2 callbacks called");
		assert.strictEqual(res[0], "onBeforeRendering", "onBeforeRendering called first");
		assert.strictEqual(res[1], "onAfterRendering", "onAfterRendering called second");
	});

	it("Tests element destruction callback", async () => {

		const res = await browser.executeAsync( async (done) => {
			const destructionCallbacks = ["onExitDOM"];
			const calledCallbacks = [];

			const el = document.createElement("ui5-test-generic");

			destructionCallbacks.forEach(callback => {
				const original = el[callback];
				el[callback] = () => {
					calledCallbacks.push(callback);
					original.call(el);
				};
			});

			document.body.appendChild(el);

			await window["sap-ui-webcomponents-bundle"].renderFinished(); // Must wait, otherwise onExitDOM won't be called

			document.body.removeChild(el);

			await window["sap-ui-webcomponents-bundle"].renderFinished();

			done(calledCallbacks);
		});

		assert.strictEqual(res.length, 1, "Only 1 callback was called");
		assert.strictEqual(res[0], "onExitDOM", "onExitDOM called");
	});

});
