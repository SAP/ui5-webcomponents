import Slider from "../../src/Slider.js";

describe("General interactions", () => {
	it("Fire change event on keyup", () => {
		let changeCount = 0;
		cy.mount(
			<Slider min={0} max={20}></Slider>
		);

		cy.get("[ui5-slider]").then($slider => {
			$slider[0].addEventListener("ui5-change", () => {
				changeCount++;
			});
		});

		// First 'change' event is fired when the slider is clicked
		cy.get("[ui5-slider]").click();

		// Second 'change' event is fired on keyboard interaction
		cy.get("[ui5-slider]").realPress("ArrowRight");

		cy.then(() => {
			expect(changeCount).to.equal(2);
		});
	});
});
describe("Accessibility", () => {
	it("should apply associated label text as aria-label on the slider element", () => {
		cy.mount(
			<>
			<label for="slider">label for slider</label>
			<Slider id="slider" min={0} max={20}></Slider>
			</>
		);

		cy.get('label[for="slider"]')
			.invoke('text')
			.then((labelText) => {

				cy.get("[ui5-slider]")
					.shadow()
					.find(".ui5-slider-handle")
					.should("have.attr", "aria-label", labelText);
			});
	});
});
