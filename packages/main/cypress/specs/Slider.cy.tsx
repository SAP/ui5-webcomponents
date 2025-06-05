import Slider from "../../src/Slider.js";

function dragSliderHandle(selector: string, offset: { x: number, y: number }) {
	cy.get(selector).shadow().find(".ui5-slider-handle").realMouseDown()
	cy.focused().realMouseMove(offset.x, offset.y);
	cy.focused().realMouseUp();
}

describe("General interactions", () => {
	it("Fire change event on keyup", () => {
		cy.get('[data-cy-root]')
			.invoke('css', 'padding', '100px')

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
		cy.get("[ui5-slider]").realClick();

		cy.then(() => {
			expect(changeCount).to.equal(1);
		});

		// Second 'change' event is fired on keyboard interaction
		cy.get("[ui5-slider]").realPress("ArrowRight");

		cy.then(() => {
			expect(changeCount).to.equal(2);
		});
	});

	it("Changing the current value is reflected", () => {
		cy.mount(<Slider id="basic-slider" min={0} max={10} value={0} />);

		cy.get("#basic-slider")
			.shadow()
			.find(".ui5-slider-handle-container")
			.as("sliderHandleContainer");

		cy.get("@sliderHandleContainer")
			.should("have.attr", "style", "left: 0%;");

		cy.get("#basic-slider").invoke("prop", "value", 3);

		cy.get("@sliderHandleContainer")
			.should("have.attr", "style", "left: 30%;");

		cy.get("#basic-slider").realClick();

		cy.get("@sliderHandleContainer")
			.should("have.attr", "style", "left: 50%;");
		cy.get("#basic-slider").should("have.value", 5);

		cy.get("#basic-slider")
			.shadow()
			.find(".ui5-slider-handle")
			.as("sliderHandle");

		dragSliderHandle("#basic-slider", { x: 300, y: 0 });

		cy.get("@sliderHandleContainer")
			.should("have.attr", "style", "left: 70%;");
		cy.get("#basic-slider").should("have.value", 7);

		dragSliderHandle("#basic-slider", { x: 100, y: 0 });

		cy.get("@sliderHandleContainer")
			.should("have.attr", "style", "left: 80%;");
		cy.get("#basic-slider").should("have.value", 8);

		dragSliderHandle("#basic-slider", { x: -100, y: 0 });

		cy.get("@sliderHandleContainer")
			.should("have.attr", "style", "left: 70%;");
		cy.get("#basic-slider").should("have.value", 7);
	});

	it("Slider with floating min, max and step property", () => {
		cy.mount(<Slider min={-12.5} max={47.5} step={1.25} value={21.25} />);

		cy.get("ui5-slider").as("slider");

		cy.get("@slider").click("left");

		cy.get("@slider").should("have.value", -12.5);
	});

	it("Slider should not be interactive if the step property is 0", () => {
		cy.mount(<Slider min={-12.5} max={47.5} step={0} value={21.25} />);

		cy.get("ui5-slider").as("slider");

		cy.get("@slider").click("left");

		cy.get("@slider").should("have.value", 21.25);
	});

	it("Disabled slider is not interactive", () => {
		cy.mount(<Slider id="disabled-slider-with-tickmarks" disabled />);
		cy.mount(<Slider id="basic-slider" min={-12.5} max={47.5} step={1.25} value={21.25} disabled />);

		cy.get("ui5-slider").as("slider");

		cy.get("@slider").click("left", { force: true });

		cy.get("@slider").should("have.value", 21.25);
		cy.get("@slider").should("have.attr", "disabled");
	});
});

describe("Properties synchronization and normalization", () => {
	it("If a negative number is set to the step property its positive equivalent should be used as effective value", () => {
		cy.mount(<Slider editableTooltip min={-20} max={20} step={2} value={12} showTooltip labelInterval={2} showTickmarks />);

		cy.get("ui5-slider").as("slider");

		cy.get("@slider").invoke("prop", "step", -7);

		cy.get("@slider").realClick();

		cy.get("@slider").should("have.value", 1, "The current value should be 'stepified' by 7");
	});

	it("If the step property or the labelInterval are changed, the tickmarks and labels must be updated also", () => {
		cy.mount(<Slider editableTooltip min={-20} max={20} step={2} value={12} showTooltip labelInterval={2} showTickmarks />);

		cy.get("ui5-slider").as("slider");

		cy.get("@slider").invoke("prop", "step", 1);

		cy.get('@slider')
			.its(0)
			.its('_labelValues')
			.and('have.length', 21);

		cy.get("@slider").invoke("prop", "step", 2);

		cy.get('@slider')
			.its(0)
			.its('_labelValues')
			.and('have.length', 11);

		cy.get("@slider").invoke("prop", "step", 4);

		cy.get('@slider')
			.its(0)
			.its('_labelValues')
			.and('have.length', 6);
	});

	it("If the min and max properties are changed, the tickmarks and labels must be updated also.", () => {
		cy.mount(<Slider id="slider-tickmarks-labels" editableTooltip min={-20} max={20} step={2} value={12} showTooltip labelInterval={2} showTickmarks />);

		cy.get("#slider-tickmarks-labels").as("slider");

		cy.get('@slider')
			.its(0)
			.its('_labelValues').should('have.length', 11);

		cy.get("@slider").invoke("prop", "min", 0);
		cy.get("@slider").invoke("prop", "max", 20);

		cy.get('@slider')
			.its(0)
			.its('_labelValues').should('have.length', 11);
	});

	it("If min property is set to a greater number than the max property their effective values should be swapped, their real ones - not", () => {
		cy.mount(<Slider value={2} max={10} min={100} />);

		cy.get("ui5-slider").as("slider");

		cy.get("@slider").invoke("prop", "max").should("equal", 10);
		cy.get("@slider").invoke("prop", "min").should("equal", 100);
		cy.get("@slider").invoke("prop", "value").should("equal", 10);
	});

	it("Should keep the current value between the boundaries of min and max properties", () => {
		cy.mount(<Slider value={2} max={10} min={100} />);

		cy.get("ui5-slider").as("slider");

		cy.get("@slider").invoke("prop", "min", 100)
		cy.get("@slider").invoke("prop", "max", 200)
		cy.get("@slider").invoke("prop", "value", 300)

		cy.get("@slider").should("have.value", 200);

		cy.get("@slider").invoke("prop", "value", 99)

		cy.get("@slider").should("have.value", 100);
	});
});

describe("Slider elements - tooltip, step, tickmarks, labels", () => {
	it("Slider Tooltip is displayed showing the current value after swipe", () => {
		cy.mount(<Slider id="basic-slider-with-tooltip" min={0} max={100} value={0} showTooltip editableTooltip />);

		cy.get("#basic-slider-with-tooltip").as("slider");

		cy.get("@slider")
			.shadow()
			.find(".ui5-slider-handle")
			.realClick();

		dragSliderHandle("#basic-slider-with-tooltip", { x: 240, y: 0 });

		cy.get("@slider")
			.shadow()
			.find("ui5-slider-tooltip")
			.shadow()
			.find("ui5-input")
			.should("have.value", "20");
	});

	it("Tooltip input is displayed showing the current value", () => {
		cy.mount(<Slider editableTooltip min={-20} max={20} step={2} value={12} showTooltip labelInterval={2} showTickmarks />);

		cy.get("ui5-slider").as("slider");

		cy.get("@slider").shadow().find(".ui5-slider-handle").as("sliderHandle");

		cy.get("@sliderHandle").realClick();

		cy.get("@slider")
			.shadow()
			.find("ui5-slider-tooltip")
			.shadow()
			.find("ui5-input")
			.should("have.value", "12");
	});

	it("Input tooltip value change should change the slider's value", () => {
		cy.mount(<Slider editableTooltip min={-20} max={20} step={2} value={12} showTooltip labelInterval={2} showTickmarks />);

		cy.get("ui5-slider").as("slider");

		cy.get("@slider").invoke("prop", "value", 8);

		cy.get("@slider").shadow().find(".ui5-slider-handle").as("sliderHandle");

		cy.get("@sliderHandle").realClick();

		cy.get("@slider")
			.shadow()
			.find("ui5-slider-tooltip")
			.shadow()
			.find("ui5-input")
			.realClick()
			.clear()
			.realType("2")
			.realPress("Enter");

		cy.get("@slider").should("have.value", 2, "The input value is reflected in the slider");
	});

	it("Input tooltip value change should fire change event", () => {
		cy.mount(<Slider editableTooltip min={-20} max={20} step={2} value={12} showTooltip labelInterval={2} showTickmarks />);

		cy.get("ui5-slider").as("slider");
		cy.get("@slider").then($slider => { $slider[0].addEventListener("ui5-change", cy.stub().as("sliderChange")); });

		cy.get("@slider").shadow().find(".ui5-slider-handle").as("sliderHandle");

		cy.get("@sliderHandle").realClick();

		cy.get("@slider")
			.shadow()
			.find("ui5-slider-tooltip")
			.shadow()
			.find("ui5-input")
			.realClick()
			.clear()
			.realType("2")
			.realPress("Enter");

		cy.get("@sliderChange").should("have.been.calledOnce");
	});

	it("Input tooltip should change the value state to error if it is invalid", () => {
		cy.mount(<Slider editableTooltip min={-20} max={20} step={2} value={12} showTooltip labelInterval={2} showTickmarks />);

		cy.get("ui5-slider").as("slider");

		cy.get("@slider").shadow().find(".ui5-slider-handle").as("sliderHandle");

		cy.get("@sliderHandle").realClick();

		cy.get("@slider")
			.shadow()
			.find("ui5-slider-tooltip")
			.shadow()
			.find("ui5-input")
			.as("sliderTooltipInput");

		cy.get("@sliderTooltipInput")
			.realClick()
			.realType("2")
			.realPress("Enter");

		cy.get("@sliderTooltipInput").should("have.attr", "value-state", "Negative");
	});

	it("F2 should switch the focus between the handle and the tooltip input", () => {
		cy.mount(<Slider editableTooltip min={-20} max={20} step={2} value={12} showTooltip labelInterval={2} showTickmarks />);

		cy.get("ui5-slider").as("slider");
		cy.get("@slider").shadow().find(".ui5-slider-handle").as("sliderHandle");

		cy.get("@sliderHandle").realClick();

		cy.get("@slider")
			.shadow()
			.find("ui5-slider-tooltip").as("sliderTooltip");

		cy.get("@sliderTooltip")
			.shadow()
			.find("ui5-input")
			.as("sliderTooltipInput");

		cy.realPress("F2");

		cy.get("@sliderTooltipInput").should("have.focus");

		cy.realPress("F2");

		cy.get("@sliderHandle").should("have.focus");
	});

	it("Arrow up/down should not increase/decrease the value of the input", () => {
		cy.mount(<Slider editableTooltip min={0} max={20} value={1} showTooltip />);

		cy.get("ui5-slider").as("slider");

		cy.get("@slider")
			.shadow()
			.find(".ui5-slider-handle")
			.as("sliderHandle");

		cy.get("@slider")
			.shadow()
			.find("ui5-slider-tooltip")
			.shadow()
			.find("ui5-input")
			.as("sliderTooltipInput");

		cy.get("@sliderHandle").realClick();
		cy.get("@sliderTooltipInput").realClick();

		cy.realPress("ArrowUp");
		cy.get("@slider").should("have.value", 1);

		cy.realPress("ArrowDown");

		cy.get("@slider").should("have.value", 1);
	});

	it("Tab on slider handle should not move the focus to the tooltip input", () => {
		cy.mount(
			<>
				<Slider id="slider-tickmarks-labels" editableTooltip min={0} max={20} />
				<Slider id="slider-tickmarks-tooltips-labels" editableTooltip min={0} max={20} />
			</>
		);

		cy.get("#slider-tickmarks-labels")
			.shadow()
			.find(".ui5-slider-handle")
			.realClick();

		cy.realPress("Tab");

		cy.get("#slider-tickmarks-tooltips-labels").should("be.focused");
	});

	it("Focus out with invalid value should reset it", () => {
		cy.mount(
			<>
				<Slider id="slider-tickmarks-labels" showTooltip editableTooltip min={0} max={20} value={10} />
				<Slider id="slider-tickmarks-tooltips-labels" editableTooltip min={0} max={20} />
			</>
		);

		cy.get("#slider-tickmarks-labels").as("slider");

		cy.get("@slider")
			.shadow()
			.find(".ui5-slider-handle")
			.as("sliderHandle");

		cy.get("@slider")
			.shadow()
			.find("ui5-slider-tooltip")
			.shadow()
			.find("ui5-input")
			.as("sliderTooltipInput");

		cy.get("@sliderHandle").realClick();
		cy.get("@sliderTooltipInput").realClick();
		cy.get("@sliderTooltipInput").realType("0");

		cy.get("#slider-tickmarks-tooltips-labels").realClick();

		cy.get("@sliderTooltipInput").should("have.value", "10");
	});

	it("Slider Tooltip should become hidden when slider loses focus", () => {
		cy.mount(
			<>
				<Slider id="basic-slider-with-tooltip" showTooltip editableTooltip min={0} max={20} value={10} />
				<Slider id="basic-slider" min={0} max={20} />
			</>
		);

		cy.get("#basic-slider-with-tooltip").as("slider");
		cy.get("#basic-slider").as("anotherSlider");

		cy.get("@slider").realClick();

		cy.get("@slider").shadow().find("ui5-slider-tooltip").as("sliderTooltip");

		cy.get("@sliderTooltip").should("have.prop", "open", true);

		cy.get("@anotherSlider").realClick();

		cy.get("@sliderTooltip").should("have.prop", "open", false);
	});

	it("Should not 'stepify' current value if it is not a result of user interaction", () => {
		cy.mount(<Slider id="tickmarks-slider" min={0} max={20} step={2} />);

		cy.get("#tickmarks-slider").as("slider");

		cy.get("@slider").invoke("prop", "value", 13);

		cy.get("@slider").invoke("prop", "value").should("equal", 13);
	});
});

describe("Testing events", () => {
	it("Should fire input event on user interaction and change event after user interaction finishes", () => {
		cy.mount(<Slider id="test-slider" min={0} max={10} value={0} />);

		cy.get("#test-slider").as("slider");

		cy.get("@slider").realClick();
		cy.get("@slider").should("have.value", 5, "Both input event and change event are fired after user interaction");
	});

	it("Should not fire change event after user interaction finishes if the current value is the same as the one at the start of the action", () => {
		cy.mount(<Slider id="test-slider" min={0} max={10} value={5} />);

		cy.get("#test-slider").as("slider");

		cy.get("@slider").realClick();

		cy.get("@slider").should("have.value", 5, "Change event is not fired if the value is the same as before the start of the action");
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

	it("should apply associated label text as aria-label on the slider element", () => {
		const labelText = "label for slider";
		cy.mount(
			<>
				<label for="slider">{labelText}</label>
				<Slider id="slider" min={0} max={20}></Slider>
			</>
		);

		cy.get("[ui5-slider]")
			.shadow()
			.find(".ui5-slider-handle")
			.should("have.attr", "aria-label", `${labelText} Slider handle`);
	});

	it("Aria attributes are set correctly", () => {
		cy.mount(
			<Slider id="basic-slider" accessible-name="Basic Slider" min={0} max={10}></Slider>
		);

		cy.get("#basic-slider")
			.shadow()
			.find(".ui5-slider-handle")
			.as("sliderHandle");

		cy.get("@sliderHandle")
			.should("have.attr", "aria-label", "Basic Slider Slider handle");

		cy.get("@sliderHandle")
			.should("have.attr", "aria-valuemin", "0");

		cy.get("@sliderHandle")
			.should("have.attr", "aria-valuemax", "10");

		cy.get("@sliderHandle")
			.should("have.attr", "aria-valuenow", "0");
	});

	it("Aria attributes are set correctly to the tooltip input", () => {
		cy.mount(<Slider id="slider-tickmarks-labels" editableTooltip min={0} max={20} value={10} />);

		cy.get("#slider-tickmarks-labels")
			.shadow()
			.find("ui5-slider-tooltip")
			.shadow()
			.find("ui5-input")
			.as("sliderTooltipInput");

		cy.get("@sliderTooltipInput").should("have.attr", "accessible-name-ref", "ui5-slider-InputLabel");
	});

	it("Click anywhere in the Slider should focus the Slider's handle", () => {
		cy.mount(<Slider id="basic-slider" min={0} max={20} value={10} />);

		cy.get("#basic-slider").realClick();

		cy.get("#basic-slider")
			.shadow()
			.find(".ui5-slider-handle")
			.should("be.focused");
	});

	it("Tab should focus the Slider and move the visible focus outline to the slider's handle", () => {
		cy.mount(<Slider id="basic-slider-with-tooltip" editableTooltip min={0} max={20} value={10} />);

		cy.realPress("Tab");

		cy.get("#basic-slider-with-tooltip")
			.shadow()
			.find(".ui5-slider-handle")
			.should("be.focused");
	});

	it("Shift+Tab should focus the previous Slider and move the visible focus outline to the previous slider's handle", () => {
		cy.mount(
			<>
				<Slider id="basic-slider" min={0} max={20} value={10} />
				<Slider id="basic-slider-with-tooltip" editableTooltip min={0} max={20} value={10} />
			</>
		);

		cy.get("#basic-slider-with-tooltip").realClick();
		cy.realPress(["Shift", "Tab"]);

		cy.get("#basic-slider")
			.shadow()
			.find(".ui5-slider-handle")
			.should("be.focused");
	});

	it("icon should be correctly displayed", () => {
		cy.mount(<Slider id="basic-slider" min={0} max={20} value={10} />);

		cy.get("#basic-slider")
			.shadow()
			.find("ui5-icon")
			.should("have.attr", "name", "direction-arrows");
	});
});

describe("Accessibility: Testing keyboard handling", () => {
	it("Right arrow should increase the value of the slider with a small increment step", () => {
		cy.mount(<Slider id="basic-slider" min={0} max={20} value={0} />);

		cy.get("#basic-slider")
			.shadow()
			.find(".ui5-slider-handle")
			.realClick();

		cy.realPress("ArrowRight");

		cy.get("#basic-slider").should("have.value", 1);
	});

	it("Left arrow should decrease the value of the slider with a small increment step", () => {
		cy.mount(<Slider id="basic-slider" min={0} max={20} value={1} />);

		cy.get("#basic-slider")
			.shadow()
			.find(".ui5-slider-handle")
			.realClick();

		cy.realPress("ArrowLeft");

		cy.get("#basic-slider").should("have.value", 0);
	});

	it("Up arrow should increase the value of the slider with a small increment step", () => {
		cy.mount(<Slider id="basic-slider" min={0} max={20} value={0} />);

		cy.get("#basic-slider")
			.shadow()
			.find(".ui5-slider-handle")
			.realClick();

		cy.realPress("ArrowUp");

		cy.get("#basic-slider").should("have.value", 1);
	});

	it("Down arrow should decrease the value of the slider with a small increment step", () => {
		cy.mount(<Slider id="basic-slider" min={0} max={20} value={1} />);

		cy.get("#basic-slider")
			.shadow()
			.find(".ui5-slider-handle")
			.realClick();

		cy.realPress("ArrowDown");

		cy.get("#basic-slider").should("have.value", 0);
	});

	it("Ctrl + Right arrow should increase the value of the slider with a big increment step", () => {
		cy.mount(<Slider id="basic-slider-with-tooltip" min={0} max={20} value={0} />);

		cy.get("#basic-slider-with-tooltip")
			.shadow()
			.find(".ui5-slider-handle")
			.realClick();

		cy.realPress(["ControlLeft", "ArrowRight"]);


		cy.get("#basic-slider-with-tooltip").should("have.value", 2);
	});

	it("Ctrl + Left arrow should decrease the value of the slider with a big increment step", () => {
		cy.mount(<Slider id="basic-slider-with-tooltip" min={0} max={20} value={2} />);

		cy.get("#basic-slider-with-tooltip")
			.shadow()
			.find(".ui5-slider-handle")
			.realClick();

		cy.realPress(["ControlLeft", "ArrowLeft"]);

		cy.get("#basic-slider-with-tooltip").should("have.value", 0);
	});

	it("Ctrl + Up arrow should increase the value of the slider with a big increment step", () => {
		cy.mount(<Slider id="basic-slider-with-tooltip" min={0} max={20} value={0} />);

		cy.get("#basic-slider-with-tooltip")
			.shadow()
			.find(".ui5-slider-handle")
			.realClick();

		cy.realPress(["ControlLeft", "ArrowUp"]);

		cy.get("#basic-slider-with-tooltip").should("have.value", 2);
	});

	it("Ctrl + Down arrow should decrease the value of the slider with a big increment step", () => {
		cy.mount(<Slider id="basic-slider-with-tooltip" min={0} max={20} value={2} />);

		cy.get("#basic-slider-with-tooltip")
			.shadow()
			.find(".ui5-slider-handle")
			.realClick();

		cy.realPress(["ControlLeft", "ArrowDown"]);

		cy.get("#basic-slider-with-tooltip").should("have.value", 0);
	});

	it("PageUp should increase the value of the slider with a big increment step", () => {
		cy.mount(<Slider id="basic-slider-with-tooltip" min={0} max={20} value={0} />);


		cy.get("#basic-slider-with-tooltip")
			.shadow()
			.find(".ui5-slider-handle")
			.realClick();

		cy.realPress("PageUp");

		cy.get("#basic-slider-with-tooltip").should("have.value", 2);
	});

	it("PageDown should decrease the value of the slider with a big increment step", () => {
		cy.mount(<Slider id="basic-slider-with-tooltip" min={0} max={20} value={2} />);

		cy.get("#basic-slider-with-tooltip")
			.shadow()
			.find(".ui5-slider-handle")
			.realClick();

		cy.realPress("PageDown");

		cy.get("#basic-slider-with-tooltip").should("have.value", 0);
	});

	it("A '+' key press should increase the value of the slider with a small increment step", () => {
		cy.mount(<Slider id="basic-slider-with-tooltip" min={0} max={20} value={0} />);

		cy.get("#basic-slider-with-tooltip")
			.shadow()
			.find(".ui5-slider-handle")
			.realClick();

		cy.realPress("+");

		cy.get("#basic-slider-with-tooltip").should("have.value", 1);
	});

	it("A '-' key press should decrease the value of the slider with a small increment step", () => {
		cy.mount(<Slider id="basic-slider-with-tooltip" min={0} max={20} value={1} />);

		cy.get("#basic-slider-with-tooltip")
			.shadow()
			.find(".ui5-slider-handle")
			.realClick();

		cy.realPress("-");

		cy.get("#basic-slider-with-tooltip").should("have.value", 0);
	});

	it("An 'End' key press should increase the value of the slider to its max", () => {
		cy.mount(<Slider id="basic-slider-with-tooltip" min={0} max={20} value={0} />);

		cy.get("#basic-slider-with-tooltip")
			.shadow()
			.find(".ui5-slider-handle")
			.realClick();

		cy.realPress("End");

		cy.get("#basic-slider-with-tooltip").should("have.value", 20);
	});

	it("A 'Home' key press should set the value of the slider to its minimum", () => {
		cy.mount(<Slider id="basic-slider-with-tooltip" min={0} max={20} value={20} />);

		cy.get("#basic-slider-with-tooltip")
			.shadow()
			.find(".ui5-slider-handle")
			.realClick();

		cy.realPress("Home");

		cy.get("#basic-slider-with-tooltip").should("have.value", 0);
	});

	it("A 'Esc' key press should return the value of the slider at its initial point at the time of its focusing", () => {
		cy.mount(<Slider id="basic-slider-with-tooltip" min={0} max={20} value={12} />);


		cy.get("#basic-slider-with-tooltip")
			.shadow()
			.find(".ui5-slider-handle")
			.realClick();

		cy.realPress("End");

		cy.get("#basic-slider-with-tooltip").should("have.value", 20);

		cy.realPress("Escape");

		cy.get("#basic-slider-with-tooltip").should("have.value", 12);
	});
});
