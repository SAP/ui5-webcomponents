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
