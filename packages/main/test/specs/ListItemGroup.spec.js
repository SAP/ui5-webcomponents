import { assert } from "chai";

describe("ListItemGroup Tests", () => {
	before(async () => {
		await browser.url(`test/pages/List_test_page.html`);
	});

	it("ListGroup is rendered", async () => {
		const listItemGroup = await browser.$("#list1 [ui5-li-group]");
		const listItemGroupHeader = await listItemGroup.shadow$("ui5-li-group-header");

		assert.ok(listItemGroup.isExisting(), true, "ListGroup is rendered");
		assert.ok(listItemGroupHeader.isExisting(), true, "ListGroup header is rendered");
	});

	it("ListGroup renders header-text property correctly", async () => {
		const listItemGroup = await browser.$("#list1 [ui5-li-group]");
		const listItemGroupHeader = await listItemGroup.shadow$("ui5-li-group-header");

		assert.strictEqual(await listItemGroupHeader.getText(), "New Items", "List's group header is correctly displayed");
	});

	it("ListGroup propagates focused property to header item", async () => {
		const listItemGroup = await browser.$("#list1 [ui5-li-group]");
		const listItemGroupHeader = await listItemGroup.shadow$("ui5-li-group-header");

		await listItemGroup.setProperty("focused", true);
		assert.strictEqual(await listItemGroupHeader.getProperty("focused"), true, "List's group header is focused");
		await listItemGroup.setProperty("focused", false);
	});
});