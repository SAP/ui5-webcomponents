const assert = require('assert');

describe("RadioButton general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/RadioButton.html");

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

	it("tests radio buttons selection within group with AROW-RIGHT key", () => {
		const field = browser.$("#field");
		const radioButtonPreviouslySelected = browser.$("#groupRb1");
		const radioButtonToBeSelected = browser.$("#groupRb3");

		field.click();
		field.keys("Tab");

		radioButtonPreviouslySelected.keys("ArrowRight");

		assert.ok(!radioButtonPreviouslySelected.getProperty("selected"), "Previously selected item has been de-selected.");
		assert.ok(radioButtonToBeSelected.getProperty("selected"), "Pressing ArrowRight selects the next (not disabled) radio in the group.");

		radioButtonToBeSelected.keys("Tab");
	});

	it("tests radio buttons selection within group with AROW-LEFT key", () => {
		const radioButtonPreviouslySelected = browser.$("#groupRb4");
		const radioButtonToBeSelected = browser.$("#groupRb6");

		radioButtonPreviouslySelected.keys("ArrowLeft");

		assert.ok(!radioButtonPreviouslySelected.getProperty("selected"), "Previously selected item has been de-selected.");
		assert.ok(radioButtonToBeSelected.getProperty("selected"), "Pressing ArrowLeft selects the next (not disabled) radio in the group.");
	});

	it("tests radio buttons selection within group by clicking", () => {
		const radioButtonPreviouslySelected = browser.$("#groupRb6");
		const radioButtonToBeSelected = browser.$("#groupRb4");

		radioButtonToBeSelected.click();

		assert.ok(!radioButtonPreviouslySelected.getProperty("selected"), "Previously selected item has been de-selected.");
		assert.ok(radioButtonToBeSelected.getProperty("selected"), "Pressing ArrowRight selects the next (not disabled) radio in the group.");
	});
	
	it("tests single selection within group, even if multiple radios are set as selected", () => {
		// radios with property selected=true, but not selected
		const radioButtonNotSelected1 = browser.findElementDeep("#groupRb8 >>> .sapMRb");
		const radioButtonNotSelected2 = browser.findElementDeep("#groupRb9 >>> .sapMRb");

		// radio with property selected=true and actually selected as subsequent
		const radioButtonActuallySelected = browser.findElementDeep("#groupRb10 >>> .sapMRb");

		assert.ok(!radioButtonNotSelected1.hasClass("sapMRbSel"), "The radio is not selected as the last one is selected");
		assert.ok(!radioButtonNotSelected2.hasClass("sapMRbSel"), "The radio is not selected as the last one is selected");
		assert.ok(radioButtonActuallySelected.hasClass("sapMRbSel"), 'The correct radio is selected');
	});

	it("tests select event from radio buttons within group", () => {
		const radioButtonToBeSelected = browser.$("#groupRb7");
		const lblEventCounter = browser.$("#lblEventCounter");
		const lblSelectedRadio = browser.$("#lblRadioGroup");

		radioButtonToBeSelected.click();

		assert.equal(lblEventCounter.getHTML(false), "1", 'The select event is fired once');
		assert.equal(lblSelectedRadio.getHTML(false), radioButtonToBeSelected.getProperty("text"), "The correct radio is selected");
	});

});