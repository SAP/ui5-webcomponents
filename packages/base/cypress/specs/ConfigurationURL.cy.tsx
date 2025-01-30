import { internals } from "../../src/Location.js";
import "../../test/test-elements/Generic.js";
import { resetConfiguration } from "../../src/InitialConfiguration.js";
import { getLanguage } from "../../src/config/Language.js";
import { getCalendarType } from "../../src/config/CalendarType.js";
import { getTheme } from "../../src/config/Theme.js";
import { getAnimationMode } from "../../src/config/AnimationMode.js";
import { getThemeRoot } from "../../src/config/ThemeRoot.js";

describe("Some settings can be set via SAP UI URL params", () => {
	before(() => {
		const searchParams = "sap-ui-rtl=true&sap-ui-language=ja&sap-ui-calendarType=Japanese&sap-ui-theme=sap_horizon_hcb&sap-ui-animationMode=basic";

		cy.stub(internals, "search", () => {
			return searchParams;
		});

		cy.then(() => {
			return resetConfiguration(true);
		});

		cy.wrap(internals)
			.invoke("search")
			.should("be.equal", searchParams);

		cy.mount(`<ui5-test-generic></ui5-test-generic>`);
	});

	it("Tests that language is applied", () => {
		cy.wrap({ getLanguage })
			.invoke("getLanguage")
			.should("equal", "ja");
	});

	it("Tests that calendarType is applied", () => {
		cy.wrap({ getCalendarType })
			.invoke("getCalendarType")
			.should("equal", "Japanese");
	});

	it("Tests that theme is applied", () => {
		cy.wrap({ getTheme })
			.invoke("getTheme")
			.should("equal", "sap_horizon_hcb");
	});

	it("Tests that animationMode is applied", () => {
		cy.wrap({ getAnimationMode })
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

		cy.wrap({ resetConfiguration })
			.invoke("resetConfiguration", true);

		cy.wrap(internals)
			.invoke("search")
			.should("be.equal", searchParams);

		cy.mount(`<ui5-test-generic></ui5-test-generic>`);

		cy.wrap({ getThemeRoot })
			.invoke("getThemeRoot")
			.should("equal", "https://example.com/UI5/");
	});

	it("Unallowed theme root", () => {
		const searchParams = "sap-ui-theme=sap_horizon_hcb@https://another-example.com";

		cy.stub(internals, "search", () => {
			return searchParams;
		});

		cy.wrap({ resetConfiguration })
			.invoke("resetConfiguration", true);

		cy.wrap(internals)
			.invoke("search")
			.should("be.equal", searchParams);

		cy.mount(`<ui5-test-generic></ui5-test-generic>`);

		cy.wrap({ getThemeRoot })
			.invoke("getThemeRoot")
			.should("equal", `${window.location.origin}/UI5/`);
	});

	it("Relative theme root", () => {
		const searchParams = "sap-ui-theme=sap_horizon_hcb@./test";

		cy.stub(internals, "search", () => {
			return searchParams;
		});

		cy.wrap({ resetConfiguration })
			.invoke("resetConfiguration", true);

		cy.wrap(internals)
			.invoke("search")
			.should("be.equal", searchParams);

		cy.mount(`<ui5-test-generic></ui5-test-generic>`);

		cy.wrap({ getThemeRoot })
			.invoke("getThemeRoot")
			.then(themeRoot => {
				return themeRoot?.endsWith("/test/UI5/");
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

		cy.wrap({ resetConfiguration })
			.invoke("resetConfiguration", true);

		cy.wrap(internals)
			.invoke("search")
			.should("be.equal", searchParams);

		cy.mount(`<ui5-test-generic></ui5-test-generic>`);
	});

	it("Tests that language is applied via sap-ui-language", () => {
		cy.wrap({ getLanguage })
			.invoke("getLanguage")
			.should("equal", "bg");
	});

	it("Tests that theme is applied via sap-ui-theme", () => {
		cy.wrap({ getTheme })
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

		cy.wrap({ resetConfiguration })
			.invoke("resetConfiguration", true);

		cy.wrap(internals)
			.invoke("search")
			.should("be.equal", searchParams);

		cy.mount(`<ui5-test-generic></ui5-test-generic>`);
	});

	it("Tests that language is applied via sap-ui-language", () => {
		cy.wrap({ getLanguage })
			.invoke("getLanguage")
			.should("equal", "de");
	});

	it("Tests that theme is applied via sap-ui-theme", () => {
		cy.wrap({ getTheme })
			.invoke("getTheme")
			.should("equal", "sap_fiori_3_hcb");
	});
});
