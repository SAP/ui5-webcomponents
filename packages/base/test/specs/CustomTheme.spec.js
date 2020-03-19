const assert = require("chai").assert;

describe("Custom themes can be registered", () => {
	browser.url("http://localhost:9191/test-resources/pages/AllTestElements.html");

	it("Tests that theme parameters are changed on theme change", () => {
		const newTheme = 'my_custom_theme';

		const res = browser.executeAsync( async (newTheme, done) => {
			const var1 = "--var1: #555555";

			window.registerThemeProperties("@ui5/webcomponents-base-test", newTheme, `:root{ ${var1}; }`);

			const config = window['sap-ui-webcomponents-bundle'].configuration;
			await config.setTheme(newTheme);

			const style = document.querySelector(`style[data-ui5-theme-properties="@ui5/webcomponents-base-test"]`);
			const varsFound = style && style.textContent.includes(var1);
			return done(varsFound);
		}, newTheme);

		assert.strictEqual(res, true, "Theme parameters changed");
	});

});
