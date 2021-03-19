const assert = require("chai").assert;

describe("Wizard general interaction", () => {
	before(() => {
		browser.url("http://localhost:8081/test-resources/pages/Wizard_test.html");
	});

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
			"Event selection-change fired 4th time due to scrolling.");
	});

	it("tests dynamically increase step size and move to next step", () => {
		const wiz = browser.$("#wizTest");
		const sw = browser.$("#sw");
		const btnToStep2 = browser.$("#toStep22");
		const btnToStep3 = browser.$("#toStep3");
		const step3 = browser.$("#st3");
		const step3InHeader = wiz.shadow$(`[data-ui5-index="3"]`);
		const inpSelectionChangeCounter =  browser.$("#inpSelectionChangeCounter");

		btnToStep3.click(); // click to enable step 3
		btnToStep2.click(); // click to get back to step 2
		sw.click(); // click to dynamically expand content in step 2
		step3.scrollIntoView(); // scroll to step 3
		browser.pause(500);

		assert.strictEqual(step3.getAttribute("selected"), "true",
			"Third step in the content is selected.");
		assert.strictEqual(step3InHeader.getAttribute("selected"), "true",
			"Third step in the header is selected.");
		assert.strictEqual(inpSelectionChangeCounter.getProperty("value"), "5",
			"Event selection-change fired once for 5th time due to scrolling.");
	});

	it("tests no scrolling to selected step, if the selection was not changed", ()=>{
		browser.url("http://localhost:8081/test-resources/pages/Wizard_test.html");

		const wizard = browser.$("#wizTest");
		const wizardContentDOM = wizard.shadow$(".ui5-wiz-content");
		const btnToStep2 = browser.$("#toStep2");

		// (1) - go to step 2
		btnToStep2.click();

		// (2) - scroll a bit upwards to get back to step 1 (at least its bottom part)
		btnToStep2.scrollIntoView();

		// (3) store the scroll position after scrolling upwards
		const scrolPosBefore = browser.execute((wizardContentDOM) => {
			return wizardContentDOM.scrollTop
		}, wizardContentDOM);

		// (4) simulate re-rendering
		browser.execute((wizard) => {
			wizard.onAfterRendering();
		}, wizard);

		// (5) store the scroll position after re-rendering
		const scrolPosAfter = browser.execute((wizardContentDOM) => {
			return wizardContentDOM.scrollTop
		}, wizardContentDOM);

		// assert - The Wizard did not scroll to the very top of the step 1
		assert.strictEqual(scrolPosBefore, scrolPosAfter,
			"No scrolling occures after re-rendering when the selected step remains the same.");
	});

	it("tests small screen", ()=>{
		browser.url("http://localhost:8081/test-resources/pages/Wizard_test_mobile.html");

		const wizard = browser.$("#wizTest");
		const wizardDisabled = browser.$("#wizTest2");
		const groupedStep = wizard.shadow$(`[data-ui5-index="3"]`);
		const groupedStepDisabled = wizardDisabled.shadow$(`[data-ui5-index="3"]`);
		
		// act - click on the stack of steps
		groupedStep.shadow$(`.ui5-wiz-step-root`).click();

		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#wizTest")
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		// assert - the popup is open
		assert.ok(popover.isDisplayedInViewport(), "Popover is opened.");


		// act - click on the disabled stack of steps
		groupedStepDisabled.shadow$(`.ui5-wiz-step-root`).click();

		const staticAreaItemClassName2 = browser.getStaticAreaItemClassName("#wizTest2")
		const disabledPopover = browser.$(`.${staticAreaItemClassName2}`).shadow$("ui5-responsive-popover");

		// assert - the popup is open
		assert.ok(disabledPopover.isDisplayedInViewport(), "Popover is opened.");
	});
});