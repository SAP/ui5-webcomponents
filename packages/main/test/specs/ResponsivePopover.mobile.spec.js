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
		const btnOpenPopover = await browser.$("#btnOpenAccRole");

		await btnOpenPopover.click();

		const popover = await browser.$("#respPopoverRole");
		const dialog = await popover.shadow$("ui5-dialog");
		assert.ok(await dialog.shadow$("[role=testRole]"), "The correct custom role is applied.");
	});
});