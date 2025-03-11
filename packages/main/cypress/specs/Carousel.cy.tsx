import Carousel from "../../src/Carousel.js";
import Text from "../../src/Text.js";

describe("Accessibility", () => {
	it("tests carousel aria roles", () => {
		cy.mount(
			<Carousel id="carousel">
				<Text id="text">Test</Text>
			</Carousel>
		);

		cy.get("#carousel")
			.shadow()
			.find(".ui5-carousel-root")
			.should("have.attr", "role", "list");

		cy.get("#carousel")
			.shadow()
			.find(".ui5-carousel-item")
			.should("have.attr", "role", "listitem");

		cy.get("#carousel")
			.shadow()
			.find(".ui5-carousel-root")
			.should("have.attr", "aria-roledescription", "Carousel");
	});
});
