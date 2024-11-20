import { html } from "lit";
import "../../src/ExpandableText.js";
import "../../src/Label.js";

describe("ExpandableText", () => {
	describe("Rendering and Interaction", () => {
		it("Should display full text if maxCharacters is not set", () => {
			const text = "This is a very long text that should be displayed";

			cy.mount(html`<ui5-expandable-text text=${text}></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-text]")
				.contains(text)
				.should("exist");
		});

		// it("Disabled attribute is propagated properly", () => {
		// 	cy.mount(html`<ui5-textarea disabled></ui5-textarea>`);

		// 	cy.get("[ui5-textarea]")
		// 		.shadow()
		// 		.find("textarea")
		// 		.should("have.attr", "disabled");
		// });

		// it("Redonly attribute is propagated properly", () => {
		// 	cy.mount(html`<ui5-textarea readonly></ui5-textarea>`);

		// 	cy.get("[ui5-textarea]")
		// 		.shadow()
		// 		.find("textarea")
		// 		.should("have.attr", "readonly");
		// });

		// it("Required attribute is propagated properly", () => {
		// 	cy.mount(html`<ui5-textarea required></ui5-textarea>`);

		// 	cy.get("[ui5-textarea]")
		// 		.shadow()
		// 		.find("textarea")
		// 		.should("have.attr", "aria-required", "true");

		// 	cy.mount(html`<ui5-textarea></ui5-textarea>`);

		// 	cy.get("[ui5-textarea]")
		// 		.shadow()
		// 		.find("textarea")
		// 		.should("have.attr", "aria-required", "false");
		// });

		// it("Value attribute is propagated properly", () => {
		// 	const attributeValue = "test";

		// 	cy.mount(html`<ui5-textarea value=${attributeValue}></ui5-textarea>`);

		// 	cy.get("[ui5-textarea]")
		// 		.shadow()
		// 		.find("textarea")
		// 		.should("have.value", attributeValue);
		// });

		// it("Tests aria-label", () => {
		// 	const attributeValue = "test";

		// 	cy.mount(html`<ui5-textarea accessible-name=${attributeValue}></ui5-textarea>`);

		// 	cy.get("[ui5-textarea]")
		// 		.shadow()
		// 		.find("textarea")
		// 		.should("have.attr", "aria-label", attributeValue);
		// });

		// it("Tests aria-labelledby", () => {
		// 	const attributeValue = "test";

		// 	cy.mount(html`<span id="ref">${attributeValue}</span>
		// 	<ui5-textarea accessible-name-ref="ref"></ui5-textarea>`);

		// 	cy.get("[ui5-textarea]")
		// 		.shadow()
		// 		.find("textarea")
		// 		.should("have.attr", "aria-label", attributeValue);
		// });

		// it("Checks if aria-invalid is set correctly", () => {
		// 	cy.mount(html`<ui5-textarea value-state="Negative"></ui5-textarea>`);

		// 	cy.get("[ui5-textarea]")
		// 		.shadow()
		// 		.find("textarea")
		// 		.should("have.attr", "aria-invalid", "true");

		// 	cy.mount(html`<ui5-textarea value-state="Critical"></ui5-textarea>`);

		// 	cy.get("[ui5-textarea]")
		// 		.shadow()
		// 		.find("textarea")
		// 		.should("not.have.attr", "aria-invalid");
		// });

		// it("Tests aria-label is set to match the label text when label is for that text area", () => {
		// 	const attributeValue = "test";

		// 	cy.mount(html`<ui5-label for="ref">${attributeValue}</ui5-label>
		// 	<ui5-textarea id="ref"></ui5-textarea>`);

		// 	cy.get("[ui5-textarea]")
		// 		.shadow()
		// 		.find("textarea")
		// 		.should("have.attr", "aria-label", attributeValue);
		// });

		// it("Tests aria-label is set directly from the property accessible-name of the text-area", () => {
		// 	const attributeValue = "test";

		// 	cy.mount(html`<ui5-label for="ref">some text</ui5-label>
		// 	<ui5-textarea id="ref" accessible-name="${attributeValue}"></ui5-textarea>`);

		// 	cy.get("[ui5-textarea]")
		// 		.shadow()
		// 		.find("textarea")
		// 		.should("have.attr", "aria-label", attributeValue);
		// });
	});
});
