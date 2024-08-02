import "../../test/test-elements/Accessor.js";
import { setTheme, getTheme } from "../../src/config/Theme.js";
import { setThemeRoot, getThemeRoot } from "../../src/config/ThemeRoot.js";
import { setNoConflict, getNoConflict } from "../../src/config/NoConflict.js";

describe("Some configuration options can be changed at runtime", () => {
	it("Tests that theme can be changed", () => {
		const newTheme = "sap_horizon_hcb";

		cy.then(() => setTheme(newTheme));

		cy.then(() => getTheme())
			.should("equal", newTheme);
	});

	it("Tests that noConflict can be changed", () => {
		const noConflictObject = { events: ["selection-change"] };

		cy.then(() => setNoConflict(noConflictObject));

		cy.then(() => getNoConflict())
			.should("deep.equal", noConflictObject)
			.its("events")
			.should("deep.equal", noConflictObject.events);
	});

	it("Tests that theme root is applied", () => {
		const newThemeRoot = "https://example.com/";

		cy.then(() => setThemeRoot(newThemeRoot));

		cy.then(() => getThemeRoot())
			.should("deep.equal", newThemeRoot)
	});
});
