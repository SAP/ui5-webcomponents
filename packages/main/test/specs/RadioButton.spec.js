const assert = require("chai").assert;

describe("RadioButton general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/RadioButton.html`);
	});

	it("tests change event", async () => {
		const radioButton = await browser.$("#rb1").shadow$(".ui5-radio-root");
		const field = await browser.$("#field");

		await radioButton.click();
		assert.strictEqual(await field.getProperty("value"), "1", "Change event should be fired 1 time.");

		await radioButton.click();
		assert.strictEqual(await field.getProperty("value"), "1", "Change event should not be called any more, as radio is already selected.");
	});

	it("tests change event upon ENTER", async () => {
		const radioButton1 = await browser.$("#rb1").shadow$(".ui5-radio-root");
		const radioButton2 = await browser.$("#rb2").shadow$(".ui5-radio-root");;
		const field = await browser.$("#field");

		await radioButton1.click();
		await radioButton1.keys("Tab");

		await radioButton2.keys("Enter");
		assert.strictEqual(await field.getProperty("value"), "2", "change event should be fired one more time.");

		await radioButton2.keys("Enter");
		assert.strictEqual(await field.getProperty("value"), "2", "Change event should not be called any more, as radio is already selected.");
	});

	it("tests change event upon SPACE", async () => {
		const radioButton1 = await browser.$("#rb2").shadow$(".ui5-radio-root");;
		const radioButton2 = await browser.$("#rb3").shadow$(".ui5-radio-root");;
		const field = await browser.$("#field");

		await radioButton1.click();
		await radioButton1.keys("Tab");

		await radioButton2.keys("Space");
		assert.strictEqual(await field.getProperty("value"), "3", "Change event should be fired one more time.");

		await radioButton2.keys("Space");
		assert.strictEqual(await field.getProperty("value"), "3", "Change event should not be called any more, as radio is already selected.");
	});

	it("tests change event not fired, when disabled", async () => {
		const radioButton = await browser.$("#rb4").shadow$(".ui5-radio-root");;
		const field = await browser.$("#field");

		await radioButton.click();
		await radioButton.keys("Space");
		await radioButton.keys("Enter");

		assert.strictEqual(await field.getProperty("value"), "3", "Change event should not be called any more, as radio is disabled.");
	});

	it("tests radio buttons selection within group with ARROW-RIGHT key", async () => {
		const field = await browser.$("#tabField");
		const radioButtonPreviouslySelected = await browser.$("#groupRb1");
		const radioButtonToBeSelected = await browser.$("#groupRb3");

		await field.click();
		await field.keys("Tab");

		await radioButtonPreviouslySelected.keys("ArrowRight");

		assert.notOk(await radioButtonPreviouslySelected.getProperty("checked"), "Previously selected item has been de-selected.");
		assert.ok(await radioButtonToBeSelected.getProperty("checked"), "Pressing ArrowRight selects the next (not disabled) radio in the group.");

		await radioButtonToBeSelected.keys("Tab");
	});

	it("tests radio buttons selection within group with ARROW-LEFT key", async () => {
		const radioButtonPreviouslySelected = await browser.$("#groupRb4");
		const radioButtonToBeSelected = await browser.$("#groupRb6");

		await radioButtonPreviouslySelected.keys("ArrowLeft");

		assert.notOk(await radioButtonPreviouslySelected.getProperty("checked"), "Previously selected item has been de-selected.");
		assert.ok(await radioButtonToBeSelected.getProperty("checked"), "Pressing ArrowLeft selects the next (not disabled) radio in the group.");
	});

	it("tests tabindex within group with selected item", async () => {
		const checkedRadio = await browser.$("#testRbtn11").shadow$(".ui5-radio-root");
		const disabledRadio = await browser.$("#testRbtn12").shadow$(".ui5-radio-root");
		const radio = await browser.$("#testRbtn13").shadow$(".ui5-radio-root");

		assert.strictEqual(await checkedRadio.getAttribute("tabindex"), "0", "The checked radio has tabindex = 0");
		assert.strictEqual(await disabledRadio.getAttribute("tabindex"), "-1", "The disabled radio has tabindex = -1");
		assert.strictEqual(await radio.getAttribute("tabindex"), "-1", "None checked item has tabindex = -1");
	});

	it("tests tabindex within group with no checked item", async () => {
		const radio1 = await browser.$("#testRbtn1").shadow$(".ui5-radio-root");
		const radio2 = await browser.$("#testRbtn2").shadow$(".ui5-radio-root");

		assert.strictEqual(await radio1.getAttribute("tabindex"), "0", "The first radio has tabindex = 0");
		assert.strictEqual(await radio2.getAttribute("tabindex"), "-1", "The other radio has tabindex = -1");
	});

	it("tests radio buttons selection within group by clicking", async () => {
		const radioButtonPreviouslySelected = await browser.$("#groupRb6");
		const radioButtonPreviouslySelectedRoot = await browser.$("#groupRb6").shadow$(".ui5-radio-root");

		const radioButtonToBeSelected = await browser.$("#groupRb4");
		const radioButtonToBeSelectedRoot = await browser.$("#groupRb4").shadow$(".ui5-radio-root");

		await radioButtonToBeSelected.click();

		assert.notOk(await radioButtonPreviouslySelected.getProperty("checked"), "Previously selected item has been de-selected.");
		assert.strictEqual(await radioButtonPreviouslySelectedRoot.getAttribute("tabindex"), "-1", "The previously selected radio has tabindex = -1");

		assert.ok(await radioButtonToBeSelected.getProperty("checked"), "Pressing ArrowRight selects the next (not disabled) radio in the group.");
		assert.strictEqual(await radioButtonToBeSelectedRoot.getAttribute("tabindex"), "0", "The newly selected radio has tabindex = 0");
	});

	it("tests single selection within group, even if multiple radios are set as checked", async () => {
		// radios with property checked=true, but not selected
		const radioButtonNotSelected1 = await browser.$("#groupRb8");
		const radioButtonNotSelected2 = await browser.$("#groupRb9");

		// radio with property checked=true and actually selected as subsequent
		const radioButtonActuallySelected = await browser.$("#groupRb10");

		assert.notOk(await radioButtonNotSelected1.getAttribute("checked"), "The radio is not selected as the last one is selected");
		assert.notOk(await radioButtonNotSelected2.getAttribute("checked"), "The radio is not selected as the last one is selected");
		assert.ok(await radioButtonActuallySelected.getAttribute("checked"), 'The correct radio is selected');
	});

	it("tests change event from radio buttons within group", async () => {
		const radioButtonToBeSelectedShadow = await browser.$("#groupRb7").shadow$(".ui5-radio-root");
		const radioButtonToBeSelected = await browser.$("#groupRb7");
		const lblEventCounter = await browser.$("#lblEventCounter");
		const lblSelectedRadio = await browser.$("#lblRadioGroup");

		await radioButtonToBeSelectedShadow.click();

		assert.equal(await lblEventCounter.getHTML(false), "1", 'The change event is fired once');
		assert.equal(await lblSelectedRadio.getHTML(false), await radioButtonToBeSelected.getProperty("text"), "The correct radio is selected");
	});

	it("tests truncating and wrapping", async () => {
		const truncatingRb = await browser.$("#truncatingRb");
		const wrappingRb = await browser.$("#wrappingRb");
		const RADIOBUTTON_DEFAULT_HEIGHT = 44;

		const truncatingRbHeight = await truncatingRb.getSize("height");
		const wrappingRbHeight = await wrappingRb.getSize("height");

		assert.strictEqual(await truncatingRb.getProperty("wrappingType"), "None", "The text should not be wrapped.");
		assert.strictEqual(await wrappingRb.getProperty("wrappingType"), "Normal", "The text should be wrapped.");

		assert.strictEqual(truncatingRbHeight, RADIOBUTTON_DEFAULT_HEIGHT, "The size of the radiobutton is : " + truncatingRbHeight);
		assert.isAbove(wrappingRbHeight, RADIOBUTTON_DEFAULT_HEIGHT, "The size of the radiobutton is more than: " + RADIOBUTTON_DEFAULT_HEIGHT);
	});

	it("tests accessibleName", async () => {
		const rbAccName = await browser.$("#rb-acc-name");
		const rbAccNameText = await browser.$("#rb-acc-name-text");
		const RADIOBUTTON_LABEL = "Sample Label";
		const RADIOBUTTON_TEXT = "Sample Text";

		assert.strictEqual(await rbAccName.getProperty("ariaLabelText"), RADIOBUTTON_LABEL, "The ariaLabelledByText includes the accessibleName.");
		assert.strictEqual(await rbAccNameText.getProperty("ariaLabelText"), `${RADIOBUTTON_LABEL} ${RADIOBUTTON_TEXT}`, "The ariaLabelledByText includes both the text and the accessibleName.");
	});

	it("tests accessibleNameRef", async () => {
		const labelText = await browser.$("#lbl-rb-acc-name-ref").getText();
		const rb = await browser.$("#rb-acc-name-ref");

		assert.strictEqual(await rb.getProperty("ariaLabelText"), labelText, "The ariaLabelText includes the accessibleNameRef text.");
	});

	it("tests accessibleNameRef and radio button text together", async () => {
		const labelText = await browser.$("#lbl-rb-acc-name-ref-with-text").getText();
		const rb = await browser.$("#rb-acc-name-ref-with-text");
		const rbText = await rb.getProperty("text");

		assert.strictEqual(await rb.getProperty("ariaLabelText"), `${labelText} ${rbText}`, "The ariaLabelText includes both the accessibleNameRef text and the radio button text.");
	});
});

describe("RadioButton keyboard handling in RTL", () => {
	before(async () => {
		await browser.url(`test/pages/RadioButton.html`);
	});

	it("Arrow Left", async () => {
		const rb = await browser.$("#rtlOptionA");
		await rb.click();
		await rb.keys("ArrowLeft");

		assert.ok(await browser.$("#rtlOptionB").getAttribute("checked"), "Pressing ArrowLeft selects the next radio in the group.");

		await browser.$("#rtlOptionB").keys("ArrowLeft");

		assert.ok(await browser.$("#rtlOptionC").getAttribute("checked"), "Pressing ArrowLeft selects the next radio in the group.");
	});

	it("Arrow Right", async () => {
		const rb = await browser.$("#rtlOptionA");
		await rb.click();
		await rb.keys("ArrowRight");

		assert.ok(await browser.$("#rtlOptionC").getAttribute("checked"), "Pressing ArrowRight selects the next radio in the group.");

		await browser.$("#rtlOptionC").keys("ArrowRight");

		assert.ok(await browser.$("#rtlOptionB").getAttribute("checked"), "Pressing ArrowRight selects the next radio in the group.");
	});
});