import Option from "../../src/Option.js";
import Select from "../../src/Select.js";

describe("Select - Mobile Accessibility", () => {
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
});

