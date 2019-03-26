const assert = require("assert");

describe("Select general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Select.html");

	it("fires change on selection", () => {
		const select = $("#mySelect");
		const selectText = browser.findElementDeep("#mySelect >>> ui5-label");
		const inputResult = browser.findElementDeep("#inputResult >>> input");
		const EXPECTED_SELECTION_TEXT = "Cozy";

		select.click();

		const firstItem = $("#mySelect ui5-li[slot=items-1]");
		firstItem.click();

		assert.strictEqual(inputResult.getProperty("value"), "1", "Fired change event is called once.");
		assert.ok(selectText.getHTML(false).indexOf(EXPECTED_SELECTION_TEXT) !== -1, "Select label is correct.");
	});

	it("does not fire change, when clicking on selected item", () => {
		const select = $("#mySelect");
		const inputResult = browser.findElementDeep("#inputResult >>> input");

		select.click();

		const firstItem = $("#mySelect ui5-li[slot=items-1]");
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
		const CURRENTLY_SELECTED_ITEM = "Cozy";

		select.keys("ArrowUp");
		assert.ok(selectText.getHTML(false).indexOf(CURRENTLY_SELECTED_ITEM) === -1, "Arrow Up should change selected item");

		select.keys("ArrowDown");
		assert.ok(selectText.getHTML(false).indexOf(CURRENTLY_SELECTED_ITEM) === -1, "Arrow Down should change selected item");
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
		const select = $("#mySelect");
		const popover = browser.findElementDeep("#mySelect >>> ui5-popover >>> .sapMPopover");

		btn.click();
		btn.keys("Tab");

		browser.keys(["Alt", "ArrowDown", "NULL"]);
		assert.ok(popover.isDisplayedInViewport(), "Select is opened.");

		browser.keys(["Alt", "ArrowDown", "NULL"]);
		assert.ok(!popover.isDisplayedInViewport(), "Select is closed.");
	});
});