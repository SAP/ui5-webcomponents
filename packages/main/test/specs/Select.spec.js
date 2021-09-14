const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Select general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Select.html`);
	});

	it("fires change on selection", async () => {
		const select = await browser.$("#mySelect");
		const selectText = await browser.$("#mySelect").shadow$(".ui5-select-label-root");
		const inputResult = await browser.$("#inputResult").shadow$("input");
		const EXPECTED_SELECTION_TEXT = "Cozy";

		await select.click();
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mySelect")
		const firstItem = (await browser.$(`.${staticAreaItemClassName}`).shadow$$("ui5-li"))[0];

		await firstItem.click();

		assert.strictEqual(await inputResult.getProperty("value"), "1", "Fired change event is called once.");
		assert.ok((await selectText.getHTML(false)).indexOf(EXPECTED_SELECTION_TEXT) !== -1, "Select label is correct.");
	});

	it("does not fire change, when clicking on selected item", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Select.html`);

		const select = await browser.$("#mySelect");
		const inputResult = await browser.$("#inputResult").shadow$("input");

		await select.click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mySelect")
		const firstItem = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-li:last-child");
		await firstItem.click();

		assert.strictEqual(await inputResult.getProperty("value"), "", "Event not fired when already selected item is selected");
	});

	it("fires change on selection with keyboard handling", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Select.html`);

		const select = await browser.$("#mySelect2").shadow$(".ui5-select-root");
		const selectText = await browser.$("#mySelect2").shadow$(".ui5-select-label-root");
		const inputResult = await browser.$("#inputResult");
		const EXPECTED_SELECTION_TEXT1 = "Compact";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		await select.click();
		await select.keys("ArrowUp");
		await select.keys("Enter");

		assert.strictEqual(await inputResult.getProperty("value"), "1", "Fired change event is called once more.");
		assert.ok((await selectText.getHTML(false)).indexOf(EXPECTED_SELECTION_TEXT1) !== -1, "Select label is correct.");

		await select.click();
		await select.keys("ArrowDown");
		await select.keys("Space");

		assert.strictEqual(await inputResult.getProperty("value"), "2", "Fired change event is called once more.");
		assert.ok((await selectText.getHTML(false)).indexOf(EXPECTED_SELECTION_TEXT2) !== -1, "Select label is correct.");

	});

	it("changes selection while closed with Arrow Up/Down", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Select.html`);

		const inputResult = await browser.$("#inputResult").shadow$("input");
		const select = await browser.$("#mySelect2");
		const selectText = await browser.$("#mySelect2").shadow$(".ui5-select-label-root");
		const EXPECTED_SELECTION_TEXT1 = "Compact";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		// make sure focus is on closed select
		await select.click();
		await select.keys("Escape");

		await select.keys("ArrowUp");
		assert.ok((await selectText.getHTML(false)).indexOf(EXPECTED_SELECTION_TEXT1) > -1, "Arrow Up should change selected item");

		await select.keys("ArrowDown");
		assert.ok((await selectText.getHTML(false)).indexOf(EXPECTED_SELECTION_TEXT2) > -1, "Arrow Down should change selected item");

		assert.strictEqual(await inputResult.getProperty("value"), "2", "Change event should have fired twice");
	});

	it("changes selection sync with selection announcement", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Select.html`);

		const btn = await browser.$("#myBtn2");
		const inputResult = await browser.$("#inputResult").shadow$("input");
		const select = await browser.$("#mySelect2");
		const selectId = await select.getProperty("_id")
		const selectText = await browser.$("#mySelect2").shadow$(".ui5-select-label-root");
		const selectionText = await browser.$("#mySelect2").shadow$(`#${selectId}-selectionText`);
		const EXPECTED_SELECTION_TEXT1 = "Compact";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		// open picker without following interaction
		await select.click();
		await select.keys("Escape");

		assert.strictEqual(await selectionText.getHTML(false), "", "Selection announcement text should be clear if there is no interaction");

		// change selection with picker closed
		await select.keys("ArrowUp");
		assert.ok((await selectText.getHTML(false)).indexOf(EXPECTED_SELECTION_TEXT1), "Arrow Up should change selected item");
		assert.strictEqual(await selectionText.getHTML(false), EXPECTED_SELECTION_TEXT1, "Selection announcement text should be equalt to the current selected item's text");

		// change selection with picker closed
		await select.keys("ArrowDown");
		assert.ok((await selectText.getHTML(false)).indexOf(EXPECTED_SELECTION_TEXT2), "Arrow Down should change selected item");
		assert.strictEqual(await selectionText.getHTML(false), EXPECTED_SELECTION_TEXT2, "Selection announcement text should be equalt to the current selected item's text");

		// change previewed item with picker opened
		await select.click();
		await select.keys("ArrowUp");
		assert.strictEqual(await selectionText.getHTML(false), EXPECTED_SELECTION_TEXT1, "Selection announcement text should be equalt to the current selected item's text");
		await select.keys("Escape");

		// change selection with picker opened
		await select.click();
		await select.keys("ArrowUp");
		await select.keys("Enter");
		assert.ok((await selectText.getHTML(false)).indexOf(EXPECTED_SELECTION_TEXT1), "Arrow Up and Enter should change selected item");
		assert.strictEqual(await selectionText.getHTML(false), EXPECTED_SELECTION_TEXT1, "Selection announcement text should be equalt to the current selected item's text");

		await btn.click();
		assert.strictEqual(await selectionText.getHTML(false), "", "Selection announcement text should be cleared on focusout");

		assert.strictEqual(await inputResult.getProperty("value"), "3", "Change event should have fired twice");
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

		assert.ok((await selectText.getHTML(false)).indexOf(EXPECTED_SELECTION_TEXT) > -1, "Arrow Up should change selected item");

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

		assert.ok((await selectText.getHTML(false)).indexOf(EXPECTED_SELECTION_TEXT) > -1, "Arrow Down should change selected item");

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
		assert.ok((await selectOptionText.getHTML(false)).indexOf(EXPECTED_SELECTION_TEXT) > -1, "Selected option text is " + EXPECTED_SELECTION_TEXT);

		// The last item is already selected - pressing ArrowDown should not change the focus or the selection
		await select.keys("ArrowDown");
		assert.ok((await selectOptionText.getHTML(false)).indexOf(EXPECTED_SELECTION_TEXT) > -1, "Selected option text remains " + EXPECTED_SELECTION_TEXT);

		// Close the select not to cover other components that tests would try to click
		await select.keys("Escape");
	});

	it("tests selection does not cycle with ArrowUp", async () => {
		const select = await browser.$("#selectionNotCycling2");
		const EXPECTED_SELECTION_TEXT = "Opt1";
		const selectOptionText = await select.shadow$(".ui5-select-label-root");

		await select.click();
		assert.ok((await selectOptionText.getHTML(false)).indexOf(EXPECTED_SELECTION_TEXT) > -1, "Selected option text is " + EXPECTED_SELECTION_TEXT);

		// The last item is already selected - pressing ArrowUp should not change the focus or the selection
		await select.keys("ArrowUp");
		assert.ok((await selectOptionText.getHTML(false)).indexOf(EXPECTED_SELECTION_TEXT) > -1, "Selected option text remains " + EXPECTED_SELECTION_TEXT);

		// Close the select not to cover other components that tests would try to click
		await select.keys("Escape");
	});

	it("changes selection with typing single letter", async () => {
		const select = await browser.$("#keyboardHandling");
		const EXPECTED_SELECTION_TEXT = "Banana";

		await select.click(); // Open select
		await select.keys("b");

		const selectText = await select.shadow$(".ui5-select-label-root");

		assert.ok((await selectText.getHTML(false)).indexOf(EXPECTED_SELECTION_TEXT) > -1, "Typing letter should change selection");
	});

	it("changes selection with typing more letters", async () => {
		const select = await browser.$("#mySelect3");
		const EXPECTED_SELECTION_TEXT = "Brazil";

		await select.click(); // Open select
		await select.keys("b");
		await select.keys("r");

		const selectText = await select.shadow$(".ui5-select-label-root");

		assert.ok((await selectText.getHTML(false)).indexOf(EXPECTED_SELECTION_TEXT) > -1, "Typing text should change selection");
	});

	it("opens upon space", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Select.html`);

		const btn = await browser.$("#myBtn2");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mySelect");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		await btn.click();
		await btn.keys("Tab");

		await browser.keys("Space");
		assert.ok(await popover.getProperty("opened"), "Select is opened.");
	});

	it("toggles upon F4", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Select.html`);

		const btn = await browser.$("#myBtn2");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mySelect");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		await btn.click();
		await btn.keys("Tab");

		await browser.keys("F4");
		assert.ok(await popover.getProperty("opened"), "Select is opened.");

		await browser.keys("F4");
		assert.notOk(await popover.getProperty("opened"), "Select is closed.");
	});

	it("toggles upon ALT + UP", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Select.html`);

		const btn = await browser.$("#myBtn2");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mySelect");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		await btn.click();
		await btn.keys("Tab");

		await browser.keys(["Alt", "ArrowUp", "NULL"]);
		assert.ok(await popover.getProperty("opened"), "Select is opened.");

		await browser.keys(["Alt", "ArrowUp", "NULL"]);
		assert.notOk(await popover.getProperty("opened"), "Select is closed.");
	});

	it("toggles upon ALT + DOWN", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Select.html`);

		const btn = await browser.$("#myBtn2");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mySelect");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		await btn.click();
		await btn.keys("Tab");

		await browser.keys(["Alt", "ArrowDown", "NULL"]);
		assert.ok(await popover.getProperty("opened"), "Select is opened.");

		await browser.keys(["Alt", "ArrowDown", "NULL"]);
		assert.notOk(await popover.getProperty("opened"), "Select is closed.");
	});

	it("adds unselected only items to select", async () => {
		const addItemsBtn = await browser.$("#add-items-btn");
		const restoreItemsBtn = await browser.$("#restore-items-btn");

		await addItemsBtn.click();

		const firstOption = await browser.$("#mySelect ui5-option:first-child");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mySelect");
		const firstListItem = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-li:first-child");

		assert.ok(await firstOption.getProperty("selected"), "First option should be selected");
		assert.ok(await firstListItem.getProperty("selected"), "First list item should be selected");

		await restoreItemsBtn.click();
	});

	it("reverts value before open after clicking on escape", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Select.html`);

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
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Select.html`);

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
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Select.html`);

		const select = await browser.$("#mySelect");
		const inputResult = await browser.$("#inputResult").shadow$("input");

		await select.click();
		await select.keys("ArrowDown");

		await select.keys("Escape");

		await select.click();
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mySelect");
		const firstItem = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-li:first-child");

		await firstItem.click();

		assert.strictEqual(await inputResult.getProperty("value"), "1", "Change event should be fired");
	});

	it("tests ESC on closed picker", async () => {
		const select = await browser.$("#mySelectEsc");
		const selectText = await browser.$("#mySelectEsc").shadow$(".ui5-select-label-root");
		const EXPECTED_SELECTION_TEXT = "Cozy";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		await select.click();
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mySelectEsc")
		const firstItem = (await browser.$(`.${staticAreaItemClassName}`).shadow$$("ui5-li"))[0];
		const thirdItem = (await browser.$(`.${staticAreaItemClassName}`).shadow$$("ui5-li"))[2];

		await firstItem.click();

		assert.ok((await selectText.getHTML(false)).indexOf(EXPECTED_SELECTION_TEXT) !== -1, "Select label is correct.");

		// verify that ESC does not interfere when the picker is closed
		await select.keys("Escape");
		await select.click();
		await thirdItem.click();

		assert.ok((await selectText.getHTML(false)).indexOf(EXPECTED_SELECTION_TEXT2) !== -1, "Select label is correct.");
	});

	it("Tests aria-label, aria-labelledby and aria-expanded", async () => {
		const select1 = await browser.$("#textAreaAriaLabel").shadow$(".ui5-select-label-root");
		const select2 = await browser.$("#textAreaAriaLabelledBy").shadow$(".ui5-select-label-root");
		const EXPECTED_ARIA_LABEL1 = "Hello World";
		const EXPECTED_ARIA_LABEL2 = "info text";

		assert.strictEqual(await select1.getAttribute("aria-label"), EXPECTED_ARIA_LABEL1,
			"The aria-label is correctly set internally.");
		assert.strictEqual(await select1.getAttribute("aria-expanded"), "false",
			"The aria-expanded is false by default.");

		assert.strictEqual(await select2.getAttribute("aria-label"), EXPECTED_ARIA_LABEL2,
			"The aria-label is correctly set internally.");
		assert.strictEqual(await select2.getAttribute("aria-expanded"), "false",
			"The aria-expanded is false by default.");
	});

	it('selected options are correctly disabled', async () => {
		const option2 = await browser.$('#mySelect5 ui5-option:nth-child(2)'),
			option3 = await browser.$('#mySelect5 ui5-option:nth-child(3)');

		assert.strictEqual(await option2.getProperty("selected"), true, "Second option is initially selected.");

		// act
		await option2.setProperty("disabled", true);

		// verify
		assert.strictEqual(await option2.getProperty("selected"), false, "Disabled option is no longer selected.");
		assert.strictEqual(await option3.getProperty("selected"), true, "The next enabled option is selected.");
	});
});
