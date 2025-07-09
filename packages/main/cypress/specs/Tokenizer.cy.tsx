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

	it("handles overflow mechanism as expected", () => {
		cy.mount(
			<Tokenizer style={{ width: "100%" }}>
				<Token text="Andora"></Token>
				<Token text="Bulgaria"></Token>
				<Token text="Canada"></Token>
				<Token text="Denmark"></Token>
				<Token text="Estonia"></Token>
				<Token text="Andora"></Token>
			</Tokenizer>
		);

		cy.get("ui5-token")
			.eq(5)
			.as("lastToken");

		cy.get("@lastToken")
			.should("be.visible");

		cy.viewport(500, 600);

		cy.get("ui5-tokenizer")
			.shadow()
			.find("span")
			.should("have.attr", "aria-haspopup", "dialog")
			.as("n-more");

		cy.get("@lastToken")
			.should("be.hidden");

		cy.viewport(600, 600);

		cy.get("@lastToken")
			.should("be.visible");
	});
});

describe("Tokenizer - Popover List Item Text Updates", () => {
	it("updates list item text in popover when token text changes", () => {
		cy.mount(
			<Tokenizer id="test-token-text-update" style={{ width: "100px" }}>
				<Token text="Original Text" id="token-to-modify"></Token>
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
			.find(".ui5-tokenizer-more-text")
			.realClick();

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("be.visible");

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]")
			.eq(0)
			.should("have.attr", "text", "Original Text");

		cy.get("#token-to-modify").invoke("prop", "text", "Updated Text");

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]")
			.eq(0)
			.should("have.attr", "text", "Updated Text");

		cy.get("#test-token-text-update")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]")
			.eq(0)
			.should("not.have.attr", "text", "Original Text");
	});

	it("updates multiple list items when multiple token texts change", () => {
		cy.mount(
			<Tokenizer id="test-multiple-token-updates" style={{ width: "100px" }}>
				<Token text="Token 1" id="token-1"></Token>
				<Token text="Token 2" id="token-2"></Token>
				<Token text="Token 3" id="token-3"></Token>
				<Token text="Denmark"></Token>
				<Token text="Estonia"></Token>
			</Tokenizer>
		);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.realClick();

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]")
			.eq(0)
			.should("have.attr", "text", "Token 1");

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]")
			.eq(1)
			.should("have.attr", "text", "Token 2");

		cy.get<Token>("[ui5-token]").eq(0).invoke("prop", "text", "Modified Token 1");
		cy.get<Token>("[ui5-token]").eq(1).invoke("prop", "text", "Modified Token 2");

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]")
			.eq(0)
			.should("have.attr", "text", "Modified Token 1");

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]")
			.eq(1)
			.should("have.attr", "text", "Modified Token 2");

		// Verify unchanged token remains the same
		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]")
			.eq(2)
			.should("have.attr", "text", "Token 3");
	});
});
