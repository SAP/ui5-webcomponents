import { internals } from "../Location.js";
import "../bundle.common.js";

describe("Some settings can be set via SAP UI URL params", () => {
	before(() => {
		const searchParams = "sap-ui-rtl=true&sap-ui-language=ja&sap-ui-calendarType=Japanese&sap-ui-theme=sap_horizon_hcb&sap-ui-animationMode=basic";

		cy.stub(internals, "search", () => {
			return searchParams;
		});

		cy.wrap(internals)
			.invoke("search")
			.should("be.equal", searchParams);

		cy.mount(`<ui5-test-generic></ui5-test-generic>`, { ui5Configuration: {} });
	});

	it("Tests that language is applied", () => {
		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getLanguage")
			.should("equal", "ja");
	});

	it("Tests that calendarType is applied", () => {
		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getCalendarType")
			.should("equal", "Japanese");
	});

	it("Tests that theme is applied", () => {
		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getTheme")
			.should("equal", "sap_horizon_hcb");
	});

	it("Tests that animationMode is applied", () => {
		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getAnimationMode")
			.should("equal", "basic");
	});
});

describe("Different themeRoot configurations", () => {
	it("Allowed theme root", () => {
		const searchParams = "sap-ui-theme=sap_horizon_hcb@https://example.com";

		cy.stub(internals, "search", () => {
			return searchParams;
		});

		cy.wrap(internals)
			.invoke("search")
			.should("be.equal", searchParams);

		cy.mount(`<ui5-test-generic></ui5-test-generic>`, { ui5Configuration: {} });

		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getThemeRoot")
			.should("equal", "https://example.com/UI5/");
	});

	it("Unallowed theme root", () => {
		const searchParams = "sap-ui-theme=sap_horizon_hcb@https://another-example.com";

		cy.stub(internals, "search", () => {
			return searchParams;
		});

		cy.wrap(internals)
			.invoke("search")
			.should("be.equal", searchParams);

		cy.mount(`<ui5-test-generic></ui5-test-generic>`, { ui5Configuration: {} });

		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getThemeRoot")
			.should("equal", `${window.location.origin}/UI5/`);
	});

	it("Relative theme root", () => {
		const searchParams = "sap-ui-theme=sap_horizon_hcb@./test";

		cy.stub(internals, "search", () => {
			return searchParams;
		});

		cy.wrap(internals)
			.invoke("search")
			.should("be.equal", searchParams);

		cy.mount(`<ui5-test-generic></ui5-test-generic>`, { ui5Configuration: {} });

		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getThemeRoot")
			.then(themeRoot => {
				return (themeRoot as string).endsWith("/test/UI5/");
			})
			.should("be.true");
	});
});

describe("Some settings can be set via SAP URL params", () => {
	before(() => {
		const searchParams = "sap-language=bg&sap-theme=sap_fiori_3_dark";

		cy.stub(internals, "search", () => {
			return searchParams;
		});

		cy.wrap(internals)
			.invoke("search")
			.should("be.equal", searchParams);

		cy.mount(`<ui5-test-generic></ui5-test-generic>`, { ui5Configuration: {} });
	});

	it("Tests that language is applied via sap-ui-language", () => {
		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getLanguage")
			.should("equal", "bg");
	});

	it("Tests that theme is applied via sap-ui-theme", () => {
		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getTheme")
			.should("equal", "sap_fiori_3_dark");
	});
});

describe("Some settings can be set via SAP UI URL params", () => {
	before(() => {
		const searchParams = "sap-language=bg&sap-ui-language=de&sap-theme=sap_fiori_3_dark&sap-theme=sap_fiori_3_hcb";

		cy.stub(internals, "search", () => {
			return searchParams;
		});

		cy.wrap(internals)
			.invoke("search")
			.should("be.equal", searchParams);

		cy.mount(`<ui5-test-generic></ui5-test-generic>`, { ui5Configuration: {} });
	});

	it("Tests that language is applied via sap-ui-language", () => {
		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getLanguage")
			.should("equal", "de");
	});

	it("Tests that theme is applied via sap-ui-theme", () => {
		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getTheme")
			.should("equal", "sap_fiori_3_hcb");
	});
});
