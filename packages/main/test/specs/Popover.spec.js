const assert = require('assert');

describe("Popover general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Popover.html");

	it("tests popover toggling", () => {
		const btnOpenPopover = $("#btnOpenPopover");
		const field = $("#field");

		btnOpenPopover.click();

		const popover = browser.findElementDeep("ui5-popover >>> .ui5-popover-wrapper");
		assert.ok(popover.isDisplayedInViewport(), "Popover is opened.");

		field.click();
		assert.ok(!popover.isDisplayedInViewport(), "Popover is closed.");
	});

	it("tests clicking inside the popover does not close it", () => {
		const btnOpenPopover = $("#btnOpenPopover");
		const btnInPopover = $("#btnInPopover");

		btnOpenPopover.click();

		const popover = browser.findElementDeep("ui5-popover >>> .ui5-popover-wrapper");
		assert.ok(popover.isDisplayedInViewport(), "Popover is opened.");

		btnInPopover.click();
		assert.ok(popover.isDisplayedInViewport(), "Popover remains opened.");
	});
});