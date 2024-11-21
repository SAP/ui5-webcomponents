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

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-text]")
				.contains(text.substring(0, maxCharacters))
				.should("exist");

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find(".ui5-exp-text-ellipsis")
				.contains("... ")
				.should("exist");

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-link].ui5-exp-text-toggle")
				.contains("Show More")
				.should("exist");
		});

		it("Toggling 'Show More' and 'Show Less'", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 5;

			cy.mount(html`<ui5-expandable-text text=${text} max-characters="${maxCharacters}"></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-link].ui5-exp-text-toggle")
				.contains("Show More")
				.realClick();

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-text]")
				.contains(text)
				.should("exist");

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-link].ui5-exp-text-toggle")
				.realClick();

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-link].ui5-exp-text-toggle")
				.contains("Show Less")
				.realClick();

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-text]")
				.contains(text.substring(0, maxCharacters))
				.should("exist");
		});
	});

	describe("Rendering and Interaction with overflowMode=Popover", () => {
		it("Toggling 'Show More' and 'Show Less'", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 5;

			cy.mount(html`<ui5-expandable-text text=${text} max-characters="${maxCharacters}" overflow-mode="Popover"></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-text]")
				.contains(text.substring(0, maxCharacters))
				.should("exist");

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find(".ui5-exp-text-ellipsis")
				.contains("... ")
				.should("exist");

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-link].ui5-exp-text-toggle")
				.contains("Show More")
				.realClick();

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-link].ui5-exp-text-toggle")
				.invoke("attr", "id")
				.as("expectedOpenerId");

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("exist")
				.should("have.attr", "open");

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.invoke("attr", "opener")
				.then(function testOpenerId(opener) {
					expect(opener).to.equal(this.expectedOpenerId);
				});

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-link].ui5-exp-text-toggle")
				.contains("Show Less")
				.realClick();

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("not.have.attr", "open");
		});
	});
});
