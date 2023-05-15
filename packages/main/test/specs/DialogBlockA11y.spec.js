import { assert } from "chai";

describe("Acc", () => {
	before(async () => {
		await browser.url(`test/pages/Dialog.html`);
	});

	it("tests aria-labelledby and aria-label", async () => {
		const dialog = await browser.$("ui5-dialog");
		await dialog.removeAttribute("accessible-name");
		assert.ok(await dialog.shadow$(".ui5-popup-root").getAttribute("aria-labelledby"), "dialog has aria-labelledby.");
		assert.notOk(await dialog.shadow$(".ui5-popup-root").getAttribute("aria-label"), "dialog does not have aria-label.");

		await dialog.setAttribute("accessible-name", "text");
		assert.notOk(await dialog.shadow$(".ui5-popup-root").getAttribute("aria-labelledby"), "dialog does not have aria-labelledby.");
		assert.ok(await dialog.shadow$(".ui5-popup-root").getAttribute("aria-label"), "dialog has aria-label.");
	});

	it("tests aria-labelledby for slot header", async () => {
		const openDraggableDialog = await browser.$("#draggable-open");
		await openDraggableDialog.click();

		const dialog = await browser.$("#draggable-dialog");
		const accName = "Draggable" ;

		assert.strictEqual(await dialog.getAttribute("accessible-name"), accName, "dialog has correct attribute set");
		assert.strictEqual(await dialog.shadow$(".ui5-popup-root").getAttribute("aria-label"), accName, "dialog has aria-label.");
	});

	it("tests accessible-name-ref", async () => {
		const dialog = await browser.$("#dialog-acc-name-ref");
		const expectedText = await browser.$("#label-acc-name-ref").getText();

		assert.strictEqual(await dialog.shadow$(".ui5-popup-root").getAttribute("aria-label"), expectedText, "aria-label should be the text of the label.");
	});

	it("tests role and aria-modal", async () => {
		const dialog1 = await browser.$("#dialog");

		assert.strictEqual(await dialog1.shadow$(".ui5-popup-root").getAttribute("role"), "dialog", "role='dialog' is set");
		assert.strictEqual(await dialog1.shadow$(".ui5-popup-root").getAttribute("aria-modal"), "true", "aria-modal='true' is set");

		const dialog2 = await browser.$("#dialog-error-no-role");

		assert.strictEqual(await dialog2.shadow$(".ui5-popup-root").getAttribute("role"), "alertdialog", "role='alertdialog' is set");
		assert.strictEqual(await dialog2.shadow$(".ui5-popup-root").getAttribute("aria-modal"), "true", "aria-modal='true' is set");

		const dialog3 = await browser.$("#dialog-no-state-alert-role");

		assert.strictEqual(await dialog3.shadow$(".ui5-popup-root").getAttribute("role"), "alertdialog", "role='alertdialog' is set");
		assert.strictEqual(await dialog3.shadow$(".ui5-popup-root").getAttribute("aria-modal"), "true", "aria-modal='true' is set");

		const dialog4 = await browser.$("#dialog-none-role");

		assert.notOk(await dialog4.shadow$(".ui5-popup-root").getAttribute("role"),  "role is not set");
		assert.notOk(await dialog4.shadow$(".ui5-popup-root").getAttribute("aria-modal"), "aria-modal is not set");

		const dialog5 = await browser.$("#dialog-success-state-alert-role");

		assert.strictEqual(await dialog5.shadow$(".ui5-popup-root").getAttribute("role"), "alertdialog", "role='alertdialog' is set");
		assert.strictEqual(await dialog5.shadow$(".ui5-popup-root").getAttribute("aria-modal"), "true", "aria-modal='true' is set");
	});
});
