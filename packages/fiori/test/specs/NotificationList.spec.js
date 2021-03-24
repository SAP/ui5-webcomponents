const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Notification List Item Tests", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/NotificationList_test_page.html`);
	});

	it("tests itemClick fired", () => {
		const clickInput = $("#clickInput");
		const EXPECTED_RESULT = "New order #2201";
		const firstItem = $("#nli1");

		// act
		firstItem.click();

		// assert
		assert.strictEqual(clickInput.getProperty("value"), EXPECTED_RESULT,
			"The itemClick has been fired.");
	});

	it("tests itemClose fired", () => {
		const closeInput = $("#closeInput");
		const EXPECTED_RESULT_1 = "Orders";
		const EXPECTED_RESULT_2 = "New order #2201";
		const firstGroupItem = $("#nlgi1");
		const firstItem = $("#nli1");
		const btnListGroupItemClose = firstGroupItem.shadow$("[close-btn]");
		const btnListItemClose = firstItem.shadow$("[close-btn]");

		// act
		btnListGroupItemClose.click();

		// assert
		assert.strictEqual(closeInput.getProperty("value"), EXPECTED_RESULT_1,
			"The itemClose of list group item has been fired.");

		// act
		btnListItemClose.click();

		// assert
		assert.strictEqual(closeInput.getProperty("value"), EXPECTED_RESULT_2,
			"The itemClose of list item has been fired.");
	});

	it("tests click fired on custom actions", () => {
		const customActionInput = $("#customActionInput");
		const secondItem = $("#nli2");
		const customAction =  secondItem.shadow$(".ui5-nli-action");

		// act
		customAction.click();

		// assert
		assert.strictEqual(customActionInput.getProperty("value"), "1",
			"The click on custom action has been fired.");
	});

	it("tests itemToggle fired", () => {
		const toggleInput = $("#toggleInput");
		const EXPECTED_RESULT = "Orders";
		const firstGroupItem = $("#nlgi1");
		const btnListGroupItemToggle = firstGroupItem.shadow$(".ui5-nli-group-toggle-btn");

		// act
		btnListGroupItemToggle.click();

		// assert
		assert.strictEqual(toggleInput.getProperty("value"), EXPECTED_RESULT,
			"The itemToggle of list group item has been fired.");

		// reset
		btnListGroupItemToggle.click();
	});

	it("tests click on ShowMore", () => {
		const firstItem = $("#nli1");
		const btnListItemShowMore = firstItem.shadow$("[showMore-btn]");
		const content = firstItem.shadow$(".ui5-nli-content");

		const hightBefore = content.getSize("height");

		// act
		btnListItemShowMore.click();

		const hightAfter = content.getSize("height");

		// assert
		assert.ok(hightAfter > hightBefore,
			"The content has been expanded by the ShowMore button.");
	});

	it("tests no ShowMore, when truncate is not enabled", () => {
		const thirdItem = $("#nli3");
		const btnListItemShowMore = thirdItem.shadow$("[showMore-btn]");

		assert.strictEqual(btnListItemShowMore.getAttribute("hidden"), "true",
			"The ShowMore button is not displayed.");
	});

	it("tests no custom actions, when group item collapsed", () => {
		const fifthItem = $("#nlgi3");
		const overflow = fifthItem.shadow$(".ui5-nli-overflow-btn");

		assert.ok(!overflow.isExisting(),
			"The custom actions are hidden when the group is collapsed");
	});

	it("tests busy indicator is displayed", () => {
		const busyItem = $("#nli4");
		const busyIndicator = busyItem.shadow$(".ui5-nli-busy");

		assert.ok(busyIndicator.isExisting(), "The busy indicator is displayed");
	});

	it("tests List Group Item ACC invisible text", () => {
		const EXPECTED_RESULT = "Notification group unread High Priority Counter 2";
		const firstGroupItem = $("#nlgi1");
		const invisibleText = firstGroupItem.shadow$(".ui5-hidden-text");

		// assert
		assert.strictEqual(invisibleText.getText().toLowerCase(), EXPECTED_RESULT.toLowerCase(),
			"The invisible text is correct.");
	});

	it("tests List Group Item aria-expanded aria-label when collapsed and expanded", () => {
		const groupItem = browser.$("#nlgi3");
		const goupItemRoot = groupItem.shadow$(".ui5-nli-group-root");
		const goupItemToggleBtn = groupItem.shadow$(".ui5-nli-group-toggle-btn");
		const TOGGLE_BUTTON_EXPAND_GROUP = "Expand Group";
		const TOGGLE_BUTTON_COLLAPSE_GROUP = "Collapse Group";

		// assert
		assert.strictEqual(goupItemRoot.getAttribute("aria-expanded"), "false",
			"The aria-expanded value is correct.");
		assert.strictEqual(goupItemToggleBtn.getAttribute("aria-label"), TOGGLE_BUTTON_EXPAND_GROUP,
			"The aria-label value is correct.");

		// act
		goupItemToggleBtn.click();

		// assert
		assert.strictEqual(goupItemRoot.getAttribute("aria-expanded"), "true",
			"The aria-expanded value is correct.");
		assert.strictEqual(goupItemToggleBtn.getAttribute("aria-label"), TOGGLE_BUTTON_COLLAPSE_GROUP,
			"The aria-label value is correct.");
	});

	it("tests List Group Item ACC ariaLabelledBy", () => {
		const firstGroupItem = $("#nlgi1");
		const firstGroupItemRoot = firstGroupItem.shadow$(".ui5-nli-group-root");
		const headingId = `${firstGroupItem.getProperty("_id")}-heading`;
		const inivisbleTextId = `${firstGroupItem.getProperty("_id")}-invisibleText`;
		const EXPECTED_ARIA_LABELLED_BY = `${headingId} ${inivisbleTextId}`;

		// assert
		assert.strictEqual(firstGroupItemRoot.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLED_BY,
			"The ariaLabelledBy text is correct.");
	});

	it("tests List Item ACC invisible text", () => {
		const EXPECTED_RESULT = "Notification unread High Priority";
		const firstItem = $("#nli1");
		const invisibleText = firstItem.shadow$(".ui5-hidden-text");

		// assert
		assert.strictEqual(invisibleText.getText().toLowerCase(), EXPECTED_RESULT.toLowerCase(),
			"The invisible text is correct.");
	});

	it("tests List Group Item ACC ariaLabelledBy", () => {
		const firstItem = $("#nli1");
		const firstItemRoot = firstItem.shadow$(".ui5-nli-root");

		const headingId = `${firstItem.getProperty("_id")}-heading`;
		const descriptionId = `${firstItem.getProperty("_id")}-description`;
		const footerId = `${firstItem.getProperty("_id")}-footer`;
		const inivisbleTextId = `${firstItem.getProperty("_id")}-invisibleText`;
		const EXPECTED_ARIA_LABELLED_BY = `${headingId} ${descriptionId} ${footerId} ${inivisbleTextId}`;

		// assert
		assert.strictEqual(firstItemRoot.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLED_BY,
			"The ariaLabelledBy text is correct.");
	});
});
