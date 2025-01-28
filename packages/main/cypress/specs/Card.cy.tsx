import Card from "../../src/Card.js";
import CardHeader from "../../src/CardHeader.js";

describe("Card header", () => {
	it("Tests that aria attribute are correct on interactive header", () => {
		cy.mount(
			<Card>
				<CardHeader
					id="cardHeader1"
					slot="header"
					additionalText="4 of 10"
					titleText="Quick Links"
					subtitleText="Quick links sub title"
					interactive={true}
				>
				</CardHeader>
			</Card>
		);

		// assert
		cy.get("#cardHeader1")
			.shadow()
			.find(".ui5-card-header-focusable-element")
			.should("have.attr", "role", "button")
			.and("have.attr", "tabindex", "0")
			.and("have.attr", "aria-roledescription", "Interactive Card Header");
	});

	it("Tests that aria attribute are correct on a header", () => {
		cy.mount(
			<Card>
				<CardHeader
					id="cardHeader2"
					slot="header"
					additionalText="4 of 10"
					titleText="Quick Links"
					subtitleText="Quick links sub title"
				>
				</CardHeader>
			</Card>
		);

		// assert
		cy.get("#cardHeader2")
			.shadow()
			.find(".ui5-card-header-focusable-element")
			.should("have.attr", "role", "group")
			.and("have.attr", "tabindex", "0")
			.and("have.attr", "aria-roledescription", "Card Header");
	});
});
