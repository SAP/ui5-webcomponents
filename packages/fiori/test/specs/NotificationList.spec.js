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
		const btnListGroupItemToggle = await firstGroupItem.shadow$(".ui5-nli-group-header");

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
		const firstItem = await browser.$("#nli3a");
		const btnListItemShowMore = await firstItem.shadow$("[showMore-btn]");
		const content = await firstItem.shadow$(".ui5-nli-content");
		const title = await firstItem.shadow$(".ui5-nli-title-text");

		const hightBeforeContent = await content.getSize("height");
		const hightBeforeTitle = await title.getSize("height");

		// act
		await btnListItemShowMore.click();

		const hightAfterContent = await content.getSize("height");
		const hightAfterTitle = await title.getSize("height");

		// assert
		assert.isAbove(hightAfterContent, hightBeforeContent,
			"The content has been expanded by the ShowMore button.");
		assert.isAbove(hightAfterTitle, hightBeforeTitle,
			"The title has been expanded by the ShowMore button.");

		// act
		await firstItem.click();
		await firstItem.keys(["Enter", "Shift"]);

		const hightAfterKeysContent = await content.getSize("height");
		const hightAfterKeysTitle = await title.getSize("height");
		// assert
		assert.isAbove(hightAfterContent, hightAfterKeysContent,
			"The content has been collapsed by the Shift+Enter keyboard combination.");
		assert.isAbove(hightAfterTitle, hightAfterKeysTitle,
			"The title has been collapsed by the Shift+Enter keyboard combination.");
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
		assert.strictEqual(await firstItemRoot.getAttribute("aria-level"), "2",
			"The ariaLevel text is correct.");
			
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
		const menuButton = await firstItem.shadow$(".ui5-nli-menu-btn").shadow$("button");
		const thirdItem = await browser.$("#nli3");
		const btnListItemMenu3 = await thirdItem.shadow$(".ui5-nli-menu-btn");

		// assert
		assert.strictEqual(await menuButton.getAttribute("title"), 'Actions', "The tooltip text is correct.");
		assert.strictEqual(await menuButton.getAttribute("aria-haspopup"), 'menu', "The aria-haspopup text is correct.");

		assert.notOk(await btnListItemMenu3.isExisting(), "There is no '...' button rendered");
	});

	it("tests List Item 'Close' button ACC attributes", async () => {
		const firstItem = await browser.$("#nli1");
		const btnListItemClose1 = await firstItem.shadow$("[close-btn]").shadow$("button");
		const thirdItem = await browser.$("#nli3");
		const btnListItemClose3 = await thirdItem.shadow$("[close-btn]");

		assert.strictEqual(await btnListItemClose1.getAttribute("aria-label"), 'Close', "The aria-label is correct.");
		assert.strictEqual(await btnListItemClose1.getAttribute("title"), 'Close', "The title is correct.");
		assert.strictEqual(await btnListItemClose1.getAttribute("role"), 'button', "The role is correct.");

		assert.notOk(await btnListItemClose3.isExisting(), "There is no 'Close' button rendered");

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

	it("tests Group Item 'aria-description' and 'aria-level'", async () => {
		const firstGroupItemRoot = await browser.$("#nlgi1").shadow$(".ui5-nli-group-root");
		const EXPECTED_TEXT_1 = "Notification group Expanded";
		const thirdGroupItemRoot = await browser.$("#nlgi3").shadow$(".ui5-nli-group-root");
		const EXPECTED_TEXT_3 = "Notification group Collapsed";

		assert.strictEqual(await firstGroupItemRoot.getAttribute("aria-description"), EXPECTED_TEXT_1, "The aria-description text is correct.");
		assert.strictEqual(await thirdGroupItemRoot.getAttribute("aria-description"), EXPECTED_TEXT_3, "The aria-description text is correct.");
		assert.strictEqual(await firstGroupItemRoot.getAttribute("aria-level"), "1", "The aria-level is correct.");
	});

	it("tests List Group Header ACC attributes when collapsed and expanded", async () => {
		const groupItem2 = await browser.$("#nlgi2");
		const groupItemsList2ID = await groupItem2.shadow$(".ui5-nli-group-items").getAttribute("id");
		const groupItemHeader = await groupItem2.shadow$(".ui5-nli-group-header");
		const groupItemHeaderIcon = await groupItem2.shadow$(".ui5-nli-group-toggle-icon").shadow$("svg");

		// assert
		assert.strictEqual(await groupItemHeader.getAttribute("aria-expanded"), "true", "The aria-expanded value is correct.");
		assert.strictEqual(await groupItemHeader.getAttribute("aria-controls"), groupItemsList2ID, "The aria-controls value is correct.");
		assert.strictEqual(await groupItemHeader.getAttribute("role"), "button", "The tooltip value is correct.");
		assert.strictEqual(await groupItemHeaderIcon.getAttribute("aria-label"), "collapse arrow", "The aria-label of the icon is correct.");
		assert.strictEqual(await groupItemHeaderIcon.getAttribute("aria-hidden"), "true", "The aria-hidden of the icon is correct.");

		// act
		await groupItemHeader.click();

		// assert
		assert.strictEqual(await groupItemHeader.getAttribute("aria-expanded"), "false", "The aria-expanded value is correct.");
		assert.strictEqual(await groupItemHeader.getAttribute("aria-controls"), groupItemsList2ID, "The aria-controls value is correct.");
		assert.strictEqual(await groupItemHeader.getAttribute("role"), "button", "The tooltip value is correct.");
		assert.strictEqual(await groupItemHeaderIcon.getAttribute("aria-label"), "expand arrow", "The aria-label of the icon is correct.");
		assert.strictEqual(await groupItemHeaderIcon.getAttribute("aria-hidden"), "true", "The aria-hidden of the icon is correct.");

		// reset
		await groupItemHeader.click();
	});
});
