import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import "../../../src/Button.js";
import "../../../src/CheckBox.js";
import "../../../src/TextArea.js";
import "../../../src/Title.js";

describe("InvisibleMessage", () => {
	it("Initial rendering", () => {
		cy.get(".ui5-invisiblemessage-polite")
			.should("exist");

		cy.get(".ui5-invisiblemessage-assertive")
			.should("exist");
	});

	it("String annoucement", () => {
		// act
		announce("announcement", "Polite");
		announce("announcement", "Assertive");

		// assert
		cy.get(".ui5-invisiblemessage-polite")
			.should("contain", "announcement");
		cy.get(".ui5-invisiblemessage-assertive")
			.should("contain", "announcement");

		// assert - announcement is cleared
		// cy.get(".ui5-invisiblemessage-polite", { timeout: 3000 })
		// 	.should("not.contain", "announcement");
		// cy.get(".ui5-invisiblemessage-assertive", { timeout: 3000 })
		// 	.should("not.contain", "announcement");
	});
});
