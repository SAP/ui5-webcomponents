import { html } from "lit";
import "../../src/RatingIndicator.js";

describe("RatingIndicator", () => {
	describe("Half Icon appearance", () => {
		it("Half icon should be filled when rating indicator is disabled", () => {
			const attributeValue = "favorite";

			cy.mount(html`<ui5-rating-indicator value="2.5" disabled></ui5-rating-indicator>`);

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-half [ui5-icon]")
				.should("have.attr", "name", attributeValue);
		});

		it("Half icon should be filled when rating indicator is readonly", () => {
			const attributeValue = "favorite";

			cy.mount(html`<ui5-rating-indicator value="2.5" readonly></ui5-rating-indicator>`);

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-half [ui5-icon]")
				.should("have.attr", "name", attributeValue);
		});

		it("Half icon should be border only when rating indicator is regular", () => {
			const attributeValue = "unfavorite";

			cy.mount(html`<ui5-rating-indicator value="2.5"></ui5-rating-indicator>`);

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-half [ui5-icon]")
				.should("have.attr", "name", attributeValue);
		});
	});
});
