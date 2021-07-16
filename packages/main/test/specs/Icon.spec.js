const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Icon general interaction", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Icon.html`);
	});

	it("Tests icon rendering", () => {
		const iconRoot = browser.$("#interactive-icon").shadow$("ui5-icon-root");
		const iconWithTooltip = browser.$("#iconWithTooltip");
		const iconTooltip = iconWithTooltip.shadow$(`#${iconWithTooltip.getProperty("_id")}-tooltip`);
		const ICON_TOOLTIP_TEXT = "Save";

		assert.ok(iconRoot, "Icon is rendered");
		assert.strictEqual(iconTooltip.getHTML(false).includes(ICON_TOOLTIP_TEXT), true,
			"Built-in tooltip is correct");
	});

	it("Tests noConflict 'ui5-click' event is thrown for interactive icons", () => {
		const iconRoot = browser.$("#interactive-icon").shadow$(".ui5-icon-root");
		const input = browser.$("#click-event");

		iconRoot.click();
		assert.strictEqual(input.getAttribute("value"), "1", "Mouse click throws event");

		iconRoot.keys("Enter");
		assert.strictEqual(input.getAttribute("value"), "2", "Enter throws event");

		iconRoot.keys("Space");
		assert.strictEqual(input.getAttribute("value"), "3", "Space throws event");
	});

	it("Tests noConflict 'ui5-click' event is not thrown for non interactive icons", () => {
		const iconRoot = browser.$("#non-interactive-icon");
		const input = browser.$("#click-event");

		iconRoot.click();
		assert.strictEqual(input.getAttribute("value"), "3", "Mouse click throws event");

		iconRoot.keys("Enter");
		assert.strictEqual(input.getAttribute("value"), "3", "Enter throws event");

		iconRoot.keys("Space");
		assert.strictEqual(input.getAttribute("value"), "3", "Space throws event");
	});

	it("Tests native 'click' event thrown", () => {
		browser.execute(function() {
			window["sap-ui-webcomponents-bundle"].configuration.setNoConflict(false);
		});

		const icon = browser.$("#myInteractiveIcon");
		const input = browser.$("#click-event-2");

		icon.click();
		assert.strictEqual(input.getAttribute("value"), "1", "Mouse click throws event");
	});

	it("Tests the accessibility attributes", () => {
		const iconRoot = browser.$("#myIcon").shadow$(".ui5-icon-root");
		const ariaHiddenIconRoot = browser.$("#araHiddenIcon").shadow$(".ui5-icon-root");

		assert.strictEqual(iconRoot.getAttribute("aria-hidden"), null, "The aria-hidden attribute is not set");
		assert.strictEqual(ariaHiddenIconRoot.getAttribute("aria-hidden"), "true", "The ariaHidden property works");
	});
});
