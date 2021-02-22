const assert = require("chai").assert;

describe("Select general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Select.html");
	});

	it("fires change on selection", () => {
		const select = $("#mySelect");
		const selectText = browser.$("#mySelect").shadow$(".ui5-select-label-root");
		const inputResult = browser.$("#inputResult").shadow$("input");
		const EXPECTED_SELECTION_TEXT = "Cozy";

		select.click();
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#mySelect")
		const firstItem = browser.$(`.${staticAreaItemClassName}`).shadow$$("ui5-li")[0];

		firstItem.click();

		assert.strictEqual(inputResult.getProperty("value"), "1", "Fired change event is called once.");
		assert.ok(selectText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT) !== -1, "Select label is correct.");
	});

	it("does not fire change, when clicking on selected item", () => {
		const select = $("#mySelect");
		const inputResult = browser.$("#inputResult").shadow$("input");

		select.click();

		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#mySelect")
		const firstItem = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-li:first-child");
		firstItem.click();

		assert.strictEqual(inputResult.getProperty("value"), "1", "Event not fired when already selected item is selected");
	});

	it("fires change on selection with keyboard handling", () => {
		const select = $("#mySelect2").shadow$(".ui5-select-root");
		const selectText = browser.$("#mySelect2").shadow$(".ui5-select-label-root");
		const inputResult = browser.$("#inputResult");
		const EXPECTED_SELECTION_TEXT1 = "Compact";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		select.click();
		select.keys("ArrowUp");
		select.keys("Enter");

		assert.strictEqual(inputResult.getProperty("value"), "2", "Fired change event is called once more.");
		assert.ok(selectText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT1) !== -1, "Select label is correct.");

		select.click();
		select.keys("ArrowDown");
		select.keys("Space");

		assert.strictEqual(inputResult.getProperty("value"), "3", "Fired change event is called once more.");
		assert.ok(selectText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT2) !== -1, "Select label is correct.");
		
	});

	it("changes selection while closed with Arrow Up/Down", () => {
		const inputResult = browser.$("#inputResult").shadow$("input");
		const select = $("#mySelect2");
		const selectText = browser.$("#mySelect2").shadow$(".ui5-select-label-root");
		const EXPECTED_SELECTION_TEXT1 = "Compact";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		// make sure focus is on closed select
		select.click();
		select.keys("Escape");

		select.keys("ArrowUp");
		assert.ok(selectText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT1) > -1, "Arrow Up should change selected item");

		select.keys("ArrowDown");
		assert.ok(selectText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT2) > -1, "Arrow Down should change selected item");

		assert.strictEqual(inputResult.getProperty("value"), "5", "Change event should have fired twice");
	});

	// TODO: Temporary commented as fails on the central build on regular basis
	// it("changes selection sync with selection announcement", () => {
	// 	const btn = $("#myBtn2");
	// 	const inputResult = browser.$("#inputResult").shadow$("input");
	// 	const select = $("#mySelect2");
	// 	const selectId = select.getProperty("_id")
	// 	const selectText = browser.$("#mySelect2").shadow$(".ui5-select-label-root");
	// 	const selectionText = browser.$("#mySelect2").shadow$(`#${selectId}-selectionText`);
	// 	const EXPECTED_SELECTION_TEXT1 = "Compact";
	// 	const EXPECTED_SELECTION_TEXT2 = "Condensed";

	// 	select.click();
	// 	select.keys("Escape");

	// 	assert.strictEqual(selectionText.getHTML(false), "", "Selection announcement text should be clear if there is no interaction");

	// 	select.keys("ArrowUp");
	// 	assert.ok(selectText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT1), "Arrow Up should change selected item");
	// 	assert.strictEqual(selectionText.getHTML(false), EXPECTED_SELECTION_TEXT1, "Selection announcement text should be equalt to the current selected item's text");

	// 	select.click();
	// 	select.keys("Escape");
	// 	assert.strictEqual(selectionText.getHTML(false), "", "Selection announcement text should be cleared if the picker is opened");

	// 	select.keys("ArrowDown");
	// 	assert.ok(selectText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT2), "Arrow Up should change selected item");
	// 	assert.strictEqual(selectionText.getHTML(false), EXPECTED_SELECTION_TEXT2, "Selection announcement text should be equalt to the current selected item's text");

	// 	btn.click();
	// 	assert.strictEqual(selectionText.getHTML(false), "", "Selection announcement text should be cleared on focusout");

	// 	assert.strictEqual(inputResult.getProperty("value"), "7", "Change event should have fired twice");
	// });

	it("changes selection on Tab", () => {
		const select = browser.$("#keyboardHandling");
		const EXPECTED_SELECTION_TEXT = "Banana";

		select.click(); // Open select
		select.click(); // Close select. Focus is on the select now
		select.keys("Space");

		select.keys("ArrowUp");
		select.keys("Tab");
		const selectText = select.shadow$(".ui5-select-label-root");

		assert.ok(selectText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT) > -1, "Arrow Up should change selected item");

		const focusedElementId = browser.execute(() => {
			return document.activeElement.id;
		});

		assert.strictEqual(focusedElementId, browser.$("#inputResult").getAttribute("id"), "Next focusable element is focused");
	});

	it("changes selection on Shift + Tab", () => {
		const select = browser.$("#keyboardHandling");
		const EXPECTED_SELECTION_TEXT = "Orange";

		select.click(); // Open select
		select.click(); // Close select. Focus is on the select now
		select.keys("Space");

		select.keys("ArrowDown");
		browser.keys(["Shift", "Tab"]);
		const selectText = select.shadow$(".ui5-select-label-root");

		assert.ok(selectText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT) > -1, "Arrow Down should change selected item");

		const focusedElementId = browser.execute(() => {
			return document.activeElement.id;
		});

		assert.strictEqual(focusedElementId, browser.$("#mySelectEsc").getAttribute("id"), "Previous focusable element is focused");
	});

	it("tests selection does not cycle with ArrowDown", () => {
		const select = $("#selectionNotCycling");
		const EXPECTED_SELECTION_TEXT = "Opt3";
		const selectOptionText = select.shadow$(".ui5-select-label-root");

		select.click();
		assert.ok(selectOptionText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT) > -1, "Selected option text is " + EXPECTED_SELECTION_TEXT);

		// The last item is already selected - pressing ArrowDown should not change the focus or the selection
		select.keys("ArrowDown");
		assert.ok(selectOptionText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT) > -1, "Selected option text remains " + EXPECTED_SELECTION_TEXT);

		// Close the select not to cover other components that tests would try to click
		select.keys("Escape");
	});

	it("tests selection does not cycle with ArrowUp", () => {
		const select = $("#selectionNotCycling2");
		const EXPECTED_SELECTION_TEXT = "Opt1";
		const selectOptionText = select.shadow$(".ui5-select-label-root");

		select.click();
		assert.ok(selectOptionText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT) > -1, "Selected option text is " + EXPECTED_SELECTION_TEXT);

		// The last item is already selected - pressing ArrowUp should not change the focus or the selection
		select.keys("ArrowUp");
		assert.ok(selectOptionText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT) > -1, "Selected option text remains " + EXPECTED_SELECTION_TEXT);

		// Close the select not to cover other components that tests would try to click
		select.keys("Escape");
	});

	it("opens upon space", () => {
		const btn = $("#myBtn2");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#mySelect");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		btn.click();
		btn.keys("Tab");

		browser.keys("Space");
		assert.ok(popover.getProperty("opened"), "Select is opened.");
	});

	it("toggles upon F4", () => {
		const btn = $("#myBtn2");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#mySelect");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		btn.click();
		btn.keys("Tab");

		browser.keys("F4");
		assert.ok(popover.getProperty("opened"), "Select is opened.");

		browser.keys("F4");
		assert.ok(!popover.getProperty("opened"), "Select is closed.");
	});

	it("toggles upon ALT + UP", () => {
		const btn = $("#myBtn2");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#mySelect");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		btn.click();
		btn.keys("Tab");

		browser.keys(["Alt", "ArrowUp", "NULL"]);
		assert.ok(popover.getProperty("opened"), "Select is opened.");

		browser.keys(["Alt", "ArrowUp", "NULL"]);
		assert.ok(!popover.getProperty("opened"), "Select is closed.");
	});

	it("toggles upon ALT + DOWN", () => {
		const btn = $("#myBtn2");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#mySelect");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		btn.click();
		btn.keys("Tab");

		browser.keys(["Alt", "ArrowDown", "NULL"]);
		assert.ok(popover.getProperty("opened"), "Select is opened.");

		browser.keys(["Alt", "ArrowDown", "NULL"]);
		assert.ok(!popover.getProperty("opened"), "Select is closed.");
	});

	it("adds unselected only items to select", () => {
		const addItemsBtn = $("#add-items-btn");
		const restoreItemsBtn = $("#restore-items-btn");

		addItemsBtn.click();

		const firstOption = browser.$("#mySelect ui5-option:first-child");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#mySelect");
		const firstListItem = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-li:first-child");

		assert.ok(firstOption.getProperty("selected"), "First option should be selected");
		assert.ok(firstListItem.getProperty("selected"), "First list item should be selected");

		restoreItemsBtn.click();
	});

	// TODO: Temporary commented as fails on the central build on regular basis
	// it("reverts value before open after clicking on escape", () => {
	// 	const select = $("#mySelect");
	// 	const selectText = browser.$("#mySelect").shadow$(".ui5-select-label-root").getHTML(false);
	// 	const inputResult = browser.$("#inputResult").shadow$("input");

	// 	select.click();
	// 	select.keys("ArrowDown");
	// 	select.keys("Escape");

	// 	const selectedOption = browser.$("#mySelect ui5-option[selected]");
	// 	const selectTextAfterEscape = browser.$("#mySelect").shadow$(".ui5-select-label-root").getHTML(false);

	// 	assert.ok(selectedOption.getProperty("selected"), "Initially selected item should remain selected");
	// 	assert.strictEqual(inputResult.getProperty("value"), "7", "Change event should not be fired");
	// 	assert.strictEqual(selectTextAfterEscape, selectText, "Initially selected item should remain selected");
	// });

	// it("fires change event after selection is change and picker if focussed out", () => {
	// 	const select = $("#mySelect");
	// 	const inputResult = browser.$("#inputResult").shadow$("input");
	// 	const btn = $("#myBtn2");

	// 	select.click();
	// 	select.keys("ArrowDown");
	// 	select.keys("ArrowDown");

	// 	// focus out select
	// 	btn.click();

	// 	assert.strictEqual(inputResult.getProperty("value"), "8", "Change event should be fired");
	// });

	// it("fires change event after selecting a previewed item", () => {
	// 	const select = $("#mySelect");
	// 	const inputResult = browser.$("#inputResult").shadow$("input");

	// 	select.click();
	// 	select.keys("ArrowDown");

	// 	select.keys("Escape");

	// 	select.click();
	// 	const staticAreaItemClassName = browser.getStaticAreaItemClassName("#mySelect");
	// 	const firstItem = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-li:first-child");

	// 	firstItem.click();

	// 	assert.strictEqual(inputResult.getProperty("value"), "9", "Change event should be fired");
	// });

	it("tests ESC on closed picker", () => {
		const select = $("#mySelectEsc");
		const selectText = browser.$("#mySelectEsc").shadow$(".ui5-select-label-root");
		const EXPECTED_SELECTION_TEXT = "Cozy";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		select.click();
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#mySelectEsc")
		const firstItem = browser.$(`.${staticAreaItemClassName}`).shadow$$("ui5-li")[0];
		const thirdItem = browser.$(`.${staticAreaItemClassName}`).shadow$$("ui5-li")[2];

		firstItem.click();

		assert.ok(selectText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT) !== -1, "Select label is correct.");

		// verify that ESC does not interfere when the picker is closed
		select.keys("Escape");
		select.click();
		thirdItem.click();

		assert.ok(selectText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT2) !== -1, "Select label is correct.");
	});

	it("Tests aria-label and aria-labelledby", () => {
		const select1 = browser.$("#textAreaAriaLabel").shadow$(".ui5-select-label-root");
		const select2 = browser.$("#textAreaAriaLabelledBy").shadow$(".ui5-select-label-root");
		const EXPECTED_ARIA_LABEL1 = "Hello World";
		const EXPECTED_ARIA_LABEL2 = "info text";

		assert.strictEqual(select1.getAttribute("aria-label"), EXPECTED_ARIA_LABEL1,
			"The aria-label is correctly set internally.");
		assert.strictEqual(select2.getAttribute("aria-label"), EXPECTED_ARIA_LABEL2,
			"The aria-label is correctly set internally.");
	});

	it('selected options are correctly disabled', () => {
		const option2 = $('#mySelect5 ui5-option:nth-child(2)'),
			option3 = $('#mySelect5 ui5-option:nth-child(3)');

		assert.strictEqual(option2.getProperty("selected"), true, "Second option is initially selected.");

		// act
		option2.setProperty("disabled", true);

		// verify
		assert.strictEqual(option2.getProperty("selected"), false, "Disabled option is no longer selected.");
		assert.strictEqual(option3.getProperty("selected"), true, "The next enabled option is selected.");
	});
});
