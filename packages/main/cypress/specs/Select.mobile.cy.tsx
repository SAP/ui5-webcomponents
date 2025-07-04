import Option from "../../src/Option.js";
import Select from "../../src/Select.js";

describe("Select - Mobile Accessibility", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("ResponsivePopover should have accessible name when opened on mobile", () => {
		cy.mount(
			<Select id="select">
				<Option value="option1">Option 1</Option>
				<Option value="option2">Option 2</Option>
				<Option value="option3">Option 3</Option>
			</Select>
		);

		// Open the popover
		cy.get("#select").realClick();

		// Check that the ResponsivePopover has an accessible name on mobile
		cy.get("#select")
            .shadow()
			.find("[ui5-responsive-popover]")
			.should("have.attr", "accessible-name")
			.and("not.be.empty");
	});

	it("ResponsivePopover accessible name should match the expected title text on mobile", () => {
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

describe("Select - Mobile Focus Management", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("should focus the selected option when popover opens on mobile", () => {
		cy.mount(
			<Select id="select" value="option2">
				<Option id="opt1" value="option1">Option 1</Option>
				<Option id="opt2" value="option2">Option 2</Option>
				<Option id="opt3" value="option3">Option 3</Option>
			</Select>
		);

        cy.get("#select").realClick();

		cy.get("#opt2").should("have.attr", "focused");
		cy.get("#opt2").shadow()
            .find(".ui5-li-root")
            .should("be.focused");
	});
});
