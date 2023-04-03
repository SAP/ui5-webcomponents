import { assert } from "chai";

describe("ResponsivePopover general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/ResponsivePopover.html`);
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

	it("Initial focus NOT prevented", async () => {
		const btnOpenPopover = await browser.$("#btnInitialFocus");
		await btnOpenPopover.click();

		const activeElementId = await browser.$(await browser.getActiveElement()).getAttribute("id");
		assert.strictEqual(activeElementId, "simpleRPInitialFocus", "Initial focus is not prevented");
	});

	it("Initial focus prevented", async () => {
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
});

describe("Acc", () => {
	before(async () => {
		await browser.url(`test/pages/ResponsivePopover.html`);
	});

	it("tests accessible-role", async () => {
		const respPopover = await browser.$("#respPopover");

		assert.strictEqual(await respPopover.shadow$(".ui5-popup-root").getAttribute("role"), "dialog","The default role is applied.");
		assert.strictEqual(await respPopover.shadow$(".ui5-popup-root").getAttribute("aria-modal"), "true", "aria-modal=true is applied.");

		const respPopoverAlertRole = await browser.$("#rPAlertRole");

		assert.strictEqual(await respPopoverAlertRole.shadow$(".ui5-popup-root").getAttribute("role"), "alertdialog", "role='alertdialog' is applied.");
		assert.strictEqual(await respPopoverAlertRole.shadow$(".ui5-popup-root").getAttribute("aria-modal"), "true", "aria-modal=true is applied.");

		const respPopoverNoneRole = await browser.$("#rPNoneRole");

		assert.notOk(await respPopoverNoneRole.shadow$(".ui5-popup-root").getAttribute("role"), "role is not set.");
		assert.notOk(await respPopoverNoneRole.shadow$(".ui5-popup-root").getAttribute("aria-modal"), "aria-modal not set.");
	});
});