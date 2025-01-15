import { assert } from "chai";

describe("Toolbar general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Toolbar.html`);
	});

	it("Should move button with alwaysOverflow priority to overflow popover", async () => {

		const otb = await browser.$("#otb_d");

		const overflowButton = await otb.shadow$(".ui5-tb-overflow-btn");

		await overflowButton.click();
		const popover = await otb.shadow$("ui5-popover");

		assert.strictEqual(await popover.getAttribute("open"), 'true', "overflow popover created and opened, because of 'always overflow' item is inside");

		const employee_button = await popover.$(`[data-ui5-stable="tb-button-employee-d"]`);
		assert.ok(await employee_button.hasClass("ui5-tb-popover-item"), "'Employee' button is moved in overflow popover since it has 'Always' priority");
	});

	it("Should open popover when pressing overflow button", async () => {
		await browser.setWindowSize(500, 1080);
		const otb = await browser.$("#otb_a");
		const overflowButton = await otb.shadow$(".ui5-tb-overflow-btn");

		await overflowButton.click();

		const popover = await otb.shadow$("ui5-popover");
		assert.strictEqual(await popover.getAttribute("open"), 'true', "overflow popover created and opened on click on overflow button");
		await browser.setWindowSize(1920, 1080);
	});

	it("Should not move button with neverOverflow priority to overflow popover", async () => {
		const otb = await browser.$("#otb_c");

		await browser.setWindowSize(100, 1080);

		const overflowButton = await otb.shadow$(".ui5-tb-overflow-btn");
		assert.strictEqual(await overflowButton.isDisplayed(), false, "Overflow button is not rendered, because all elements has priority 'Never'");
		await browser.setWindowSize(1920, 1080);
	});

	it("Should render ui5-button by toolbar template, when slotting ui5-toolbar-button elements", async () => {
		const otb = await browser.$("#otb_c");
		const declineButton = await otb.shadow$(`[data-ui5-stable="tb-button-decline"]`);

		assert.strictEqual(await declineButton.getTagName(), "ui5-button", false, "Toolbar button is properly rendered");
	});

	it("Should properly prevent the closing of the overflow menu when preventClosing = true", async () => {
		const toolbar = await browser.$("#testEventpreventClosing-toolbar")
		const overflowButton = await toolbar.shadow$(".ui5-tb-overflow-btn");
		const popover = await toolbar.shadow$(".ui5-overflow-popover");
		const select = await toolbar.shadow$("[ui5-select]");

		await overflowButton.click();
		await select.click();

		assert.strictEqual(await popover.getProperty("open"), true, "Popover is opened");
	});

	it("Should call child events only once", async () => {
		const toolbar = await browser.$("#clickCountToolbar");
		const countButton = await toolbar.shadow$("#clickCounter");
		const input = await browser.$("#input");

		await input.setAttribute("value", "0");
		await countButton.click();

		assert.strictEqual(await input.getProperty("value"), "1", "Button click event only called once");
		await input.setAttribute("value", "0");
	});
});
