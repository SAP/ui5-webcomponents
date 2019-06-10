const assert = require("assert");

describe("Select general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Select.html");

	it("fires change on selection", () => {
		const select = $("#mySelect");
		const selectText = browser.findElementDeep("#mySelect >>> ui5-label");
		const inputResult = browser.findElementDeep("#inputResult >>> input");
		const EXPECTED_SELECTION_TEXT = "Cozy";

		select.click();

		const firstItem = browser.findElementDeep("#mySelect >>> ui5-li:first-child");

		firstItem.click();

		assert.strictEqual(inputResult.getProperty("value"), "1", "Fired change event is called once.");
		assert.ok(selectText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT) !== -1, "Select label is correct.");
	});

	it("does not fire change, when clicking on selected item", () => {
		const select = $("#mySelect");
		const inputResult = browser.findElementDeep("#inputResult >>> input");

		select.click();

		const firstItem = browser.findElementDeep("#mySelect >>> ui5-li:first-child");
		firstItem.click();

		assert.strictEqual(inputResult.getProperty("value"), "1", "Event not fired when already selected item is selected");
	});

	it("fires change on selection with keyboard handling", () => {
		const select = $("#mySelect2");
		const selectText = browser.findElementDeep("#mySelect2 >>> ui5-label");
		const inputResult = browser.findElementDeep("#inputResult >>> input");
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
		const btn = $("#myBtn2");
		const select = $("#mySelect");
		const selectText = browser.findElementDeep("#mySelect2 >>> ui5-label");
		const EXPECTED_SELECTION_TEXT1 = "Compact";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		select.keys("ArrowUp");
		assert.ok(selectText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT1) > -1, "Arrow Up should change selected item");

		select.keys("ArrowDown");
		assert.ok(selectText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT2) > -1, "Arrow Down should change selected item");
	});


	it("opens upon space", () => {
		const btn = $("#myBtn2");
		const select = $("#mySelect");
		const popover = browser.findElementDeep("#mySelect >>> ui5-popover >>> .sapMPopover");

		btn.click();
		btn.keys("Tab");

		browser.keys("Space");
		assert.ok(popover.isDisplayedInViewport(), "Select is opened.");
	});

	it("toggles upon F4", () => {
		const btn = $("#myBtn2");
		const select = $("#mySelect");
		const popover = browser.findElementDeep("#mySelect >>> ui5-popover >>> .sapMPopover");

		btn.click();
		btn.keys("Tab");

		browser.keys("F4");
		assert.ok(popover.isDisplayedInViewport(), "Select is opened.");

		browser.keys("F4");
		assert.ok(!popover.isDisplayedInViewport(), "Select is closed.");
	});

	it("toggles upon ALT + UP", () => {
		const btn = $("#myBtn2");
		const select = $("#mySelect");
		const popover = browser.findElementDeep("#mySelect >>> ui5-popover >>> .sapMPopover");

		btn.click();
		btn.keys("Tab");

		browser.keys(["Alt", "ArrowUp", "NULL"]);
		assert.ok(popover.isDisplayedInViewport(), "Select is opened.");

		browser.keys(["Alt", "ArrowUp", "NULL"]);
		assert.ok(!popover.isDisplayedInViewport(), "Select is closed.");
	});

	it("toggles upon ALT + DOWN", () => {
		const btn = $("#myBtn2");
		const popover = browser.findElementDeep("#mySelect >>> ui5-popover >>> .sapMPopover");

		btn.click();
		btn.keys("Tab");

		browser.keys(["Alt", "ArrowDown", "NULL"]);
		assert.ok(popover.isDisplayedInViewport(), "Select is opened.");

		browser.keys(["Alt", "ArrowDown", "NULL"]);
		assert.ok(!popover.isDisplayedInViewport(), "Select is closed.");
	});

	it("adds unselected only items to select", () => {
		const addItemsBtn = $("#add-items-btn");
		const restoreItemsBtn = $("#restore-items-btn");

		addItemsBtn.click();

		const firstOption = browser.findElementDeep("#mySelect ui5-option:first-child");
		const firstListItem = browser.findElementDeep("#mySelect >>> ui5-li:first-child");

		assert.ok(firstOption.getProperty("selected"), "First option should be selected");
		assert.ok(firstListItem.getProperty("selected"), "First list item should be selected");

		restoreItemsBtn.click();
	});

	it("reverts value before open after clicking on escape", () => {
		const select = $("#mySelect");
		const selectText = browser.findElementDeep("#mySelect >>> ui5-label").getHTML(false);
		const inputResult = browser.findElementDeep("#inputResult >>> input");

		select.click();
		select.keys("ArrowDown");
		select.keys("Escape");

		const selectedOption = browser.findElementDeep("#mySelect ui5-option[selected]");
		const selectTextAfterEscape = browser.findElementDeep("#mySelect >>> ui5-label").getHTML(false);

		assert.ok(selectedOption.getProperty("selected"), "Initially selected item should remain selected");
		assert.strictEqual(inputResult.getProperty("value"), "5", "Change event should not be fired");
		assert.strictEqual(selectTextAfterEscape, selectText, "Initially selected item should remain selected");
	});

	it("fires change event after selection is change and picker if focussed out", () => {
		const select = $("#mySelect");
		const inputResult = browser.findElementDeep("#inputResult >>> input");
		const btn = $("#myBtn2");

		select.click();
		select.keys("ArrowDown");
		select.keys("ArrowDown");
		
		// focus out select
		btn.click();
		
		assert.strictEqual(inputResult.getProperty("value"), "6", "Change event should be fired");
	});

	it("fires change event after selecting a previewed item", () => {
		const select = $("#mySelect");
		const inputResult = browser.findElementDeep("#inputResult >>> input");

		select.click();
		select.keys("ArrowDown");

		select.keys("Escape");

		select.click();
		const firstItem = browser.findElementDeep("#mySelect >>> ui5-li:first-child");

		firstItem.click();

		assert.strictEqual(inputResult.getProperty("value"), "7", "Change event should be fired");
	});
});
