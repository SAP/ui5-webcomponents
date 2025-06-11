import RangeSlider from "../../src/RangeSlider.js";


describe("Range Slider elements - tooltip, step, tickmarks, labels", () => {
	it("Range Slider tooltips are displayed showing the current value", () => {
		cy.get('[data-cy-root]')
			.invoke('css', 'padding', '100px')

		cy.mount(<RangeSlider id="basic-range-slider-with-tooltip" min={50} max={200} showTooltip></RangeSlider>);

		cy.get("ui5-range-slider").as("rangeSlider");

		cy.get("@rangeSlider").realClick();

		cy.get('@rangeSlider')
			.shadow()
			.find('[data-sap-ui-start-value]')
			.as('startTooltip');

		cy.get('@rangeSlider')
			.shadow()
			.find('[data-sap-ui-end-value]')
			.as('endTooltip');


		cy.get("@rangeSlider").invoke("attr", "start-value", 65);
		cy.get("@startTooltip").shadow().find(".ui5-slider-tooltip-value").should("have.text", "65");

		cy.get("@rangeSlider").invoke("attr", "end-value", 115);
		cy.get("@endTooltip").shadow().find(".ui5-slider-tooltip-value").should("have.text", "115");
	});

	it("Tooltip input is displayed showing the current value", () => {
		cy.mount(
			<RangeSlider id="range-slider-tickmarks-labels" min={0} max={20} startValue={8} endValue={12} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("ui5-range-slider").as("rangeSlider");

		cy.get("@rangeSlider").realClick();

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.shadow()
			.find("ui5-input")
			.as("startTooltipInput");

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-end-value]')
			.shadow()
			.find("ui5-input")
			.as("endTooltipInput");

		cy.get("@startTooltipInput")
			.should("have.attr", "value", "8");

		cy.get("@endTooltipInput")
			.should("have.attr", "value", "12");
	});

	it("Input tooltips value change should change the range slider's value", () => {
		cy.mount(
			<RangeSlider id="range-slider-tickmarks-labels" min={0} max={20} startValue={4} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("ui5-range-slider").as("rangeSlider");

		cy.get("@rangeSlider").realClick();

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.shadow()
			.find("ui5-input")
			.as("startTooltipInput");

		cy.get("@startTooltipInput")
			.realClick()
			.clear()
			.realType("8");

		cy.get("@startTooltipInput").realPress("Enter");

		cy.get("@rangeSlider").invoke("attr", "start-value").should("eq", "8");
	});

	it("Input tooltip value change should fire change event", () => {
		cy.mount(
			<RangeSlider id="range-slider-tickmarks-labels" min={0} max={20} startValue={1} showTooltip editableTooltip></RangeSlider>
		);

		let changeCount = 0;

		cy.get("#range-slider-tickmarks-labels").as("rangeSlider");

		cy.get("ui5-range-slider").then($slider => {
			$slider[0].addEventListener("ui5-change", () => {
				changeCount++;
			});
		});

		cy.get("@rangeSlider").realClick();

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.shadow()
			.find("ui5-input")
			.as("startTooltipInput");

		cy.get("@startTooltipInput")
			.realClick()
			.clear()
			.realType("4");

		cy.get("@startTooltipInput").realPress("Enter");

		cy.then(() => {
			expect(changeCount).to.equal(1);
		});
	});

	it("Input tooltips value state should change to 'Negative' if value is invalid", () => {
		cy.mount(
			<RangeSlider id="range-slider-tickmarks-labels" min={0} max={20} startValue={1} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("ui5-range-slider").as("rangeSlider");

		cy.get("@rangeSlider").realClick();

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.shadow()
			.find("ui5-input")
			.as("startTooltipInput");

		cy.get("@startTooltipInput")
			.realClick()
			.clear()
			.realType("23");

		cy.get("@startTooltipInput").realPress("Enter");

		cy.get("@startTooltipInput")
			.should("have.attr", "value-state", "Negative");
	});

	it("Input tooltip should become hidden when input loses focus", () => {
		cy.mount(
			<>
				<RangeSlider id="range-slider-tickmarks-labels" min={0} max={20} startValue={5} showTooltip editableTooltip></RangeSlider>
				<RangeSlider id="basic-range-slider" min={0} max={20}></RangeSlider>
			</>
		);

		cy.get("#range-slider-tickmarks-labels").as("rangeSlider");
		cy.get("#basic-range-slider").as("anotherSlider");

		cy.get("@rangeSlider").realClick();

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.as("startTooltip");

		cy.get("@startTooltip").should("have.prop", "open", true);

		cy.get("@anotherSlider").realClick();

		cy.get("@startTooltip").should("have.prop", "open", false);
	});

	it("F2 should switch the focus between the handle and the tooltip input", () => {
		cy.mount(
			<RangeSlider id="range-slider-tickmarks-labels" min={0} max={20} startValue={5} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("ui5-range-slider").as("rangeSlider");

		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("rangeSliderHandle");

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.shadow()
			.find("ui5-input")
			.as("rangeSliderStartTooltipInput");

		cy.get("@rangeSliderHandle").realClick();
		cy.realPress("F2");

		cy.get("@rangeSliderStartTooltipInput").should("have.focus");

		cy.realPress("F2");

		cy.get("@rangeSliderHandle").should("have.focus");
	});

	it("Arrow up/down should not increase/decrease the value of the input", () => {
		cy.mount(
			<RangeSlider id="range-slider-tickmarks-labels" min={0} max={20} startValue={1} endValue={10} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("ui5-range-slider").as("rangeSlider");

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.shadow()
			.find("ui5-input")
			.as("startTooltipInput");

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-end-value]')
			.shadow()
			.find("ui5-input")
			.as("endTooltipInput");

		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("startHandle");

		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--end")
			.as("endHandle");

		cy.get("@startHandle").realClick();
		cy.get("@startTooltipInput").realClick();
		cy.realPress("ArrowUp");

		cy.get("@rangeSlider").invoke("attr", "start-value").should("eq", "1");

		cy.realPress("ArrowDown");

		cy.get("@rangeSlider").invoke("attr", "start-value").should("eq", "1");

		cy.get("@endHandle").realClick();
		cy.get("@endTooltipInput").realClick();
		cy.realPress("ArrowUp");

		cy.get("@rangeSlider").invoke("attr", "end-value").should("eq", "10");

		cy.realPress("ArrowDown");

		cy.get("@rangeSlider").invoke("attr", "end-value").should("eq", "10");
	});

	it("Tab on slider handle should not move the focus to the tooltip input", () => {
		cy.mount(
			<>
				<RangeSlider id="slider-tickmarks-labels" editableTooltip min={0} max={20} />
			</>
		);

		cy.get("ui5-range-slider").as("rangeSlider");

		// Start value handle and input
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("startHandle");

		// End value handle and input
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--end")
			.as("endHandle");

		cy.get("@startHandle").realClick();

		cy.realPress("Tab");

		cy.get("@endHandle").should("be.focused");
	});

	it("Focus out with invalid value should reset it", () => {
		cy.mount(
			<RangeSlider id="range-slider-tickmarks-labels" min={0} max={20} startValue={2} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("#range-slider-tickmarks-labels").as("rangeSlider");

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.shadow()
			.find("ui5-input")
			.as("startTooltipInput");

		cy.get("@rangeSlider").realClick();

		cy.get("@startTooltipInput").realClick().realType("23");

		cy.realPress("Tab");

		cy.get("@startTooltipInput").should("have.attr", "value", "2");
	});

	it("Input values should be swapped if the start value is bigger than the end value", () => {
		cy.mount(
			<RangeSlider id="range-slider-tickmarks-labels" min={0} max={20} startValue={0} endValue={1} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("ui5-range-slider").as("rangeSlider");

		// Start value handle and input
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("startHandle");

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.shadow()
			.find("ui5-input")
			.as("startTooltipInput");

		// End value handle and input
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--end")
			.as("endHandle");

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-end-value]')
			.shadow()
			.find("ui5-input")
			.as("endTooltipInput");

		// Set start value to 20
		cy.get("@startHandle").realClick();
		cy.get("@startTooltipInput").realClick().clear().realType("20");
		cy.get("@startTooltipInput").realPress("Enter");

		// Assert that start and end values are swapped
		cy.get("@rangeSlider").invoke("attr", "end-value").should("eq", "20");
		cy.get("@endTooltipInput").should("have.attr", "value", "20");
	});

	it("Input values should be swapped if the end value is lower than the start value", () => {
		cy.mount(
			<RangeSlider id="range-slider-tickmarks-labels" min={0} max={20} startValue={2} endValue={3} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("ui5-range-slider").as("rangeSlider");

		// Start value input
		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.shadow()
			.find("ui5-input")
			.as("startTooltipInput");

		// End value input
		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-end-value]')
			.shadow()
			.find("ui5-input")
			.as("endTooltipInput");

		// End value handle
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--end")
			.as("endHandle");

		// Set end value to 1
		cy.get("@endHandle").realClick();
		cy.get("@endTooltipInput").realClick().clear().realType("1");
		cy.get("@endTooltipInput").realPress("Enter");

		// Assert that start and end values are swapped
		cy.get("@rangeSlider").invoke("attr", "start-value").should("eq", "1");
		cy.get("@startTooltipInput").should("have.attr", "value", "1");
	});

	it("Invalid tooltip value should not be changed on 'Enter'", () => {
		cy.mount(
			<RangeSlider id="range-slider-tickmarks-labels" min={0} max={20} endValue={12} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("ui5-range-slider").as("rangeSlider");

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-end-value]')
			.shadow()
			.find("ui5-input")
			.as("endTooltipInput");

		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--end")
			.as("endHandle");

		cy.get("@endHandle").realClick();
		cy.get("@endTooltipInput").realClick().clear().realType("60");
		cy.get("@endTooltipInput").realPress("Enter");

		cy.get("@rangeSlider").invoke("attr", "end-value").should("eq", "12");

		cy.get("@endTooltipInput").should("have.attr", "value-state", "Negative");

		cy.get("@endTooltipInput").should("have.attr", "value", "60");

		cy.get("@endTooltipInput").realPress("Tab");

		cy.get("@endTooltipInput").should("have.attr", "value", "12");

	});

	it("Range Slider tooltips should become hidden if the range slider loses focus", () => {
		cy.mount(
			<>
				<RangeSlider id="basic-range-slider-with-tooltip" min={0} max={20} showTooltip editableTooltip />
				<RangeSlider id="basic-range-slider" min={0} max={20} />
			</>
		);

		cy.get("#basic-range-slider-with-tooltip").as("rangeSlider");
		cy.get("#basic-range-slider").as("anotherSlider");

		cy.get("@rangeSlider").realClick();

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.as("startTooltip");

		cy.get("@startTooltip").should("have.prop", "open", true);

		cy.get("@anotherSlider").realClick();

		cy.get("@startTooltip").should("have.prop", "open", false);
	});
});

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