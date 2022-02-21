const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Icon general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Icon.html`);
	});

	it("Tests icon rendering", async () => {
		const iconRoot = await browser.$("#interactive-icon").shadow$("ui5-icon-root");
		const iconWithTooltip = await browser.$("#iconWithTooltip");
		const iconTooltip = await iconWithTooltip.shadow$(`#${await iconWithTooltip.getProperty("_id")}-tooltip`);
		const ICON_TOOLTIP_TEXT = "Save";

		assert.ok(iconRoot, "Icon is rendered");
		assert.include(await iconTooltip.getHTML(false), ICON_TOOLTIP_TEXT,
			"Built-in tooltip is correct");
	});

	it("Tests noConflict 'ui5-click' event is thrown for interactive icons", async () => {
		const iconRoot = await browser.$("#interactive-icon").shadow$(".ui5-icon-root");
		const input = await browser.$("#click-event");

		await iconRoot.click();
		assert.strictEqual(await input.getAttribute("value"), "1", "Mouse click throws event");

		await iconRoot.keys("Enter");
		assert.strictEqual(await input.getAttribute("value"), "2", "Enter throws event");

		await iconRoot.keys("Space");
		assert.strictEqual(await input.getAttribute("value"), "3", "Space throws event");
	});

	it("Tests noConflict 'ui5-click' event is not thrown for non interactive icons", async () => {
		const iconRoot = await browser.$("#non-interactive-icon");
		const input = await browser.$("#click-event");

		await iconRoot.click();
		assert.strictEqual(await input.getAttribute("value"), "3", "Mouse click throws event");

		await iconRoot.keys("Enter");
		assert.strictEqual(await input.getAttribute("value"), "3", "Enter throws event");

		await iconRoot.keys("Space");
		assert.strictEqual(await input.getAttribute("value"), "3", "Space throws event");
	});

	it("Tests native 'click' event thrown", async () => {
		await browser.executeAsync(function(done) {
			window["sap-ui-webcomponents-bundle"].configuration.setNoConflict(false);
			done();
		});

		const icon = await browser.$("#myInteractiveIcon");
		const input = await browser.$("#click-event-2");

		await icon.click();
		assert.strictEqual(await input.getAttribute("value"), "1", "Mouse click throws event");
	});

	it("Tests the accessibility attributes", async () => {
		const iconRoot = await browser.$("#myIcon").shadow$(".ui5-icon-root");
		const accRoleIconRoot = await browser.$("#accRoleIcon").shadow$(".ui5-icon-root");
		const ariaHiddenIconRoot = await browser.$("#araHiddenIcon").shadow$(".ui5-icon-root");

		assert.strictEqual(await iconRoot.getAttribute("aria-hidden"), null, "The aria-hidden attribute is not set");
		assert.strictEqual(await accRoleIconRoot.getAttribute("role"), "link", "The accessibleRole property works");
		assert.strictEqual(await ariaHiddenIconRoot.getAttribute("aria-hidden"), "true", "The ariaHidden property works");
	});

	it("Tests switch to sap_horizon", async () => {
		const V4_PATH_START = "M288";
		const V5_PATH_START = "M79.844";

		// assert - initial SVG path
		const iconPath = await browser.$("#myIcon").shadow$(".ui5-icon-root path");
		const pathValue = await iconPath.getAttribute("d");
		assert.ok(pathValue.startsWith(V4_PATH_START), "Icon's path in sap_fiori_3");

		// act - switch theme
		await browser.executeAsync( async (newTheme, done) => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			await config.setTheme(newTheme);
			done();
		}, "sap_horizon");

		// assert - SVG path changed
		const iconPathAfter = await browser.$("#myIcon").shadow$(".ui5-icon-root path");
		const iconPathValueAfter = await iconPathAfter.getAttribute("d");
		assert.ok(iconPathValueAfter.startsWith(V5_PATH_START), "Icon's path changed in sap_horizon.");
	});
});
