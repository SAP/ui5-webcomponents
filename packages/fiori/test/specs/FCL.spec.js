
const assert = require("chai").assert;


describe("FlexibleColumnLayout Behavior", () => {
	before(() => {
		browser.url("http://localhost:8081/test-resources/pages/FCL.html?sap-ui-animationMode=none");
	});

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

	it("tests Tablet Size 1000px", () => {
		// act
		browser.setWindowSize(1000, 1080);

		const layoutChangeCounter = browser.$("#testLayoutChange");
		const visibleColumns = browser.execute(() => {
			const fcl = document.getElementById("fcl3");
			return fcl.getAttribute("_visible-columns");
		});

		// assert
		assert.strictEqual(visibleColumns, "2", "2 columns are visible");
		assert.strictEqual(layoutChangeCounter.getValue(), "2", "The event layout-change after resizing.");
	});

	it("tests Phone size 500px", () => {
		// act
		browser.setWindowSize(500, 1080);

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
		let counter = parseInt(layoutChangeCounter.getValue()) || 0;

		// act
		arrow.click();

		// assert
		assert.strictEqual(layoutChangeCounter.getValue(), `${++counter}`, "The event layout-change fired once.");
		assert.strictEqual(fcl.getProperty("layout"), "TwoColumnsMidExpanded", "new layout set");

		// act
		arrow.click();

		// assert
		assert.strictEqual(layoutChangeCounter.getValue(), `${++counter}`, "The event layout-change fired again.");
		assert.strictEqual(fcl.getProperty("layout"), "TwoColumnsStartExpanded", "new layout set");
	});

	it("tests change layout with API", () => {
		const fcl = browser.$("#fcl1");
		const btn = browser.$("#switchBtn1");

		let visibleColumns = browser.execute(() => {
			const fcl = document.getElementById("fcl1");
			return fcl.getAttribute("_visible-columns");
		});

		assert.strictEqual(visibleColumns, "2", "2 columns are visible");
		assert.strictEqual(fcl.getProperty("layout"), "TwoColumnsStartExpanded", "new layout set");

		// act
		btn.click(); // fcl1.layout =  "ThreeColumnsMidExpanded"

		visibleColumns = browser.execute(() => {
			const fcl = document.getElementById("fcl1");
			return fcl.getAttribute("_visible-columns");
		});

		// assert
		assert.strictEqual(visibleColumns, "3", "3 columns are visible");
		assert.strictEqual(fcl.getProperty("layout"), "ThreeColumnsMidExpanded", "new layout set");
	});

	it("tests arrows acc attrs", () => {
		const fcl = browser.$("#fclAcc");
		const startArrow = fcl.shadow$(".ui5-fcl-arrow--start");
		const endArrow = fcl.shadow$(".ui5-fcl-arrow--end");
		const startArrowText1 = "Expand products list";
		const startArrowText2 = "Collapse products list";
		const endArrowText = "Expand product detailed information";

		// assert
		assert.strictEqual(startArrow.getAttribute("title"), startArrowText1,
			"Start arrow has the correct tooltip.");
		assert.strictEqual(startArrow.getAttribute("aria-label"), startArrowText1,
			"Start arrow has the correct aria-label.");
		assert.strictEqual(endArrow.getAttribute("title"), endArrowText,
			"End arrow has the correct tooltip.");
		assert.strictEqual(endArrow.getAttribute("aria-label"), endArrowText,
			"End arrow has the correct aria-label.");

		// act
		startArrow.click();

		// assert
		assert.strictEqual(startArrow.getAttribute("title"), startArrowText2,
			"Start arrow has the correct tooltip.");
		assert.strictEqual(startArrow.getAttribute("aria-label"), startArrowText2,
			"Start arrow has the correct aria-label.");
	});
});
