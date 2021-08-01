const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Breadcrumbs general interaction", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Breadcrumbs.html`);
	});

	it("fires link-click event", () => {
		const breadcrumbs = $("#breadcrumbs1"),
			link = breadcrumbs.shadow$$("ui5-link")[1];

		// Act
		link.click();

		// Check
		const eventResult = browser.$("#result");
		assert.strictEqual(eventResult.innerText, link.innerText, "label for pressed link is correct");
	});

	it("fires link-click event when link in overflow", () => {
		const breadcrumbs = $("#breadcrumbs1"),
			overflowArrowLink = breadcrumbs.shadow$$("ui5-link")[0],
			link = breadcrumbs.shadow$$("ui5-link")[1];


		// Act
		overflowArrowLink.click(); // open the overflow

		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#breadcrumbs1");
		const firstItem = browser.$(`.${staticAreaItemClassName}`).shadow$$("ui5-li")[0];

		firstItem.click();

		// Check
		const eventResult = browser.$("#result");
		assert.strictEqual(eventResult.innerText, link.innerText, "label for pressed link is correct");
	});

	it("updates layout on container resize", () => {
		const breadcrumbs = $("#breadcrumbs1"),
			shrinkContainerBtn = $("#shrinkSizeBtn"),
			countItemsInOverflowBefore = breadcrumbs.getProperty("_overflowSize"),
			expectedCountLinksInOverflowAfter = countItemsInOverflowBefore + 1;

		// Act: shrink the breadcrumbs container
		// to cause one more item to overflow
		shrinkContainerBtn.click();

		// Check links inside overflow
		assert.strictEqual(breadcrumbs.getProperty("_overflowSize"), expectedCountLinksInOverflowAfter, "one link is added to the overflow");
	});

	it("updates layout on resize of content outside overflow", () => {
		const breadcrumbs = $("#breadcrumbs1"),
			extendLinkTextBtn = $("#extendLinkTextBtn"),
			countItemsInOverflowBefore = breadcrumbs.getProperty("_overflowSize"),
			expectedCountItemsInOverflowAfter = countItemsInOverflowBefore + 1;

		// Act:
		// extend the length of the last link,
		// so that it becomes too big to be rendered outside the overflow
		extendLinkTextBtn.click();

		// Check
		assert.strictEqual(breadcrumbs.getProperty("_overflowSize"), expectedCountItemsInOverflowAfter, "the link is added to the overflow");
	});

	it("updates layout on resize of content inside overflow", () => {
		const breadcrumbs = $("#breadcrumbs1"),
			shortenLinkTextBtn = $("#shortenLinkTextBtn"),
			countItemsInOverflowBefore = breadcrumbs.getProperty("_overflowSize"),
			expectedCountItemsInOverflowAfter = countItemsInOverflowBefore - 1;

		// Act: 
		// shrink the length of the last link from the overflow,
		// to make it small enough => eligible to be moved outside the overflow
		shortenLinkTextBtn.click();

		// Check
		assert.strictEqual(breadcrumbs.getProperty("_overflowSize"), expectedCountItemsInOverflowAfter, "the link is taken out of the overflow");
	});

	it("updates layout when link content removed", () => {
		const breadcrumbs = $("#breadcrumbs1"),
			shortenLinkTextBtn = $("#shortenLinkTextBtn"),
			link = breadcrumbs.shadow$$("ui5-link")[1],
			linkId = link.getProperty("id"),
			countItemsInOverflowBefore = breadcrumbs.getProperty("_overflowSize"),
			expectedCountItemsInOverflowAfter = countItemsInOverflowBefore - 1;

		// Act: 
		// shrink the length of the last link to make it empty
		shortenLinkTextBtn.click();

		// Check: a link is taken out of the overflow, to fill the space left after removing 
		assert.notEqual(link.getProperty("id"), linkId, "another link is rendrered in the place of the empty item");
		assert.ok(link.getText(), "the new link is non-empty");
		assert.strictEqual(breadcrumbs.getProperty("_overflowSize"), expectedCountItemsInOverflowAfter, "a link is taken out of the overflow");
	});

	it("updates layout when content added to empty link", () => {
		const breadcrumbs = $("#breadcrumbs1"),
		lastItem = $("#item7"),
		lastLinkId = lastItem.getProperty('_id') + "-link",
		extendLinkTextBtn = $("#extendLinkTextBtn"),
		countItemsInOverflowBefore = breadcrumbs.getProperty("_overflowSize"),
		expectedCountItemsInOverflowAfter = countItemsInOverflowBefore + 1;

		// Check initial state
		assert.strictEqual(lastItem.getText(), "", "the item has no text");
		assert.strictEqual(breadcrumbs.shadow$$("#" + lastLinkId).length, 0, "the link for empty item is not rendered");

		// Act: 
		// add text of the last link to make it non-empty
		extendLinkTextBtn.click();

		// Check
		assert.strictEqual(breadcrumbs.shadow$$("#" + lastLinkId).length, 1, "the link for non-empty item is rendered");
		assert.strictEqual(breadcrumbs.getProperty("_overflowSize"), expectedCountItemsInOverflowAfter, "a link is added to the overflow");
	}); 

	it("opens upon space", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Breadcrumbs.html`);

		const externalElement = $("#breadcrumbsWithAccName").shadow$$("ui5-link")[3];
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#breadcrumbs1");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		externalElement.click();
		externalElement.keys("Tab");

		browser.keys("Space");
		assert.ok(popover.getProperty("opened"), "Dropdown is opened.");
	});

	it("toggles upon F4", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Breadcrumbs.html`);

		const externalElement = $("#breadcrumbsWithAccName").shadow$$("ui5-link")[3];
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#breadcrumbs1");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		externalElement.click();
		externalElement.keys("Tab");

		browser.keys("F4");
		assert.ok(popover.getProperty("opened"), "Dropdown is opened.");

		browser.keys("F4");
		assert.ok(!popover.getProperty("opened"), "Dropdown is closed.");
	});

	it("toggles upon ALT + DOWN", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Breadcrumbs.html`);

		const externalElement = $("#breadcrumbsWithAccName").shadow$$("ui5-link")[3];
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#breadcrumbs1");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		externalElement.click();
		externalElement.keys("Tab");

		browser.keys(["Alt", "ArrowDown", "NULL"]);
		assert.ok(popover.getProperty("opened"), "Dropdown is opened.");

		browser.keys(["Alt", "ArrowDown", "NULL"]);
		assert.ok(!popover.getProperty("opened"), "Dropdown is closed.");
	});

	it("renders accessible names of overflowing link items", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Breadcrumbs.html`);

		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#breadcrumbsWithAccName"),
			listItem = browser.$(`.${staticAreaItemClassName}`).shadow$$("ui5-li")[1],
			expectedAriaLabel = "first link acc name";

		// Check
		assert.strictEqual(listItem.getProperty("accessibleName"), expectedAriaLabel, "label for first link is correct");
	});

	it("renders accessible names of non-overflowing link items", () => {
		const breadcrumbs = $("#breadcrumbsWithAccName"),
			link = breadcrumbs.shadow$$("ui5-link")[3],
			expectedAriaLabel = "last link acc name";

		// Check
		assert.strictEqual(link.getProperty("ariaLabel"), expectedAriaLabel, "label for last link is correct");
	});
});
