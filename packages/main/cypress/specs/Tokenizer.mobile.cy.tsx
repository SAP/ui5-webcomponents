import Tokenizer from "../../src/Tokenizer.js";
import Token from "../../src/Token.js";
import { TOKENIZER_DIALOG_OK_BUTTON, TOKENIZER_DIALOG_CANCEL_BUTTON } from "../../src/generated/i18n/i18n-defaults.js";

describe("Phone mode", () => {
    beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

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

        cy.get("[ui5-tokenizer]")
            .as("tokenizer");

        cy.get("@tokenizer")
            .shadow()
            .find(".ui5-tokenizer-more-text")
            .click();

        cy.get("@tokenizer")
            .shadow()
            .find("[ui5-responsive-popover]")
            .as("popover");

        cy.get("@popover")
            .should("have.attr", "open");

        cy.get("@popover")
            .find(".ui5-responsive-popover-footer")
            .as("footer");

        cy.get("@footer")
            .find("[ui5-button]")
            .eq(0)
            .should("have.text", TOKENIZER_DIALOG_OK_BUTTON.defaultText);

        cy.get("@footer")
            .find("[ui5-button]")
            .eq(1)
            .should("have.text", TOKENIZER_DIALOG_CANCEL_BUTTON.defaultText);
    });
})