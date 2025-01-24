import { html } from "lit";
import "../../src/Text.js";

describe("Text", () => {
	it("tests root element is bdi", () => {
		cy.mount(html`<ui5-text >Text</ui5-text>`);
		cy.get("[ui5-text]").shadow().find(":first-child").should("have.prop", "tagName", "SPAN");
	});

	it("tests default wrapping behavior", () => {
		cy.mount(html`<ui5-text >Text</ui5-text>`);
		cy.get("[ui5-text]").should("have.css", "word-wrap", "break-word");
	});

	it("tests maxLines default behavior", () => {
		cy.mount(html`<ui5-text >Text</ui5-text>`);
		cy.get("[ui5-text]").should("have.css", "-webkit-line-clamp", "none");
	});

	it("tests maxLines", () => {
		cy.mount(html`<ui5-text max-lines="1">Text</ui5-text>`);
		cy.get("[ui5-text]").should("have.css", "-webkit-line-clamp", "1");
	});

	it("tests emptyIndicatorMode", () => {
		cy.mount(html`<ui5-text empty-indicator-mode="On"></ui5-text>`);

		cy.get("[ui5-text]").shadow().find(".empty-indicator").should("have.text", "–");
		cy.get("[ui5-text]").shadow().find(".empty-indicator-aria-label").should("have.text", "Empty Value");
	});
});
