const assert = require("chai").assert;


describe("Button general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/OverflowToolbar.html");

	it("Overflow toolbar is rendered", () => {
		const rootElement = browser.$("#overflowtoolbar1").shadow$(".ui5-overflow-toolbar-root");

		assert.ok(rootElement, "Overflow Toolbar is rendered");
	});

	it("Overflow is working", () => {
		browser.setWindowSize(880, 1080);

		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#overflowtoolbar1");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

		assert.strictEqual(popover.$$("ui5-button").length, 1, "Overflow Toolbar is rendered");
	});

	it("Overflow is working 2", () => {
		browser.setWindowSize(830, 1080);

		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#overflowtoolbar1");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

		assert.strictEqual(popover.$$("ui5-button").length, 2, "Overflow is working");
	});

	it("Overflow is working 3", () => {
		browser.setWindowSize(780, 1080);

		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#overflowtoolbar1");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

		assert.strictEqual(popover.$$("ui5-button").length, 3, "Overflow is working");
	});

	it("Overflow is working 4", () => {
		browser.setWindowSize(720, 1080);

		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#overflowtoolbar1");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

		assert.strictEqual(popover.$$("ui5-button").length, 4, "Overflow is working");
	});

	it("Events are working", () => {
		browser.setWindowSize(720, 1080);

		const popoverToggleButton = browser.$("#overflowtoolbar1").shadow$("ui5-button");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#overflowtoolbar1");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");
		const overflowedButton = popover.$("ui5-button");
		const resultInput = browser.$("#result");

		popoverToggleButton.click(); // Open popover

		overflowedButton.click(); // Click the button

		assert.strictEqual(resultInput.getValue(), "applybutton", "Overflow is working");
	});
});
