import "../../test/test-elements/Accessor.js";
import { setTheme, getTheme } from "../../src/config/Theme.js";
import { setThemeRoot, getThemeRoot } from "../../src/config/ThemeRoot.js";
import { setNoConflict, getNoConflict } from "../../src/config/NoConflict.js";

describe("Some configuration options can be changed at runtime", () => {
	it("Tests that theme can be changed", () => {
		const newTheme = "sap_horizon_hcb";

		cy.wrap({ setTheme })
			.invoke("setTheme", newTheme);

		cy.wrap({ getTheme })
			.invoke("getTheme")
			.should("equal", newTheme);
	});

	it("Tests that noConflict can be changed", () => {
		const noConflictObject = { events: ["selection-change"] };

		cy.wrap({ setNoConflict })
			.invoke("setNoConflict", noConflictObject);

		cy.wrap({ getNoConflict })
			.invoke("getNoConflict")
			.should("deep.equal", noConflictObject)
			.its("events")
			.should("deep.equal", noConflictObject.events);
	});

	it("Tests that theme root is applied", () => {
		const newThemeRoot = "https://example.com/";

		cy.wrap({ setThemeRoot })
			.invoke("setThemeRoot", newThemeRoot);

		cy.wrap({ getThemeRoot })
			.invoke("getThemeRoot")
			.should("deep.equal", newThemeRoot);
	});
});
