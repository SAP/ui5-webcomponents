import { assert } from "chai";


describe("FlexibleColumnLayout Behavior", () => {
	before(async () => {
		await browser.url(`test/pages/FCL.html?sap-ui-animationMode=none`);
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

	it("tests 2-column-desktop layout-change on drag separator", async () => {
		const fcl = await browser.$("#fcl1");
		const layoutChangeCounter = await browser.$("#layoutChangeRes4");
		const separator = await fcl.shadow$(".ui5-fcl-separator-start");
		let counter = parseInt(await layoutChangeCounter.getValue()) || 0;

		// act
		await separator.dragAndDrop({ x: -400, y: 0 });

		// assert
		assert.strictEqual(await layoutChangeCounter.getValue(), `${++counter}`, "The event layout-change fired once.");
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsMidExpanded", "new layout set");

		// act
		await separator.dragAndDrop({ x: 400, y: 0 });

		// assert
		assert.strictEqual(await layoutChangeCounter.getValue(), `${++counter}`, "The event layout-change fired again.");
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsStartExpanded", "new layout set");
	});

	it("tests 3-column-desktop layout-change on drag start separator", async () => {
		const fcl = await browser.$("#fcl3"),
			startSeparator = await fcl.shadow$(".ui5-fcl-separator-start");

		// act
		await startSeparator.dragAndDrop({ x: 300, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpandedEndHidden", "new layout set");

		// act
		await startSeparator.dragAndDrop({ x: 100, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsStartExpandedEndHidden", "new layout set");

		// act
		await startSeparator.dragAndDrop({ x: -100, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpandedEndHidden", "new layout set");

		// act
		await startSeparator.dragAndDrop({ x: -300, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpanded", "new layout set");
	});

	it("tests 3-column-desktop layout-change on drag end separator", async () => {
		const fcl = await browser.$("#fcl3"),
			startSeparator = await fcl.shadow$(".ui5-fcl-separator-start"),
			endSeparator = await fcl.shadow$(".ui5-fcl-separator-end");

		await startSeparator.dragAndDrop({ x: 300, y: 0 });
		// assert init state
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpandedEndHidden", "new layout set");

		// act: drag to show the end column
		await endSeparator.dragAndDrop({ x: -400, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpanded", "new layout set");

		// back to initial state
		await startSeparator.dragAndDrop({ x: 300, y: 0 });
		// assert init state
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpandedEndHidden", "new layout set");

		// act: drag to show only minor part of the end column (100px only)
		await endSeparator.dragAndDrop({ x: -100, y: 0 });
		// assert: the end column automatically opens to full width
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpanded", "new layout set");

		// act: expand the end column further
		await endSeparator.dragAndDrop({ x: -400, y: 0 });
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsEndExpanded", "new layout set");
	});

	// TODO: test layout-change event on tablet
	// TODO: change min-width of the columns satisfied

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

	it("tests separator acc attrs", async () => {
		const fcl = await browser.$("#fclAcc");
		const startSeparatorDOM = await fcl.shadow$(".ui5-fcl-separator-start");
		const endSeparatorDOM = await fcl.shadow$(".ui5-fcl-separator-end");
		const startSeparatorText = "Start Draggable Splitter";
		const endSeparatorText = "End Draggable Splitter";

		// assert
		assert.strictEqual(await startSeparatorDOM.getAttribute("title"), startSeparatorText,
			"Start arrow container has the correct label.");
		assert.strictEqual(await endSeparatorDOM.getAttribute("title"), endSeparatorText,
			"End arrow container has the correct label.");
	});

	it("tests acc default roles", async () => {
		let fcl = await browser.$("#fclAcc");

		const startColumnDOM = await fcl.shadow$(".ui5-fcl-column--start");
		const middleColumnDOM = await fcl.shadow$(".ui5-fcl-column--middle");
		const endColumnDOM = await fcl.shadow$(".ui5-fcl-column--end");

		const startSeparatorDOM = await fcl.shadow$(".ui5-fcl-separator-start");
		const endSeparatorDOM = await fcl.shadow$(".ui5-fcl-separator-end");

		// assert
		assert.strictEqual(await startColumnDOM.getAttribute("role"), "region",
			"Start column has the correct default role.");

		assert.strictEqual(await middleColumnDOM.getAttribute("role"), "region",
			"Middle column has the correct default role.");

		assert.strictEqual(await endColumnDOM.getAttribute("role"), null, /* hidden column */
			"End column has the correct default role.");

		assert.strictEqual(await startSeparatorDOM.getAttribute("role"), "separator",
			"Start arrow container has the correct default role.");

		assert.strictEqual(await endSeparatorDOM.getAttribute("role"), "separator",
			"End arrow container has the correct default role.");
	});

	it("tests acc custom roles", async () => {
		let fcl = await browser.$("#fclAccRoles");

		const startColumnDOM = await fcl.shadow$(".ui5-fcl-column--start");
		const middleColumnDOM = await fcl.shadow$(".ui5-fcl-column--middle");
		const endColumnDOM = await fcl.shadow$(".ui5-fcl-column--end");

		const startSeparatorDOM = await fcl.shadow$(".ui5-fcl-separator-start");
		const endSeparatorDOM = await fcl.shadow$(".ui5-fcl-separator-end");

		// assert
		assert.strictEqual(await startColumnDOM.getAttribute("role"), "complementary",
			"Start column has the correct custom role.");

		assert.strictEqual(await middleColumnDOM.getAttribute("role"), "main",
			"Middle column has the correct custom role.");

		assert.strictEqual(await endColumnDOM.getAttribute("role"), "complementary",
			"End column has the correct custom role.");

		assert.strictEqual(await startSeparatorDOM.getAttribute("role"), "navigation",
			"Start arrow container has the correct custom role.");

		assert.strictEqual(await endSeparatorDOM.getAttribute("role"), "navigation",
			"End arrow container has the correct custom role.");
	});

	it("tests acc attrs", async () => {
		let fcl = await browser.$("#fclAccAttrs");

		const startColumnDOM = await fcl.shadow$(".ui5-fcl-column--start");
		const middleColumnDOM = await fcl.shadow$(".ui5-fcl-column--middle");

		// assert
		assert.strictEqual(await startColumnDOM.getAttribute("aria-hidden"), null,
			"Start column is not hidden from the acc tree.");

		assert.strictEqual(await middleColumnDOM.getAttribute("aria-hidden"), "true",
			"Middle column is hidden from the acc tree.");

	});
});
