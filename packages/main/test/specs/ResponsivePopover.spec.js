const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("ResponsivePopover general interaction", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ResponsivePopover.html`);
	});

	it("header and footer are displayed by default", () => {
		const btnOpenPopover = $("#btnOpen");
		const btnClosePopover = $("#btnClose");

		btnOpenPopover.click();

		const popover = browser.$("#respPopover");
		const header = popover.shadow$(".ui5-popup-header-root");

		assert.ok(popover.isDisplayedInViewport(), "ResponsivePopover is opened.");
		assert.ok(header.isExisting(), "Header is displayed.");

		btnClosePopover.click();
		assert.ok(!popover.isDisplayedInViewport(), "ResponsivePopover is closed.");
	});

	it("header and footer are hidden on desktop", () => {
		const btnOpenPopover = $("#btnOpen3");

		btnOpenPopover.click();

		const popover = browser.$("#respPopover3");
		const header = popover.shadow$(".ui5-popup-header-root");

		assert.ok(popover.isDisplayedInViewport(), "ResponsivePopover is opened.");
		assert.ok(!header.isExisting(), "Header is not displayed.");
	});
});
