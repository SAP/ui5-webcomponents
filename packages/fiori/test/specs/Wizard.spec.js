const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Wizard general interaction", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Wizard_test.html`);
	});

	it("test initial state", () => {
		const wiz = browser.$("#wizTest");
		const step1 = browser.$("#st1");
		const step1InHeader = wiz.shadow$(`[data-ui5-index="1"]`);

		// assert - that first step in the content and in the header are properly selected
		assert.strictEqual(step1.getAttribute("selected"), "true",
			"First step in the content is selected.");
		assert.strictEqual(step1InHeader.getAttribute("selected"), "true",
			"First step  in the header is selected.");
	});

	it("ARIA Attributes", () => {
		const wiz = browser.$("#wizTest");
		const wizRoot = wiz.shadow$(".ui5-wiz-root");
		const wizNav = wiz.shadow$(".ui5-wiz-nav");
		const wizList = wiz.shadow$(".ui5-wiz-nav-list");

		const wizRootText = "Wizard";
		const wizNavText = "Wizard Progress Bar";
		const wizListText = "Wizard Steps";

		assert.strictEqual(wizRoot.getAttribute("role"), "region",
			"Wizard has role set.");
		assert.strictEqual(wizRoot.getAttribute("aria-label"), wizRootText,
			"Wizard has aria-label set.");
		assert.strictEqual(wizNav.getAttribute("aria-label"), wizNavText,
			"Wizard nav has aria-label set.");
		assert.strictEqual(wizList.getAttribute("role"), "list",
			"Wizard list has role set..");
		assert.strictEqual(wizList.getAttribute("aria-controls"), `${wiz.getProperty("_id")}-wiz-content`,
			"Wizard list has aria-controls set.");
		assert.strictEqual(wizList.getAttribute("aria-label"), wizListText,
			"Wizard list has aria-label set.");
	});

	it("move to next step by API", () => {
		const wiz = browser.$("#wizTest");
		const btnToStep2 = browser.$("#toStep2");
		const step1 = browser.$("#st1");
		const step2 = browser.$("#st2");
		const step1InHeader = wiz.shadow$(`[data-ui5-index="1"]`);
		const step2InHeader = wiz.shadow$(`[data-ui5-index="2"]`);
		const step1InHeaderRoot = step1InHeader.shadow$(`.ui5-wiz-step-root`);
		const step2InHeaderRoot = step2InHeader.shadow$(`.ui5-wiz-step-root`);
		const stepText = "Step 1 Product type";

		// act - the click handler calls the API
		btnToStep2.click();

		// assert - that first step in the content and in the header are not selected
		assert.strictEqual(step1.getAttribute("selected"), null,
			"First step in the content is not selected.");
		assert.strictEqual(step1InHeader.getAttribute("selected"), null,
			"First step  in the header not is selected.");

		// assert - check if aria-attributes are applied correctly when step is not selected
		assert.strictEqual(step1InHeaderRoot.getAttribute("role"), "listitem",
			"First step in the header has role.");
		assert.strictEqual(step1InHeaderRoot.getAttribute("aria-label"), stepText,
			"First step in the header has aria-label.");

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
		const inpStepChangeCounter =  browser.$("#inpStepChangeCounter");
		const inpStepChangeCause =  browser.$("#inpStepChangeCause");

		// act - click on the first step in the header
		step1InHeader.click();

		// assert - that first step in the content and in the header are selected
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

		// assert - step-change fired once
		assert.strictEqual(inpStepChangeCounter.getProperty("value"), "1",
			"Event step-change fired once.");
		// assert - step-change fired due to user click
		assert.strictEqual(inpStepChangeCause.getProperty("value"), "true",
			"Event step-change fired due to click.");
	});

	it("move to next step by SPACE/ENTER", () => {
		const wiz = browser.$("#wizTest");
		const step1 = browser.$("#st1");
		const step2 = browser.$("#st2");
		const step1InHeader = wiz.shadow$(`[data-ui5-index="1"]`);
		const step2InHeader = wiz.shadow$(`[data-ui5-index="2"]`);
		const inpStepChangeCounter =  browser.$("#inpStepChangeCounter");

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

		// assert - step-change second time
		assert.strictEqual(inpStepChangeCounter.getProperty("value"), "2", "Event step-change fired 2nd time.");

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

		// assert - step-change second time
		assert.strictEqual(inpStepChangeCounter.getProperty("value"), "3",
			"Event step-change fired 3rd time.");
	});

	it("move to next step by scroll", () => {
		const wiz = browser.$("#wizTest");
		const step2 = browser.$("#st2");
		const scrollMarker = browser.$("#scrollMarkerSt2");
		const step2InHeader = wiz.shadow$(`[data-ui5-index="2"]`);
		const inpStepChangeCounter =  browser.$("#inpStepChangeCounter");
		const inpStepChangeCause =  browser.$("#inpStepChangeCause");

		// act - scroll the 2nd step into view
		// Note: scrollIntoView works in Chrome, but if we start executing the test on every browser,
		// this test should be reworked.
		scrollMarker.scrollIntoView();
		browser.pause(500);

		// assert - that second step in the content and in the header are properly selected
		assert.strictEqual(step2.getAttribute("selected"), "true", "Second step in the content is selected.");
		assert.strictEqual(step2InHeader.getAttribute("selected"), "true", "Second step in the header is selected.");
		assert.strictEqual(step2.getAttribute("disabled"), null, "Second step is enabled.");
		assert.strictEqual(step2InHeader.getAttribute("disabled"), null, "Second step in header is enabled.");

		assert.strictEqual(inpStepChangeCounter.getProperty("value"), "4",
			"Event step-change fired 4th time due to scrolling.");

		// assert - step-change fired not because of user click
		assert.strictEqual(inpStepChangeCause.getProperty("value"), "false",
			"Event step-change fired not because of user click, but scrolling");
	});

	it("tests dynamically increase step size and move to next step", () => {
		const wiz = browser.$("#wizTest");
		const sw = browser.$("#sw");
		const btnToStep2 = browser.$("#toStep22");
		const btnToStep3 = browser.$("#toStep3");
		const step3 = browser.$("#st3");
		const scrollMarker = browser.$("#scrollMarkerSt3");
		const step3InHeader = wiz.shadow$(`[data-ui5-index="3"]`);
		const inpStepChangeCounter =  browser.$("#inpStepChangeCounter");

		btnToStep3.click(); // click to enable step 3
		btnToStep2.click(); // click to get back to step 2
		sw.click(); // click to dynamically expand content in step 2
		scrollMarker.scrollIntoView(); // scroll to step 3
		browser.pause(500);

		assert.strictEqual(step3.getAttribute("selected"), "true",
			"Third step in the content is selected.");
		assert.strictEqual(step3InHeader.getAttribute("selected"), "true",
			"Third step in the header is selected.");
		assert.strictEqual(inpStepChangeCounter.getProperty("value"), "5",
			"Event step-change fired once for 5th time due to scrolling.");
	});

	it("tests no scrolling to step, if the step was not changed", ()=>{
		browser.url(`http://localhost:${PORT}/test-resources/pages/Wizard_test.html`);

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
		browser.url(`http://localhost:${PORT}/test-resources/pages/Wizard_test_mobile.html`);

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