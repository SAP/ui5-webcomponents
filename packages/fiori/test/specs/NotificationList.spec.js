import { assert } from "chai";

describe("Notification List Item Tests", () => {
	before(async () => {
		await browser.url(`test/pages/NotificationList_test_page.html`);
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
		const EXPECTED_RESULT_2 = "New order #2201";
		const firstItem = await browser.$("#nli1");
		const btnListItemClose = await firstItem.shadow$("[close-btn]");

		// act
		await btnListItemClose.click();

		// assert
		assert.strictEqual(await closeInput.getProperty("value"), EXPECTED_RESULT_2,
			"The itemClose of list item has been fired.");
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

	it("tests busy indicator is displayed", async () => {
		const busyItem = await browser.$("#nli4");
		const busyIndicator = await busyItem.shadow$(".ui5-nli-busy");

		assert.ok(await busyIndicator.isExisting(), "The busy indicator is displayed");
	});

	// Notification List Item specific tests follows
	it("tests state", async () => {
		const thirdItem = await browser.$("#nli3");
		const state = await thirdItem.shadow$(".ui5-state-icon--message-error");

		assert.ok(state, "The state'Negative' icon is correctly displayed.");
	});

	it("tests importance", async () => {
		const thirdItem = await browser.$("#nli3");
		const fourthItem = await browser.$("#nli4");
		const importance3rd = await thirdItem.shadow$(".ui5-nli-content-with-importance");
		const importance4th = await fourthItem.shadow$(".ui5-nli-content-with-importance");
// TODO test without Importance
		assert.ok(await importance3rd.isExisting(), "The importance label is correctly displayed on the third item.");
		assert.notOk(await importance4th.isExisting(), "The importance label is correctly displayed fourth item.");
	});

	it("tests menu", async () => {
		const closeInput = await browser.$("#closeInput");
		const EXPECTED_RESULT_2 = "New order #2201";
		const firstItem = await browser.$("#nli1");
		// const menu2 = await menu1.shadow$(".ui5-menu-rp");
		const menuButton = await firstItem.shadow$(".ui5-nli-menu-btn");

		// act
		// await menuButton.click();

		const menu1 = await firstItem.shadow$("[open]");
		// assert
		assert.ok(menu1, "There is menu");
	});

	// Notification Group List Item specific tests follows

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

	it("tests Group List collapsed", async () => {
		const thirdGroupList =  await browser.$("#nlgi3").shadow$(".ui5-nli-group-items");

		assert.strictEqual((await thirdGroupList.getCSSProperty("display")).value, 'none', "The group is collapsed (items are not visible).");
	});

	// Accessibility tests follows

	// it("tests List Group Item ACC invisible text", async () => {
	// 	const EXPECTED_RESULT = "Notification group unread";
	// 	const firstGroupItem = await browser.$("#nlgi1");
	// 	const invisibleText = await firstGroupItem.shadow$(".ui5-hidden-text");

	// 	// assert
	// 	assert.strictEqual((await invisibleText.getText()).toLowerCase(), EXPECTED_RESULT.toLowerCase(),
	// 		"The invisible text is correct.");
	// });

	// it("tests List Group Item aria-expanded aria-label when collapsed and expanded", async () => {
	// 	const groupItem = await browser.$("#nlgi3");
	// 	const goupItemRoot = await groupItem.shadow$(".ui5-nli-group-root");
	// 	const goupItemToggleBtn = await groupItem.shadow$(".ui5-nli-group-toggle-btn");
	// 	const TOGGLE_BUTTON_EXPAND_GROUP = "Expand Group";
	// 	const TOGGLE_BUTTON_COLLAPSE_GROUP = "Collapse Group";

	// 	// assert
	// 	assert.strictEqual(await goupItemRoot.getAttribute("aria-expanded"), "false",
	// 		"The aria-expanded value is correct.");
	// 	assert.strictEqual(await goupItemToggleBtn.getAttribute("aria-label"), TOGGLE_BUTTON_EXPAND_GROUP,
	// 		"The aria-label value is correct.");

	// 	// act
	// 	await goupItemToggleBtn.click();

	// 	// assert
	// 	assert.strictEqual(await goupItemRoot.getAttribute("aria-expanded"), "true",
	// 		"The aria-expanded value is correct.");
	// 	assert.strictEqual(await goupItemToggleBtn.getAttribute("aria-label"), TOGGLE_BUTTON_COLLAPSE_GROUP,
	// 		"The aria-label value is correct.");
	// });

	// it("tests List Group Item ACC ariaLabelledBy", async () => {
	// 	const firstGroupItem = await browser.$("#nlgi1");
	// 	const firstGroupItemRoot = await firstGroupItem.shadow$(".ui5-nli-group-root");
	// 	const titleTextId = `${await firstGroupItem.getProperty("_id")}-title-text`;
	// 	const inivisbleTextId = `${await firstGroupItem.getProperty("_id")}-invisibleText`;
	// 	const EXPECTED_ARIA_LABELLED_BY = `${titleTextId} ${inivisbleTextId}`;

	// 	// assert
	// 	assert.strictEqual(await firstGroupItemRoot.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLED_BY,
	// 		"The ariaLabelledBy text is correct.");
	// });

	it("tests List Item ACC ariaLabelledBy and ariaDescribedBy", async () => {
		const firstItem = await browser.$("#nli1");
		const firstItemRoot = await firstItem.shadow$(".ui5-nli-root");

		const titleTextId = `${await firstItem.getProperty("_id")}-title-text`;
		const descriptionId = `${await firstItem.getProperty("_id")}-description`;
		const footerId = `${await firstItem.getProperty("_id")}-footer`;
		const invisibleTextId = `${await firstItem.getProperty("_id")}-invisibleText`;
		const EXPECTED_ARIA_LABELLED_BY = `${titleTextId} ${descriptionId} ${footerId}`;
		// const EXPECTED_ARIA_LABELLED_BY = `${titleTextId}`;

		// assert
		assert.strictEqual(await firstItemRoot.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLED_BY,
			"The ariaLabelledBy text is correct.");
		assert.strictEqual(await firstItemRoot.getAttribute("aria-describedby"), invisibleTextId,
			"The ariaLabelledBy text is correct.");
	});

	it("tests List Item ACC invisible text", async () => {
		// const EXPECTED_RESULT = "Notification unread status: error important";
		const EXPECTED_RESULT_STATUS = "Status Negative";
		const EXPECTED_RESULT_ITEM = "notification unread";
		const firstItem = await browser.$("#nli1");
		const invisibleTextStatus = await firstItem.shadow$(".ui5-nli-root").$$(".ui5-hidden-text")[0];
		const invisibleTextItem = await firstItem.shadow$(".ui5-nli-root").$$(".ui5-hidden-text")[1];

		// assert
		assert.strictEqual((await invisibleTextStatus.getText()).toLowerCase(), EXPECTED_RESULT_STATUS.toLowerCase(), "The invisible text is correct.");
		assert.strictEqual((await invisibleTextItem.getText()).toLowerCase(), EXPECTED_RESULT_ITEM.toLowerCase(), "The invisible text is correct.");
	});

	it("tests Menu (actions) button ACC attributes", async () => {
		const firstItem = await browser.$("#nli1");
		const menuButton = await firstItem.shadow$(".ui5-nli-menu-btn");

		// assert
		assert.strictEqual(await menuButton.getAttribute("tooltip"), 'Actions', "The tooltip text is correct.");
		assert.strictEqual(await menuButton.getAttribute("aria-haspopup"), 'menu', "The aria-haspopup text is correct.");
	});

	// // it("tests List (Group) Item ACC role", async () => {
	// it("tests Group Item ACC role", async () => {
	// 	// const firstItemRoot = await browser.$("#nli1").shadow$(".ui5-nli-root");
	// 	const firstGroupItemRoot = await browser.$("#nlgi1").shadow$(".ui5-nli-group-root");
	// 	const EXPECTED_ROLE = "group";

	// 	assert.strictEqual(await firstGroupItemRoot.getAttribute("role"), EXPECTED_ROLE, "The role text is correct.");
	// 	// assert.strictEqual(await firstItemRoot.getAttribute("role"), EXPECTED_ROLE, "The role text is correct.");
	// });

	it("tests Group Item aria-description", async () => {
		const firstGroupItemRoot = await browser.$("#nlgi1").shadow$(".ui5-nli-group-root");
		const EXPECTED_TEXT = "Notification group Expanded";

		assert.strictEqual(await firstGroupItemRoot.getAttribute("aria-description"), EXPECTED_TEXT, "The aria-description text is correct.");
	});

	it("tests Group Header Button ACC attributes", async () => {
		const firstGroupButton = await browser.$("#nlgi1").shadow$(".ui5-nli-group-toggle-btn");
		const thirdGroupButton = await browser.$("#nlgi3").shadow$(".ui5-nli-group-toggle-btn");
		const firstGroupItem = await browser.$("#nlgi1");
		const titleTextId = `${await firstGroupItem.getProperty("_id")}-notificationsList`;

		assert.strictEqual(await firstGroupButton.getAttribute("aria-expanded"), 'true', "The aria-expanded is correct.");
		assert.strictEqual(await thirdGroupButton.getAttribute("aria-expanded"), 'false', "The aria-expanded is correct.");
		assert.strictEqual(await firstGroupButton.getAttribute("aria-controls"), titleTextId, "The aria-controls id is correct.");
	});

	it("tests Group Header Text ACC attributes", async () => {
		const firstGroupText = await browser.$("#nlgi1").shadow$(".ui5-nli-group-title-text");

		assert.strictEqual(await firstGroupText.getAttribute("role"), 'heading', "The role is correct.");
		assert.strictEqual(await firstGroupText.getAttribute("aria-level"), '2', "The aria-level is correct.");
	});

	it("tests Group List aria-labelledby", async () => {
		const firstGroupItem = await browser.$("#nlgi1");
		const firstGroupList =  await browser.$("#nlgi1").shadow$(".ui5-nli-group-items");
		const id = `${await firstGroupItem.getProperty("_id")}-title-text`;

		assert.strictEqual(await firstGroupList.getAttribute("aria-labelledby"), id, "The aria-lebelledby is correct.");
	});
});
