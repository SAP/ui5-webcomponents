import { assert } from "chai";

describe("Event provider attaches and detaches listeners properly", () => {
	before(async () => {
		await browser.url("test/pages/AllTestElements.html");
	});

	it("Tests that listeners can be removed (1 listener)", async () => {

		const res = await browser.executeAsync(done => {
			let timesCalled = 0;
			const ep = new window["sap-ui-webcomponents-bundle"].EventProvider();
			const callback = () => {
				timesCalled++;
			};

			// Setup
			ep.attachEvent("test", callback);

			// Act
			ep.fireEvent("test"); // should execute the callback and increase the counter

			// Setup
			ep.detachEvent("test", callback);

			// Act
			ep.fireEvent("test"); // should not execute the callback and increase the counter

			done(timesCalled);
		});

		assert.strictEqual(res, 1, "The callback should be called exactly once");
	});

	it("Tests that listeners can be removed (more than 1 listener)", async () => {

		const res = await browser.executeAsync(done => {
			let timesCalled = 0;
			const ep = new window["sap-ui-webcomponents-bundle"].EventProvider();
			const callback = () => {
				timesCalled++;
			};
			const somePreviousCallback = () => {};

			// Setup
			ep.attachEvent("test", somePreviousCallback); // Attach something so that after detachEvent the listeners array is not empty!
			ep.attachEvent("test", callback);

			// Act
			ep.fireEvent("test"); // should execute the callback and increase the counter

			// Setup
			ep.detachEvent("test", callback);

			// Act
			ep.fireEvent("test"); // should not execute the callback and increase the counter

			done(timesCalled);
		});

		assert.strictEqual(res, 1, "The callback should be called exactly once");
	});
});
