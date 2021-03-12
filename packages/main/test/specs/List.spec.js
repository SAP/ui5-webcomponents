const list = require("../pageobjects/ListTestPage");
const assert = require("chai").assert;

describe("List Tests", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/List_test_page.html");
	});

	it("List is rendered", () => {
		const list = browser.$("#infiniteScrollEx").shadow$(".ui5-list-root");
		const busyInd = browser.$("#infiniteScrollEx").shadow$(".ui5-list-busy-row");

		assert.ok(list.isExisting(), "List is rendered");
		assert.notOk(busyInd.isExisting(), "Busy indicator is not rendered, when List is not busy");
	});

	it("itemPress and selectionChange events are fired in Single selection", () => {
		const itemPressResultField = $("#itemPressResultField");
		const itemPressSelectedResultField = $("#itemPressSelectedResultField");
		const selectionChangeResultField = $("#selectionChangeResultField");
		const firstItem = $("#listEvents #country1");

		firstItem.click();

		assert.strictEqual(itemPressResultField.getProperty("value"), "1", "itemPress event has been fired once");
		assert.strictEqual(itemPressSelectedResultField.getProperty("value"), "true", "itemPress detail 'item' has correct value.");
		assert.strictEqual(selectionChangeResultField.getProperty("value"), "1", "selectionChange event has been fired.");
	});

	it("itemPress and selectionChange events are fired in Multi selection", () => {
		const itemPressResultField2 = $("#itemPressResultField2");
		const itemPressSelectedResultField2 = $("#itemPressSelectedResultField2");
		const selectionChangeResultField2 = $("#selectionChangeResultField2");
		const firstItem = $("#listEvents2 #country11");

		firstItem.click();

		assert.strictEqual(itemPressResultField2.getProperty("value"), "1", "itemPress event has been fired once");
		assert.strictEqual(itemPressSelectedResultField2.getProperty("value"), "true", "itemPress detail 'item' has correct value.");
		assert.strictEqual(selectionChangeResultField2.getProperty("value"), "1", "selectionChange event has been fired.");
	});

	it("selectionChange events provides previousSelection item", () => {
		const selectionChangeResultPreviousItemsParameter = $("#selectionChangeResultPreviousItemsParameter");
		const firstItem = $("#listEvents #country1");
		const secondItem = $("#listEvents #country2");

		firstItem.click();

		assert.strictEqual(secondItem.getProperty("id"), selectionChangeResultPreviousItemsParameter.getProperty("value"));
	});

	it("No data text is shown", () => {
		const noDataText = browser.$("#no-data-list").shadow$(".ui5-list-nodata-text");

		assert.ok(noDataText, "No data text is shown");
	});

	it("Tests header text", () => {
		list.id = "#list1";

		assert.ok(list.header.hasClass("ui5-list-header"), "header has the right classes");
		assert.ok(list.header.getHTML(false), "API: GroupHeaderListItem");
	});

	it("Tests header slot", () => {
		const headerSlotContent = browser.execute(() => {
			return document.getElementById("header-slot-list").shadowRoot.querySelector("slot[name='header']").assignedNodes()[0].querySelector("#header-slot-title");
		});

		assert.ok(headerSlotContent, "header slot content is rendered");
	});

	it("Test default slot", () => {
		const listItemsLength = browser.execute(() => {
			const slots = document.getElementById("default-slot-test").shadowRoot.querySelector("slot").assignedNodes();

			const result = slots.filter(slot => {
				return slot.tagName === "UI5-LI";
			});

			return result.length;
		});

		assert.strictEqual(listItemsLength, 3, "List items are rendered");
	});

	it("Clicking on inactive items does not change single selection", () => {
		list.id = "#inactiveSingleSelect";
		const firstItem = list.getItem(0);
		const secondItem = list.getItem(1);

		firstItem.click();
		secondItem.click();

		assert.ok(!firstItem.getAttribute("selected"), "The first item is not selected");
		assert.ok(!secondItem.getAttribute("selected"), "The second item is notselected");
	});

	it("Clicking on inactive items does not change multi selection", () => {
		list.id = "#inactiveMultiSelect";
		const firstItem = list.getItem(0);
		const secondItem = list.getItem(1);

		firstItem.click();
		secondItem.click();

		assert.ok(!firstItem.getAttribute("selected"), "The first item is not selected");
		assert.ok(!secondItem.getAttribute("selected"), "The second item is notselected");
	});

	it("mode: none. clicking item does not select it", () => {
		list.id = "#list1";

		const firstItem = list.getItem(0);
		firstItem.click();

		assert.equal(list.root.getProperty("mode"), "None", "default mode is None");
		assert.ok(!firstItem.getAttribute("selected"), "item is not selected");
	});

	it("mode: singleselect. clicking item selects it", () => {
		list.root.setProperty("mode", "SingleSelect");

		const firstItem = list.getItem(0);
		firstItem.click();

		assert.ok(firstItem.getAttribute("selected"), "item is selected");
	});

	it("mode: singleselect. clicking another item selects deselects the first", () => {
		const firstItem = list.getItem(0);
		const secondItem = list.getItem(1);
		secondItem.click();

		assert.ok(secondItem.getAttribute("selected"), "second item is selected");
		assert.ok(!firstItem.getAttribute("selected"), "first item is not selected");
	});

	it("mode: multiselect. clicking every item selects it independently from the other items", () => {
		browser.url("http://localhost:8080/test-resources/pages/List_test_page.html");
		list.root.setProperty("mode", "MultiSelect");

		const firstItem = list.getItem(0);
		const secondItem = list.getItem(1);
		firstItem.click();
		secondItem.click();

		assert.ok(firstItem.getAttribute("selected"), "item is selected");
		assert.ok(secondItem.getAttribute("selected"), "item is selected");

		secondItem.click();

		assert.ok(firstItem.getAttribute("selected"), "item is selected");
		assert.ok(!secondItem.getAttribute("selected"), "item is not selected");
	});

	it("mode: delete. items have X buttons which delete them", () => {
		browser.url("http://localhost:8080/test-resources/pages/List_test_page.html");
		list.root.setProperty("mode", "Delete");

		const firstItem = list.getItem(0);
		firstItem.click();

		assert.ok(!firstItem.getAttribute("selected"), "item is selected");

		const itemDeleteButton = firstItem.shadow$('ui5-button');
		assert.ok(itemDeleteButton.isExisting(), "there is a delete button");

		itemDeleteButton.click();
		assert.equal(browser.$('#lblResult').getHTML(false), "Laptop HP: 1", "itemDelete event was fired for the right item");
	});

	it("item size and classed, when an item has both text and description", () => {
		const ITEM_WITH_DESCRIPTION_AND_TITLE_HEIGHT = 80;
		const firstItem =  $("#listWithDesc ui5-li:first-child");
		const firstItemHeight = firstItem.getSize("height");

		assert.strictEqual(firstItemHeight, ITEM_WITH_DESCRIPTION_AND_TITLE_HEIGHT, "The size of the item is : " + firstItemHeight);
	});

	it("keyboard handling on TAB", () => {
		const headerBtn = $("#headerBtn");
		const item = $("ui5-li-custom.item");
		const itemBtn = $("ui5-button.itemBtn");
		const itemLink = $("ui5-link.itemLink");
		const itemRadioBtn = $("ui5-radiobutton.itemRadio");
		const randomBtn = $("#randomBtn");

		headerBtn.click();
		assert.strictEqual(headerBtn.isFocused(), true, "header btn is focused");

		// act: TAB from headerButton -> the focus should go to the 1st selected item
		headerBtn.keys("Tab");
		assert.strictEqual(item.isFocused(), true, "selected item is focused");

		// act: TAB from item -> the focus should go to "Click me" button
		item.keys("Tab");
		assert.strictEqual(itemBtn.isFocused(), true, "the 1st tabbable element (button) is focused");

		// act: TAB from the "Click me" button - the the focus should go to "UI5 Link" anchor
		itemBtn.keys("Tab");
		assert.strictEqual(itemLink.isFocused(), true, "the 2nd tabbable element (link) is focused");

		// act: TAB from the "UI5 Link" anchor - the the focus should skip the "Disabled" button
		// and go to the "Option B" radio button
		itemLink.keys("Tab");
		assert.strictEqual(itemRadioBtn.isFocused(), true, "the last tabbable element (radio) is focused");

		// act: TAB from the "Option B" radio button - the focus should leave  the ui5-list
		// and Random button should be focused
		itemLink.keys("Tab");
		assert.strictEqual(randomBtn.isFocused(), true, "element outside of the list is focused");
	});

	it("does not focus next / prev item when right / left arrow is pressed", () => {
		const firstListItem = $("#country1");
		const secondListItem = $("#country2");

		firstListItem.click();

		firstListItem.keys("ArrowRight");

		assert.ok(firstListItem.isFocused(), "First item remains focussed");
		assert.strictEqual(secondListItem.isFocused(), false, "Second list item not should be focused");

		firstListItem.keys("ArrowLeft");

		assert.ok(firstListItem.isFocused(), "First item remains focussed");
	});

	it("tests 'loadMore' event fired upon infinite scroll", () => {
		const btn = $("#btnTrigger");
		const loadMoreResult = $("#loadMoreResult");

		btn.click();
		browser.pause(1000);

		assert.strictEqual(loadMoreResult.getAttribute("value"), "1", "The event loadMore is fired.");
	});

	it("detailPress event is fired", () => {
		const detailCounterResult = $("#detailPressCounter");
		const firstItem = $("#detailListItem");
		const detailButton = firstItem.shadow$(".ui5-li-detailbtn");

		detailButton.click();

		assert.strictEqual(detailCounterResult.getProperty("innerHTML"), "1", "detailClick event has been fired once");
	});

	it("tests aria-labelledby", () => {
		const listWithInternalHeader = $("#listWithInternalHeader");
		const listWithCustomHeader = $("#listWithCustomHeader");
		const ulInternalHeader = listWithInternalHeader.shadow$(".ui5-list-ul");
		const ulCustomHeader = listWithCustomHeader.shadow$(".ui5-list-ul");

		// assert: List with internal header
		const listWithInternalHeaderId = listWithInternalHeader.getProperty("_id");
		assert.strictEqual(ulInternalHeader.getAttribute("aria-label"),
			null, "aria-label is not present");

		assert.strictEqual(ulInternalHeader.getAttribute("aria-labelledby"),
			`${listWithInternalHeaderId}-header`, "aria-labelledby is correct");

		// assert: List with custom header
		const EXPECTED_ARIA_LABEL_TXT = "Test aria";

		assert.strictEqual(ulCustomHeader.getAttribute("aria-label"),
			EXPECTED_ARIA_LABEL_TXT, "aria-label is correct");
		assert.strictEqual(ulCustomHeader.getAttribute("aria-labelledby"),
			null, "aria-labelledby is not present");
	});

	it("tests title is updated, when initially empty", () => {
		const btnChangeEmptyItem = $("#changeEmptyItem");
		const emptyItem = $("#emptyItem");
		const NEW_TEXT = "updated";
		const assignedNodesBefore = browser.execute(() => {
			return document.getElementById("emptyItem").shadowRoot.querySelector("slot").assignedNodes().length;
		});

		// assert default
		assert.strictEqual(emptyItem.getProperty("innerHTML"), "",
			"The value is empty string");
		assert.strictEqual(assignedNodesBefore, 0,
			"No slotted elements as no text is present.");

		// act
		btnChangeEmptyItem.click();	// update the item textContent

		const assignedNodesAfter = browser.execute(() => {
			return document.getElementById("emptyItem").shadowRoot.querySelector("slot").assignedNodes().length;
		});

		// assert
		assert.strictEqual(emptyItem.getProperty("innerHTML"), NEW_TEXT, "The value is updated");
		assert.strictEqual(assignedNodesAfter, 1, "The new text is slotted.");
	});

	it("tests events for ui5-li-custom", () => {
		const button = $("#liBtn1");
		const input = $("#customListItemEvents");

		button.click();

		browser.keys("Enter");
		browser.keys("Space");

		assert.strictEqual(input.getProperty("value"), "0", "item-click event is not fired when the button is pressed.");
	});

	it("Popover with List opens without errors", () => {
		const btnPopupOpener = $("#btnOpenPopup");
		const btnInListHeader = $("#btnInHeader");

		btnPopupOpener.click();
		assert.strictEqual(btnInListHeader.isFocused(), true, "The List header btn is focused.");
	});

	it('focusable list-items are correctly disabled', () => {
		const item2 = $('#basicList ui5-li:nth-child(2)');

		// focus the second item
		item2.click();

		// disable the second item
		browser.execute(() => {
			document.querySelector("#basicList ui5-li:nth-child(2)").disabled = true;
		});

		assert.strictEqual(item2.shadow$('li').getProperty("tabIndex"), -1, "disabled item is no longer focusable");
		assert.strictEqual(item2.shadow$('li').getAttribute("class"),"ui5-li-root", "disabled item no longer styled as focusable");
	});

	it('disabled list-items are skipped on navigation', () => {
		const item1 = $('#basicList ui5-li:nth-child(1)'),
			item3 = $('#basicList ui5-li:nth-child(3)');

		// ensure the second item is disabled
		browser.execute(() => {
			document.querySelector("#basicList ui5-li:nth-child(2)").disabled = true;
		});

		// navigate from the first item to the next focusable item
		item1.click();
		item1.keys("ArrowDown");

		assert.strictEqual(item3.getProperty("focused"), true, "disabled item is skipped");
	});
});
