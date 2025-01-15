import { registerThemePropertiesLoader } from "../../src/AssetRegistry.js";
import { boot } from "../../src/Boot.js";
import { hasStyle } from "../../src/ManagedStyles.js";

describe("Framework boot", () => {
	it("Tests theme loading, when registered after 'attachBoot' and 'boot'", () => {
		cy.wrap({ boot })
			.invoke("boot");

		cy.wrap({ registerThemePropertiesLoader })
			.invoke("registerThemePropertiesLoader", "@ui5/webcomponents-theming", "sap_horizon", () => {
				return Promise.resolve(`:root{ --customCol: #fff; --customBg: #000; }`);
			});

		cy.wrap({ hasStyle })
			.invoke("hasStyle", "data-ui5-theme-properties", "@ui5/webcomponents-theming")
			.should("be.true");
	});
});
