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
	// it("Tooltip input should not be closed on focusout if input tooltip is clicked", () => {
	// 	cy.mount(
	// 		<RangeSlider id="range-slider-tickmarks-labels" min={0} max={20} startValue={8} endValue={12} showTooltip editableTooltip></RangeSlider>
	// 	);

	// 	cy.get("ui5-range-slider").as("rangeSlider");

	// 	cy.get("@rangeSlider").realClick();

	// 	cy.get("@rangeSlider")
	// 		.shadow()
	// 		.find('[data-sap-ui-start-value]')
	// 		.shadow()
	// 		.find("ui5-input")
	// 		.as("startTooltipInput");

	// 	cy.get("@rangeSlider")
	// 		.should("have.attr", "_tooltipVisibility", "visible");

	// 	cy.get("@startTooltipInput").realClick();

	// 	cy.get("@startTooltipInput")
	// 		.should("have.focus");
	// });

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

	// it("Input tooltip should become hidden when input loses focus", () => {
	// 	cy.mount(
	// 		<>
	// 			<RangeSlider id="range-slider-tickmarks-labels" min={0} max={20} startValue={5} showTooltip editableTooltip></RangeSlider>
	// 			<RangeSlider id="basic-range-slider" min={0} max={20}></RangeSlider>
	// 		</>
	// 	);

	// 	cy.get("#range-slider-tickmarks-labels").as("rangeSlider");
	// 	cy.get("#basic-range-slider").as("anotherSlider");

	// 	cy.get("@rangeSlider").realClick();

	// 	cy.get("@rangeSlider")
	// 		.shadow()
	// 		.find('[data-sap-ui-start-value]')
	// 		.shadow()
	// 		.find("ui5-input")
	// 		.as("startTooltipInput");

	// 	cy.get("@startTooltipInput").realClick();

	// 	cy.get("@rangeSlider").should("have.attr", "_tooltipVisibility", "visible");

	// 	cy.get("@anotherSlider").realClick();

	// 	cy.get("@rangeSlider").should("have.attr", "_tooltipVisibility", "hidden");
	// });
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

		// Focus on the handle and press F2
		cy.get("@rangeSliderHandle").realClick();
		cy.realPress("F2");

		// Assert that the tooltip input is focused
		cy.get("@rangeSliderStartTooltipInput").should("have.focus");

		// Press F2 again
		cy.realPress("F2");

		// Assert that the handle is focused
		cy.get("@rangeSliderHandle").should("have.focus");
	});

	it("Arrow up/down should not increase/decrease the value of the input", () => {
		cy.mount(
			<RangeSlider id="range-slider-tickmarks-labels" min={0} max={20} startValue={1} endValue={10} showTooltip editableTooltip></RangeSlider>
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

		// Start value handle
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("startHandle");

		// End value handle
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--end")
			.as("endHandle");

		// Test arrow up/down on start value
		cy.get("@startHandle").realClick();
		cy.get("@startTooltipInput").realClick();
		cy.realPress("ArrowUp");
		cy.get("@rangeSlider").invoke("attr", "start-value").should("eq", "1");
		cy.realPress("ArrowDown");
		cy.get("@rangeSlider").invoke("attr", "start-value").should("eq", "1");

		// Test arrow up/down on end value
		cy.get("@endHandle").realClick();
		cy.get("@endTooltipInput").realClick();
		cy.realPress("ArrowUp");
		cy.get("@rangeSlider").invoke("attr", "end-value").should("eq", "10");
		cy.realPress("ArrowDown");
		cy.get("@rangeSlider").invoke("attr", "end-value").should("eq", "10");
	});
	// it("Tab on slider handle should not move the focus to the tooltip input", () => {
	// 	cy.mount(
	// 		<RangeSlider id="range-slider-tickmarks-labels" min={0} max={20} startValue={5} endValue={15} showTooltip editableTooltip></RangeSlider>
	// 	);

	// 	cy.get("ui5-range-slider").as("rangeSlider");
	// 	cy.get("@rangeSlider").realClick();

	// 	// Start value input
	// 	cy.get("@rangeSlider")
	// 		.shadow()
	// 		.find('[data-sap-ui-start-value]')
	// 		.as("startTooltipHandle");


	// 	cy.get("@startTooltipHandle").realClick();
	// 	cy.get("@startTooltipHandle").realPress("Tab");
	// 	// Assert that the focus is still on the start handle and not on the tooltip input
	// 	cy.get("@rangeSlider")
	// 		.shadow()
	// 		.find(".ui5-slider-handle--end")
	// 		.should("have.focus");
	// });

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

	// it("Input values should be swapped if the start value is bigger than the end value", async () => {
	// 	const rangeSlider = await browser.$("#range-slider-tickmarks-labels");
	// 	const rangeSliderStartHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");
	// 	const rangeSliderEndHandle = await rangeSlider.shadow$(".ui5-slider-handle--end");

	// 	const rangeSliderEndTooltipInput = await rangeSlider.shadow$(".ui5-slider-tooltip--end ui5-input");
	// 	const rangeSliderStartTooltipInput = await rangeSlider.shadow$(".ui5-slider-tooltip--start ui5-input");

	// 	await rangeSlider.setProperty("startValue", 0);
	// 	await rangeSlider.setProperty("endValue", 1);

	// 	await rangeSliderStartHandle.click();
	// 	await rangeSliderStartTooltipInput.click();
	// 	await browser.keys("2");
	// 	await browser.keys("Enter");

	// 	assert.strictEqual(await rangeSlider.getProperty("endValue"), 20, "The start value is now end value");
	// 	assert.strictEqual(await rangeSliderEndTooltipInput.getProperty("value"), "20", "The start input value is now end value");

	// 	await rangeSliderEndHandle.click();
	// 	await rangeSliderEndTooltipInput.click();
	// 	await rangeSliderEndTooltipInput.setProperty("value", "3");

	// 	await browser.keys("Enter");

	// 	assert.strictEqual(await rangeSlider.getProperty("endValue"), 3, "Slider value is changed on a followup input after initial swap interaction");

	// 	await browser.keys("ArrowDown");
	// 	await browser.keys("Enter");

	// 	await browser.keys("ArrowDown");
	// 	await browser.keys("Enter");

	// 	await browser.keys("ArrowDown");
	// 	await browser.keys("Enter");

	// 	assert.strictEqual(await rangeSlider.getProperty("endValue"), 1, "Slider value is changed on a followup keyboard actions after initial swap interaction");
	// 	assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "Slider value is changed on a followup keyboard actions after initial swap interaction");

	// 	assert.strictEqual(await rangeSliderEndTooltipInput.getProperty("value"), "1", "Slider end value is changed on a followup keyboard actions after initial swap interaction");
	// 	assert.strictEqual(await rangeSliderStartTooltipInput.getProperty("value"), "0", "Slider start value is changed on a followup keyboard actions after initial swap interaction");
	// });


	// it("Input values should be swapped if the end value is lower than the start value", async () => {
	// 	await browser.url(`test/pages/RangeSlider.html`);

	// 	const rangeSlider = await browser.$("#range-slider-tickmarks-labels");
	// 	const rangeSliderEndHandle = await rangeSlider.shadow$(".ui5-slider-handle--end");

	// 	const rangeSliderEndTooltipInput = await rangeSlider.shadow$(".ui5-slider-tooltip--end ui5-input");
	// 	const rangeSliderStartTooltipInput = await rangeSlider.shadow$(".ui5-slider-tooltip--start ui5-input");

	// 	await rangeSlider.setProperty("startValue", 2);
	// 	await rangeSlider.setProperty("endValue", 3);

	// 	await rangeSliderEndHandle.click();
	// 	await rangeSliderEndTooltipInput.click();
	// 	await browser.keys("Delete");
	// 	await browser.keys("1");
	// 	await browser.keys("Enter");

	// 	assert.strictEqual(await rangeSlider.getProperty("startValue"), 1, "The end value is now start value");
	// 	assert.strictEqual(await rangeSliderStartTooltipInput.getProperty("value"), "1", "The end input value is now start value");
	// });

	// it("Invalid tooltip value should not be changed on 'Enter'", async () => {
	// 	const rangeSlider = await browser.$("#range-slider-tickmarks-labels");
	// 	const rangeSliderTooltipInput = await rangeSlider.shadow$(".ui5-slider-tooltip--end ui5-input");
	// 	const rangeSliderHandle = await rangeSlider.shadow$(".ui5-slider-handle--end");

	// 	await rangeSlider.setProperty("endValue", 12);

	// 	await rangeSliderHandle.click();
	// 	await rangeSliderTooltipInput.click();
	// 	await rangeSliderTooltipInput.setProperty("value", "60");

	// 	await browser.keys("Enter");

	// 	assert.strictEqual(await rangeSlider.getProperty("endValue"), 12, "The slider's value is not changed when invalid");
	// 	assert.strictEqual(await rangeSliderTooltipInput.getProperty("valueState"), "Negative", "The input value is not changed when invalid");
	// 	assert.strictEqual(await rangeSliderTooltipInput.getProperty("value"), "60", "The input value is not changed when invalid");
	// });

	// it("Range Slider tooltips should stay visible when mouse is moved out but range slider is still focused", async () => {
	// 	const rangeSlider = await browser.$("#basic-range-slider-with-tooltip");
	// 	const rangeSliderStartTooltip = await rangeSlider.shadow$(".ui5-slider-tooltip--start");
	// 	const rangeSliderEndTooltip = await rangeSlider.shadow$(".ui5-slider-tooltip--end");
	// 	const otherRangeSlider = await browser.$("#basic-range-slider");

	// 	await rangeSlider.moveTo();
	// 	await otherRangeSlider.moveTo();

	// 	assert.strictEqual(await rangeSlider.getProperty("_tooltipVisibility"), "visible", "Range Slider tooltips visibility property should be 'visible'");
	// 	assert.strictEqual(await rangeSliderStartTooltip.getAttribute("style"), "visibility: visible;", "Range Slider start tooltip should be shown");
	// 	assert.strictEqual(await rangeSliderEndTooltip.getAttribute("style"), "visibility: visible;", "Range Slider end tooltip should be shown");
	// });

	// it("Range Slider tooltips should become hidden if the range slider looses the focus", async () => {
	// 	const rangeSlider = await browser.$("#basic-range-slider-with-tooltip");
	// 	const rangeSliderStartTooltip = await rangeSlider.shadow$(".ui5-slider-tooltip--start");
	// 	const rangeSliderEndTooltip = await rangeSlider.shadow$(".ui5-slider-tooltip--end");
	// 	const otherRangeSlider = await browser.$("#basic-range-slider");

	// 	await otherRangeSlider.moveTo();
	// 	await otherRangeSlider.click();

	// 	assert.strictEqual(await rangeSlider.getProperty("_tooltipVisibility"), "hidden", "Range Slider tooltips visibility property should be 'hidden'");
	// 	assert.strictEqual(await rangeSliderStartTooltip.getAttribute("style"), "visibility: hidden;", "Range Slider start tooltip should be hidden");
	// 	assert.strictEqual(await rangeSliderEndTooltip.getAttribute("style"), "visibility: hidden;", "Range Slider end tooltip should be hidden");

	// });

	// it("Range Slider have correct number of labels and tickmarks based on the defined step and labelInterval properties", async () => {
	// 	const rangeSlider = await browser.$("#range-slider-tickmarks-labels");
	// 	const labelsContainer = await rangeSlider.shadow$(".ui5-slider-labels");
	// 	const numberOfLabels = (await labelsContainer.$$("li")).length;

	// 	assert.strictEqual(numberOfLabels, 12, "12 labels should be rendered, 1 between every 4 tickmarks");
	// });
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