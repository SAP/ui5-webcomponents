import { assert } from "chai";
const KEYS = {
	SHIFT: '\uE008',
	CTRL: '\uE009',
	ALT: '\uE00A',
	META: '\uE03D',
	ENTER: '\uE007',
}

describe("Breadcrumbs general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Breadcrumbs.html`);
	});

	it("tests getDomRef", async () => {
		const res = await browser.executeAsync(async (done) => {
			const breadCrumbsItemOutOfOverflow = document.getElementById("lastItemWithACCName");

			// act
			done({
				item: breadCrumbsItemOutOfOverflow,
				realDomRef: breadCrumbsItemOutOfOverflow.getDomRef(),
			});
		});

		// assert
		assert.strictEqual(res.item["_id"], res.realDomRef["_id"],
			"getDomRef corrcetly returns the matching ui5-link outside the overflow.");
	});

	it("fires link-click event", async () => {
		const breadcrumbs = await browser.$("#breadcrumbs1"),
			link = (await breadcrumbs.shadow$$("ui5-link"))[1];

		// Act
		await link.click();

		// Check
		const eventResult = await browser.$("#result");
		assert.isNotEmpty(await eventResult.getText(), 'label should have a value');
		assert.strictEqual(await eventResult.getText(), await link.getText(), "label for pressed link is correct");
	});

	it("fires link-click event when link in overflow", async () => {
		const breadcrumbs = await browser.$("#breadcrumbs1"),
			overflowArrowLink = (await breadcrumbs.shadow$$("ui5-link"))[0];


		// Act
		await overflowArrowLink.click(); // open the overflow

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#breadcrumbs1");
		const firstItem = (await browser.$(`.${staticAreaItemClassName}`).shadow$$("ui5-li"))[0];

		await firstItem.click();

		// Check
		const eventResult = await browser.$("#result");
		assert.isNotEmpty(await eventResult.getText(), 'label should have a value');
		assert.strictEqual(await eventResult.getText(), await firstItem.getProperty('innerText'), "label for pressed link is correct");
	});

	it("updates layout on container resize", async () => {
		const breadcrumbs = await browser.$("#breadcrumbs1"),
			shrinkContainerBtn = await browser.$("#shrinkSizeBtn"),
			countItemsInOverflowBefore = await breadcrumbs.getProperty("_overflowSize"),
			expectedCountLinksInOverflowAfter = countItemsInOverflowBefore + 1;

		// Act: shrink the breadcrumbs container
		// to cause one more item to overflow
		await shrinkContainerBtn.click();

		// Check links inside overflow
		assert.strictEqual(await breadcrumbs.getProperty("_overflowSize"), expectedCountLinksInOverflowAfter, "one link is added to the overflow");
	});

	it("updates layout on resize of content outside overflow", async () => {
		const breadcrumbs = await browser.$("#breadcrumbs1"),
			extendLinkTextBtn = await browser.$("#extendLinkTextBtn"),
			countItemsInOverflowBefore = await breadcrumbs.getProperty("_overflowSize"),
			expectedCountItemsInOverflowAfter = countItemsInOverflowBefore + 1;

		// Act:
		// extend the length of the last link,
		// so that it becomes too big to be rendered outside the overflow
		await extendLinkTextBtn.click();

		// Check
		assert.strictEqual(await breadcrumbs.getProperty("_overflowSize"), expectedCountItemsInOverflowAfter, "the link is added to the overflow");
	});

	it("updates layout on resize of content inside overflow", async () => {
		const breadcrumbs = await browser.$("#breadcrumbs1"),
			shortenLinkTextBtn = await browser.$("#shortenLinkTextBtn"),
			countItemsInOverflowBefore = await breadcrumbs.getProperty("_overflowSize"),
			expectedCountItemsInOverflowAfter = countItemsInOverflowBefore - 1;

		// Act:
		// shrink the length of the last link from the overflow,
		// to make it small enough => eligible to be moved outside the overflow
		await shortenLinkTextBtn.click();

		// Check
		assert.strictEqual(await breadcrumbs.getProperty("_overflowSize"), expectedCountItemsInOverflowAfter, "the link is taken out of the overflow");
	});

	it("updates layout when link content removed", async () => {
		const breadcrumbs = await browser.$("#breadcrumbs1"),
			shortenLinkTextBtn = await browser.$("#shortenLinkTextBtn");

		let	link = (await breadcrumbs.shadow$$("ui5-link"))[1];

		const linkId = await link.getProperty("id"),
			countItemsInOverflowBefore = await breadcrumbs.getProperty("_overflowSize"),
			expectedCountItemsInOverflowAfter = countItemsInOverflowBefore - 1;

		// Act:
		// shrink the length of the last link to make it empty
		await shortenLinkTextBtn.click();

		link = (await breadcrumbs.shadow$$("ui5-link"))[1];

		// Check: a link is taken out of the overflow, to fill the space left after removing
		assert.notEqual(await link.getProperty("id"), linkId, "another link is rendrered in the place of the empty item");
		assert.ok(await link.getText(), "the new link is non-empty");
		assert.strictEqual(await breadcrumbs.getProperty("_overflowSize"), expectedCountItemsInOverflowAfter, "a link is taken out of the overflow");
	});

	it("updates layout when content added to empty link", async () => {
		const breadcrumbs = await browser.$("#breadcrumbs1"),
			lastItem = await browser.$("#item7"),
			lastLinkId = (await lastItem.getProperty('_id')) + "-link",
			extendLinkTextBtn = await browser.$("#extendLinkTextBtn"),
			countItemsInOverflowBefore = await breadcrumbs.getProperty("_overflowSize"),
			expectedCountItemsInOverflowAfter = countItemsInOverflowBefore + 1;

		// Check initial state
		assert.strictEqual(await lastItem.getText(), "", "the item has no text");
		assert.strictEqual((await breadcrumbs.shadow$$("#" + lastLinkId)).length, 0, "the link for empty item is not rendered");

		// Act:
		// add text of the last link to make it non-empty
		await extendLinkTextBtn.click();

		// Check
		assert.strictEqual((await breadcrumbs.shadow$$("#" + lastLinkId)).length, 1, "the link for non-empty item is rendered");
		assert.strictEqual(await breadcrumbs.getProperty("_overflowSize"), expectedCountItemsInOverflowAfter, "a link is added to the overflow");
	});

	it("standard breadcrumb with single item shows location", async () => {
		const breadcrumbs = await browser.$("#breadcrumbsWithSingleItem"),
			label = (await breadcrumbs.shadow$("ui5-label"));

		// Check
		assert.strictEqual(await label.getText(), "Location", "label is displayed");
	});

	it("opens upon space", async () => {
		await browser.url(`test/pages/Breadcrumbs.html`);

		const externalElement = (await browser.$("#breadcrumbsWithAccName").shadow$$("ui5-link"))[3];
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#breadcrumbs1");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		await externalElement.click();
		await externalElement.keys("Tab");

		await browser.keys("Space");
		assert.ok(await popover.getProperty("opened"), "Dropdown is opened.");
	});

	it("toggles upon F4", async () => {
		await browser.url(`test/pages/Breadcrumbs.html`);

		const externalElement = (await browser.$("#breadcrumbsWithAccName").shadow$$("ui5-link"))[3];
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#breadcrumbs1");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		await externalElement.click();
		await externalElement.keys("Tab");

		await browser.keys("F4");
		assert.ok(await popover.getProperty("opened"), "Dropdown is opened.");

		await browser.keys("F4");
		assert.notOk(await popover.getProperty("opened"), "Dropdown is closed.");
	});

	it("toggles upon ALT + DOWN", async () => {
		await browser.url(`test/pages/Breadcrumbs.html`);

		const externalElement = (await browser.$("#breadcrumbsWithAccName").shadow$$("ui5-link"))[3];
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#breadcrumbs1");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		await externalElement.click();
		await externalElement.keys("Tab");

		await browser.keys(["Alt", "ArrowDown", "NULL"]);
		assert.ok(await popover.getProperty("opened"), "Dropdown is opened.");

		await browser.keys(["Alt", "ArrowDown", "NULL"]);
		assert.notOk(await popover.getProperty("opened"), "Dropdown is closed.");
	});

	it("renders accessible names of overflowing link items", async () => {
		await browser.url(`test/pages/Breadcrumbs.html`);

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#breadcrumbsWithAccName"),
			listItem = (await browser.$(`.${staticAreaItemClassName}`).shadow$$("ui5-li"))[1],
			expectedAriaLabel = "first link acc name";

		// Check
		assert.strictEqual(await listItem.getProperty("accessibleName"), expectedAriaLabel, "label for first link is correct");
	});

	it("renders accessible names of non-overflowing link items", async () => {
		const breadcrumbs = await browser.$("#breadcrumbsWithAccName"),
			link = (await breadcrumbs.shadow$$("ui5-link"))[3], // we take the last link, because the first overflow
			expectedAccessibleName = 'Link5 last link acc name 3 of 3';

		// Check
		assert.strictEqual(await link.getProperty("accessibleName"), expectedAccessibleName, "label for last link is correct");
	});

	it("cancels default if item-click event listener calls preventDefault", async () => {
		const breadcrumbs = await browser.$("#breadcrumbsPreventDefault"),
			link = (await breadcrumbs.shadow$$("ui5-link"))[1];

		const initialUrl = await browser.getUrl();

		// Act
		await link.click();

		// Check
		const eventResult = await browser.$("#result");
		const url = await browser.getUrl();
		assert.strictEqual(url, initialUrl, "url should not have changed");
		assert.strictEqual(await eventResult.getText(), await link.getText(), "label for pressed link is correct");
	});

	it("passes special keys pressed while item clicked", async () => {
		// CTRL key is skipped since there is default browser behavior where popover is opened.
		const breadcrumbs = await browser.$("#breadcrumbsPreventDefault"),
			link = (await breadcrumbs.shadow$$("ui5-link"))[1];
		let eventResult;

		// Setup for META Key
		await browser.performActions([{
			type: 'key',
			id: 'keyboard1',
			actions: [{ type: 'keyDown', value: KEYS.META }],
		  }]);
		// Action
		await link.click();
		await browser.releaseActions();
		// Check
		eventResult = await browser.$("#result");
		assert.strictEqual(await eventResult.getText(), 'META:' + await link.getText(), "label for pressed link is correct");

		// Setup for ALT Key
		await browser.performActions([{
			type: 'key',
			id: 'keyboard2',
			actions: [{ type: 'keyDown', value: KEYS.ALT }],
		  }]);
		// Action
		await link.click();
		await browser.releaseActions();
		// Check
		eventResult = await browser.$("#result");
		assert.strictEqual(await eventResult.getText(), 'ALT:' + await link.getText(), "label for pressed link is correct");

		// Setup for SHIFT Key
		await browser.performActions([{
			type: 'key',
			id: 'keyboard3',
			actions: [{ type: 'keyDown', value: KEYS.SHIFT }],
		  }]);
		// Action
		await link.click();
		await browser.releaseActions();
		// Check
		eventResult = await browser.$("#result");
		assert.strictEqual(await eventResult.getText(), 'SHIFT:' + await link.getText(), "label for pressed link is correct");
	});

	it("passes special keys pressed while item pressed with keyboard", async () => {
		const breadcrumbs = await browser.$("#breadcrumbsPreventDefault"),
			link = (await breadcrumbs.shadow$$("ui5-link"))[1];

		// Setup for META Key
		await browser.performActions([{
			type: 'key',
			id: 'keyboard1',
			actions: [
				{ type: 'keyDown', value: KEYS.META },
				{ type: 'keyDown', value: KEYS.ENTER }
			],
		  }]);
		// Action
		await link.click();
		await browser.releaseActions();
		// Check
		let eventResult = await browser.$("#result");
		assert.strictEqual(await eventResult.getText(), 'META:' + await link.getText(), "label for pressed link is correct");

		// Setup for ALT Key
		await browser.performActions([{
			type: 'key',
			id: 'keyboard2',
			actions: [
				{ type: 'keyDown', value: KEYS.ALT },
				{ type: 'keyDown', value: KEYS.ENTER }
			],
		  }]);
		// Action
		await link.click();
		await browser.releaseActions();
		// Check
		eventResult = await browser.$("#result");
		assert.strictEqual(await eventResult.getText(), 'ALT:' + await link.getText(), "label for pressed link is correct");

		// Setup for SHIFT Key
		await browser.performActions([{
			type: 'key',
			id: 'keyboard3',
			actions: [
				{ type: 'keyDown', value: KEYS.SHIFT },
				{ type: 'keyDown', value: KEYS.ENTER }
			],
		  }]);
		// Action
		await link.click();
		await browser.releaseActions();
		// Check
		eventResult = await browser.$("#result");
		assert.strictEqual(await eventResult.getText(), 'SHIFT:' + await link.getText(), "label for pressed link is correct");

		// Setup for CTRL Key
		await browser.performActions([{
			type: 'key',
			id: 'keyboard3',
			actions: [
				{ type: 'keyDown', value: KEYS.CTRL },
				{ type: 'keyDown', value: KEYS.ENTER }
			],
		  }]);
		// Action
		await link.click();
		await browser.releaseActions();
		// Check
		eventResult = await browser.$("#result");
		assert.strictEqual(await eventResult.getText(), 'CTRL:' + await link.getText(), "label for pressed link is correct");
	});

});
