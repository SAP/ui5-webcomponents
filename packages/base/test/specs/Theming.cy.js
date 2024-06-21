import "../../bundle.esm.js";

describe("Theming works", () => {
	it("Tests that the parameters for the default theme are embedded on boot", () => {
		const currentRuntime = 0;
		const dataPropAttr = `data-ui5-component-properties-${currentRuntime}`;

		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.invoke("getCurrentRuntimeIndex")
			.should("equal", currentRuntime);

		cy.document()
			.its("adoptedStyleSheets")
			.then(adoptedStyleSheets => {
				return adoptedStyleSheets.find(sh => sh._ui5StyleId === `${dataPropAttr}|@ui5/webcomponents-base-test`);
			})
			.its("cssRules")
			.its(0)
			.its("cssText")
			.should("include", "--var1: grey");
	});

	it("Tests that the parameters for the default theme are embedded on boot", () => {
		const newTheme = 'sap_fiori_3_hcb';
		const currentRuntime = 0;
		const dataPropAttr = `data-ui5-component-properties-${currentRuntime}`;

		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.invoke("getCurrentRuntimeIndex")
			.should("equal", currentRuntime);

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
			.should("include", "--var1: yellow");
	});

	it("Tests that the parameters for the default theme are embedded on boot", () => {
		const unknownTheme = 'sap_unknown_theme';
		const currentRuntime = 0;
		const dataPropAttr = `data-ui5-component-properties-${currentRuntime}`;

		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.invoke("getCurrentRuntimeIndex")
			.should("equal", currentRuntime);

		cy.window()
		.its("sap-ui-webcomponents-bundle")
		.its("configuration")
		.invoke("setTheme", unknownTheme);

		cy.document()
			.its("adoptedStyleSheets")
			.then(adoptedStyleSheets => {
				return adoptedStyleSheets.find(sh => sh._ui5StyleId === `${dataPropAttr}|@ui5/webcomponents-base-test`);
			})
			.its("cssRules")
			.its(0)
			.its("cssText")
			.should("include", "--var1: grey");
	});
});
