import Select from "../../src/Select.js";
import Option from "../../src/Option.js";

describe("Select mobile general interaction", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("ResponsivePopover accessible name should match the expected title text", () => {
		cy.mount(
			<Select id="select">
				<Option value="option1">Option 1</Option>
				<Option value="option2">Option 2</Option>
			</Select>
		);

		// Open the popover
		cy.get("#select").realClick();

        // check if accessible-name is equal to select._headerTitleText
        cy.get("#select").invoke("prop", "_headerTitleText").then(_headerTitleText => {
            cy.get("#select")
                .shadow()
                .find("[ui5-responsive-popover]")
                .should("have.attr", "accessible-name")
                .and("equal", _headerTitleText);
        });
    });

	it("Changes selection in Dialog", () => {
		cy.mount(
			<Select>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.as("select")
			.then(($select) => {
				$select[0].addEventListener("ui5-change", cy.stub().as("changeStub"));
			});

		cy.get("@select")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", "Condensed");

		cy.get("@select").realClick();

		cy.get("@select").realPress("ArrowUp");
		cy.get("@select").realPress("ArrowUp");

		cy.get("@select").realPress("Enter");

		cy.get("@select")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", "Cozy");

		cy.get("@changeStub").should("have.been.calledOnce");

		cy.get("@select").should("have.prop", "value", "Cozy");
	});
});
