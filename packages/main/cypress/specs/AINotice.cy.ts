import "../../src/AINotice.js";

describe("AINotice component", () => {
	it("should display attribution text, verification text and icon when all of them are set.", () => {
		cy.mount("<ui5-ainotice attribution-text='Test Attribution' verification-text='Test Verification' show-icon='true'></ui5-ainotice>");
		cy.get("ui5-ainotice").shadow().find(".ui5-notice-attribution-text")
			.should("contain.text", "Test Attribution");

		cy.get("ui5-ainotice").shadow().find(".ui5-notice-verification-text")
			.should("contain.text", "Test Verification");

		cy.get("ui5-ainotice").shadow().find(".ui5-notice-attribution-text")
			.should("have.attr", "icon", "sap-icon://ai");
	});

	it("should display only the icon button if the icon property is set to true and there are no attribution and verification text.", () => {
		cy.mount("<ui5-ainotice show-icon='true'></ui5-ainotice>");

		cy.get("ui5-ainotice").shadow().find("ui5-button")
			.should("exist")
			.should("have.attr", "icon", "sap-icon://ai");

		cy.get("ui5-ainotice").shadow().find(".ui5-notice-attribution-text").should("not.exist");
		cy.get("ui5-ainotice").shadow().find(".ui5-notice-verification-text").should("not.exist");
	});

	it("should display only attribution text when there is no icon and verification text.", () => {
		cy.mount("<ui5-ainotice attribution-text='Test Attribution'></ui5-ainotice>");

		cy.get("ui5-ainotice").shadow().find(".ui5-notice-attribution-text")
			.should("contain.text", "Test Attribution");
		cy.get("ui5-ainotice").shadow().find(".ui5-notice-verification-text")
			.should("not.exist");
	});

	it("should display both attribution and verification text when there is no icon.", () => {
		cy.mount("<ui5-ainotice attribution-text='Test Attribution' verification-text='Test Verification'></ui5-ainotice>");
		cy.get("ui5-ainotice").shadow().find(".ui5-notice-attribution-text")
			.should("contain.text", "Test Attribution");
		cy.get("ui5-ainotice").shadow().find(".ui5-notice-verification-text")
			.should("contain.text", "Test Verification");
	});

	it("should display tooltip when mouse is over the icon-only button.", () => {
		cy.mount("<ui5-ainotice show-icon='true'></ui5-ainotice>");

		cy.get("ui5-ainotice").shadow().find("ui5-button")
			.should("have.attr", "tooltip", "AI Notice button")
			.trigger("mouseover");
	});

	it("should handle click event and trigger onPress function.", () => {
		cy.mount("<ui5-ainotice attribution-text='Test Attribution' verification-text='Test Verification'> <ui5-popover header-text='Opened Popover' slot='popup'></ui5-ainotice>");
		cy.get("ui5-ainotice").shadow().find(".ui5-notice-attribution-text").click();

		cy.mount("<ui5-ainotice show-icon='true'> <ui5-popover header-text='Opened Popover' slot='popup'></ui5-ainotice>");
		cy.get("ui5-ainotice").shadow().find("ui5-button").click();
	});
});
