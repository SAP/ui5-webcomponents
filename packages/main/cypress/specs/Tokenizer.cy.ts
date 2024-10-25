import { html } from "lit";
import "../../src/Tokenizer.js";
import type Tokenizer from "../../src/Tokenizer.js";

describe("Tokenizer - multi-line and Clear All", () => {
	it("'Clear All' link is rendered for multi-line tokenizer and show-clear-all set to true", () => {
		cy.mount(html`<ui5-tokenizer show-clear-all multi-line>
			<ui5-token text="Andora"></ui5-token>
			<ui5-token text="Bulgaria"></ui5-token>
			<ui5-token text="Canada"></ui5-token>
			<ui5-token text="Denmark"></ui5-token>
			<ui5-token text="Estonia"></ui5-token>
			<ui5-token text="Finland"></ui5-token>
			<ui5-token text="Germany"></ui5-token>
		</ui5-tokenizer>`);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--clear-all")
			.should("exist");
	});

	it("'Clear All' link is rendered even for 1 token when in multi-line mode", () => {
		cy.mount(html`<ui5-tokenizer show-clear-all multi-line>
			<ui5-token text="Andora"></ui5-token>
		</ui5-tokenizer>`);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--clear-all")
			.should("exist");
	});

	it("'Clear All' link is not rendered for single-line tokenizer even when show-clear-all is set to true", () => {
		cy.mount(html`<ui5-tokenizer show-clear-all>
						<ui5-token text="Andora"></ui5-token>
					</ui5-tokenizer>`);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--clear-all")
			.should("not.exist");
	});

	it("'Clear All' link is not rendered for multi-line tokenizer when show-clear-all is set to false", () => {
		cy.mount(html`<ui5-tokenizer multi-line>
			<ui5-token text="Andora"></ui5-token>
			<ui5-token text="Bulgaria"></ui5-token>
			<ui5-token text="Canada"></ui5-token>
			<ui5-token text="Denmark"></ui5-token>
			<ui5-token text="Estonia"></ui5-token>
			<ui5-token text="Finland"></ui5-token>
			<ui5-token text="Germany"></ui5-token>
		</ui5-tokenizer>`);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--clear-all")
			.should("not.exist");
	});

	it("'n-more' link is not rendered for multi-line tokenizer", () => {
		cy.mount(html`<ui5-tokenizer multi-line style="width: 100px;">
			<ui5-token text="Andora"></ui5-token>
			<ui5-token text="Bulgaria"></ui5-token>
			<ui5-token text="Canada"></ui5-token>
			<ui5-token text="Denmark"></ui5-token>
			<ui5-token text="Estonia"></ui5-token>
			<ui5-token text="Finland"></ui5-token>
			<ui5-token text="Germany"></ui5-token>
		</ui5-tokenizer>`);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--more-text")
			.should("not.exist");
	});

	it("Pressing 'Clear All' link fires token-delete event", () => {
		cy.mount(html`<ui5-tokenizer show-clear-all multi-line>
			<ui5-token text="Andora"></ui5-token>
			<ui5-token text="Bulgaria"></ui5-token>
			<ui5-token text="Canada"></ui5-token>
		</ui5-tokenizer>`);

		cy.get<Tokenizer>("[ui5-tokenizer]").then($tokenizer => $tokenizer.get(0).addEventListener("token-delete", cy.stub().as("delete")));

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--clear-all")
			.eq(0)
			.click();

		cy.get("@delete")
			.should("have.been.calledOnce");
	});
});
