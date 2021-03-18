const assert = require("chai").assert;

describe("RadioButton general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/RadioButton.html");
	});

	it("tests select event", () => {
		const radioButton = browser.$("#rb1");
		const field = browser.$("#field");

		radioButton.click();
		assert.strictEqual(field.getProperty("value"), "1", "Select event should be fired 1 time.");

		radioButton.click();
		assert.strictEqual(field.getProperty("value"), "1", "Select event should not be called any more, as radio is already selected.");
	});

	it("tests select event upon ENTER", () => {
		const radioButton1 = browser.$("#rb1");
		const radioButton2 = browser.$("#rb2");
		const field = browser.$("#field");

		radioButton1.click();
		radioButton1.keys("Tab");

		radioButton2.keys("Enter");
		assert.strictEqual(field.getProperty("value"), "2", "Select event should be fired one more time.");

		radioButton2.keys("Enter");
		assert.strictEqual(field.getProperty("value"), "2", "Select event should not be called any more, as radio is already selected.");
	});

	it("tests select event upon SPACE", () => {
		const radioButton1 = browser.$("#rb2");
		const radioButton2 = browser.$("#rb3");
		const field = browser.$("#field");

		radioButton1.click();
		radioButton1.keys("Tab");

		radioButton2.keys("Space");
		assert.strictEqual(field.getProperty("value"), "3", "Select event should be fired one more time.");

		radioButton2.keys("Space");
		assert.strictEqual(field.getProperty("value"), "3", "Select event should not be called any more, as radio is already selected.");
	});

	it("tests change event not fired, when disabled", () => {
		const radioButton = browser.$("#rb4");
		const field = browser.$("#field");

		radioButton.click();
		radioButton.keys("Space");
		radioButton.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "Select event should not be called any more, as radio is disabled.");
	});

	it("tests radio buttons selection within group with ARROW-RIGHT key", () => {
		const field = browser.$("#tabField");
		const radioButtonPreviouslySelected = browser.$("#groupRb1");
		const radioButtonToBeSelected = browser.$("#groupRb3");

		field.click();
		field.keys("Tab");

		radioButtonPreviouslySelected.keys("ArrowRight");

		assert.ok(!radioButtonPreviouslySelected.getProperty("selected"), "Previously selected item has been de-selected.");
		assert.ok(radioButtonToBeSelected.getProperty("selected"), "Pressing ArrowRight selects the next (not disabled) radio in the group.");

		radioButtonToBeSelected.keys("Tab");
	});

	it("tests radio buttons selection within group with ARROW-LEFT key", () => {
		const radioButtonPreviouslySelected = browser.$("#groupRb4");
		const radioButtonToBeSelected = browser.$("#groupRb6");

		radioButtonPreviouslySelected.keys("ArrowLeft");

		assert.ok(!radioButtonPreviouslySelected.getProperty("selected"), "Previously selected item has been de-selected.");
		assert.ok(radioButtonToBeSelected.getProperty("selected"), "Pressing ArrowLeft selects the next (not disabled) radio in the group.");
	});

	it("tests tabindex within group with selected item", () => {
		const selectedRadio = browser.$("#testRbtn11").shadow$(".ui5-radio-root");
		const disabledRadio = browser.$("#testRbtn12").shadow$(".ui5-radio-root");
		const radio = browser.$("#testRbtn13").shadow$(".ui5-radio-root");

		assert.strictEqual(selectedRadio.getAttribute("tabindex"), "0", "The selected radio has tabindex = 0");
		assert.strictEqual(disabledRadio.getAttribute("tabindex"), "-1", "The disabled radio has tabindex = -1");
		assert.strictEqual(radio.getAttribute("tabindex"), "-1", "None selected item has tabindex = -1");
	});

	it("tests tabindex within group with no selected item", () => {
		const radio1 = browser.$("#testRbtn1").shadow$(".ui5-radio-root");
		const radio2 = browser.$("#testRbtn2").shadow$(".ui5-radio-root");

		assert.strictEqual(radio1.getAttribute("tabindex"), "0", "The first radio has tabindex = 0");
		assert.strictEqual(radio2.getAttribute("tabindex"), "-1", "The other radio has tabindex = -1");
	});

	it("tests radio buttons selection within group by clicking", () => {
		const radioButtonPreviouslySelected = browser.$("#groupRb6");
		const radioButtonPreviouslySelectedRoot = browser.$("#groupRb6").shadow$(".ui5-radio-root");

		const radioButtonToBeSelected = browser.$("#groupRb4");
		const radioButtonToBeSelectedRoot = browser.$("#groupRb4").shadow$(".ui5-radio-root");

		radioButtonToBeSelected.click();

		assert.ok(!radioButtonPreviouslySelected.getProperty("selected"), "Previously selected item has been de-selected.");
		assert.strictEqual(radioButtonPreviouslySelectedRoot.getAttribute("tabindex"), "-1", "The previously selected radio has tabindex = -1");

		assert.ok(radioButtonToBeSelected.getProperty("selected"), "Pressing ArrowRight selects the next (not disabled) radio in the group.");
		assert.strictEqual(radioButtonToBeSelectedRoot.getAttribute("tabindex"), "0", "The newly selected radio has tabindex = 0");
	});

	it("tests single selection within group, even if multiple radios are set as selected", () => {
		// radios with property selected=true, but not selected
		const radioButtonNotSelected1 = browser.$("#groupRb8");
		const radioButtonNotSelected2 = browser.$("#groupRb9");

		// radio with property selected=true and actually selected as subsequent
		const radioButtonActuallySelected = browser.$("#groupRb10");

		assert.ok(!radioButtonNotSelected1.getAttribute("selected"), "The radio is not selected as the last one is selected");
		assert.ok(!radioButtonNotSelected2.getAttribute("selected"), "The radio is not selected as the last one is selected");
		assert.ok(radioButtonActuallySelected.getAttribute("selected"), 'The correct radio is selected');
	});

	it("tests select event from radio buttons within group", () => {
		const radioButtonToBeSelected = browser.$("#groupRb7");
		const lblEventCounter = browser.$("#lblEventCounter");
		const lblSelectedRadio = browser.$("#lblRadioGroup");

		radioButtonToBeSelected.click();

		assert.equal(lblEventCounter.getHTML(false), "1", 'The select event is fired once');
		assert.equal(lblSelectedRadio.getHTML(false), radioButtonToBeSelected.getProperty("text"), "The correct radio is selected");
	});

	it("tests truncating and wrapping", () => {
		const truncatingRb = browser.$("#truncatingRb");
		const wrappingRb = browser.$("#wrappingRb");
		const RADIOBUTTON_DEFAULT_HEIGHT = 44;

		const truncatingRbHeight = truncatingRb.getSize("height");
		const wrappingRbHeight = wrappingRb.getSize("height");

		assert.ok(!truncatingRb.getProperty("wrap"), "The text should not be wrapped.");
		assert.ok(wrappingRb.getProperty("wrap"), "The text should be wrapped.");

		assert.strictEqual(truncatingRbHeight, RADIOBUTTON_DEFAULT_HEIGHT, "The size of the radiobutton is : " + truncatingRbHeight);
		assert.ok(wrappingRbHeight > RADIOBUTTON_DEFAULT_HEIGHT, "The size of the radiobutton is more than: " + RADIOBUTTON_DEFAULT_HEIGHT);
	});
});
