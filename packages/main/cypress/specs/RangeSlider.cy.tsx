import RangeSlider from "../../src/RangeSlider.js";

describe("Accessibility", () => {
	it("should apply associated label text as aria-label on the slider element", () => {
		const labelText = "basic range slider";
		cy.mount(
			<>
				<label for="rs">{labelText}</label>
				<RangeSlider id="rs" min={0} max={20}></RangeSlider>
			</>
		);

		cy.get("[ui5-range-slider]")
			.shadow()
			.find(".ui5-slider-progress")
			.should("have.attr", "aria-label", `${labelText} Range`);
    });
	it("Aria attributes of the progress bar are set correctly", () => {
		cy.mount(
			<RangeSlider id="range-slider-tickmarks" min={0} max={40} step={1} end-value={20} show-tickmarks></RangeSlider>
		);

		cy.get("#range-slider-tickmarks")
			.shadow()
			.find(".ui5-slider-progress")
			.as("sliderProgress");

		cy.get("ui5-range-slider").then(($el) => {
			const rangeSlider = $el[0] as RangeSlider;
			const minValue = rangeSlider.min;
			const maxValue = rangeSlider.max;
			const startValue = rangeSlider.startValue;
			const endValue = rangeSlider.endValue;

			cy.get("@sliderProgress")
			.should("have.attr", "aria-label", "Range");

			cy.get("@sliderProgress")
				.should("have.attr", "aria-valuemin", `${minValue}`);

			cy.get("@sliderProgress")
				.should("have.attr", "aria-valuemax", `${maxValue}`);

			cy.get("@sliderProgress")
				.should("have.attr", "aria-valuetext", `From ${startValue} to ${endValue}`);

			cy.get("@sliderProgress")
				.should("have.attr", "aria-valuenow", `${endValue}`);

		});
	});
});