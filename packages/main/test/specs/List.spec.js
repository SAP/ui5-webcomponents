const list = require("../pageobjects/ListTestPage");
const assert = require("assert");

describe("Date Picker Tests", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/List_test_page.html");
	});

	it("itemPress and selectionChange events are fired", () => {
		const itemPressResultField = $("#itemPressResultField");
		const selectionChangeResultField = $("#selectionChangeResultField");
		const firstItem = $("#listEvents #country1");
		const inactiveItem = $("#listEvents #country4");

		firstItem.click();
		inactiveItem.click();

		assert.strictEqual(itemPressResultField.getProperty("value"), "2", "itemPress event has been fired twice");
		assert.strictEqual(selectionChangeResultField.getProperty("value"), "2", "selectionChange event has been fired.");
	});

	it("header text", () => {
		list.id = "#list1";

		assert.ok(list.header.hasClass("sapMListHdr"), "header has the right classes");
		assert.ok(list.header.hasClass("sapMListHdrText"), "header has the right classes");
		assert.ok(list.header.getHTML(false), "API: GroupHeaderListItem");
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
		browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/List_test_page.html");
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

	it("mode: delete. items have x buttons which delete them", () => {
		browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/List_test_page.html");
		list.root.setProperty("mode", "Delete");

		const firstItem = list.getItem(0);
		firstItem.click();

		assert.ok(!firstItem.getAttribute("selected"), "item is selected");

		const itemDeleteButton = firstItem.findElementDeep('ui5-button');
		assert.ok(itemDeleteButton.isExisting(), "there is a delete button");

		itemDeleteButton.click();
		assert.equal(browser.$('#lblResult').getHTML(false), "Laptop HP: 1", "itemDelete event was fired for the right item");
	});

	it("item size and classed, when an item has both text and description", () => {
		const ITEM_WITH_DESCRIPTION_AND_TITLE_HEIGHT = 80;
		const firstItem =  $("#listWithDesc ui5-li[slot=items-1]");
		const firstItemHeight = firstItem.getSize("height");
		const rootElement =  browser.findElementDeep("#listWithDesc ui5-li[slot=items-1] >>> .sapMSLI");
		const descriptionElement =  browser.findElementDeep("#listWithDesc ui5-li[slot=items-1] >>> .sapMSLIDescription");

		assert.strictEqual(firstItemHeight, ITEM_WITH_DESCRIPTION_AND_TITLE_HEIGHT, "The size of the item is : " + firstItemHeight);
		assert.ok(descriptionElement, "The description span is rendered.");
		assert.ok(rootElement.hasClass("sapMSLIWithTitleAndDescription"), "The sapMSLIWithTitleAndDescription class is added to the root element.");
	});
});
