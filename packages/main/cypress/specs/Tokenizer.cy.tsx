import Tokenizer from "../../src/Tokenizer.js";
import Token from "../../src/Token.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base/dist/index.js";
import { TOKENIZER_DIALOG_OK_BUTTON, TOKENIZER_DIALOG_CANCEL_BUTTON } from "../../src/generated/i18n/i18n-defaults.js";

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
describe("Phone mode", () => {
		it("verifies OK and Cancel button texts in mobile dialog", () => {
		cy.mount(
			<Tokenizer style={{ width: "50%" }}>
				<Token text="Andora"></Token>
				<Token text="Bulgaria"></Token>
				<Token text="Canada"></Token>
				<Token text="Denmark"></Token>
				<Token text="Estonia"></Token>
			</Tokenizer>
		);

		cy.ui5SimulateDevice("phone");

		cy.get("ui5-tokenizer")
			.as("tokenizer");

		cy.get("@tokenizer")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.click();

		cy.get("@tokenizer")
			.shadow()
			.find("ui5-responsive-popover")
			.as("popover");

		cy.get("@popover")
			.should("have.attr", "open");

		cy.get("@popover")
			.find(".ui5-responsive-popover-footer")
			.as("footer");

		cy.get("@footer")
			.find("ui5-button")
			.eq(0)
			.should("have.text", TOKENIZER_DIALOG_OK_BUTTON.defaultText);

		cy.get("@footer")
			.find("ui5-button")
			.eq(1)
			.should("have.text", TOKENIZER_DIALOG_CANCEL_BUTTON.defaultText);
	});
})
