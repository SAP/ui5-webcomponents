const assert = require("chai").assert;

describe("ResponsivePopover general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/ResponsivePopover.html");

	it("header and footer are displayed by default", () => {
		const btnOpenPopover = $("#btnOpen");
		const btnClosePopover = $("#btnClose");

		btnOpenPopover.click();
		
		const rpo = browser.$("#respPopover")
		const popover = rpo.shadow$("ui5-popover");
		const header = popover.shadow$(".ui5-popup-header-root");

		assert.ok(popover.isDisplayedInViewport(), "ResponsivePopover is opened.");
		assert.ok(header.isExisting(), "Header is displayed.");

		btnClosePopover.click();
		assert.ok(!popover.isDisplayedInViewport(), "ResponsivePopover is closed.");
	});

	it("header and footer are hidden on desktop", () => {
		const btnOpenPopover = $("#btnOpen3");
		btnOpenPopover.click();

		const rpo = browser.$("#respPopover3");
		const popover = rpo.shadow$("ui5-popover");
		const header = rpo.shadow$(`slot[name="header"]`);

		assert.ok(popover.isDisplayedInViewport(), "ResponsivePopover is opened.");
		assert.ok(!header.isExisting(), "Header is not displayed.");
	});
});
