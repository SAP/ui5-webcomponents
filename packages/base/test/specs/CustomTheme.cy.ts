import { html } from 'lit';

import "../../src/bundle.common.js";

import "../../src/test-elements/Generic.js";


describe("Custom themes can be registered", () => {
	it("Tests that theme parameters are changed on theme change", () => {
		const newTheme = 'my_custom_theme';
		const var1 = "--var1: #555555";
		const currentRuntime = 0;
		const dataPropAttr = `data-ui5-component-properties-${currentRuntime}`;

		cy.mount(html`<ui5-test-generic></ui5-test-generic>`);

		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.invoke("getCurrentRuntimeIndex")
			.should("equal", currentRuntime);

		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.invoke("registerThemePropertiesLoader", "@ui5/webcomponents-base-test", newTheme, () => `:root{ ${var1}; }`)

		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("setTheme", newTheme);

		cy.document()
			.its("adoptedStyleSheets")
			.then(adoptedStyleSheets => {
				return adoptedStyleSheets.find(sh => sh._ui5StyleId === `${dataPropAttr}|@ui5/webcomponents-base-test`);
			})
			.its("cssRules")
			.its(0)
			.its("cssText")
			.should("include", var1);
	});
});
