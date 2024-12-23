import { html } from "lit";
import "../../src/Card.js";
import "../../src/CardHeader.js";

const interactiveCardHeader = html` <ui5-card>
	<ui5-card-header
        id="cardHeader1"
		slot="header"
		additional-text="4 of 10"
		title-text="Quick Links"
		subtitle-text="Quick links sub title"
		interactive
	>
	</ui5-card-header>
</ui5-card>`;

const cardHeader = html` <ui5-card>
	<ui5-card-header
        id="cardHeader2"
		slot="header"
		additional-text="4 of 10"
		title-text="Quick Links"
		subtitle-text="Quick links sub title"
	>
	</ui5-card-header>
</ui5-card>`;

describe("Card header", () => {
	it("Tests that aria attribute are correct on interactive header", () => {
		cy.mount(interactiveCardHeader);

		// assert
		cy.get("#cardHeader1")
			.shadow()
			.find(".ui5-card-header-focusable-element")
			.should("have.attr", "role", "button");
		cy.get("#cardHeader1")
			.shadow()
			.find(".ui5-card-header-focusable-element")
			.should("have.attr", "tabindex", "0");
		cy.get("#cardHeader1")
			.shadow()
			.find(".ui5-card-header-focusable-element")
			.should("have.attr", "aria-roledescription", "Interactive Card Header");
	});
	it("Tests that aria attribute are correct on a header", () => {
		cy.mount(cardHeader);

		// assert
		cy.get("#cardHeader2")
			.shadow()
			.find(".ui5-card-header-focusable-element")
			.should("have.attr", "role", "group");
		cy.get("#cardHeader2")
			.shadow()
			.find(".ui5-card-header-focusable-element")
			.should("have.attr", "tabindex", "0");
		cy.get("#cardHeader2")
			.shadow()
			.find(".ui5-card-header-focusable-element")
			.should("have.attr", "aria-roledescription", "Card Header");
	});
});
