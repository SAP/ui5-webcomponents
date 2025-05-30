import ToggleButton from "../../src/ToggleButton.js";

describe("Toggle Button general interaction tests", () => {
    const toggleButton = <ToggleButton>Toggle Button</ToggleButton>;

    it("tests click event", () => {
        cy.mount(toggleButton);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get("@toggleButton").realClick();

        cy.get("@toggleButton").should("have.attr", "pressed");

        cy.get("@toggleButton").realClick();

        cy.get("@toggleButton").should("not.have.attr", "pressed");
    });

    it("tests press on keyboard space button on focused toggle button", () => {
        cy.mount(toggleButton);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get<ToggleButton>("@toggleButton")
            .shadow()
            .find("button")
            .as("inner");

        cy.get("@inner").focus();

        cy.realPress("Space");

        cy.get("@toggleButton").should("have.attr", "pressed");

        cy.realPress("Space");

        cy.get("@toggleButton").should("not.have.attr", "pressed");
    });

    it("tests press on keyboard space button on focused toggle button", () => {
        cy.mount(toggleButton);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get<ToggleButton>("@toggleButton")
            .shadow()
            .find("button")
            .as("inner");

        cy.get("@inner").focus();

        cy.realPress("Enter");

        cy.get("@toggleButton").should("have.attr", "pressed");

        cy.realPress("Enter");

        cy.get("@toggleButton").should("not.have.attr", "pressed");
    });

    it("should not fire click event on a disabled togglebutton", () => {
        cy.mount(<ToggleButton disabled>Disabled Toggle Button</ToggleButton>);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get("@toggleButton").realClick();

        cy.get("@toggleButton").should("not.have.attr", "pressed");
    });
});
