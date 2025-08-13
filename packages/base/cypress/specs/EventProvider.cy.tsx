import EventProvider from "../../src/EventProvider.js";

describe("Event provider attaches and detaches listeners properly", () => {
	it("Tests that listeners can be removed (1 listener)", () => {
		let timesCalled = 0;

		cy.then(() => {
			const ep = new EventProvider();
			const callback = () => {
				timesCalled++;
			};

			// Setup
			ep.attachEvent("test", callback);

			// Act
			ep.fireEvent("test", undefined); // should execute the callback and increase the counter

			// Setup
			ep.detachEvent("test", callback);

			// Act
			ep.fireEvent("test", undefined); // should not execute the callback and increase the counter
		})
			.then(() => {
				return timesCalled;
			})
			.should("equal", 1);
	});

	it("Tests that listeners can be removed (more than 1 listener)", () => {
		let timesCalled = 0;

		cy.then(() => {
			const ep = new EventProvider();
			const callback = () => {
				timesCalled++;
			};
			const somePreviousCallback = () => { };

			// Setup
			ep.attachEvent("test", somePreviousCallback); // Attach something so that after detachEvent the listeners array is not empty!
			ep.attachEvent("test", callback);

			// Act
			ep.fireEvent("test", undefined); // should execute the callback and increase the counter

			// Setup
			ep.detachEvent("test", callback);

			// Act
			ep.fireEvent("test", undefined); // should not execute the callback and increase the counter
		})
			.then(() => {
				return timesCalled;
			})
			.should("equal", 1);
	});
});
