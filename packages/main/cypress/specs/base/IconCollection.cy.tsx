import "./css/redfish.custom.theme.css";
import getEffectiveIconCollection from "@ui5/webcomponents-base/dist/asset-registries/util/getIconCollectionByTheme.js";
import { setTheme, isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import "../../../src/Assets.js";
import Icon from "../../../src/Icon.js";
import home from "@ui5/webcomponents-icons/dist/home.js";

describe("Icon collection", () => {
	before(() => {
		cy.wrap({ setTheme })
			.invoke("setTheme", "sap_fiori_3_dark");
	});

	it("tests the icon collection in built-in themes", () => {
		cy.mount(<Icon name={home}></Icon>);

		cy.wrap({ getEffectiveIconCollection })
			.invoke("getEffectiveIconCollection")
			.should("equal", "SAP-icons-v4");

		cy.wrap({ isLegacyThemeFamily })
			.invoke("isLegacyThemeFamily")
			.should("be.true");

		// act
		cy.wrap({ setTheme })
			.invoke("setTheme", "sap_horizon");

		// assert
		cy.wrap({ getEffectiveIconCollection })
			.invoke("getEffectiveIconCollection")
			.should("equal", "SAP-icons-v5");

		cy.wrap({ isLegacyThemeFamily })
			.invoke("isLegacyThemeFamily")
			.should("be.false");
	});

	it("tests the icon collection in built-in themes", () => {
		cy.mount(<Icon name={home}></Icon>);

		// act
		cy.wrap({ setTheme })
			.invoke("setTheme", "redfish");

		// assert
		// The 'SAP-icons-v5' collection is correctly used in 'redfish' - extending 'sap_horizon'
		cy.wrap({ getEffectiveIconCollection })
			.invoke("getEffectiveIconCollection")
			.should("equal", "SAP-icons-v5");

		// assert
		// "The 'redfish' custom theme is not part of legacy theme family, as it's extending 'sap_horizon'.
		cy.wrap({ isLegacyThemeFamily })
			.invoke("isLegacyThemeFamily")
			.should("be.false");
	});
});
