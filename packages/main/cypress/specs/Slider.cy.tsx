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
	it("aria-keyshortcuts should not be set on regular slider", () => {
		cy.mount(
			<Slider min={0} max={20}></Slider>
		);

		cy.get("[ui5-slider]")
			.shadow()
			.find(".ui5-slider-handle")
			.should("not.have.attr", "aria-keyshortcuts");
	});

	it("aria-keyshortcuts should be set on slider with editable tooltips", () => {
		cy.mount(
			<Slider editableTooltip={true} min={0} max={20}></Slider>
		);

		cy.get("[ui5-slider]")
			.shadow()
			.find(".ui5-slider-handle")
			.should("have.attr", "aria-keyshortcuts");
	});
});