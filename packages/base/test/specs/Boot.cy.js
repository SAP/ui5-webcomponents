import "../../bundle.common.js";

describe("Framework boot", () => {
	it("Tests theme loading, when registered after 'attachBoot' and 'boot'", () => {
		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.invoke("boot");

		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.invoke("registerThemeProps");

		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.invoke("hasStyle", "data-ui5-theme-properties", "@ui5/webcomponents-theming")
			.should("be.true");
	});
});