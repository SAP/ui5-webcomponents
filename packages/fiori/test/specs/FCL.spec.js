import { assert } from "chai";


describe("FlexibleColumnLayout Behavior", () => {
	before(async () => {
		await browser.setWindowSize(1000, 1080);
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

	it("tests change layout upon dragging the separator to a new layout", async () => {
		const fcl = await browser.$("#fcl1");
		const layoutChangeCounter = await browser.$("#layoutChangeRes4");
		const separator = await fcl.shadow$(".ui5-fcl-separator-start");
		let counter = parseInt(await layoutChangeCounter.getValue()) || 0;

		// set init state
		await fcl.setProperty("layout", "TwoColumnsStartExpanded");
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsStartExpanded", "expected initilal layout");

		// act
		await separator.dragAndDrop({ x: -400, y: 0 }); // drag to "TwoColumnsMidExpanded"

		// assert
		assert.strictEqual(await layoutChangeCounter.getValue(), `${++counter}`, "The event layout-change fired once.");
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsMidExpanded", "new layout set");

		// act
		await separator.dragAndDrop({ x: 400, y: 0 }); // drag to "TwoColumnsStartExpanded"

		// assert
		assert.strictEqual(await layoutChangeCounter.getValue(), `${++counter}`, "The event layout-change fired again.");
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsStartExpanded", "new layout set");
	});
});

describe("Layout change by dragging start-separator on desktop", () => {
	before(async () => {
		await browser.url(`test/pages/FCL.html?sap-ui-animationMode=none`);
	});

	it("allows expand mid column from TwoColumnsStartExpanded to TwoColumnsMidExpanded", async () => {
		const fcl = await browser.$("#fcl1");
		const startSeparator = await fcl.shadow$(".ui5-fcl-separator-start");

		// set init state
		await fcl.setProperty("layout", "TwoColumnsStartExpanded");
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsStartExpanded", "expected initilal layout");

		// act
		await startSeparator.dragAndDrop({ x: -400, y: 0 }); // expand the mid column

		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsMidExpanded", "new layout set");
	});

	it("allows expand start column from TwoColumnsMidExpanded to TwoColumnsStartExpanded", async () => {
		const fcl = await browser.$("#fcl1");
		const separator = await fcl.shadow$(".ui5-fcl-separator-start");

		// set init state
		await fcl.setProperty("layout", "TwoColumnsMidExpanded");
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsMidExpanded", "expected initilal layout");

		// act
		await separator.dragAndDrop({ x: 400, y: 0 }); // expand the start column

		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsStartExpanded", "new layout set");
	});

	it("allows hide end column from ThreeColumnsMidExpanded to ThreeColumnsMidExpandedEndHidden", async () => {
		const fcl = await browser.$("#fcl3"),
			startSeparator = await fcl.shadow$(".ui5-fcl-separator-start");

		// set init state
		await fcl.setProperty("layout", "ThreeColumnsMidExpanded");
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpanded", "expected initilal layout");

		// act: expand start-column
		await startSeparator.dragAndDrop({ x: 300, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpandedEndHidden", "new layout set");
	});

	it("allows expand start column from ThreeColumnsMidExpandedEndHidden to ThreeColumnsStartExpandedEndHidden", async () => {
		const fcl = await browser.$("#fcl3"),
			startSeparator = await fcl.shadow$(".ui5-fcl-separator-start");

		// set init state
		await fcl.setProperty("layout", "ThreeColumnsMidExpandedEndHidden");
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpandedEndHidden", "new layout set");

		// act
		await startSeparator.dragAndDrop({ x: 100, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsStartExpandedEndHidden", "new layout set");
	});

	it("allows expand mid column from ThreeColumnsStartExpandedEndHidden to ThreeColumnsMidExpandedEndHidden", async () => {
		const fcl = await browser.$("#fcl3"),
			startSeparator = await fcl.shadow$(".ui5-fcl-separator-start");

		// set init state
		await fcl.setProperty("layout", "ThreeColumnsStartExpandedEndHidden");
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsStartExpandedEndHidden", "new layout set");

		// act
		await startSeparator.dragAndDrop({ x: -100, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpandedEndHidden", "new layout set");
	});

	it("allows expand end column from ThreeColumnsMidExpandedEndHidden to ThreeColumnsMidExpanded", async () => {
		const fcl = await browser.$("#fcl3"),
			startSeparator = await fcl.shadow$(".ui5-fcl-separator-start");

		// assert init state
		await fcl.setProperty("layout", "ThreeColumnsMidExpandedEndHidden");
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpandedEndHidden", "expected initilal layout");

		// act: expand start-column
		await startSeparator.dragAndDrop({ x: -300, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpanded", "new layout set");
	});
});

describe("Layout change by dragging end-separator on desktop", () => {
	before(async () => {
		await browser.url(`test/pages/FCL.html?sap-ui-animationMode=none`);
	});

	it("allows expand end-column from ThreeColumnsMidExpandedEndHidden to ThreeColumnsMidExpanded", async () => {
		const fcl = await browser.$("#fcl3"),
			endSeparator = await fcl.shadow$(".ui5-fcl-separator-end");

		// set initial state
		await fcl.setProperty("layout", "ThreeColumnsMidExpandedEndHidden");
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpandedEndHidden", "new layout set");

		// act: drag to show the end column
		await endSeparator.dragAndDrop({ x: -400, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpanded", "new layout set");
	});

	it("allows exoand end-column from ThreeColumnsMidExpanded to ThreeColumnsEndExpanded", async () => {
		const fcl = await browser.$("#fcl3"),
			endSeparator = await fcl.shadow$(".ui5-fcl-separator-end");

		// set initial state
		await fcl.setProperty("layout", "ThreeColumnsMidExpanded");
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpanded", "new layout set");

		// act: drag to make the end column wider than mid-column
		await endSeparator.dragAndDrop({ x: -400, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsEndExpanded", "new layout set");
	});
});

describe("Layout change by dragging start-separator on tablet", () => {
	before(async () => {
		await browser.url(`test/pages/FCL.html?sap-ui-animationMode=none`);
	});

	it("allows expand mid column from TwoColumnsStartExpanded to TwoColumnsMidExpanded", async () => {
		await browser.setWindowSize(1000, 1080); // set tablet size

		const fcl = await browser.$("#fcl1");
		const startSeparator = await fcl.shadow$(".ui5-fcl-separator-start");

		// set init state
		await fcl.setProperty("layout", "TwoColumnsStartExpanded");
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsStartExpanded", "expected initilal layout");

		// act
		await startSeparator.dragAndDrop({ x: -400, y: 0 }); // expand the mid column

		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsMidExpanded", "new layout set");
	});

	it("allows expand start column from TwoColumnsMidExpanded to TwoColumnsStartExpanded", async () => {
		const fcl = await browser.$("#fcl1");
		const separator = await fcl.shadow$(".ui5-fcl-separator-start");

		// set init state
		await fcl.setProperty("layout", "TwoColumnsMidExpanded");
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsMidExpanded", "expected initilal layout");

		// act
		await separator.dragAndDrop({ x: 400, y: 0 }); // expand the start column

		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsStartExpanded", "new layout set");
	});

	it("allows hide end column from ThreeColumnsMidExpanded to ThreeColumnsMidExpandedEndHidden", async () => {
		const fcl = await browser.$("#fcl3"),
			startSeparator = await fcl.shadow$(".ui5-fcl-separator-start");

		// set init state
		await fcl.setProperty("layout", "ThreeColumnsMidExpanded");
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpanded", "expected initilal layout");

		// act: expand start-column
		await startSeparator.dragAndDrop({ x: 300, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpandedEndHidden", "new layout set");
	});

	it("allows expand start column from ThreeColumnsMidExpandedEndHidden to ThreeColumnsStartExpandedEndHidden", async () => {
		const fcl = await browser.$("#fcl3"),
			startSeparator = await fcl.shadow$(".ui5-fcl-separator-start");

		// set init state
		await fcl.setProperty("layout", "ThreeColumnsMidExpandedEndHidden");
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpandedEndHidden", "new layout set");

		// act
		await startSeparator.dragAndDrop({ x: 400, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsStartExpandedEndHidden", "new layout set");
	});

	it("allows expand mid column from ThreeColumnsStartExpandedEndHidden to ThreeColumnsMidExpandedEndHidden", async () => {
		const fcl = await browser.$("#fcl3"),
			startSeparator = await fcl.shadow$(".ui5-fcl-separator-start");

		// set init state
		await fcl.setProperty("layout", "ThreeColumnsStartExpandedEndHidden");
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsStartExpandedEndHidden", "new layout set");

		// act
		await startSeparator.dragAndDrop({ x: -400, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpandedEndHidden", "new layout set");
	});

	it("preserves ThreeColumnsMidExpandedEndHidden when dragging to shrink start column", async () => {
		const fcl = await browser.$("#fcl3"),
			startSeparator = await fcl.shadow$(".ui5-fcl-separator-start");

		// assert init state
		await fcl.setProperty("layout", "ThreeColumnsMidExpandedEndHidden");
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpandedEndHidden", "expected initilal layout");

		// act: expand start-column
		await startSeparator.dragAndDrop({ x: -100, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpandedEndHidden", "layout is preserved");
	});
});

describe("Layout change by dragging end-separator on tablet", () => {
	before(async () => {
		await browser.url(`test/pages/FCL.html?sap-ui-animationMode=none`);
	});

	it("allows expand end-column from ThreeColumnsMidExpandedEndHidden to ThreeColumnsMidExpanded", async () => {
		const fcl = await browser.$("#fcl3"),
			endSeparator = await fcl.shadow$(".ui5-fcl-separator-end");

		// set initial state
		await fcl.setProperty("layout", "ThreeColumnsMidExpandedEndHidden");
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpandedEndHidden", "new layout set");

		// act: drag to show the end column
		await endSeparator.dragAndDrop({ x: -400, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpanded", "new layout set");
	});

	it("allows exoand end-column from ThreeColumnsMidExpanded to ThreeColumnsEndExpanded", async () => {
		const fcl = await browser.$("#fcl3"),
			endSeparator = await fcl.shadow$(".ui5-fcl-separator-end");

		// set initial state
		await fcl.setProperty("layout", "ThreeColumnsMidExpanded");
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpanded", "new layout set");

		// act: drag to make the end column wider than mid-column
		await endSeparator.dragAndDrop({ x: -300, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsEndExpanded", "new layout set");
	});
});

describe("Preserves column min-width", () => {
	before(async () => {
		await browser.url(`test/pages/FCL.html?sap-ui-animationMode=none`);
	});

	it("complies with min-width requiremet on smallest desktop", async () => {
		await browser.setWindowSize(1400, 1080);

		const fcl = await browser.$("#fcl3"),
			smallestDesktopWidth = 1024,
			smallestColumnWidth = 248;

		// set initial state
		await fcl.setProperty("layout", "ThreeColumnsMidExpanded");
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpanded", "new layout set");

		// set FCL width to the smallest desktop width
		await browser.executeAsync(async (newWidth, done) => {
			document.getElementById("fcl3").style.width = `${newWidth}px`;
			done();
		}, smallestDesktopWidth);

		const startColumn = await fcl.shadow$(".ui5-fcl-column--start");
		const startColumnWidth = await startColumn.getSize("width");
		const fclWidth = await fcl.getSize("width");

		// assert
		assert.strictEqual(fclWidth, smallestDesktopWidth, "fcl is the smallest desktop width");
		assert.strictEqual(startColumnWidth, smallestColumnWidth, "min-width is respected");
	});

	it("preserves min-width of begin column", async () => {
		await browser.setWindowSize(1400, 1080);

		const fcl = await browser.$("#fcl3"),
			startSeparator = await fcl.shadow$(".ui5-fcl-separator-start"),
			smallestColumnWidth = 248;

		// set initial state
		await fcl.setProperty("layout", "TwoColumnsMidExpanded");
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsMidExpanded", "new layout set");

		const startColumn = await fcl.shadow$(".ui5-fcl-column--start");
		const startColumnWidth = await startColumn.getSize("width");
		const differenceFromSmallestWidth = startColumnWidth - smallestColumnWidth;
		const testOffsetX = differenceFromSmallestWidth + 10; // surpass allowed diff with 10px

		// act: drag srink below min-width
		await startSeparator.dragAndDrop({ x: -testOffsetX, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsMidExpanded", "the layout is preserved");
		assert.strictEqual(await startColumn.getSize("width"), smallestColumnWidth, "min-width is preserved");
	});

	it("preserves min-width of mid column in 2-column layout", async () => {
		const fcl = await browser.$("#fcl3"),
			startSeparator = await fcl.shadow$(".ui5-fcl-separator-start"),
			smallestColumnWidth = 248;

		// set initial state
		await fcl.setProperty("layout", "TwoColumnsStartExpanded");
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsStartExpanded", "new layout set");

		const midColumn = await fcl.shadow$(".ui5-fcl-column--middle");
		const midColumnWidth = await midColumn.getSize("width");
		const differenceFromSmallestWidth = midColumnWidth - smallestColumnWidth;
		const testOffsetX = differenceFromSmallestWidth + 10; // surpass allowed diff with 10px

		// act: drag to srink below min-width
		await startSeparator.dragAndDrop({ x: testOffsetX, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "TwoColumnsStartExpanded", "the layout is preserved");
		assert.strictEqual(await midColumn.getSize("width"), smallestColumnWidth, "min-width is preserved");
	});

	it("preserves min-width of mid column in 3-column layout", async () => {
		const fcl = await browser.$("#fcl3"),
			endSeparator = await fcl.shadow$(".ui5-fcl-separator-end"),
			smallestColumnWidth = 248;

		// set initial state
		await fcl.setProperty("layout", "ThreeColumnsMidExpanded");
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpanded", "new layout set");

		const midColumn = await fcl.shadow$(".ui5-fcl-column--middle");
		const midColumnWidth = await midColumn.getSize("width");
		const differenceFromSmallestWidth = midColumnWidth - smallestColumnWidth;
		const testOffsetX = differenceFromSmallestWidth + 10; // surpass allowed diff with 10px

		// act: drag to srink below min-width
		await endSeparator.dragAndDrop({ x: -testOffsetX, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsEndExpanded", "the layout is updated");
		assert.strictEqual(await midColumn.getSize("width"), smallestColumnWidth, "min-width is preserved");
	});

	it("preserves min-width of end column", async () => {
		const fcl = await browser.$("#fcl3"),
			endSeparator = await fcl.shadow$(".ui5-fcl-separator-end"),
			smallestColumnWidth = 248;

		// set initial state
		await fcl.setProperty("layout", "ThreeColumnsMidExpanded");
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpanded", "new layout set");

		const endColumn = await fcl.shadow$(".ui5-fcl-column--end");
		const endColumnWidth = await endColumn.getSize("width");
		const differenceFromSmallestWidth = endColumnWidth - smallestColumnWidth;
		const testOffsetX = differenceFromSmallestWidth + 10; // surpass allowed diff with 10px

		// act: drag to srink below min-width
		await endSeparator.dragAndDrop({ x: testOffsetX, y: 0 });
		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpanded", "the layout is preserved");
		assert.strictEqual(await endColumn.getSize("width"), smallestColumnWidth, "min-width is preserved");
	});

	it("fully reveals the end-column on dragging the end-separator only few pixels", async () => {
		const fcl = await browser.$("#fcl3"),
			endSeparator = await fcl.shadow$(".ui5-fcl-separator-end"),
			endColumn = await fcl.shadow$(".ui5-fcl-column--end"),
			smallestColumnWidth = 248;

		// set initial state
		await fcl.setProperty("layout", "ThreeColumnsMidExpandedEndHidden");
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpandedEndHidden", "new layout set");

		// act: drag to show the end column
		await endSeparator.dragAndDrop({ x: -100, y: 0 });

		// assert
		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpanded", "new layout set");
		assert.strictEqual(await endColumn.getSize("width"), smallestColumnWidth, "min-width is ensured");
	});
});

describe("ACC", () => {
	before(async () => {
		await browser.url(`test/pages/FCL.html?sap-ui-animationMode=none`);
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

		assert.strictEqual(await endColumnDOM.getAttribute("role"), null,
			"End column has the correct default role."); // hidden column

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

describe("First column closing arrow behavior", () => {
	it("should switch layout and update arrow icon on desktop", async () => {
		const fcl = await browser.$("#fcl10");
		const arrowBtn = await fcl.shadow$(".ui5-fcl-arrow--start");

		await fcl.setProperty("layout", "ThreeColumnsStartHiddenMidExpanded");
		assert.strictEqual(await arrowBtn.getAttribute("icon"), "slim-arrow-right", "Arrow should point right");

		await arrowBtn.click();

		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsMidExpanded", "Layout should switch to ThreeColumnsMidExpanded");
		assert.strictEqual(await arrowBtn.getAttribute("icon"), "slim-arrow-left", "Arrow should point left");

		await arrowBtn.click();

		assert.strictEqual(await fcl.getProperty("layout"), "ThreeColumnsStartHiddenMidExpanded", "Layout should switch to ThreeColumnsStartHiddenMidExpanded");
		assert.strictEqual(await arrowBtn.getAttribute("icon"), "slim-arrow-right", "Arrow should point right");
	});
});