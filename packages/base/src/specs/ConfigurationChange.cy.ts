import "../bundle.common.js";

describe("Some configuration options can be changed at runtime", () => {
	it("Tests that theme can be changed", () => {
		const newTheme = "sap_horizon_hcb";

		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("setTheme", newTheme);

		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getTheme")
			.should("equal", newTheme);
	});

	it("Tests that noConflict can be changed", () => {
		const noConflictObject = { events: ["selection-change"] };

		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("setNoConflict", noConflictObject);

		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getNoConflict")
			.should("deep.equal", noConflictObject)
			.its("events")
			.should("deep.equal", noConflictObject.events);
	});

	it("Tests that theme root is applied", () => {
		const newThemeRoot = "https://example.com/";

		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("setThemeRoot", newThemeRoot);

		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getThemeRoot")
			.should("equal", newThemeRoot);
	});
});
