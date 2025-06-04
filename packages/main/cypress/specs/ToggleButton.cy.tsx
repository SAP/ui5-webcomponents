import { Key } from "@ui5/webcomponents-base/dist/thirdparty/preact/preact.module.js";
import ToggleButton from "../../src/ToggleButton.js";

enum Keys {
    CTRL_KEY = "ctrlKey",
    ALT_KEY = "altKey",
    SHIFT_KEY = "shiftKey",
    META_KEY = "metaKey"
}

describe("Toggle Button general interaction tests", () => {
    const toggleButton = <ToggleButton>Toggle Button</ToggleButton>;

    function testKeyActionOnFocusedButton(key: Key) {
        cy.mount(toggleButton);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get<ToggleButton>("@toggleButton")
            .shadow()
            .find("button")
            .as("inner");

        cy.get("@inner").focus();

        cy.realPress(key);

        cy.get("@toggleButton").should("have.attr", "pressed");

        cy.realPress(key);

        cy.get("@toggleButton").should("not.have.attr", "pressed");
    }

    function testClickWithKeyPressed(key: Keys) {
        cy.mount(toggleButton);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get("@toggleButton")
            .then(button => {
                button.get(0).addEventListener("click", cy.stub().as("clicked"));
            });

        cy.get("@toggleButton").realClick({ [key]: true });

        cy.get("@toggleButton").should("have.attr", "pressed");

        cy.get("@clicked")
            .should("have.been.called")
            .should("be.calledWithMatch", Cypress.sinon.match.has(key, true));
    }

    function testPreventedClickWithKeyPressed(key: Keys) {
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

        cy.get("@toggleButton").realClick({ [key]: true });

        cy.get("@click")
            .should("have.been.called");

        cy.get("@toggleButton")
            .should("not.have.prop", "pressed");
    }

    it("tests click event", () => {
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

    it("tests prevented click event", () => {
        cy.mount(toggleButton);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get("@toggleButton").then(($item) => {
            $item.get(0).addEventListener("click", e => e.preventDefault());
            $item.get(0).addEventListener("ui5-click", cy.stub().as("click"));
        });

        cy.get("@toggleButton").realClick();

        cy.get("@click")
            .should("have.been.called");

        cy.get("@toggleButton")
            .should("not.have.prop", "pressed", "prev state here");
    });

    it("tests click event with ctrl key pressed", () => {
        testClickWithKeyPressed(Keys.CTRL_KEY);
    });

    it("tests prevented click event with ctrl key pressed", () => {
        testPreventedClickWithKeyPressed(Keys.CTRL_KEY);
    });

    it("tests click event with alt key pressed", () => {
        testClickWithKeyPressed(Keys.ALT_KEY);
    });

    it("tests prevented click event with alt key pressed", () => {
        testPreventedClickWithKeyPressed(Keys.ALT_KEY);
    });

    it("tests click event with shift key pressed", () => {
        testClickWithKeyPressed(Keys.SHIFT_KEY);
    });

    it("tests prevented click event with shift key pressed", () => {
        testPreventedClickWithKeyPressed(Keys.SHIFT_KEY);
    });

    it("tests click event with meta key pressed", () => {
        testClickWithKeyPressed(Keys.META_KEY);
    });

    it("tests prevented click event with meta key pressed", () => {
        testPreventedClickWithKeyPressed(Keys.META_KEY);
    });

    it("tests press on keyboard space key on focused toggle button", () => {
        testKeyActionOnFocusedButton("Space");
    });

    it("tests press on keyboard Enter key on focused toggle button", () => {
        testKeyActionOnFocusedButton("Enter");
    });

    it("should not fire click event on a disabled toggle button", () => {
        cy.mount(<ToggleButton disabled>Disabled Toggle Button</ToggleButton>);

        cy.get("[ui5-toggle-button]").as("toggleButton");

        cy.get("@toggleButton")
            .then(button => {
                button.get(0).addEventListener("click", cy.stub().as("clicked"));
            });

        cy.get("@toggleButton").realClick();

        cy.get("@clicked")
            .should("have.not.been.called")

        cy.get("@toggleButton").should("not.have.attr", "pressed");
    });
});
