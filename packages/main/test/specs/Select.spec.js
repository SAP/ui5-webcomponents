import { assert } from "chai";

async function getResourceBundleTexts(keys) {
	return browser.executeAsync((keys, done) => {
		const select = document.getElementById("mySelect");

		const texts = keys.reduce((result, key) => {
			result[key] = select.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts[key])
			return result;
		}, {});
		done(texts);

	}, keys);
}

describe("Select general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Select.html`);
	});

	it("fires change on selection", async () => {
		const select = await browser.$("#mySelect");
		const selectText = await browser.$("#mySelect").shadow$(".ui5-select-label-root");
		const inputResult = await browser.$("#inputResult").shadow$("input");
		const EXPECTED_SELECTION_TEXT = "Cozy";

		await select.click();
		const firstItem = (await browser.$$("#mySelect ui5-option"))[0];

		await firstItem.click();

		assert.strictEqual(await inputResult.getProperty("value"), "1", "Fired change event is called once.");
		const selectTextHtml = await selectText.getHTML(false);
		assert.strictEqual(await select.getProperty("value"), EXPECTED_SELECTION_TEXT, "The 'value' property is correct.");
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT, "Select label is correct.");
	});

	it("prevents change on selection", async () => {
		const select = await browser.$("#selectPrevent");
		const selectText = await browser.$("#selectPrevent").shadow$(".ui5-select-label-root");
		const EXPECTED_SELECTION_TEXT = "Condensed";

		await select.click();
		const secondItem = (await browser.$$("#selectPrevent ui5-option"))[1];

		await secondItem.click();

		const selectTextHtml = await selectText.getHTML(false);
		assert.strictEqual(await select.getProperty("value"), EXPECTED_SELECTION_TEXT, "The 'value' property is correct.");
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT, "Select label is not changed (reverted on third item).");
	});

	it("does not fire change, when clicking on selected item", async () => {
		await browser.url(`test/pages/Select.html`);

		const select = await browser.$("#mySelect");
		const inputResult = await browser.$("#inputResult").shadow$("input");

		await select.click();

		const lastItem = await browser.$("#mySelect ui5-option:last-child")
		await lastItem.click();

		assert.strictEqual(await inputResult.getProperty("value"), "", "Event not fired when already selected item is selected");
	});

	it("fire open, when clicking on selected item", async () => {
		await browser.url(`test/pages/Select.html`);

		const select = await browser.$("#mySelect");
		const inputResultOpen = await browser.$("#inputResultOpen");

		await select.click(); // open

		assert.strictEqual(await inputResultOpen.getValue(), "1", "Open event fired when the popover gets expanded/opened.");
	});

	it("fire close, when clicking on selected item", async () => {
		await browser.url(`test/pages/Select.html`);

		const select = await browser.$("#mySelect");
		const inputResultClose = await browser.$("#inputResultClose");

		await select.click(); // open
		await select.click(); // close

		assert.strictEqual(await inputResultClose.getValue(), "1", "Close event fired when the popover gets collapsed/closed.");
	});

	it("fires change on selection with keyboard handling", async () => {
		await browser.url(`test/pages/Select.html`);

		const selectHost = await browser.$("#errorSelect")
		const select = await browser.$("#errorSelect").shadow$(".ui5-select-root");
		const selectText = await browser.$("#errorSelect").shadow$(".ui5-select-label-root");
		const inputResult = await browser.$("#inputResult");
		const EXPECTED_SELECTION_TEXT1 = "Compact";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		await select.click();
		await select.keys("ArrowUp");
		await select.keys("Enter");

		assert.strictEqual(await inputResult.getProperty("value"), "1", "Fired change event is called once more.");
		let selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT1, "Select label is correct.");
		assert.strictEqual(await selectHost.getProperty("value"), EXPECTED_SELECTION_TEXT1, "The 'value' property is correct.");

		await select.click();
		await select.keys("ArrowDown");
		await select.keys("Space");

		assert.strictEqual(await inputResult.getProperty("value"), "2", "Fired change event is called once more.");
		selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT2, "Select label is correct.");
		assert.strictEqual(await selectHost.getProperty("value"), EXPECTED_SELECTION_TEXT2, "The 'value' property is correct.");
	});

	it("doesn't changes selection while closed with Arrow Up/Down while at last item", async () => {
		await browser.url(`test/pages/Select.html`);

		const inputResult = await browser.$("#inputResult").shadow$("input");
		const select = await browser.$("#errorSelect");
		const selectText = await browser.$("#errorSelect").shadow$(".ui5-select-label-root");
		const EXPECTED_SELECTION_TEXT1 = "Condensed";

		// make sure focus is on closed select
		await select.click();
		await select.keys("Escape");

		await select.keys("ArrowDown");
		let selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT1, "Arrow Down shouldn't change selected item");
		assert.strictEqual(await select.getProperty("value"), EXPECTED_SELECTION_TEXT1, "The 'value' property is correct.");

		assert.strictEqual(await inputResult.getProperty("value"), "", "Change event shouldn't have fired");
	});

	it("changes selection while closed with Arrow Up/Down", async () => {
		await browser.url(`test/pages/Select.html`);

		const inputResult = await browser.$("#inputResult").shadow$("input");
		const select = await browser.$("#errorSelect");
		const selectText = await browser.$("#errorSelect").shadow$(".ui5-select-label-root");
		const EXPECTED_SELECTION_TEXT1 = "Compact";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		// make sure focus is on closed select
		await select.click();
		await select.keys("Escape");

		await select.keys("ArrowUp");
		let selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT1, "Arrow Up should change selected item");
		assert.strictEqual(await select.getProperty("value"), EXPECTED_SELECTION_TEXT1, "The 'value' property is correct.");

		await select.keys("ArrowDown");
		selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT2, "Arrow Down should change selected item");
		assert.strictEqual(await select.getProperty("value"), EXPECTED_SELECTION_TEXT2, "The 'value' property is correct.");

		assert.strictEqual(await inputResult.getProperty("value"), "2", "Change event should have fired twice");
	});

	it("changes selection sync with selection announcement", async () => {
		await browser.url(`test/pages/Select.html`);

		const btn = await browser.$("#myBtn2");
		const inputResult = await browser.$("#inputResult").shadow$("input");
		const politeSpan = await browser.$(".ui5-invisiblemessage-polite");
		const select = await browser.$("#errorSelect");
		const selectText = await browser.$("#errorSelect").shadow$(".ui5-select-label-root");
		const EXPECTED_SELECTION_TEXT1 = "Compact";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		// open picker without following interaction
		await select.click();
		await select.keys("Escape");

		// change selection with picker closed
		await select.keys("ArrowUp");
		let politeSpanHtml = await politeSpan.getHTML(false);
		assert.include(politeSpanHtml, EXPECTED_SELECTION_TEXT1, "Arrow Up should change selected item");

		// change selection with picker closed
		await select.keys("ArrowDown");
		politeSpanHtml = await politeSpan.getHTML(false);
		assert.include(politeSpanHtml, EXPECTED_SELECTION_TEXT2, "Arrow Down should change selected item");

		// change previewed item with picker opened
		await select.click();
		await select.keys("ArrowUp");
		await select.keys("Escape");

		// change selection with picker opened
		await select.click();
		await select.keys("ArrowUp");
		await select.keys("Enter");

		const selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT1, "Arrow Up and Enter should change selected item");

		await btn.click();

		assert.strictEqual(await inputResult.getProperty("value"), "3", "Change event should have fired twice");
	});

	it("remains closed and unchanged when read-only", async () => {
		const select = await browser.$("#mySelectReadOnly");
		const EXPECTED_SELECTION_TEXT = "Compact";
		const selectOptionText = await select.shadow$(".ui5-select-label-root");

		// act - try to open the dropdown
		await select.click();

		const popover = await select.shadow$("ui5-responsive-popover");

		// assert
		assert.notOk(await popover.getProperty("open"), "Select remains closed.");

		// act - try to change selection when dropdown is closed
		await select.keys("ArrowUp");
		// assert
		let selectOptionTextHtml = await selectOptionText.getHTML(false);
		assert.include(selectOptionTextHtml, EXPECTED_SELECTION_TEXT, "Selected option remains " + EXPECTED_SELECTION_TEXT);

		// act - try to change selection when dropdown is closed
		await select.keys("ArrowDown");
		// assert
		selectOptionTextHtml = await selectOptionText.getHTML(false);
		assert.include(selectOptionTextHtml, EXPECTED_SELECTION_TEXT, "Selected option remains" + EXPECTED_SELECTION_TEXT);
	});

	it("announces the selected value once Select Popover is opened", async () => {
		await browser.url(`test/pages/Select.html`);

		const politeSpan = await browser.$(".ui5-invisiblemessage-polite");
		const select = await browser.$("#mySelect");

		// open picker
		await select.click();

		let politeSpanHtml = await politeSpan.getHTML(false);
		let selectedOptionHTML = await browser.$("#mySelect ui5-option[selected]").getHTML(false);

		// expect the selected item to be read out
		assert.include(politeSpanHtml, selectedOptionHTML, "Selected item is announced on Select opening");

	});

	it("changes selection on Tab", async () => {
		const select = await browser.$("#keyboardHandling");
		const EXPECTED_SELECTION_TEXT = "Banana";

		await select.click(); // Open select
		await select.click(); // Close select. Focus is on the select now
		await select.keys("Space");

		await select.keys("ArrowUp");
		await select.keys("Tab");
		const selectText = await select.shadow$(".ui5-select-label-root");

		const selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT, "Arrow Up should change selected item");

		const focusedElementId = await browser.executeAsync(done => {
			done(document.activeElement.id);
		});

		assert.strictEqual(await focusedElementId, await browser.$("#inputResult").getAttribute("id"), "Next focusable element is focused");
	});

	it("changes selection on Shift + Tab", async () => {
		const select = await browser.$("#keyboardHandling");
		const EXPECTED_SELECTION_TEXT = "Orange";

		await select.click(); // Open select
		await select.click(); // Close select. Focus is on the select now
		await select.keys("Space");

		await select.keys("ArrowDown");
		await browser.keys(["Shift", "Tab"]);
		const selectText = await select.shadow$(".ui5-select-label-root");

		const selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT, "Arrow Down should change selected item");

		const focusedElementId = await browser.executeAsync(done => {
			done(document.activeElement.id);
		});

		assert.strictEqual(await focusedElementId, await browser.$("#mySelectEsc").getAttribute("id"), "Previous focusable element is focused");
	});

	it("tests selection does not cycle with ArrowDown", async () => {
		const select = await browser.$("#selectionNotCycling");
		const EXPECTED_SELECTION_TEXT = "Opt3";
		const selectOptionText = await select.shadow$(".ui5-select-label-root");

		await select.click();
		let selectOptionTextHtml = await selectOptionText.getHTML(false);
		assert.include(selectOptionTextHtml, EXPECTED_SELECTION_TEXT, "Selected option text is " + EXPECTED_SELECTION_TEXT);

		// The last item is already selected - pressing ArrowDown should not change the focus or the selection
		await select.keys("ArrowDown");
		selectOptionTextHtml = await selectOptionText.getHTML(false);
		assert.include(selectOptionTextHtml, EXPECTED_SELECTION_TEXT, "Selected option text remains " + EXPECTED_SELECTION_TEXT);

		// Close the select not to cover other components that tests would try to click
		await select.keys("Escape");
	});

	it("tests selection does not cycle with ArrowUp", async () => {
		const select = await browser.$("#selectionNotCycling2");
		const EXPECTED_SELECTION_TEXT = "Opt1";
		const selectOptionText = await select.shadow$(".ui5-select-label-root");

		await select.click();
		let selectOptionTextHtml = await selectOptionText.getHTML(false);
		assert.include(selectOptionTextHtml, EXPECTED_SELECTION_TEXT, "Selected option text is " + EXPECTED_SELECTION_TEXT);

		// The last item is already selected - pressing ArrowUp should not change the focus or the selection
		await select.keys("ArrowUp");
		selectOptionTextHtml = await selectOptionText.getHTML(false);
		assert.include(selectOptionTextHtml, EXPECTED_SELECTION_TEXT, "Selected option text remains " + EXPECTED_SELECTION_TEXT);

		// Close the select not to cover other components that tests would try to click
		await select.keys("Escape");
	});

	it("changes selection with typing single letter", async () => {
		const select = await browser.$("#keyboardHandling");
		const EXPECTED_SELECTION_TEXT = "Banana";

		await select.click(); // Open select
		await select.keys("b");

		const selectText = await select.shadow$(".ui5-select-label-root");

		const selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT, "Typing letter should change selection");
	});

	it("changes selection with typing more letters", async () => {
		const select = await browser.$("#warningSelect");
		const EXPECTED_SELECTION_TEXT = "Brazil";

		await select.click(); // Open select
		await select.keys("b");
		await select.keys("r");

		const selectText = await select.shadow$(".ui5-select-label-root");

		const selectTextHtml = await selectText.getText();
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT, "Typing text should change selection");
	});

	it("changes selection using 'value'", async () => {
		const select = await browser.$("#mySelect7");
		const btnSetValue = await browser.$("#btnSetValue");
		const btnSetInvalidValue = await browser.$("#btnSetInvalidValue");
		const selectText = await select.shadow$(".ui5-select-label-root");
		const INVALID_VALUE = "NAN";
		const EMPTY_VALUE = "";
		const EXPECTED_SELECTION_TEXT = "Item2";

		await btnSetValue.click();
		let selectTextHtml = await selectText.getHTML(false);

		assert.strictEqual(await select.getProperty("value"),
			EXPECTED_SELECTION_TEXT, "Second option is selected.");
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT,
			"Select label is " + EXPECTED_SELECTION_TEXT);

		await btnSetInvalidValue.click();
		selectTextHtml = await selectText.getHTML(false);

		assert.strictEqual(await select.getProperty("value"),
		INVALID_VALUE, "No option is selected as value did not match any options.");
		assert.include(selectTextHtml, EMPTY_VALUE,
			"Select label is empty string");
	});

	it("opens upon space", async () => {
		await browser.url(`test/pages/Select.html`);

		const btn = await browser.$("#myBtn2");
		const select = await browser.$("#mySelect");
		const popover = await select.shadow$("ui5-responsive-popover");

		await btn.click();
		await btn.keys("Tab");

		await browser.keys("Space");
		assert.ok(await popover.getProperty("open"), "Select is opened.");
	});

	it("toggles upon F4", async () => {
		await browser.url(`test/pages/Select.html`);

		const btn = await browser.$("#myBtn2");
		const select = await browser.$("#mySelect");
		const popover = await select.shadow$("ui5-responsive-popover");

		await btn.click();
		await btn.keys("Tab");

		await browser.keys("F4");
		assert.ok(await popover.getProperty("open"), "Select is opened.");

		await browser.keys("F4");
		assert.notOk(await popover.getProperty("open"), "Select is closed.");
	});

	it("toggles upon ALT + UP", async () => {
		await browser.url(`test/pages/Select.html`);

		const btn = await browser.$("#myBtn2");
		const select = await browser.$("#mySelect");
		const popover = await select.shadow$("ui5-responsive-popover");

		await btn.click();
		await btn.keys("Tab");

		await browser.keys(["Alt", "ArrowUp", "NULL"]);
		assert.ok(await popover.getProperty("open"), "Select is opened.");

		await browser.keys(["Alt", "ArrowUp", "NULL"]);
		assert.notOk(await popover.getProperty("open"), "Select is closed.");
	});

	it("toggles upon ALT + DOWN", async () => {
		await browser.url(`test/pages/Select.html`);

		const btn = await browser.$("#myBtn2");
		const select = await browser.$("#mySelect");
		const popover = await select.shadow$("ui5-responsive-popover");

		await btn.click();
		await btn.keys("Tab");

		await browser.keys(["Alt", "ArrowDown", "NULL"]);
		assert.ok(await popover.getProperty("open"), "Select is opened.");

		await browser.keys(["Alt", "ArrowDown", "NULL"]);
		assert.notOk(await popover.getProperty("open"), "Select is closed.");
	});

	it("adds unselected only items to select", async () => {
		const addItemsBtn = await browser.$("#add-items-btn");
		const restoreItemsBtn = await browser.$("#restore-items-btn");

		await addItemsBtn.click();

		const firstOption = await browser.$("#mySelect ui5-option:first-child");
		const firstListItem = (await browser.$("#mySelect ui5-option:first-child"))

		assert.ok(await firstOption.getProperty("selected"), "First option should be selected");
		assert.ok(await firstListItem.getProperty("selected"), "First list item should be selected");

		await restoreItemsBtn.click();
	});

	it("reverts value before open after clicking on escape", async () => {
		await browser.url(`test/pages/Select.html`);

		const select = await browser.$("#mySelect");
		const selectText = await browser.$("#mySelect").shadow$(".ui5-select-label-root").getHTML(false);
		const inputResult = await browser.$("#inputResult").shadow$("input");

		await select.click();
		await select.keys("ArrowDown");
		await select.keys("Escape");

		const selectedOption = await browser.$("#mySelect ui5-option[selected]");
		const selectTextAfterEscape = await browser.$("#mySelect").shadow$(".ui5-select-label-root").getHTML(false);

		assert.ok(await selectedOption.getProperty("selected"), "Initially selected item should remain selected");
		assert.strictEqual(await inputResult.getProperty("value"), "", "Change event should not be fired");
		assert.strictEqual(selectTextAfterEscape, selectText, "Initially selected item should remain selected");
	});

	it("fires change event after selection is change and picker if focussed out", async () => {
		await browser.url(`test/pages/Select.html`);

		const select = await browser.$("#mySelect");
		const inputResult = await browser.$("#inputResult").shadow$("input");
		const btn = await browser.$("#myBtn2");

		await select.click();
		await select.keys("ArrowUp");

		// focus out select
		await btn.click();

		assert.strictEqual(await inputResult.getProperty("value"), "1", "Change event should be fired");
	});

	it("fires change event after selecting a previewed item", async () => {
		await browser.url(`test/pages/Select.html`);

		const select = await browser.$("#mySelect");
		const inputResult = await browser.$("#inputResult").shadow$("input");

		await select.click();
		await select.keys("ArrowDown");

		await select.keys("Escape");

		await select.click();
		const firstItem = await browser.$("#mySelect ui5-option:first-child");

		await firstItem.click();

		assert.strictEqual(await inputResult.getProperty("value"), "1", "Change event should be fired");
	});

	it("tests ESC on closed picker", async () => {
		const select = await browser.$("#mySelectEsc");
		const selectText = await browser.$("#mySelectEsc").shadow$(".ui5-select-label-root");
		const EXPECTED_SELECTION_TEXT = "Cozy";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		await select.click();
		const firstItem = await browser.$("#mySelectEsc ui5-option:first-child");
		const thirdItem = (await browser.$$("#mySelectEsc ui5-option"))[2];

		await firstItem.click();

		let selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT, "Select label is correct.");

		// verify that ESC does not interfere when the picker is closed
		await select.keys("Escape");
		await select.click();
		await thirdItem.click();

		selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT2, "Select label is correct.");
	});

	it("Tests accessibility", async () => {
		const select1 = await browser.$("#textAreaAriaLabel").shadow$(".ui5-select-label-root");
		const select2 = await browser.$("#textAreaAriaLabelledBy").shadow$(".ui5-select-label-root");
		const EXPECTED_ARIA_LABEL1 = "Hello World";
		const EXPECTED_ARIA_LABEL2 = "info text";
		const EXPECTER_ARIA_ROLEDESCRIPTION = "Listbox";

		assert.strictEqual(await select1.getAttribute("aria-label"), EXPECTED_ARIA_LABEL1,
			"The aria-label is correctly set internally.");
		assert.strictEqual(await select1.getAttribute("aria-expanded"), "false",
			"The aria-expanded is false by default.");

		assert.strictEqual(await select2.getAttribute("aria-label"), EXPECTED_ARIA_LABEL2,
			"The aria-label is correctly set internally.");
		assert.strictEqual(await select2.getAttribute("aria-expanded"), "false",
			"The aria-expanded is false by default.");
		assert.strictEqual(await select2.getAttribute("aria-roledescription"), EXPECTER_ARIA_ROLEDESCRIPTION,
			"The aria-roledescription is correct.");
	});

	it("Tests value state type", async () => {
		const successSelect = await browser.$("#successSelect");
		const successSelectValueState = successSelect.shadow$(`#${await successSelect.getProperty('_id')}-valueStateDesc`);
		const valueStateText = await successSelectValueState.getHTML(false);

		const infoSelect = await browser.$("#infoSelect");
		const infoSelectValueState = infoSelect.shadow$(`#${await infoSelect.getProperty('_id')}-valueStateDesc`);
		const infoValueStateText = await infoSelectValueState.getHTML(false);

		const errorSelect = await browser.$("#errorSelect");
		const errorSelectValueState = errorSelect.shadow$(`#${await errorSelect.getProperty('_id')}-valueStateDesc`);
		const errorValueStateText = await errorSelectValueState.getHTML(false);

		const warningSelect = await browser.$("#warningSelect");
		const warningSelectValueState = warningSelect.shadow$(`#${await warningSelect.getProperty('_id')}-valueStateDesc`);
		const warningValueStateText = await warningSelectValueState.getHTML(false);

		const keys = [
			"VALUE_STATE_TYPE_SUCCESS",
			"VALUE_STATE_TYPE_INFORMATION",
			"VALUE_STATE_TYPE_ERROR",
			"VALUE_STATE_TYPE_WARNING",
		];
		const texts = await getResourceBundleTexts(keys);

		assert.ok(valueStateText.includes(texts.VALUE_STATE_TYPE_SUCCESS),
			"The value state text is correct.");
		assert.ok(infoValueStateText.includes(texts.VALUE_STATE_TYPE_INFORMATION),
			"The value state text is correct.");
		assert.ok(errorValueStateText.includes(texts.VALUE_STATE_TYPE_ERROR),
			"The value state text is correct.");
		assert.ok(warningValueStateText.includes(texts.VALUE_STATE_TYPE_WARNING),
			"The value state text is correct.");
	});

	it("Tests that the picker is closed when the selected value is clicked", async () => {
		const select = await browser.$("#mySelect");
		const popover = await select.shadow$("ui5-responsive-popover");
		const firstItem = await browser.$("#mySelect ui5-option:first-child");

		// select the first item
		await select.click();
		assert.ok(await popover.getProperty("open"), "Select is opened.");
		await firstItem.click();
		assert.notOk(await popover.getProperty("open"), "Select is closed.");

		// click the selected item again
		await select.click();
		assert.ok(await popover.getProperty("open"), "Select is opened.");
		await firstItem.click();
		assert.notOk(await popover.getProperty("open"), "Select is closed.");
	});

	it.skip("Tests if currently selected option is visible in the viewport when keyboard navigation is used", async () => {
		await browser.setWindowSize(600, 200);

		const select = await browser.$("#warningSelect");
		const popover = await select.shadow$("ui5-responsive-popover");

		await select.click();
		assert.ok(await popover.getProperty("open"), "Select is opened.");

		await select.keys("ArrowDown");
		await select.keys("ArrowDown");
		await select.keys("ArrowDown");

		const selectedOption = await browser.$("#warningSelect ui5-option[selected]");
		assert.ok(await selectedOption.isClickable(), "Selected option is visible in the viewport.");
	});

	it("clears typed characters after selection is changed", async () => {
		const select = await browser.$("#textAreaAriaLabel");
		const selectText = await select.shadow$(".ui5-select-label-root");

		await select.click();
		await select.keys("S");

		let selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, "Second", "Typing 'S' should select 'Second'");

		await select.keys("Enter");

		await select.keys("T");
		selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, "Third", "Typing 'T' should select 'Third' after previous selection");

		assert.strictEqual(await select.getProperty("value"), "Third", "The selection changed and typed characters were cleared");
	});

});