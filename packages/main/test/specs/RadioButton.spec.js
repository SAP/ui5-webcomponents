const assert = require('assert');

describe("RadioButton general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/RadioButton.html");

	it("tests select event", () => {
		const radioButton = browser.findElementDeep("#rb1");
		const field = browser.findElementDeep("#field");

		radioButton.click();
		assert.strictEqual(field.getProperty("value"), "1", "Select event should be fired 1 time.");

		radioButton.click();
		assert.strictEqual(field.getProperty("value"), "1", "Select event should not be called any more, as radio is already selected.");
	});

	it("tests select event upon ENTER", () => {
		const radioButton1 = browser.findElementDeep("#rb1");
		const radioButton2 = browser.findElementDeep("#rb2");
		const field = browser.findElementDeep("#field");

		radioButton1.click();
		radioButton1.keys("Tab");

		radioButton2.keys("Enter");
		assert.strictEqual(field.getProperty("value"), "2", "Select event should be fired one more time.");

		radioButton2.keys("Enter");
		assert.strictEqual(field.getProperty("value"), "2", "Select event should not be called any more, as radio is already selected.");
	});

	it("tests select event upon SPACE", () => {
		const radioButton1 = browser.findElementDeep("#rb2");
		const radioButton2 = browser.findElementDeep("#rb3");
		const field = browser.findElementDeep("#field");

		radioButton1.click();
		radioButton1.keys("Tab");

		radioButton2.keys("Space");
		assert.strictEqual(field.getProperty("value"), "3", "Select event should be fired one more time.");

		radioButton2.keys("Space");
		assert.strictEqual(field.getProperty("value"), "3", "Select event should not be called any more, as radio is already selected.");
	});

	it("tests change event not fired, when disabled", () => {
		const radioButton = browser.findElementDeep("#rb4");
		const field = browser.findElementDeep("#field");

		radioButton.click();
		radioButton.keys("Space");
		radioButton.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "Select event should not be called any more, as radio is disabled.");
	});

	it("tests radio buttons selection within group with AROW-RIGHT key", () => {
		const field = browser.findElementDeep("#field");
		const radioButtonPreviouslySelected = browser.findElementDeep("#groupRb1");
		const radioButtonToBeSelected = browser.findElementDeep("#groupRb3");

		field.click();
		field.keys("Tab");

		radioButtonPreviouslySelected.keys("ArrowRight");

		assert.ok(!radioButtonPreviouslySelected.getProperty("selected"), "Previously selected item has been de-selected.");
		assert.ok(radioButtonToBeSelected.getProperty("selected"), "Pressing ArrowRight selects the next (not disabled) radio in the group.");

		radioButtonToBeSelected.keys("Tab");
	});

	it("tests radio buttons selection within group with AROW-LEFT key", () => {
		const radioButtonPreviouslySelected = browser.findElementDeep("#groupRb4");
		const radioButtonToBeSelected = browser.findElementDeep("#groupRb6");

		radioButtonPreviouslySelected.keys("ArrowLeft");

		assert.ok(!radioButtonPreviouslySelected.getProperty("selected"), "Previously selected item has been de-selected.");
		assert.ok(radioButtonToBeSelected.getProperty("selected"), "Pressing ArrowLeft selects the next (not disabled) radio in the group.");
	});

	it("tests radio buttons selection within group by clicking", () => {
		const radioButtonPreviouslySelected = browser.findElementDeep("#groupRb6");
		const radioButtonToBeSelected = browser.findElementDeep("#groupRb4");

		radioButtonToBeSelected.click();

		assert.ok(!radioButtonPreviouslySelected.getProperty("selected"), "Previously selected item has been de-selected.");
		assert.ok(radioButtonToBeSelected.getProperty("selected"), "Pressing ArrowRight selects the next (not disabled) radio in the group.");
	});
});