const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("ResponsivePopover general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ResponsivePopover.html`);
	});

	it("header and footer are displayed by default", async () => {
		const btnOpenPopover = await browser.$("#btnOpen");
		const btnClosePopover = await browser.$("#btnClose");

		await btnOpenPopover.click();

		const popover = await browser.$("#respPopover");
		const header = await popover.shadow$(".ui5-popup-header-root");

		assert.ok(await popover.isDisplayedInViewport(), "ResponsivePopover is opened.");
		assert.ok(await header.isExisting(), "Header is displayed.");

		await btnClosePopover.click();
		assert.notOk(await popover.isDisplayedInViewport(), "ResponsivePopover is closed.");
	});

	it("header and footer are hidden on desktop", async () => {
		const btnOpenPopover = await browser.$("#btnOpen3");

		await btnOpenPopover.click();

		const popover = await browser.$("#respPopover3");
		const header = await popover.shadow$(".ui5-popup-header-root");

		assert.ok(await popover.isDisplayedInViewport(), "ResponsivePopover is opened.");
		assert.notOk(await header.isExisting(), "Header is not displayed.");
	});

	it("Initial focus prevented", async () => {
		const btnOpenPopover = await browser.$("#btnInitialFocus");
		await btnOpenPopover.click();

		const activeElementId = await browser.$(await browser.getActiveElement()).getAttribute("id");
		assert.strictEqual(activeElementId, "simpleRPInitialFocus", "Initial focus is not prevented");
	});

	it("Initial focus not prevented", async () => {
		const btnOpenPopover = await browser.$("#btnInitialFocusPrevented");
		await btnOpenPopover.click();

		const activeElementId = await browser.$(await browser.getActiveElement()).getAttribute("id");
		assert.strictEqual(activeElementId, "btnInitialFocusPrevented", "Initial focus is prevented");
	});

	it("tests popover toggling with 'open' attribute", async () => {
		const btnOpenPopover = await browser.$("#btnOpenWithAttr");
		const btnCloseWithAttr = await browser.$("#btnCloseWithAttr");

		await btnOpenPopover.click();

		const popover = await browser.$("#popoverAttr");
		assert.ok(await popover.isDisplayedInViewport(), "Popover is opened.");

		await btnCloseWithAttr.click();
		assert.notOk(await popover.isDisplayedInViewport(), "Popover is closed.");
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
