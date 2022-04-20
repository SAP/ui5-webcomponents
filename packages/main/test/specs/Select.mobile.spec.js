const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Select mobile general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Select.html`);
		await browser.emulateDevice('iPhone X');
	});

	it("Changes selection in Dialog", async () => {
		const select = await browser.$("#mySelect");
		select.click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mySelect");
		const firstListItem = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-li:first-child");
		firstListItem.click();

		const selectText = await select.shadow$(".ui5-select-label-root");
		const selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, "Cozy", "The first item selected via the dialog on mobile");
	});
});
