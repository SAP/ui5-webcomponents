import Switch from "../../src/Switch.js";

describe("Switch general interactions", () => {
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