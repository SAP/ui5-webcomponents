import Tokenizer from "../../src/Tokenizer.js";
import Token from "../../src/Token.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base/dist/index.js";

const onTokenDelete = (event: UI5CustomEvent<Tokenizer, "token-delete">) => {
	event.detail.tokens.forEach(token => {
		(event.target as Tokenizer).removeChild(token);
	});
};

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

	it("tests token removal", () => {
		cy.mount(
			<Tokenizer id="test-token-delete" style={{ width: "100px" }} onTokenDelete={onTokenDelete}>
				<Token text="aute"></Token>
				<Token text="ad"></Token>
				<Token text="exercitation"></Token>
				<Token text="esse"></Token>
				<Token text="labore"></Token>
				<Token text="amet"></Token>
				<Token text="excepteur"></Token>
			</Tokenizer>
		);

		cy.get("#test-token-delete")
			.find("[ui5-token]")
			.should("have.length", 7);

		cy.get("#test-token-delete")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.realClick();

		cy.get("#test-token-delete")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("be.visible");

		cy.get("#test-token-delete")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]").eq(0)
			.shadow()
			.find(".ui5-li-deletebtn [ui5-button]")
			.realClick();

		cy.get("#test-token-delete")
			.find("[ui5-token]")
			.should("have.length", 6);
	});
});
