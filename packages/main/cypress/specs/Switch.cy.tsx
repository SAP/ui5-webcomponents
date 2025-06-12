import Button from "../../src/Button.js";
import Label from "../../src/Label.js";
import Switch from "../../src/Switch.js";

describe("General events interactions", () => {
	it("Should fire change event", () => {
		cy.mount(<Switch>Click me</Switch>);

		cy.get("[ui5-switch]")
			.as("switch")
			.then($switch => $switch.get(0).addEventListener("change", cy.stub().as("changed")));

		cy.get("@switch")
			.realClick();

		cy.get("@changed")
			.should("have.been.calledOnce");

		cy.get("@switch")
			.should("have.attr", "checked");
	});

	it("Should not fire change event when event is prevented", () => {
		cy.mount(<Switch>Click me</Switch>);

		cy.get("[ui5-switch]")
			.as("switch")
			.then($switch => {
				$switch.get(0).addEventListener("change", (e) => e.preventDefault());
				$switch.get(0).addEventListener("change", cy.stub().as("changed"));
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
	it("Should set correct 'accessible-name' attribute on the root", () => {
		cy.mount(<Switch accessible-name="Geographical location" text-on="Yes" text-off="No"></Switch>);

		cy.get("[ui5-switch]")
			.ui5SwitchCheckAttribute("role", "switch");

		cy.get("[ui5-switch]").as('switch')
			.ui5SwitchCheckAttribute("aria-label", "Geographical location No");

	});

	it("Should set correct 'accessible-name-ref' attribute on the root", () => {
		cy.mount(
			<>
				<Label id="descriptionText">Use GPS location</Label>
				<Switch accessible-name-ref="descriptionText" text-on="Yes" text-off="No"></Switch>
			</>
		);

		cy.get("[ui5-switch]")
			.ui5SwitchCheckAttribute("role", "switch");

		cy.get("[ui5-switch]")
			.ui5SwitchCheckAttribute("aria-label", "Use GPS location No");
	});

	it("Should set correct correct tooltip on the root", () => {
		cy.mount(<Switch tooltip="Use GPS location" text-on="Yes" text-off="No"></Switch>);

		cy.get("[ui5-switch]")
			.ui5SwitchCheckAttribute("title", "Use GPS location");
	});

	it("Should set correct attribute 'aria-label' when 'text-on' and 'text-off' attributes aren't set", () => {
		cy.mount(<Switch></Switch>);

		cy.get("[ui5-switch]")
			.ui5SwitchCheckAttribute("aria-label", "");
	});

	it("Should propagate 'required' attribute properly on the root", () => {
		cy.mount(
			<>
				<Switch id="requredSwitch" required></Switch>
				<Switch id="preventedSwitch"></Switch>
			</>
		);

		cy.get("#requredSwitch")
			.ui5SwitchCheckAttribute("aria-required", "true");

		cy.get("#preventedSwitch")
			.ui5SwitchCheckAttribute("aria-required", "false");
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

		cy.get<HTMLFormElement>("#switchForm").then(($form) => {
			return $form[0].checkValidity()
		}).should("be.false");

		cy.get("#requiredTestSwitch")
			.click();

		cy.get<HTMLFormElement>("#switchForm").then(($form) => {
			return $form[0].checkValidity()
		}).should("be.true");

	});
});