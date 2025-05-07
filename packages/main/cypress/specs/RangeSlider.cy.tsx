import RangeSlider from "../../src/RangeSlider.js";

describe("Accessibility", () => {
    it("should apply associated label text as aria-label on the slider element", () => {
        cy.mount(
			<>
			<label for="rs">label for RangeSlider</label>
			<RangeSlider id="rs" min={0} max={20}></RangeSlider>
			</>
		);

		cy.get('label[for="rs"]')
			.invoke('text')
			.then((labelText) => {

				cy.get("[ui5-range-slider]")
					.shadow()
					.find(".ui5-slider-progress")
					.should("have.attr", "aria-label", labelText);
			});
    });
});