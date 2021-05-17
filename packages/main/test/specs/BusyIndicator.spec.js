const assert = require("chai").assert;
const PORT = require("./_port.js");


describe("BusyIndicator general interaction", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/BusyIndicator.html`);
	});

	it("tests event propagation", () => {
		const busyIndicator = browser.$("#busy-tree");
		const dynamicItem = busyIndicator.$("ui5-tree").shadow$("ui5-list").$$("ui5-li-tree")[2].shadow$(".ui5-li-tree-toggle-box");
		const input = browser.$("#tree-input");

		dynamicItem.click();
		dynamicItem.keys("Space");

		assert.strictEqual(input.getProperty("value"), "0", "itemClick is not thrown");
	});

	it("tests focus handling", () => {
		const busyIndicator = browser.$("#indicator1");
		busyIndicator.click();

		let innerFocusElement = browser.execute(() => {
			return document.getElementById("indicator1").shadowRoot.activeElement;
		});

		innerFocusElement = $(innerFocusElement);

		assert.strictEqual(innerFocusElement.getAttribute("class"), "ui5-busyindicator-busy-area", "The correct inner element is focused");
	});

	it("tests internal focused element attributes", () => {
		const busyIndicator = browser.$("#indicator1");
		busyIndicator.click();
		const innerFocusElement = busyIndicator.shadow$(".ui5-busyindicator-busy-area");

		assert.strictEqual(innerFocusElement.getAttribute("role"), "progressbar", "Correct 'role' is set");
		assert.strictEqual(innerFocusElement.getAttribute("tabindex"), "0", "Correct 'tabindex' is set");
		assert.strictEqual(innerFocusElement.getAttribute("aria-valuemin"), "0", "Correct 'aria-valuemin' is set");
		assert.strictEqual(innerFocusElement.getAttribute("aria-valuemax"), "100", "Correct 'aria-valuemax' is set");
		assert.strictEqual(innerFocusElement.getAttribute("aria-valuetext"), "Busy", "Correct 'aria-valuetext' is set");
	});

	it("tests content is not reachable with keyboard when active in both directions", () => {
		const beforeBusyIndicator = browser.$("#beforeIndicatorWithBtn");
		const busyIndicator = browser.$("#indicatorWithBtn");
		const afterBusyIndicator = browser.$("#afterIndicatorWithBtn");

		beforeBusyIndicator.click();
		browser.keys("Tab");
		assert.strictEqual($(browser.getActiveElement()).getAttribute("id"), busyIndicator.getAttribute("id"), "Correct element is focused with TAB");

		browser.keys("Tab");
		assert.strictEqual($(browser.getActiveElement()).getAttribute("id"), afterBusyIndicator.getAttribute("id"), "Correct element is focused with TAB");

		browser.keys(["Shift", "Tab"]);
		assert.strictEqual($(browser.getActiveElement()).getAttribute("id"), busyIndicator.getAttribute("id"), "Correct element is focused with SHIFT + TAB");

		browser.keys(["Shift", "Tab"]);
		assert.strictEqual($(browser.getActiveElement()).getAttribute("id"), beforeBusyIndicator.getAttribute("id"), "Correct element is focused with SHIFT + TAB");
	});

	it("test inactive indicator in dialog - correct element from default slot is focused", () => {
		browser.$("#open-dialog-inactive-indicator").click();

		assert.strictEqual(
			$(browser.getActiveElement()).getAttribute("id"),
			browser.$("#dialog-inactive-indicator-focused-button").getAttribute("id"),
			"Correct element from default slot is focused"
		);
	});
});
