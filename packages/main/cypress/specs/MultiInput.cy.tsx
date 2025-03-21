import SuggestionItem from "../../src/SuggestionItem.js";
import MultiInput from "../../src/MultiInput.js";
import "../../src/Token.js";

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

	it("allows token creation when the previous token is the same", () => {
		cy.mount(
			<MultiInput showSuggestions={true} showValueHelpIcon={true} id="suggestion-token">
				<SuggestionItem text="Aute"></SuggestionItem>
				<SuggestionItem text="ad"></SuggestionItem>
				<SuggestionItem text="amet"></SuggestionItem>
				<SuggestionItem text="aute"></SuggestionItem>
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

		cy.get("ui5-multi-input")
			.as("multiInput");

		cy.get("@multiInput")
			.realClick();

		cy.get("@multiInput")
			.realType("Au");

		cy.get("@multiInput")
			.realPress("Enter");

		cy.get("@multiInput")
			.realClick();

		cy.get("@multiInput")
			.realType("Aut");

		cy.get("@multiInput")
			.realPress("Enter");

		cy.get("@multiInput")
			.shadow()
			.find("ui5-tokenizer")
			.should("have.attr", "_tokens-count", 2);
	});
});
