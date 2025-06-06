import TimePickerClock from "../../src/TimePickerClock.js";
import Input from "../../src/Input.js";


describe("Clock API", () => {

	it("'disabled' property", () => {
		cy.mount(
			<>
				<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action: none; margin: 2rem;">
					<TimePickerClock id="myHours12" label="myHours12" itemMin={1} itemMax={12} displayStep={1} selectedValue={12} active></TimePickerClock>
				</div>
				<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action: none; margin: 2rem;">
					<TimePickerClock id="myHours12Disabled" label="myHours12 (disabled)" itemMin={1} itemMax={12} displayStep={1} selectedValue={12} active disabled></TimePickerClock>
				</div>
			</>
		);

		cy.get("#myHours12")
			.shadow()
			.find(".ui5-tp-clock-cover")
			.as("enabled");

		cy.get("#myHours12Disabled")
			.shadow()
			.find(".ui5-tp-clock-cover")
			.as("disabled");

		cy.get("@disabled")
			.click(210, 50, { force: true });

		cy.get("#myHours12Disabled")
			.invoke("prop", "selectedValue")
			.should("eq", 12);

		cy.get("@enabled")
			.click(210, 50, { force: true });

		cy.get("#myHours12")
			.invoke("prop", "selectedValue")
			.should("eq", 1);
	});

	it("'active' property", () => {
		cy.mount(
			<>
				<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action: none; margin: 2rem;">
					<TimePickerClock id="myMinutes" label="myMinutes" itemMin={1} itemMax={60} lastItemReplacement={0} selectedValue={0} active></TimePickerClock>
				</div>
				<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action: none; margin: 2rem;">
					<TimePickerClock id="myMinutesInactive" label="myMinutes" itemMin={1} itemMax={60} lastItemReplacement={0} selectedValue={0}></TimePickerClock>
				</div>
			</>
		);

		cy.get("#myMinutes")
			.shadow()
			.find(".ui5-tp-clock")
			.should("have.css", "display", "block");

		cy.get("#myMinutesInactive")
			.shadow()
			.find(".ui5-tp-clock")
			.should("have.css", "display", "none");
	});

	it("'displayStep' and 'valueStep' properties", () => {
		cy.mount(
			<>
				<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action: none; margin: 2rem;">
					<TimePickerClock id="myHours12" label="myHours12" itemMin={1} itemMax={12} displayStep={1} selectedValue={12} active></TimePickerClock>
				</div>
				<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action: none; margin: 2rem;">
					<TimePickerClock id="myMinutes" label="myMinutes" itemMin={1} itemMax={60} lastItemReplacement={0} selectedValue={0} active></TimePickerClock>
				</div>
				<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action: none; margin: 2rem;">
					<TimePickerClock id="myMinutes10" label="myMinutes10" itemMin={1} itemMax={60} lastItemReplacement={0} selectedValue={10} displayStep={10} valueStep={10} active></TimePickerClock>
				</div>
			</>
		);

		cy.get("#myHours12")
			.shadow()
			.find(".ui5-tp-clock-items .ui5-tp-clock-item:not(.ui5-tp-clock-item-with-marker) .ui5-tp-clock-number")
			.should("have.length", 12);

		cy.get("#myMinutes")
			.shadow()
			.find(".ui5-tp-clock-items .ui5-tp-clock-item:not(.ui5-tp-clock-item-with-marker) .ui5-tp-clock-number")
			.should("have.length", 12);
		cy.get("#myMinutes10")
			.shadow()
			.find(".ui5-tp-clock-items .ui5-tp-clock-item:not(.ui5-tp-clock-item-with-marker) .ui5-tp-clock-number")
			.should("have.length", 6);
	});

	it("'lastItemReplacement' and 'prependZero' properties", () => {
		cy.mount(
			<>
				<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action: none; margin: 2rem;">
					<TimePickerClock id="myHours24" label="myHours24" itemMin={1} itemMax={24} lastItemReplacement={0} displayStep={1} selectedValue={1} prependZero active></TimePickerClock>
				</div>
				<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action: none; margin: 2rem;">
					<TimePickerClock id="myMinutes" label="myMinutes" itemMin={1} itemMax={60} lastItemReplacement={0} selectedValue={0} active></TimePickerClock>
				</div>
			</>
		);

		cy.get("#myHours24")
			.shadow()
			.find(".ui5-tp-clock-items .ui5-tp-clock-item:not(.ui5-tp-clock-item-with-marker) .ui5-tp-clock-number")
			.last()
			.should("have.text", "0");
		cy.get("#myMinutes")
			.shadow()
			.find(".ui5-tp-clock-items .ui5-tp-clock-item:not(.ui5-tp-clock-item-with-marker) .ui5-tp-clock-number")
			.last()
			.should("have.text", "0");
	});

	it("should not select value when clicking outside clock numbers", () => {
		cy.mount(
			<>
				<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action: none; margin: 2rem;">
					<TimePickerClock id="myHours12" label="myHours12" itemMin={1} itemMax={12} displayStep={1} selectedValue={12} active></TimePickerClock>
				</div>
			</>
		);

		cy.get("#myHours12")
			.shadow()
			.find(".ui5-tp-clock-cover")
			.click(200, 200, { force: true });

		cy.get("#myHours12")
			.invoke("prop", "selectedValue")
			.should("eq", 12);
	});

	it("should keep selected value after clicking same number", () => {
		cy.mount(
			<>
				<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action: none; margin: 2rem;">
					<TimePickerClock id="myHours12" label="myHours12" itemMin={1} itemMax={12} displayStep={1} selectedValue={12} active></TimePickerClock>
				</div>
			</>
		);

		cy.get("#myHours12")
			.shadow()
			.find(".ui5-tp-clock-cover")
			.click(45, 110, { force: true });

		cy.get("#myHours12")
			.invoke("prop", "selectedValue")
			.then(val => {
				cy.get("#myHours12")
					.shadow()
					.find(".ui5-tp-clock-cover")
					.click(45, 110, { force: true });

				cy.get("#myHours12")
					.invoke("prop", "selectedValue")
					.should("eq", val);
			});
	});
});

describe("Clock item selection", () => {
	it("select clock item and 'change' event", () => {
		cy.mount(
			<>
				<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action: none; margin: 2rem;">
					<TimePickerClock id="myHours12" label="myHours12" itemMin={1} itemMax={12} displayStep={1} selectedValue={12} active></TimePickerClock>
				</div>
			</>
		);

		cy.get("#myHours12").then(tpc => {
			tpc.get(0).addEventListener("ui5-change", cy.stub().as("changed"));
		});

		cy.get("#myHours12")
			.shadow()
			.find(".ui5-tp-clock-cover")
			.as("hours12Cover");

		cy.get("@hours12Cover")
			.click(210, 50, { force: true });

		cy.get("#myHours12")
			.invoke("prop", "selectedValue")
			.should("eq", 1);

		cy.get("@changed")
			.should("have.been.calledOnce");

		cy.get("@hours12Cover")
			.click(150, 35, { force: true });

		cy.get("#myHours12")
			.invoke("prop", "selectedValue")
			.should("eq", 12);

		cy.get("@changed")
			.should("have.been.calledTwice");


	});
});