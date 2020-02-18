const list = require("../pageobjects/ListTestPage");
const assert = require("chai").assert;

describe("List Tests", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/List_test_page.html");
	});

	it("List is rendered", () => {
		const list = browser.$("ui5-list").shadow$(".ui5-list-root");
		
		assert.ok(list, "List is rendered");
	});

	it("itemPress and selectionChange events are fired", () => {
		const itemPressResultField = $("#itemPressResultField");
		const selectionChangeResultField = $("#selectionChangeResultField");
		const firstItem = $("#listEvents #country1");

		firstItem.click();

		assert.strictEqual(itemPressResultField.getProperty("value"), "1", "itemPress event has been fired once");
		assert.strictEqual(selectionChangeResultField.getProperty("value"), "1", "selectionChange event has been fired.");
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
});
