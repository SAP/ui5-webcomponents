import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import "../../../src/Button.js";

describe("InvisibleMessage", () => {
	it("Initial rendering", () => {
		cy.get(".ui5-invisiblemessage-polite")
			.should("exist");

		cy.get(".ui5-invisiblemessage-assertive")
			.should("exist");
	});

	it("String annoucement", () => {
		cy.wrap({ announce })
			.invoke("announce", "announcement", "Polite");
		cy.wrap({ announce })
			.invoke("announce", "announcement", "Assertive");

		// assert
		cy.get(".ui5-invisiblemessage-polite")
			.should("contain", "announcement");
		cy.get(".ui5-invisiblemessage-assertive")
			.should("contain", "announcement");

		// assert - announcement is cleared
		cy.get(".ui5-invisiblemessage-polite")
			.should("not.contain", "announcement");
		cy.get(".ui5-invisiblemessage-assertive")
			.should("not.contain", "announcement");
	});
});
