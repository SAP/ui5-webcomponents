const assert = require("chai").assert;

describe("ResponsivePopover mobile general interaction", () => {
	before(async () => {
		await browser.emulateDevice('iPhone X');
		await browser.url(`test/pages/ResponsivePopover.html`);
	});

	it("tests opening a popover from a responsive popover", async () => {
		const btnOpenRP = await browser.$("#btnRpWithPopover");

		await btnOpenRP.click();

		const btnOpenPopover = await browser.$("#btnRpWithPopoverOpener");
		await btnOpenPopover.click();

		const popover = await browser.$("#btnRpWithPopoverInnerPopover");
		assert.ok(await popover.isDisplayedInViewport(), "Popover is opened.");
	});
});

describe("Acc", () => {
	before(async () => {
		await browser.emulateDevice('iPhone X');
		await browser.url(`test/pages/ResponsivePopover.html`);
	});

	it("tests accessible-role", async () => {
		const respPopover = await browser.$("#respPopover");

		assert.ok(await respPopover.shadow$("[role=dialog]"), "The default role is applied.");
		assert.ok(await respPopover.shadow$("[aria-modal=true]"), "aria-modal=true is applied.");

		const respPopoverAlertRole = await browser.$("#rPAlertRole");

		assert.ok(await respPopoverAlertRole.shadow$("[role=alertdialog]"), "role='alertdialog' is applied.");
		assert.ok(await respPopoverAlertRole.shadow$("[aria-modal=true]"), "aria-modal=true is applied.");

		const respPopoverNoneRole = await browser.$("#rPNoneRole");

		assert.notOk(await respPopoverNoneRole.shadow$("[ui5-dialog]").shadow$(".ui5-popup-root").getAttribute("role"), "role is not set.");
		assert.notOk(await respPopoverNoneRole.shadow$("[ui5-dialog]").shadow$(".ui5-popup-root").getAttribute("aria-modal"), "aria-modal not set.");
	});
});