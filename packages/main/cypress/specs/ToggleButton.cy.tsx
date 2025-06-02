import ToggleButton from "../../src/ToggleButton.js";

describe("Toggle Button general interaction tests", () => {
    const toggleButton = <ToggleButton>Toggle Button</ToggleButton>;

    it("test click event", () => {
        cy.mount(toggleButton);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get("@toggleButton")
            .then(button => {
                button.get(0).addEventListener("click", cy.stub().as("clicked"));
            });

        cy.get("@toggleButton").realClick();

        cy.get("@toggleButton").should("have.attr", "pressed");

        cy.get("@toggleButton").realClick();

        cy.get("@toggleButton").should("not.have.attr", "pressed");

        cy.get("@clicked")
            .should("have.been.calledTwice");
    });

    it("test prevented click event", () => {
        cy.mount(toggleButton);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get("@toggleButton").then(($el) => {
            const el = $el.get(0);
            el.addEventListener("click", (e) => {
                e.preventDefault();
            });
            const clickSpy = cy.stub().as("click");
            el.addEventListener("click", clickSpy);
        });

        cy.get("@toggleButton").realClick();

        cy.get("@click")
            .should("have.been.called");

        cy.get("@toggleButton")
            .should("not.have.prop", "pressed", "prev state here");
    });

    it("test click event with ctrl key pressed", () => {
        cy.mount(toggleButton);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get("@toggleButton")
            .then(button => {
                button.get(0).addEventListener("click", cy.stub().as("clicked"));
            });

        cy.get("@toggleButton").realClick({ ctrlKey: true });

        cy.get("@toggleButton").should("have.attr", "pressed");

        cy.get("@clicked")
            .should("have.been.called")
            .should("be.calledWithMatch", Cypress.sinon.match.has("ctrlKey", true));
    });

    it("test prevented click event with ctrl key pressed", () => {
        cy.mount(toggleButton);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get("@toggleButton").then(($el) => {
            const el = $el.get(0);
            el.addEventListener("click", (e) => {
                e.preventDefault();
            });
            const clickSpy = cy.stub().as("click");
            el.addEventListener("click", clickSpy);
        });

        cy.get("@toggleButton").realClick({ ctrlKey: true });

        cy.get("@click")
            .should("have.been.called");

        cy.get("@toggleButton")
            .should("not.have.prop", "pressed", "prev state here");
    });

    it("test click event with alt key pressed", () => {
        cy.mount(toggleButton);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get("@toggleButton")
            .then(button => {
                button.get(0).addEventListener("click", cy.stub().as("clicked"));
            });

        cy.get("@toggleButton").realClick({ altKey: true });

        cy.get("@toggleButton").should("have.attr", "pressed");

        cy.get("@clicked")
            .should("have.been.called")
            .should("be.calledWithMatch", Cypress.sinon.match.has("altKey", true));
    });

    it("test prevented click event with alt key pressed", () => {
        cy.mount(toggleButton);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get("@toggleButton").then(($el) => {
            const el = $el.get(0);
            el.addEventListener("click", (e) => {
                e.preventDefault();
            });
            const clickSpy = cy.stub().as("click");
            el.addEventListener("click", clickSpy);
        });

        cy.get("@toggleButton").realClick({ altKey: true });

        cy.get("@click")
            .should("have.been.called");

        cy.get("@toggleButton")
            .should("not.have.prop", "pressed", "prev state here");
    });

    it("test click event with shift key pressed", () => {
        cy.mount(toggleButton);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get("@toggleButton")
            .then(button => {
                button.get(0).addEventListener("click", cy.stub().as("clicked"));
            });

        cy.get("@toggleButton").realClick({ shiftKey: true });

        cy.get("@toggleButton").should("have.attr", "pressed");

        cy.get("@clicked")
            .should("have.been.called")
            .should("be.calledWithMatch", Cypress.sinon.match.has("shiftKey", true));
    });

    it("test prevented click event with shift key pressed", () => {
        cy.mount(toggleButton);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get("@toggleButton").then(($el) => {
            const el = $el.get(0);
            el.addEventListener("click", (e) => {
                e.preventDefault();
            });
            const clickSpy = cy.stub().as("click");
            el.addEventListener("click", clickSpy);
        });

        cy.get("@toggleButton").realClick({ shiftKey: true });

        cy.get("@click")
            .should("have.been.called");

        cy.get("@toggleButton")
            .should("not.have.prop", "pressed", "prev state here");
    });

    it("test click event with meta key pressed", () => {
        cy.mount(toggleButton);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get("@toggleButton")
            .then(button => {
                button.get(0).addEventListener("click", cy.stub().as("clicked"));
            });

        cy.get("@toggleButton").realClick({ metaKey: true });

        cy.get("@toggleButton").should("have.attr", "pressed");

        cy.get("@clicked")
            .should("have.been.called")
            .should("be.calledWithMatch", Cypress.sinon.match.has("metaKey", true));
    });

    it("test prevented click event with meta key pressed", () => {
        cy.mount(toggleButton);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get("@toggleButton").then(($el) => {
            const el = $el.get(0);
            el.addEventListener("click", (e) => {
                e.preventDefault();
            });
            const clickSpy = cy.stub().as("click");
            el.addEventListener("click", clickSpy);
        });

        cy.get("@toggleButton").realClick({ metaKey: true });

        cy.get("@click")
            .should("have.been.called");

        cy.get("@toggleButton")
            .should("not.have.prop", "pressed", "prev state here");
    });

    it("test press on keyboard space key on focused toggle button", () => {
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

    it("test press on keyboard Enter key on focused toggle button", () => {
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

    it("should not fire click event on a disabled toggle button", () => {
        cy.mount(<ToggleButton disabled>Disabled Toggle Button</ToggleButton>);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get("@toggleButton").realClick();

        cy.get("@toggleButton").should("not.have.attr", "pressed");
    });
});
