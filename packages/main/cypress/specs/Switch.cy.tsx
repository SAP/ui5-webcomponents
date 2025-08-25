import Button from "../../src/Button.js";
import Label from "../../src/Label.js";
import Switch from "../../src/Switch.js";

describe("General events interactions", () => {
	it("Should fire change event", () => {
		cy.mount(<Switch onChange={cy.stub().as("changed")}>Click me</Switch>);

		cy.get("[ui5-switch]")
			.as("switch")

		cy.get("@switch")
			.realClick();

		cy.get("@changed")
			.should("have.been.calledOnce");

		cy.get("@switch")
			.should("have.attr", "checked");
	});

	it("Should not change checked property", () => {
		cy.mount(<Switch>Click me</Switch>);

		cy.get("[ui5-switch]")
			.as("switch")
			.then($switch => {
				$switch.get(0).addEventListener("ui5-change", (e) => e.preventDefault());
				$switch.get(0).addEventListener("ui5-change", cy.stub().as("changed"));
			});

		cy.get("@switch")
			.realClick();

		cy.get("@changed")
			.should("have.been.calledOnce");

		cy.get("@switch")
			.should("not.have.attr", "checked");
	});
});

describe("General accesibility attributes", () => {
	const geoLocationDescr = "Geographical location";
	const gpsLocationDescr = "Use GPS location";

	it("Should set correct 'accessible-name' attribute on the root", () => {
		cy.mount(<Switch accessible-name={geoLocationDescr} text-on="Yes" text-off="No"></Switch>);

		cy.get("[ui5-switch]").as("switch")
			.ui5SwitchCheckAttributeInShadowDomRoot("role", "switch");

		cy.get("@switch")
			.ui5SwitchCheckAttributeInShadowDomRoot("aria-label", `${geoLocationDescr} No`);

	});

	it("Should set correct 'accessible-name-ref' attribute on the root", () => {
		cy.mount(
			<>
				<Label id="descriptionText">{gpsLocationDescr}</Label>
				<Switch accessible-name-ref="descriptionText" text-on="Yes" text-off="No"></Switch>
			</>
		);

		cy.get("[ui5-switch]").as("switch")
			.ui5SwitchCheckAttributeInShadowDomRoot("role", "switch");

		cy.get("@switch")
			.ui5SwitchCheckAttributeInShadowDomRoot("aria-label", `${gpsLocationDescr} No`);
	});

	it("Should set correct correct tooltip on the root", () => {
		cy.mount(<Switch tooltip={gpsLocationDescr} text-on="Yes" text-off="No"></Switch>);

		cy.get("[ui5-switch]")
			.ui5SwitchCheckAttributeInShadowDomRoot("title", gpsLocationDescr);
	});

	it("Should set correct attribute 'aria-label' when 'text-on' and 'text-off' attributes aren't set", () => {
		cy.mount(<Switch></Switch>);

		cy.get("[ui5-switch]")
			.ui5SwitchCheckAttributeInShadowDomRoot("aria-label", "");
	});

	it("Should propagate 'required' attribute properly on the root", () => {
		cy.mount(<Switch required></Switch>);

		cy.get("[ui5-switch]")
			.ui5SwitchCheckAttributeInShadowDomRoot("aria-required", "true");
	});

	it("Should not propagate 'required' attribute on the root", () => {
		cy.mount(<Switch></Switch>);

		cy.get("[ui5-switch]")
			.ui5SwitchCheckAttributeInShadowDomRoot("aria-required", "false");
	});
});

describe("General interactions in form", () => {
	it("Should submit form only when 'required' switch is checked", () => {
		cy.mount(
			<form id="switchForm">
				<Switch checked></Switch>
				<Switch id="requiredTestSwitch" required></Switch>
				<Button id="switchSubmit" type="Submit">Submit</Button>
			</form>
		);

		cy.get<HTMLFormElement>("#switchForm").should(($form) => {
			expect($form[0].checkValidity()).to.be.false;
		});

		cy.get("#requiredTestSwitch")
			.realClick();

		cy.get<HTMLFormElement>("#switchForm").should(($form) => {
			expect($form[0].checkValidity()).to.be.true;
		});
	});

	it("Should fire 'invalid' event on form submit when 'required' switch is not checked", () => {
		cy.mount(
			<form id="switchForm">
				<Switch checked></Switch>
				<Switch id="requiredTestSwitch" required></Switch>
				<Button id="switchSubmit" type="Submit">Submit</Button>
			</form>
		);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("#switchSubmit")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#requiredTestSwitch")
			.then($el => {
				const switchElement = $el[0] as Switch;
				expect(switchElement.formValidity.valueMissing, "Unchecked required Switch should have formValidity with valueMissing=true").to.be.true;
				expect(switchElement.validity.valueMissing, "Unchecked required Switch should have validity with valueMissing=true").to.be.true;
				expect(switchElement.validity.valid, "Unchecked required Switch should have validity with valid=false").to.be.false;
				expect(switchElement.checkValidity(), "Unchecked required Switch should fail validity check").to.be.false;
				expect(switchElement.reportValidity(), "Unchecked required Switch should fail report validity").to.be.false;
			});

		cy.get("#requiredTestSwitch:invalid")
			.should("exist", "Unchecked required Switch should have :invalid CSS class");

		cy.get("#requiredTestSwitch")
			.realClick();

		cy.get("#requiredTestSwitch")
			.then($el => {
				const switchElement = $el[0] as Switch;
				expect(switchElement.formValidity.valueMissing, "Checked required Switch should have formValidity with valueMissing=false").to.be.false;
				expect(switchElement.validity.valueMissing, "Checked required Switch should have validity with valueMissing=false").to.be.false;
				expect(switchElement.validity.valid, "Checked required Switch should have validity with valid=true").to.be.true;
				expect(switchElement.checkValidity(), "Checked required Switch should pass validity check").to.be.true;
				expect(switchElement.reportValidity(), "Checked required Switch should pass report validity").to.be.true;
			});

		cy.get("#requiredTestSwitch:invalid").should("not.exist", "Checked required Switch should not have :invalid CSS class");
	});
});