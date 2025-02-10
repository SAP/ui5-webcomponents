import RatingIndicator from "../../src/RatingIndicator.js";

describe("RatingIndicator", () => {
	describe("Half Icon appearance", () => {
		it("Half icon should be filled when rating indicator is disabled", () => {
			const attributeValue = "favorite";

			cy.mount(<RatingIndicator value={2.5} disabled={true}></RatingIndicator>);

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-half [ui5-icon]")
				.should("have.attr", "name", attributeValue);
		});

		it("Half icon should be filled when rating indicator is readonly", () => {
			const attributeValue = "favorite";

			cy.mount(<RatingIndicator value={2.5} readonly={true}></RatingIndicator>);

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-half [ui5-icon]")
				.should("have.attr", "name", attributeValue);
		});

		it("Half icon should be border only when rating indicator is regular", () => {
			const attributeValue = "unfavorite";

			cy.mount(<RatingIndicator value={2.5}></RatingIndicator>);

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-half [ui5-icon]")
				.should("have.attr", "name", attributeValue);
		});
	});

	describe("RatingIndicator Sizes", () => {
		it("should apply correct size and spacing for size 'S'", () => {
			cy.mount(<RatingIndicator size="S" value={3}></RatingIndicator>);

			cy.get("ui5-rating-indicator")
				.shadow()
				.find("li.ui5-rating-indicator-item.ui5-rating-indicator-item-sel")
				.should($el => {
					const height = parseFloat($el.css("height"));
					expect(height).to.be.greaterThan(21.9);
					expect(height).to.be.lessThan(22.1);
				  });
		});
		it("should apply correct size and spacing for size 'L' readonly", () => {
			cy.mount(<RatingIndicator size="L" value={3.5} readonly={true}></RatingIndicator>);

			cy.get("ui5-rating-indicator")
				.shadow()
				.find("li.ui5-rating-indicator-item.ui5-rating-indicator-item-sel")
				.should($el => {
					const height = parseFloat($el.css("height"));
					expect(height).to.be.greaterThan(31.9);
					expect(height).to.be.lessThan(32.1);
				  })
				.should("have.css", "margin-right", "4px");

			cy.get("ui5-rating-indicator")
				.shadow()
				.find("li.ui5-rating-indicator-item.ui5-rating-indicator-item-unsel")
				.find("ui5-icon")
				.should($el => {
					const height = parseFloat($el.css("height"));
					expect(height).to.be.greaterThan(23.9);
					expect(height).to.be.lessThan(24.1);
				  });
		});
	});

	describe("RatingIndicator Accessibility", () => {
		it("should be able to tab after and before readonly element", () => {
			cy.mount(
				<>
					<button>Before</button>
					<RatingIndicator value={3} readonly={true}></RatingIndicator>
					<button>after</button>
				</>
			);

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
