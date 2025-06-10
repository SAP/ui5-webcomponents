import StepInput from "../../src/StepInput.js";

const decreaseValue = true;

describe("StepInput keyboard interaction tests", () => {
	it("should increase the value with 'ArrowUp' only if it is less than 'max'", () => {
		cy.mount(
			<StepInput max={5} value={4}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.realClick();

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithArrowKeys(5);
	
		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithArrowKeys(5);
	});

	it("should decreases the value with 'ArrowDown' only if it is more than 'min'", () => {
		cy.mount(
			<StepInput min={5} value={6}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.realClick();
		
		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithArrowKeys(5, decreaseValue);

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithArrowKeys(5, decreaseValue);
	});

	it("should set the value to the 'max' with 'Shift+PageUp'", () => {
		cy.mount(
			<StepInput max={5}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.realClick();
		
		cy.realPress(['Shift', 'PageUp']);

		cy.get<StepInput>("@stepInput")
			.should("have.prop", "value", 5);
	});

	it("should set the value to the 'min' with 'Shift+PagedDown'", () => {
		cy.mount(
			<StepInput min={0} value={5}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.realClick();
		
		cy.realPress(['Shift', 'PageDown']);

		cy.get<StepInput>("@stepInput")
			.should("have.prop",  "value", 0);
	});

	it("should set the value to the 'max' with 'Ctrl+Shift+ArrowUp'", () => {
		cy.mount(
			<StepInput max={5}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.realClick();
		
		cy.realPress(['Control', 'Shift', 'ArrowUp']);

		cy.get<StepInput>("@stepInput")
			.should("have.prop", "value", 5);
	});

	it("should set the value to the 'min' with 'Ctrl+Shift+ArrowDown'", () => {
		cy.mount(
			<StepInput min={0} value={5}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.realClick();
		
		cy.realPress(['Control', 'Shift', 'ArrowDown']);

		cy.get<StepInput>("@stepInput")
			.should("have.prop",  "value", 0);
	});

	it("should restore the previous value with 'Escape'", () => {
		cy.mount(
			<StepInput value={5}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.realClick();

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithArrowKeys(6);
		
		cy.realPress("Escape");

		cy.get<StepInput>("@stepInput")
			.should("have.prop", "value", 5);
	});

	it("should update the value when typed in input", () => {
		cy.mount(
			<StepInput></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.realClick({ "clickCount": 2 });

		cy.realType("23");
		cy.realPress("Enter");

		cy.get<StepInput>("@stepInput")
			.should("have.prop", "value", 23);
	});

	it("should reset the value to 0 if input is deleted", () => {
		cy.mount(
			<StepInput value={10}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.realClick({ "clickCount": 2 });

		cy.realType("Backspace");
		
		cy.realPress("Enter");

		cy.get<StepInput>("@stepInput")
			.should("have.prop", "value", 0);
	});
});

describe("StepInput button interaction tests", () => {
	it("should increase the value by clicking the 'Increase' button only if it is less than 'max'", () => {
		cy.mount(
			<StepInput max={5} value={4}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(5)

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(5)
	});

	it("should decrease the value by clicking the 'Decrease' button only if it is more than 'min'", () => {
		cy.mount(
			<StepInput min={0} value={1}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(0, decreaseValue)

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(0, decreaseValue)
	});
});

describe("StepInput misc interaction tests", () => {
	it("should not round value when 'valuePrecision' is set", () => {
		cy.mount(
			<StepInput value={29.999} valuePrecision={3}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(30.999);
	});

	it("should round value when 'valuePrecision' is set to default", () => {
		cy.mount(
			<StepInput value={29.999}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(31);
	});

	it("should set 'valueState' to 'Negative' when the value is not compliant", () => {
		cy.mount(
			<StepInput></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.realClick({ "clickCount": 2 });

		cy.realType("23.034");
			
		cy.realPress("Enter");
	
		cy.get<StepInput>("@stepInput")
			.should("have.prop", "valueState", "Negative");
	});
});

describe("StepInput events", () => {
	it("should not change value state when 'value-state-change' event is prevented", () => {
		const valueState = "Positive";
		
		cy.mount(
			<StepInput valueState={valueState}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.then($input => {
				$input.get(0).addEventListener("value-state-change", e => {
					e.preventDefault();
				});
			});

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("value-state-change", "stateChange");

		cy.get<StepInput>("@stepInput")
			.realClick();

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithArrowKeys(1);

		cy.get("@stateChange")
			.should("have.been.calledOnce");

		cy.get<StepInput>("@stepInput")
			.should("have.prop", "valueState", valueState);
	});

	it("should prevent input event", () => {
		cy.mount(
			<StepInput></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.then($input => {
				$input.get(0).addEventListener("input", e => {
					e.preventDefault();
					(e.target as StepInput).value = 30;
				});
			});

		cy.get<StepInput>("@stepInput")
			.realClick();

		cy.realPress("1");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputCheckInnerInputProperty("value", "30");
	});

	it("should not fire 'change' when navigating with 'ArrowUp'/'ArrowDown' keys", () => {
		cy.mount(
			<StepInput></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-change", "change");

		cy.get<StepInput>("@stepInput")
			.realClick();

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithArrowKeys(1);

		cy.get("@change")
			.should("have.not.been.called");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithArrowKeys(0, decreaseValue);

		cy.get("@change")
			.should("have.not.been.called");
	});

	it("should fire 'change' after 'Enter' is pressed", () => {
		cy.mount(
			<StepInput></StepInput>
		);		

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-change", "change");

		cy.get<StepInput>("@stepInput")
			.realClick();

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithArrowKeys(1);

		cy.realPress("Enter");

		cy.get("@change")
			.should("have.been.calledOnce");
	});

	it("should not fire 'change' when previous value is restored with 'Escape'", () => {
		cy.mount(
			<StepInput></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-change", "change");

		cy.get<StepInput>("@stepInput")
			.realClick();

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithArrowKeys(1);

		cy.realPress("Escape");

		cy.get<StepInput>("@stepInput")
		.should("have.prop", "value", 0);

		cy.get("@change")
			.should("not.have.been.called");
	});

	it("should fire 'change' after focus out", () => {
		cy.mount(
			<StepInput></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

			cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-change", "change");

		cy.get<StepInput>("@stepInput")
			.realClick();

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithArrowKeys(1);

		cy.realPress("Tab");

		cy.get("@change")
			.should("have.been.calledOnce");

		cy.get<StepInput>("@stepInput")
            .should("have.prop", "value", 1);
	});

	it("should fire 'change' when using 'Increase' button'", () => {
		cy.mount(
			<StepInput></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-change", "change");

		cy.get<StepInput>("@stepInput")
			.shadow()
			.find(".ui5-step-inc")
			.as("increaseButton");

		cy.get("@increaseButton")
			.realClick();

		cy.get("@change")
			.should("have.been.calledOnce");

		cy.get<StepInput>("@stepInput")
            .should("have.prop", "value", 1);
	});

	it("should fire 'change' when using 'Decrease' button'", () => {
		cy.mount(
			<StepInput value={5}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-change", "change");

		cy.get<StepInput>("@stepInput")
			.shadow()
			.find(".ui5-step-dec")
			.as("decreaseButton");

		cy.get("@decreaseButton")
			.realClick();
	
		cy.get("@change")
			.should("have.been.calledOnce");

		cy.get<StepInput>("@stepInput")
			.should("have.prop", "value", 4);
	});

	it("should fire 'change' when clicking 'Increase' button only if it is less than 'max'", () => {
		cy.mount(
			<StepInput max={5} value={4}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-change", "change");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(5)

		cy.get("@change")
			.should("have.been.calledOnce");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(5)

		cy.get("@change")
			.should("have.been.calledOnce");
	});

	it("should fire 'change' when clicking 'Decrease' button only if it is more than 'min'", () => {
		cy.mount(
			<StepInput min={0} value={1}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-change", "change");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(0, decreaseValue)

		cy.get("@change")
			.should("have.been.calledOnce");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(0, decreaseValue)

		cy.get("@change")
			.should("have.been.calledOnce");
	});

	it("should fire 'change' when 'Enter' is pressed after manual input", () => {
		cy.mount(
			<StepInput></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-change", "change");

		cy.get<StepInput>("@stepInput")
			.realClick({ "clickCount": 2 });

		cy.realType("23");

		cy.get("@change")
			.should("not.have.been.called");
		
		cy.realPress("Enter");

		cy.get<StepInput>("@stepInput")
			.should("have.prop", "value", 23);

		cy.get("@change")
			.should("have.been.calledOnce");
	});

	it("should fire 'change' after focusing out of input", () => {
		cy.mount(
			<StepInput value={10}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-change", "change");

		cy.get<StepInput>("@stepInput")
			.realClick({ "clickCount": 2 });

		cy.realType("23");

		cy.get("@change")
			.should("not.have.been.called");
		
		cy.realPress("Tab");

		cy.get<StepInput>("@stepInput")
			.should("have.prop", "value", 23);

		cy.get("@change")
			.should("have.been.calledOnce");
	});

	it("should fire 'change' after input is deleted and focused out", () => {
		cy.mount(
			<StepInput value={10}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-change", "change");

		cy.get<StepInput>("@stepInput")
			.realClick({ "clickCount": 2 });

		cy.realType("Backspace");

		cy.get("@change")
			.should("not.have.been.called");
		
		cy.realPress("Tab");

		cy.get<StepInput>("@stepInput")
			.should("have.prop", "value", 0);

		cy.get("@change")
			.should("have.been.calledOnce");
	});

	it.only("should fire 'change' after value propety is programatically set and then changed with +/- keys", () => {
		cy.mount(
			<StepInput value={5}></StepInput>
		);		

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-change", "change");

		cy.get<StepInput>("@stepInput")
			.invoke("prop", "value", 4);

		cy.get("@change")
			.should("not.have.been.called");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(5);

		cy.get("@change")
			.should("have.been.calledOnce");
	});
});

describe("StepInput property propagation", () => {
	it("should propagate 'placeholder' property to inner input", () => {
		cy.mount(
			<StepInput placeholder="Enter number"></StepInput>
		);

		cy.get("[ui5-step-input]")
			.ui5StepInputCheckInnerInputProperty("placeholder", "Enter number");
    });

	it("should propagate 'min' property to inner input", () => {
		cy.mount(
			<StepInput min={0}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.ui5StepInputCheckInnerInputProperty("min", "0");
    });

    it("should propagate 'max' property to inner input", () => {
		cy.mount(
			<StepInput max={10}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.ui5StepInputCheckInnerInputProperty("max", "10");
	});

	it("should propagate 'step' property to inner input", () => {
		cy.mount(
			<StepInput step={2}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.ui5StepInputCheckInnerInputProperty("step", "2");
	});

	it("should propagate 'disabled' property to inner input", () => {
		cy.mount(
			<StepInput disabled></StepInput>
		);

		cy.get("[ui5-step-input]")
			.ui5StepInputCheckInnerInputProperty("disabled", true);
	});

	it("should propagate 'readonly' property to inner input", () => {
		cy.mount(
			<StepInput readonly></StepInput>
		);

		cy.get("[ui5-step-input]")
			.ui5StepInputCheckInnerInputProperty("readonly", true);
	});

	it("should propagate 'value' property to inner input", () => {
		cy.mount(
			<StepInput value={5}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.ui5StepInputCheckInnerInputProperty("value", "5");
	});
});