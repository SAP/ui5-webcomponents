
const assert = require("chai").assert;


describe("Component Behavior", () => {
	browser.url("http://localhost:8081/test-resources/pages/FCL.html");

	describe("Responsiveness", () => {
		it("tests Desktop size 1400px", () => {

			browser.setWindowSize(1400, 1080);

			const fcl = browser.$("#fcl");
			// assert.strictEqual(, true, "3 columns are visible");
		});

		it("tests Tablet Size 1200px", () => {
			browser.setWindowSize(1200, 1080);

			const fcl = browser.$("#fcl");
			// assert.strictEqual(, true, "2 columns are visible");
		});

		it("tests Phone size 870px", () => {
			browser.setWindowSize(870, 1080);

			const fcl = browser.$("#fcl");
			// assert.strictEqual(, true, "1 columns are visible");
		});
	});

	describe("Events", () => {
		it("tests layoutChange on arrow press", () => {
			const fcl = browser.$("#fcl");
		});

		it("tests layoutChange on resize", () => {
			const fcl = browser.$("#fcl");
		});
	});
});
