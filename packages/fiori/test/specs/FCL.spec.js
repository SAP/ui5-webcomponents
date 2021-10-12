const assert = require("chai").assert;
const PORT = require("./_port.js");


describe("FlexibleColumnLayout Behavior", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/FCL.html?sap-ui-animationMode=none`);
	});

	it("tests Desktop size 1400px", async () => {
		// act
		await browser.setWindowSize(1400, 1080);

		const layoutChangeCounter = await browser.$("#testLayoutChange");
		const visibleColumns = await browser.$("#fcl3").getAttribute("_visible-columns");

		// assert
		assert.strictEqual(visibleColumns, "3", "3 columns are visible");
		assert.strictEqual(await layoutChangeCounter.getValue(), "1", "The event layout-change is not fired.");
	});

	it("tests Tablet Size 1000px", async () => {
		// act
		await browser.setWindowSize(1000, 1080);

		const layoutChangeCounter = await browser.$("#testLayoutChange");
		const visibleColumns = await browser.$("#fcl3").getAttribute("_visible-columns");

		// assert
		assert.strictEqual(visibleColumns, "2", "2 columns are visible");
		assert.strictEqual(await layoutChangeCounter.getValue(), "2", "The event layout-change after resizing.");
	});

	it("tests Phone size 500px", async () => {
		// act
		await browser.setWindowSize(500, 1080);

		const layoutChangeCounter = await browser.$("#testLayoutChange");
		const visibleColumns = await browser.$("#fcl3").getAttribute("_visible-columns");

		// assert
		assert.strictEqual(visibleColumns, "1", "1 columns are visible");
		assert.strictEqual(await layoutChangeCounter.getValue(), "3", "The event layout-change after resizing.");

		// reset
		await browser.setWindowSize(1400, 1080);
	});

	it("tests layout-change on arrow press", async () => {
		const fcl = await browser.$("#fcl1");
		const layoutChangeCounter = await browser.$("#layoutChangeRes4");
		const arrow = await fcl.shadow$(".ui5-fcl-arrow--start");
		let counter = parseInt(await layoutChangeCounter.getValue()) || 0;

		// act
		await arrow.click();

		// assert
		assert.strictEqual(await layoutChangeCounter.getValue(), `${++counter}`, "The event layout-change fired once.");
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsMidExpanded", "new layout set");

		// act
		await arrow.click();

		// assert
		assert.strictEqual(await layoutChangeCounter.getValue(), `${++counter}`, "The event layout-change fired again.");
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsStartExpanded", "new layout set");
	});

	it("tests change layout with API", async () => {
		const fcl = await browser.$("#fcl1");
		const btn = await browser.$("#switchBtn1");

		let visibleColumns = await browser.$("#fcl1").getAttribute("_visible-columns");

		assert.strictEqual(visibleColumns, "2", "2 columns are visible");
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsStartExpanded", "new layout set");

		// act
		await btn.click(); // fcl1.layout =  "ThreeColumnsMidExpanded"

		visibleColumns = await browser.$("#fcl1").getAttribute("_visible-columns");

		// assert
		assert.strictEqual(visibleColumns, "3", "3 columns are visible");
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpanded", "new layout set");
	});

	it("tests arrows acc attrs", async () => {
		const fcl = await browser.$("#fclAcc");
		const startArrow = await fcl.shadow$(".ui5-fcl-arrow--start");
		const endArrow = await fcl.shadow$(".ui5-fcl-arrow--end");
		const startArrowText1 = "Expand products list";
		const startArrowText2 = "Collapse products list";
		const endArrowText = "Expand product detailed information";

		// assert
		assert.strictEqual(await startArrow.getAttribute("title"), startArrowText1,
			"Start arrow has the correct tooltip.");
		assert.strictEqual(await endArrow.getAttribute("title"), endArrowText,
			"End arrow has the correct tooltip.");

		// act
		await startArrow.click();

		// assert
		assert.strictEqual(await startArrow.getAttribute("title"), startArrowText2,
			"Start arrow has the correct tooltip.");
	});
});
