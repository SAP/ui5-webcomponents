import Tokenizer from "../../src/Tokenizer.js";
import Token from "../../src/Token.js";

describe("Tokenizer - multi-line and Clear All", () => {
	it("'Clear All' link is rendered for multi-line tokenizer and show-clear-all set to true", () => {
		cy.mount(
			<Tokenizer showClearAll={true} multiLine={true}>
				<Token text="Andora"></Token>
				<Token text="Bulgaria"></Token>
				<Token text="Canada"></Token>
				<Token text="Denmark"></Token>
				<Token text="Estonia"></Token>
				<Token text="Finland"></Token>
				<Token text="Germany"></Token>
			</Tokenizer>
		);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--clear-all")
			.should("exist");
	});

	it("'Clear All' link is rendered even for 1 token when in multi-line mode", () => {
		cy.mount(
			<Tokenizer showClearAll={true} multiLine={true}>
				<Token text="Andora"></Token>
			</Tokenizer>
		);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--clear-all")
			.should("exist");
	});

	it("'Clear All' link is not rendered for single-line tokenizer even when show-clear-all is set to true", () => {
		cy.mount(
			<Tokenizer showClearAll={true}>
				<Token text="Andora"></Token>
			</Tokenizer>
		);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--clear-all")
			.should("not.exist");
	});

	it("'Clear All' link is not rendered for multi-line tokenizer when show-clear-all is set to false", () => {
		cy.mount(
			<Tokenizer multiLine={true}>
				<Token text="Andora"></Token>
				<Token text="Bulgaria"></Token>
				<Token text="Canada"></Token>
				<Token text="Denmark"></Token>
				<Token text="Estonia"></Token>
				<Token text="Finland"></Token>
				<Token text="Germany"></Token>
			</Tokenizer>
		);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--clear-all")
			.should("not.exist");
	});

	it("'Clear All' link is not rendered for multi-line readonly tokenizer when show-clear-all 'true'", () => {
		cy.mount(
			<Tokenizer showClearAll={true} multiLine={true} readonly={true}>
				<Token text="Andora"></Token>
				<Token text="Bulgaria"></Token>
				<Token text="Canada"></Token>
				<Token text="Denmark"></Token>
				<Token text="Estonia"></Token>
				<Token text="Finland"></Token>
				<Token text="Germany"></Token>
			</Tokenizer>
		);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--clear-all")
			.should("not.exist");
	});

	it("'n-more' link is not rendered for multi-line tokenizer", () => {
		cy.mount(
			<Tokenizer multiLine={true} style={{ width: "100px" }}>
				<Token text="Andora"></Token>
				<Token text="Bulgaria"></Token>
				<Token text="Canada"></Token>
				<Token text="Denmark"></Token>
				<Token text="Estonia"></Token>
				<Token text="Finland"></Token>
				<Token text="Germany"></Token>
			</Tokenizer>
		);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--more-text")
			.should("not.exist");
	});

	it("Pressing 'Clear All' link fires token-delete event", () => {
		cy.mount(
			<Tokenizer multiLine={true} showClearAll={true}>
				<Token text="Andora"></Token>
				<Token text="Bulgaria"></Token>
				<Token text="Canada"></Token>
			</Tokenizer>
		);

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
