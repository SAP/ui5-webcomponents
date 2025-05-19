import IllustratedMessage from "../../src/IllustratedMessage.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js"

describe("Accessibility", () => {
	it("should add aria-hidden and role=presetation to the SVG when decorative is true", () => {
		cy.mount(
			<IllustratedMessage name="UnableToUpload" decorative>
			</IllustratedMessage>
		);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find("svg")
			.should("have.attr", "role", "presentation");

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find("svg")
			.should("have.attr", "aria-hidden", "true");
	});

	it("should not have aria-label on the SVG when decorative is true", () => {
		cy.mount(
			<IllustratedMessage name="UnableToUpload" accessible-name-ref="lbl" decorative>
				<Label id="lbl">Text from aria-labelledby</Label>
			</IllustratedMessage>
		);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find("svg")
			.should("not.have.attr", "aria-label");

	});
});