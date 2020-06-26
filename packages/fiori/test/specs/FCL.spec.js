
const assert = require("chai").assert;


describe("FlexibleColumnLayout Behavior", () => {
	browser.url("http://localhost:8081/test-resources/pages/FCL.html");

	it("tests Desktop size 1400px", () => {
		// act
		browser.setWindowSize(1400, 1080);

		const layoutChangeCounter = browser.$("#testLayoutChange");
		const visibleColumns = browser.execute(() => {
			const fcl = document.getElementById("fcl3");
			return fcl.getAttribute("_visible-columns");
		});

		// assert
		assert.strictEqual(visibleColumns, "3", "3 columns are visible");
		assert.strictEqual(layoutChangeCounter.getValue(), "1", "The event layout-change is not fired.");
	});

	it("tests Tablet Size 1200px", () => {
		// act
		browser.setWindowSize(1200, 1080);

		const layoutChangeCounter = browser.$("#testLayoutChange");
		const visibleColumns = browser.execute(() => {
			const fcl = document.getElementById("fcl3");
			return fcl.getAttribute("_visible-columns");
		});

		// assert
		assert.strictEqual(visibleColumns, "2", "2 columns are visible");
		assert.strictEqual(layoutChangeCounter.getValue(), "2", "The event layout-change after resizing.");
	});

	it("tests Phone size 870px", () => {
		// act
		browser.setWindowSize(870, 1080);

		const layoutChangeCounter = browser.$("#testLayoutChange");
		const visibleColumns = browser.execute(() => {
			const fcl = document.getElementById("fcl3");
			return fcl.getAttribute("_visible-columns");
		});

		// assert
		assert.strictEqual(visibleColumns, "1", "1 columns are visible");
		assert.strictEqual(layoutChangeCounter.getValue(), "3", "The event layout-change after resizing.");

		// reset
		browser.setWindowSize(1400, 1080);
	});

	it("tests layout-change on arrow press", () => {
		const fcl = browser.$("#fcl1");
		const layoutChangeCounter = browser.$("#layoutChangeRes4");
		const arrow = fcl.shadow$(".ui5-fcl-arrow--start");

		// act
		arrow.click();

		// assert (two times the event has been fired due resize already)
		assert.strictEqual(layoutChangeCounter.getValue(), "3", "The event layout-change fired once.");
		assert.strictEqual(fcl.getProperty("layout"), "TwoColumnsMidExpanded", "new layout set");

		// act
		arrow.click();

		// assert
		assert.strictEqual(layoutChangeCounter.getValue(), "4", "The event layout-change fired again.");
		assert.strictEqual(fcl.getProperty("layout"), "TwoColumnsStartExpanded", "new layout set");
	});
});
