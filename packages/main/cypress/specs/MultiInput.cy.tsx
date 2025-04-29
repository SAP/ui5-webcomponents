import SuggestionItem from "../../src/SuggestionItem.js";
import MultiInput from "../../src/MultiInput.js";
import "../../src/Token.js";
import { MULTIINPUT_VALUE_HELP } from "../../src/generated/i18n/i18n-defaults.js";

describe("MultiInput Web Component", () => {
	it("creates only one token when typing 'ad' and pressing Enter", () => {
		cy.mount(
			<MultiInput showSuggestions={true} showValueHelpIcon={true} id="suggestion-token">
				<SuggestionItem text="Aute"></SuggestionItem>
				<SuggestionItem text="ad"></SuggestionItem>
				<SuggestionItem text="exercitation"></SuggestionItem>
				<SuggestionItem text="esse"></SuggestionItem>
				<SuggestionItem text="labore"></SuggestionItem>
				<SuggestionItem text="amet"></SuggestionItem>
				<SuggestionItem text="aute"></SuggestionItem>
				<SuggestionItem text="excepteur"></SuggestionItem>
			</MultiInput>
		);

		cy.get("#suggestion-token").then(multiInput => {
			const createTokenFromText = (text: string): HTMLElement => {
				const token = document.createElement("ui5-token");
				token.setAttribute("text", text);
				token.setAttribute("slot", "tokens");
				return token;
			};

			multiInput[0].addEventListener("keydown", (event: KeyboardEvent) => {
				const inputElement = multiInput[0] as HTMLInputElement;
				if (event.key === "Enter" && inputElement.value) {
					const token = createTokenFromText(inputElement.value);
					inputElement.appendChild(token);
					inputElement.value = "";
				}
			});
		});

		cy.get("#suggestion-token")
			.shadow()
			.find("input")
			.realClick();

		cy.realType("ad");
		cy.realPress("Enter");

		cy.get("ui5-multi-input")
			.find("ui5-token")
			.should("have.length", 1)
			.and("have.attr", "text", "ad");
	});

	it("Value Help announcement", () => {
		const valueHelpId = "hiddenText-value-help";

		cy.mount(<MultiInput showValueHelpIcon={true}></MultiInput>);

		cy.get("[ui5-multi-input]")
			.as("multiInput");

		cy.get("@multiInput")
			.shadow()
			.find("input")
			.should("have.attr", "aria-describedby")
			.and("include", valueHelpId);

		cy.get("@multiInput")
			.shadow()
			.find(`#${valueHelpId}`)
			.should("have.text", MULTIINPUT_VALUE_HELP.defaultText);
	});
});
