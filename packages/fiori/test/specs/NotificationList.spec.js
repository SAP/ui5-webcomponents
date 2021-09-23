const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Notification List Item Tests", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/NotificationList_test_page.html`);
	});

	it("tests itemClick fired", async () => {
		const clickInput = await browser.$("#clickInput");
		const EXPECTED_RESULT = "New order #2201";
		const firstItem = await browser.$("#nli1");

		// act
		await firstItem.click();

		// assert
		assert.strictEqual(await clickInput.getProperty("value"), EXPECTED_RESULT,
			"The itemClick has been fired.");
	});

	it("tests itemClose fired", async () => {
		const closeInput = await browser.$("#closeInput");
		const EXPECTED_RESULT_1 = "Orders";
		const EXPECTED_RESULT_2 = "New order #2201";
		const firstGroupItem = await browser.$("#nlgi1");
		const firstItem = await browser.$("#nli1");
		const btnListGroupItemClose = await firstGroupItem.shadow$("[close-btn]");
		const btnListItemClose = await firstItem.shadow$("[close-btn]");

		// act
		await btnListGroupItemClose.click();

		// assert
		assert.strictEqual(await closeInput.getProperty("value"), EXPECTED_RESULT_1,
			"The itemClose of list group item has been fired.");

		// act
		await btnListItemClose.click();

		// assert
		assert.strictEqual(await closeInput.getProperty("value"), EXPECTED_RESULT_2,
			"The itemClose of list item has been fired.");
	});

	it("tests click fired on custom actions", async () => {
		const customActionInput = await browser.$("#customActionInput");
		const secondItem = await browser.$("#nli2");
		const customAction =  await secondItem.shadow$(".ui5-nli-action");

		// act
		await customAction.click();

		// assert
		assert.strictEqual(await customActionInput.getProperty("value"), "1",
			"The click on custom action has been fired.");
	});

	it("tests itemToggle fired", async () => {
		const toggleInput = await browser.$("#toggleInput");
		const EXPECTED_RESULT = "Orders";
		const firstGroupItem = await browser.$("#nlgi1");
		const btnListGroupItemToggle = await firstGroupItem.shadow$(".ui5-nli-group-toggle-btn");

		// act
		await btnListGroupItemToggle.click();

		// assert
		assert.strictEqual(await toggleInput.getProperty("value"), EXPECTED_RESULT,
			"The itemToggle of list group item has been fired.");

		// reset
		await btnListGroupItemToggle.click();
	});

	it("tests click on ShowMore", async () => {
		const firstItem = await browser.$("#nli1");
		const btnListItemShowMore = await firstItem.shadow$("[showMore-btn]");
		const content = await firstItem.shadow$(".ui5-nli-content");

		const hightBefore = await content.getSize("height");

		// act
		await btnListItemShowMore.click();

		const hightAfter = await content.getSize("height");

		// assert
		assert.isAbove(hightAfter, hightBefore,
			"The content has been expanded by the ShowMore button.");
	});

	it("tests no ShowMore, when truncate is not enabled", async () => {
		const thirdItem = await browser.$("#nli3");
		const btnListItemShowMore = await thirdItem.shadow$("[showMore-btn]");

		assert.strictEqual(await btnListItemShowMore.getAttribute("hidden"), "true",
			"The ShowMore button is not displayed.");
	});

	it("tests no custom actions, when group item collapsed", async () => {
		const fifthItem = await browser.$("#nlgi3");
		const overflow = await fifthItem.shadow$(".ui5-nli-overflow-btn");

		assert.notOk(await overflow.isExisting(),
			"The custom actions are hidden when the group is collapsed");
	});

	it("tests busy indicator is displayed", async () => {
		const busyItem = await browser.$("#nli4");
		const busyIndicator = await busyItem.shadow$(".ui5-nli-busy");

		assert.ok(await busyIndicator.isExisting(), "The busy indicator is displayed");
	});

	it("tests List Group Item ACC invisible text", async () => {
		const EXPECTED_RESULT = "Notification group unread High Priority Counter 2";
		const firstGroupItem = await browser.$("#nlgi1");
		const invisibleText = await firstGroupItem.shadow$(".ui5-hidden-text");

		// assert
		assert.strictEqual((await invisibleText.getText()).toLowerCase(), EXPECTED_RESULT.toLowerCase(),
			"The invisible text is correct.");
	});

	it("tests List Group Item aria-expanded aria-label when collapsed and expanded", async () => {
		const groupItem = await browser.$("#nlgi3");
		const goupItemRoot = await groupItem.shadow$(".ui5-nli-group-root");
		const goupItemToggleBtn = await groupItem.shadow$(".ui5-nli-group-toggle-btn");
		const TOGGLE_BUTTON_EXPAND_GROUP = "Expand Group";
		const TOGGLE_BUTTON_COLLAPSE_GROUP = "Collapse Group";

		// assert
		assert.strictEqual(await goupItemRoot.getAttribute("aria-expanded"), "false",
			"The aria-expanded value is correct.");
		assert.strictEqual(await goupItemToggleBtn.getAttribute("aria-label"), TOGGLE_BUTTON_EXPAND_GROUP,
			"The aria-label value is correct.");

		// act
		await goupItemToggleBtn.click();

		// assert
		assert.strictEqual(await goupItemRoot.getAttribute("aria-expanded"), "true",
			"The aria-expanded value is correct.");
		assert.strictEqual(await goupItemToggleBtn.getAttribute("aria-label"), TOGGLE_BUTTON_COLLAPSE_GROUP,
			"The aria-label value is correct.");
	});

	it("tests List Group Item ACC ariaLabelledBy", async () => {
		const firstGroupItem = await browser.$("#nlgi1");
		const firstGroupItemRoot = await firstGroupItem.shadow$(".ui5-nli-group-root");
		const titleTextId = `${await firstGroupItem.getProperty("_id")}-title-text`;
		const inivisbleTextId = `${await firstGroupItem.getProperty("_id")}-invisibleText`;
		const EXPECTED_ARIA_LABELLED_BY = `${titleTextId} ${inivisbleTextId}`;

		// assert
		assert.strictEqual(await firstGroupItemRoot.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLED_BY,
			"The ariaLabelledBy text is correct.");
	});

	it("tests List Item ACC ariaLabelledBy", async () => {
		const firstItem = await browser.$("#nli1");
		const firstItemRoot = await firstItem.shadow$(".ui5-nli-root");

		const titleTextId = `${await firstItem.getProperty("_id")}-title-text`;
		const descriptionId = `${await firstItem.getProperty("_id")}-description`;
		const footerId = `${await firstItem.getProperty("_id")}-footer`;
		const inivisbleTextId = `${await firstItem.getProperty("_id")}-invisibleText`;
		const EXPECTED_ARIA_LABELLED_BY = `${titleTextId} ${descriptionId} ${footerId} ${inivisbleTextId}`;

		// assert
		assert.strictEqual(await firstItemRoot.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLED_BY,
			"The ariaLabelledBy text is correct.");
	});

	it("tests List Item ACC invisible text", async () => {
		const EXPECTED_RESULT = "Notification unread High Priority";
		const firstItem = await browser.$("#nli1");
		const invisibleText = await firstItem.shadow$(".ui5-hidden-text");

		// assert
		assert.strictEqual((await invisibleText.getText()).toLowerCase(), EXPECTED_RESULT.toLowerCase(),
			"The invisible text is correct.");
	});

	it("tests List (Group) Item ACC role", async () => {
		const firstItemRoot = await browser.$("#nli1").shadow$(".ui5-nli-root");
		const firstGroupItemRoot = await browser.$("#nlgi1").shadow$(".ui5-nli-group-root");
		const EXPECTED_ROLE = "listitem";

		assert.strictEqual(await firstGroupItemRoot.getAttribute("role"), EXPECTED_ROLE, "The role text is correct.");
		assert.strictEqual(await firstItemRoot.getAttribute("role"), EXPECTED_ROLE, "The role text is correct.");
	});
});
