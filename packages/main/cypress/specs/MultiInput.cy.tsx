import SuggestionItem from "../../src/SuggestionItem.js";
import MultiInput from "../../src/MultiInput.js";

const createTokenFromText = (text: string): HTMLElement => {
	const token = document.createElement("ui5-token");
	token.setAttribute("text", text);
	token.setAttribute("slot", "tokens");
	return token;
};

const handleKeyDown = (event: KeyboardEvent): void => {
	const inputElement = event.target as HTMLInputElement;
	if (event.key === "Enter" && inputElement.value) {
		const token = createTokenFromText(inputElement.value);
		inputElement.appendChild(token);
		inputElement.value = "";
	}
};

describe("MultiInput Web Component", () => {
	it("creates only one token when typing 'ad' and pressing Enter", () => {
		cy.mount(
			<MultiInput
				id="multi-inp-suggestion-token"
				showSuggestions={true}
				showValueHelpIcon={true}
				onKeyDown={handleKeyDown}
			>
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

		cy.get("#multi-inp-suggestion-token")
			.shadow()
			.find("input")
			.realType("ad{enter}");

		cy.get("#multi-inp-suggestion-token")
			.find("[ui5-token]")
			.should("have.length", 1)
			.and("have.attr", "text", "ad");
	});
});
