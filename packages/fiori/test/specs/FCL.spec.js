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
		const startArrowContainerDOM = await fcl.shadow$(".ui5-fcl-arrow-container-start");
		const endArrowContainerDOM = await fcl.shadow$(".ui5-fcl-arrow-container-end");
		const startArrowText1 = "Expand products list";
		const startArrowText2 = "Collapse products list";
		const endArrowText = "Expand product detailed information";
		const startArrowContainerText = "Start Arrow Container";
		const endArrowContainerText = "End Arrow Container";

		// assert
		assert.strictEqual(await startArrow.getAttribute("title"), startArrowText1,
			"Start arrow has the correct tooltip.");
		assert.strictEqual(await endArrow.getAttribute("title"), endArrowText,
			"End arrow has the correct tooltip.");
		assert.strictEqual(await startArrowContainerDOM.getAttribute("aria-label"), startArrowContainerText,
			"Start arrow container has the correct label.");
		assert.strictEqual(await endArrowContainerDOM.getAttribute("aria-label"), endArrowContainerText,
			"End arrow container has the correct label.");

		// act
		await startArrow.click();

		// assert
		assert.strictEqual(await startArrow.getAttribute("title"), startArrowText2,
			"Start arrow has the correct tooltip.");
	});

	it("tests acc default roles", async () => {
		let fcl = await browser.$("#fclAcc");

		const startColumnDOM = await fcl.shadow$(".ui5-fcl-column--start");
		const middleColumnDOM = await fcl.shadow$(".ui5-fcl-column--middle");
		const endColumnDOM = await fcl.shadow$(".ui5-fcl-column--end");

		const startArrowContainerDOM = await fcl.shadow$(".ui5-fcl-arrow-container-start");
		const endArrowContainerDOM = await fcl.shadow$(".ui5-fcl-arrow-container-end");

		// assert
		assert.strictEqual(await startColumnDOM.getAttribute("role"), "region",
			"Start column has the correct default role.");

		assert.strictEqual(await middleColumnDOM.getAttribute("role"), "region",
			"Middle column has the correct default role.");

		assert.strictEqual(await endColumnDOM.getAttribute("role"), "region",
			"End column has the correct default role.");

		assert.strictEqual(await startArrowContainerDOM.getAttribute("role"), null,
			"Start arrow container has the correct default role.");

		assert.strictEqual(await endArrowContainerDOM.getAttribute("role"), null,
			"End arrow container has the correct default role.");
	});

	it("tests acc custom roles", async () => {
		let fcl = await browser.$("#fclAccRoles");

		const startColumnDOM = await fcl.shadow$(".ui5-fcl-column--start");
		const middleColumnDOM = await fcl.shadow$(".ui5-fcl-column--middle");
		const endColumnDOM = await fcl.shadow$(".ui5-fcl-column--end");

		const startArrowContainerDOM = await fcl.shadow$(".ui5-fcl-arrow-container-start");
		const endArrowContainerDOM = await fcl.shadow$(".ui5-fcl-arrow-container-end");

		// assert
		assert.strictEqual(await startColumnDOM.getAttribute("role"), "complimentary",
			"Start column has the correct custom role.");

		assert.strictEqual(await middleColumnDOM.getAttribute("role"), "main",
			"Middle column has the correct custom role.");

		assert.strictEqual(await endColumnDOM.getAttribute("role"), "complementary",
			"End column has the correct custom role.");

		assert.strictEqual(await startArrowContainerDOM.getAttribute("role"), "navigation",
			"Start arrow container has the correct custom role.");

		assert.strictEqual(await endArrowContainerDOM.getAttribute("role"), "navigation",
			"End arrow container has the correct custom role.");
	});
});
