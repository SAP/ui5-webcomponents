import { assert } from "chai";

describe("Notification List Item Tests", () => {
	before(async () => {
		await browser.url(`test/pages/NotificationList_test_page.html`);
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

	it("tests Group List Header keyboard shortcuts ", async () => {
		const thirdGroup = await browser.$("#nlgi3");
		const thirdGroupList = thirdGroup.shadow$(".ui5-nli-group-items");
		const thirdGroupRoot= thirdGroup.shadow$(".ui5-nli-group-root")

		assert.strictEqual((await thirdGroupList.getCSSProperty("display")).value, 'none', "The group is collapsed (items are not visible).");
		// act
		await thirdGroupRoot.click();
		await thirdGroupRoot.keys("ArrowRight");

		assert.strictEqual((await thirdGroupList.getCSSProperty("display")).value, 'block', "The group is collapsed (items are not visible).");
		// act
		await thirdGroupRoot.keys("ArrowLeft");

		assert.strictEqual((await thirdGroupList.getCSSProperty("display")).value, 'none', "The group is collapsed (items are not visible).");
		// act
		await browser.keys("+");

		assert.strictEqual((await thirdGroupList.getCSSProperty("display")).value, 'block', "The group is collapsed (items are not visible).");
		// act
		await thirdGroupRoot.keys("-");

		assert.strictEqual((await thirdGroupList.getCSSProperty("display")).value, 'none', "The group is collapsed (items are not visible).");
		// act
		await thirdGroupRoot.keys("Space");

		assert.strictEqual((await thirdGroupList.getCSSProperty("display")).value, 'block', "The group is collapsed (items are not visible).");
		// act
		await thirdGroupRoot.click();

		assert.strictEqual((await thirdGroupList.getCSSProperty("display")).value, 'none', "The group is collapsed (items are not visible).");
	});

	// Notification List Item specific tests follows

	it("tests itemClick fired", async () => {
		const clickInput = await browser.$("#clickInput");
		const EXPECTED_RESULT_1 = "New order #2201";
		const EXPECTED_RESULT_2 = "New order #2202";
		const firstItem = await browser.$("#nli1");


		// act
		await firstItem.click();

		// assert
		assert.strictEqual(await clickInput.getProperty("value"), EXPECTED_RESULT_1,
			"The itemClick has been fired.");

		// act
		await firstItem.keys("ArrowDown");
		await firstItem.keys("Enter");

		// assert
		assert.strictEqual(await clickInput.getProperty("value"), EXPECTED_RESULT_2,
			"The itemClick has been fired.");
	});

	it("tests itemClose fired", async () => {
		const closeInput = await browser.$("#closeInput");
		const EXPECTED_RESULT_1 = "New order #2201";
		const EXPECTED_RESULT_2 = "New order #2202";
		const firstItem = await browser.$("#nli1");
		const btnListItemClose = await firstItem.shadow$("[close-btn]");

		// act
		await btnListItemClose.click();

		// assert
		assert.strictEqual(await closeInput.getProperty("value"), EXPECTED_RESULT_1,
			"The itemClose of list item has been fired.");

		// act
		await firstItem.click();
		await firstItem.keys("ArrowDown");
		await firstItem.keys("Delete");

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

		// act
		await firstItem.click();
		await firstItem.keys(["Enter", "Shift"]);

		const hightAfterKeys = await content.getSize("height");
		// assert
		assert.isAbove(hightAfter, hightAfterKeys,
			"The content has been collapsed by the Shift+Enter keyboard combination.");
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

	it("tests state", async () => {
		const secondItem = await browser.$("#nli2");
		const thirdItem = await browser.$("#nli3");
		const state2 = await secondItem.shadow$(".ui5-state-icon--message-warning").getAttribute("name");
		const state3 = await thirdItem.shadow$(".ui5-state-icon--message-error").getAttribute("name");

		assert.strictEqual(state2, "message-warning", "The 'Warning' state icon is correctly displayed.");
		assert.strictEqual(state3, "message-error", "The 'Error' state icon is correctly displayed.");

	});

	it("tests importance", async () => {
		const secondItem = await browser.$("#nli2");
		const thirdItem = await browser.$("#nli3");
		const importance2nd = await secondItem.shadow$(".ui5-nli-content-with-importance");
		const importance3rd = await thirdItem.shadow$(".ui5-nli-content-with-importance");

		assert.notOk(await importance2nd.isExisting(), "The importance label is not displayed in the second item.");
		assert.ok(await importance3rd.isExisting(), "The importance label is correctly displayed on the third item.");
	});

	it("tests menu", async () => {
		const firstItem = await browser.$("#nli1");
		const menuButton = await firstItem.shadow$(".ui5-nli-menu-btn");

		// act
		await menuButton.click();
		const menu1 = await firstItem.$("ui5-menu").hasAttribute("open");
		// assert
		assert.ok(await menu1, "There is open menu.");

		// act
		await firstItem.click();
		const menu2 = await firstItem.$("ui5-menu").hasAttribute("open");
		// assert
		assert.notOk(await menu2, "There is no menu.");

		// act
		await firstItem.click();
		await firstItem.keys(["F10", "Shift"]);
		const menu3 = await firstItem.$("ui5-menu").hasAttribute("open");
		// assert
		assert.ok(await menu3, "There is open menu with shift+F10.");

	});

	// Accessibility tests follows

	it("tests List Item ACC ariaLabelledBy and ariaDescribedBy", async () => {
		const firstItem = await browser.$("#nli1");
		const firstItemRoot = await firstItem.shadow$(".ui5-nli-root");

		const titleTextId = `${await firstItem.getProperty("_id")}-title-text`;
		const descriptionId = `${await firstItem.getProperty("_id")}-description`;
		const footerId = `${await firstItem.getProperty("_id")}-footer`;
		const invisibleTextId = `${await firstItem.getProperty("_id")}-invisibleText`;
		const EXPECTED_ARIA_LABELLED_BY = `${titleTextId} ${descriptionId} ${footerId}`;

		// assert
		assert.strictEqual(await firstItemRoot.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLED_BY,
			"The ariaLabelledBy text is correct.");
		assert.strictEqual(await firstItemRoot.getAttribute("aria-describedby"), invisibleTextId,
			"The ariaDescribedBy text is correct.");
	});

	it("tests List Item ACC invisible texts", async () => {
		const EXPECTED_RESULT_STATUS = "Status Negative";
		const EXPECTED_RESULT_ITEM = "notification unread";
		const firstItem = await browser.$("#nli1");
		const invisibleTextStatus = await firstItem.shadow$(".ui5-nli-root").$$(".ui5-hidden-text")[0];
		const invisibleTextItem = await firstItem.shadow$(".ui5-nli-root").$$(".ui5-hidden-text")[1];

		// assert
		assert.strictEqual((await invisibleTextStatus.getText()).toLowerCase(), EXPECTED_RESULT_STATUS.toLowerCase(), "The invisible text for the status is correct.");
		assert.strictEqual((await invisibleTextItem.getText()).toLowerCase(), EXPECTED_RESULT_ITEM.toLowerCase(), "The invisible text for the Notification item  is correct.");
	});

	it("tests Menu (actions / '...') button ACC attributes", async () => {
		const firstItem = await browser.$("#nli1");
		const menuButton = await firstItem.shadow$(".ui5-nli-menu-btn");

		// assert
		assert.strictEqual(await menuButton.getAttribute("tooltip"), 'Actions', "The tooltip text is correct.");
		assert.strictEqual(await menuButton.getAttribute("aria-haspopup"), 'menu', "The aria-haspopup text is correct.");
	});

	it("tests Group Header Button ACC attributes", async () => {
		const firstGroupButton = await browser.$("#nlgi1").shadow$(".ui5-nli-group-toggle-btn");
		const thirdGroupButton = await browser.$("#nlgi3").shadow$(".ui5-nli-group-toggle-btn");
		const firstGroupItem = await browser.$("#nlgi1");
		const titleTextId = `${await firstGroupItem.getProperty("_id")}-notificationsList`;

		assert.strictEqual(await firstGroupButton.getAttribute("aria-expanded"), 'true', "The aria-expanded for the first item is correct.");
		assert.strictEqual(await thirdGroupButton.getAttribute("aria-expanded"), 'false', "The aria-expanded for the third is correct.");
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

	it("tests Group Item aria-description", async () => {
		const firstGroupItemRoot = await browser.$("#nlgi1").shadow$(".ui5-nli-group-root");
		const EXPECTED_TEXT_1 = "Notification group Expanded";
		const thirdGroupItemRoot = await browser.$("#nlgi3").shadow$(".ui5-nli-group-root");
		const EXPECTED_TEXT_3 = "Notification group Collapsed";

		assert.strictEqual(await firstGroupItemRoot.getAttribute("aria-description"), EXPECTED_TEXT_1, "The aria-description text is correct.");
		assert.strictEqual(await thirdGroupItemRoot.getAttribute("aria-description"), EXPECTED_TEXT_3, "The aria-description text is correct.");
	});

	it("tests List Group Item Button aria-expanded, aria-controls, tooltip when collapsed and expanded", async () => {
		const groupItem2 = await browser.$("#nlgi2");
		const groupItemsList2ID = await groupItem2.shadow$(".ui5-nli-group-items").getAttribute("id");
		const groupItemToggleBtn2 = await groupItem2.shadow$(".ui5-nli-group-toggle-btn");

		// assert
		assert.strictEqual(await groupItemToggleBtn2.getAttribute("aria-expanded"), "true", "The aria-expanded value is correct.");
		assert.strictEqual(await groupItemToggleBtn2.getAttribute("aria-controls"), groupItemsList2ID, "The aria-controls value is correct.");
		assert.strictEqual(await groupItemToggleBtn2.getAttribute("tooltip"), "Collapse", "The tooltip value is correct.");

		// act
		await groupItemToggleBtn2.click();

		// assert
		assert.strictEqual(await groupItemToggleBtn2.getAttribute("aria-expanded"), "false", "The aria-expanded value is correct.");
		assert.strictEqual(await groupItemToggleBtn2.getAttribute("aria-controls"), groupItemsList2ID, "The aria-controls value is correct.");
		assert.strictEqual(await groupItemToggleBtn2.getAttribute("tooltip"), "Expand", "The tooltip value is correct.");

		// reset
		await groupItemToggleBtn2.click();
	});
});
