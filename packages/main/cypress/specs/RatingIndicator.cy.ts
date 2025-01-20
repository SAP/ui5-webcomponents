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

	describe("RatingIndicator Sizes", () => {
		it("should apply correct size and spacing for size 'S'", () => {
			cy.mount(html`<ui5-rating-indicator size="S" value="3"></ui5-rating-indicator>`);

			cy.get("ui5-rating-indicator")
				.shadow()
				.find("li.ui5-rating-indicator-item.ui5-rating-indicator-item-sel")
				.should("have.css", "height", "22px")
				.should("have.css", "margin-right", "3px");
		});
		it("should apply correct size and spacing for size 'L' readonly", () => {
			cy.mount(html`<ui5-rating-indicator size="L" value="3.5" readonly></ui5-rating-indicator>`);

			cy.get("ui5-rating-indicator")
				.shadow()
				.find("li.ui5-rating-indicator-item.ui5-rating-indicator-item-sel")
				.should("have.css", "height", "32px")
				.should("have.css", "margin-right", "4px");

			cy.get("ui5-rating-indicator")
				.shadow()
				.find("li.ui5-rating-indicator-item.ui5-rating-indicator-item-unsel")
				.find("ui5-icon")
				.should("have.css", "height", "24px");
		});
	});

	describe("RatingIndicator Accessibility", () => {
		it("should be able to tab after and before readonly element", () => {
			cy.mount(html`
				<button>Before</button>
				<ui5-rating-indicator value="3" readonly></ui5-rating-indicator>
				<button>after</button>
			`);

			cy.get("button:first").realClick();
			cy.focused().should("contain", "Before");

			// press tab
			cy.realPress("Tab");
			cy.realPress("Tab");

			cy.focused().should("contain", "after");

			// press shift + tab
			cy.realPress(["Shift", "Tab"]);
			cy.realPress(["Shift", "Tab"]);

			cy.focused().should("contain", "Before");
		});
	});
});
