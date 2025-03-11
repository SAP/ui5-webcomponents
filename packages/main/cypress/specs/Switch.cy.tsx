import Switch from "../../src/Switch.js";

describe("Switch general interaction", () => {
	it("Clicking on the switch fires a change event", () => {
		const changeStub = cy.stub().as("changeStub");

		// Mount the component with the onChange handler stubbed
		cy.mount(<Switch onChange={changeStub} />);

		// Get the switch root element from the shadow DOM
		cy.get("ui5-switch")
			.shadow()
			.find(".ui5-switch-root")
			.as("switchRoot");

		// Click the switch
		cy.get("ui5-switch")
			.realClick();

		// Verify that the switch is checked
		cy.get("@switchRoot").should("have.class", "ui5-switch--checked");

		// Check that the change event was fired
		cy.get("@changeStub").should("have.been.called");
	});
});
