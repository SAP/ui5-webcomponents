const assert = require("chai").assert;

describe("Wizard general interaction", () => {
	browser.url("http://localhost:8081/test-resources/pages/Wizard_test.html");

	it("test initial selection", () => {
		const wiz = browser.$("#wizTest");
		const step1 = browser.$("#st1");
		const step1InHeader = wiz.shadow$(`[data-ui5-index="1"]`);

		// assert - that first step in the content and in the header are properly selected
		assert.strictEqual(step1.getAttribute("selected"), "true",
			"First step in the content is selected.");
		assert.strictEqual(step1InHeader.getAttribute("selected"), "true",
			"First step  in the header is selected.");
	});

	it("move to next step by API", () => {
		const wiz = browser.$("#wizTest");
		const btnToStep2 = browser.$("#toStep2");
		const step1 = browser.$("#st1");
		const step2 = browser.$("#st2");
		const step1InHeader = wiz.shadow$(`[data-ui5-index="1"]`);
		const step2InHeader = wiz.shadow$(`[data-ui5-index="2"]`);

		// act - the click handler calls the API
		btnToStep2.click();
		
		// assert - that first step in the content and in the header are not selected
		assert.strictEqual(step1.getAttribute("selected"), null,
			"First step in the content is not selected.");
		assert.strictEqual(step1InHeader.getAttribute("selected"), null,
			"First step  in the header not is selected.");

		// assert - that second step in the content and in the header are properly selected
		assert.strictEqual(step2.getAttribute("selected"), "true",
			"Second step in the content is selected.");
		assert.strictEqual(step2InHeader.getAttribute("selected"),
			"true", "Second step in the header is selected.");
		assert.strictEqual(step2.getAttribute("disabled"), null,
			"Second step is enabled.");
		assert.strictEqual(step2InHeader.getAttribute("disabled"), null,
			"Second step in header is enabled.");
	});

	it("move to next step by click", () => {
		const wiz = browser.$("#wizTest");
		const step1 = browser.$("#st1");
		const step2 = browser.$("#st2");
		const step1InHeader = wiz.shadow$(`[data-ui5-index="1"]`);
		const step2InHeader = wiz.shadow$(`[data-ui5-index="2"]`);
		const inpSelectionChangeCounter =  browser.$("#inpSelectionChangeCounter");

		// act - click on the first step in the header
		step1InHeader.click();

		// assert - that first step in the content and in the header are  selected
		assert.strictEqual(step1.getAttribute("selected"), "true",
			"First step in the content is selected.");
		assert.strictEqual(step1InHeader.getAttribute("selected"), "true",
			"First step in the header is selected.");
		assert.strictEqual(step1.getAttribute("disabled"), null,
			"First step is enabled.");
		assert.strictEqual(step1InHeader.getAttribute("disabled"), null,
			"First step in header is enabled.");

		// assert - that second step in the content and in the header are not selected
		assert.strictEqual(step2.getAttribute("selected"), null,
			"Second step in the content is not selected.");
		assert.strictEqual(step2InHeader.getAttribute("selected"), null,
			"Second step in the header is not selected.");

		// assert - selection-change fired once
		assert.strictEqual(inpSelectionChangeCounter.getProperty("value"), "1",
			"Event selection-change fired once.");
	});

	it("move to next step by SPACE/ENTER", () => {
		const wiz = browser.$("#wizTest");
		const step1 = browser.$("#st1");
		const step2 = browser.$("#st2");
		const step1InHeader = wiz.shadow$(`[data-ui5-index="1"]`);
		const step2InHeader = wiz.shadow$(`[data-ui5-index="2"]`);
		const inpSelectionChangeCounter =  browser.$("#inpSelectionChangeCounter");

		// act - bring the focus to the first step in the header
		// act - use keyboard to move to step2
		step1InHeader.click();
		step1InHeader.keys("ArrowRight");
		step2InHeader.keys("Space");

		// assert - that first step in the content and in the header are not selected
		assert.strictEqual(step1.getAttribute("selected"), null, "First step in the content is not selected.");
		assert.strictEqual(step1InHeader.getAttribute("selected"), null, "First step  in the header not is selected.");
		
		// assert - that second step in the content and in the header are properly selected
		assert.strictEqual(step2.getAttribute("selected"), "true",
			"Second step in the content is selected.");
		assert.strictEqual(step2InHeader.getAttribute("selected"), "true",
			"Second step in the header is selected.");
		assert.strictEqual(step2.getAttribute("disabled"), null,
			"Second step is enabled.");
		assert.strictEqual(step2InHeader.getAttribute("disabled"), null,
			"Second step in header is enabled.");

		// assert - selection-change second time
		assert.strictEqual(inpSelectionChangeCounter.getProperty("value"), "2", "Event selection-change fired 2nd time.");

		// act - use keyboard to move back to step1
		step2InHeader.keys("ArrowLeft");
		step1InHeader.keys("Enter");

		// assert - that first step in the content and in the header are  selected
		assert.strictEqual(step1.getAttribute("selected"), "true",
			"First step in the content is not selected.");
		assert.strictEqual(step1InHeader.getAttribute("selected"), "true",
			"First step  in the header not is selected.");
		assert.strictEqual(step1.getAttribute("disabled"), null,
			"First step is enabled.");
		assert.strictEqual(step1InHeader.getAttribute("disabled"), null,
			"First step in header is enabled.");

		// assert - that second step in the content and in the header are not selected
		assert.strictEqual(step2.getAttribute("selected"), null,
			"Second step in the content is not selected.");
		assert.strictEqual(step2InHeader.getAttribute("selected"), null,
			"Second step in the header is not selected.");

		// assert - selection-change second time
		assert.strictEqual(inpSelectionChangeCounter.getProperty("value"), "3",
			"Event selection-change fired 3rd time.");
	});

	it("move to next step by scroll", () => {
		const wiz = browser.$("#wizTest");
		const step2 = browser.$("#st2");
		const step2InHeader = wiz.shadow$(`[data-ui5-index="2"]`);
		const inpSelectionChangeCounter =  browser.$("#inpSelectionChangeCounter");

		// act - scroll the 2nd step into view
		// Note: scrollIntoView works in Chrome, but if we start executing the test on every browser,
		// this test should be reworked.
		step2.scrollIntoView();
		browser.pause(500);

		// assert - that second step in the content and in the header are properly selected
		assert.strictEqual(step2.getAttribute("selected"), "true", "Second step in the content is selected.");
		assert.strictEqual(step2InHeader.getAttribute("selected"), "true", "Second step in the header is selected.");
		assert.strictEqual(step2.getAttribute("disabled"), null, "Second step is enabled.");
		assert.strictEqual(step2InHeader.getAttribute("disabled"), null, "Second step in header is enabled.");

		assert.strictEqual(inpSelectionChangeCounter.getProperty("value"), "4",
			"Event selection-change fired 4rd time due to scrolling.");
	});
});