import Input from "../../src/Input.js";
import SuggestionItem from "../../src/SuggestionItem.js";
import { INPUT_SUGGESTIONS_OK_BUTTON } from "../../src/generated/i18n/i18n-defaults.js";

describe("Input on mobile device", () => {
    beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});
	it("checks OK button text in dialog on mobile device", () => {
		cy.mount(
			<Input showSuggestions={true}>
				<SuggestionItem text="First item"></SuggestionItem>
				<SuggestionItem text="Second item"></SuggestionItem>
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");

		cy.get("@popover")
			.invoke("attr", "open", true);

		cy.get("@popover")
			.find(".ui5-responsive-popover-footer")
			.find("[ui5-button]")
			.should("have.text", INPUT_SUGGESTIONS_OK_BUTTON.defaultText);
	});
});