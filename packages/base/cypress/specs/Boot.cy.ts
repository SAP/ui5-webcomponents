import { registerThemePropertiesLoader } from "../../src/AssetRegistry.js";
import { boot } from "../../src/Boot.js";
import { hasStyle } from "../../src/ManagedStyles.js";


describe("Framework boot", () => {
	it("Tests theme loading, when registered after 'attachBoot' and 'boot'", () => {
		cy.then(() => boot());

		cy.then(() => {
			return registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", () => {
				return Promise.resolve({
					content: `:root{ --customCol: #fff; --customBg: #000; }`,
					packageName: "",
					fileName: "",
				});
			});
		})

		cy.then(() => hasStyle("data-ui5-theme-properties", "@ui5/webcomponents-theming"))
			.should("be.true");
	});
});
