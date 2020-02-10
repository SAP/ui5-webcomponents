const assert = require("chai").assert;

describe("ResponsivePopover general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/ResponsivePopover.html");

	it("header and footer are displayed by default", () => {
		const btnOpenPopover = $("#btnOpen");
		const field = $("#field");

		btnOpenPopover.click();
		
		const popover = browser.$("#respPopover");
		const header = popover.shadow$(".ui5-popover-header-root");

		assert.ok(popover.isDisplayedInViewport(), "ResponsivePopover is opened.");
		assert.ok(header.isExisting(), "Header is displayed.");

		field.click();
		assert.ok(!popover.isDisplayedInViewport(), "ResponsivePopover is closed.");
	});

	it("header and footer are hidden on desktop", () => {
		const btnOpenPopover = $("#btnOpen3");
		const field = $("#field");

		btnOpenPopover.click();

		const popover = browser.$("#respPopover3");
		const header = popover.shadow$(".ui5-popover-header-root");

		assert.ok(popover.isDisplayedInViewport(), "ResponsivePopover is opened.");
		assert.ok(!header.isExisting(), "Header is not displayed.");

		field.click();
		assert.ok(!popover.isDisplayedInViewport(), "ResponsivePopover remains opened.");
	});
});
