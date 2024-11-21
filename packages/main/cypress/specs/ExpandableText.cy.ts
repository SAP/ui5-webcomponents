import { html } from "lit";
import "../../src/ExpandableText.js";

// Test keyboard support
// Test SR attributes
// Test RTL
// Test empty indicator
// Test mobile popover

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

		it("Should display full text if maxCharacters are set, but not exceeded", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 9999;

			cy.mount(html`<ui5-expandable-text text=${text} max-characters="${maxCharacters}"></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-text]")
				.contains(text)
				.should("exist");
		});

		it("Should display 'Show More' if maxCharacters are exceeded", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 5;

			cy.mount(html`<ui5-expandable-text text=${text} max-characters="${maxCharacters}"></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(text.substring(0, maxCharacters))
				.should("exist");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-ellipsis")
				.contains("... ")
				.should("exist");

			cy.get("@expTextShadow")
				.find("[ui5-link].ui5-exp-text-toggle")
				.contains("Show More")
				.should("exist");
		});

		it("Should display 'Show More' if maxCharacters are exceeded, set to 0", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 0;

			cy.mount(html`<ui5-expandable-text text=${text} max-characters="${maxCharacters}"></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(/^$/)
				.should("exist");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-ellipsis")
				.should("exist");

			cy.get("@expTextShadow")
				.find("[ui5-link].ui5-exp-text-toggle")
				.contains("Show More")
				.should("exist");
		});

		it("Should NOT display 'Show More' if maxCharacters are 0, but text is empty", () => {
			const text = "";
			const maxCharacters = 0;

			cy.mount(html`<ui5-expandable-text text=${text} max-characters="${maxCharacters}"></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(/^$/)
				.should("exist");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-ellipsis")
				.should("not.exist");

			cy.get("@expTextShadow")
				.find("[ui5-link].ui5-exp-text-toggle")
				.should("not.exist");
		});

		it("Toggling 'Show More' and 'Show Less'", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 5;

			cy.mount(html`<ui5-expandable-text text=${text} max-characters="${maxCharacters}"></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");

			cy.get("@expTextShadow")
				.find("[ui5-link].ui5-exp-text-toggle")
				.contains("Show More")
				.realClick();

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(text)
				.should("exist");

			cy.get("@expTextShadow")
				.find("[ui5-link].ui5-exp-text-toggle")
				.contains("Show Less")
				.realClick();

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(text.substring(0, maxCharacters))
				.should("exist");

			cy.get("@expTextShadow")
				.find("[ui5-link].ui5-exp-text-toggle")
				.contains("Show More");
		});
	});

	describe("Rendering and Interaction with overflowMode=Popover", () => {
		it("Toggling 'Show More' and 'Show Less'", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 5;

			cy.mount(html`<ui5-expandable-text text=${text} max-characters="${maxCharacters}" overflow-mode="Popover"></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(text.substring(0, maxCharacters))
				.should("exist");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-ellipsis")
				.contains("... ")
				.should("exist");

			cy.get("@expTextShadow")
				.find("[ui5-link].ui5-exp-text-toggle")
				.contains("Show More")
				.realClick();

			cy.get("@expTextShadow")
				.find("[ui5-link].ui5-exp-text-toggle")
				.invoke("attr", "id")
				.as("expectedOpenerId");

			cy.get("@expTextShadow")
				.find("[ui5-responsive-popover]")
				.should("exist")
				.should("have.attr", "open");

			cy.get("@expTextShadow")
				.find("[ui5-responsive-popover]")
				.invoke("attr", "opener")
				.then(function testOpenerId(opener) {
					expect(opener).to.equal(this.expectedOpenerId);
				});

			cy.get("@expTextShadow")
				.find("[ui5-link].ui5-exp-text-toggle")
				.contains("Show Less")
				.realClick();

			// TODO: currently it is not possible to close the popover from an opener link, therefore this test is unstable. Fix the issue and uncomment it.
			// cy.get("@expTextShadow")
			// 	.find("[ui5-responsive-popover]")
			// 	.should("not.have.attr", "open");
		});
	});
});
