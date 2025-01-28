import { html } from "lit";
import "../../src/MultiInput.js";
import "../../src/Tokenizer.js";
import "../../src/SuggestionItem.js";

describe("MultiInput Web Component", () => {
	it("creates only one token when typing 'ad' and pressing Enter", () => {
		cy.mount(html`<ui5-multi-input show-suggestions show-value-help-icon id="suggestion-token">
            <ui5-suggestion-item text="Aute"></ui5-suggestion-item>
            <ui5-suggestion-item text="ad"></ui5-suggestion-item>
            <ui5-suggestion-item text="exercitation"></ui5-suggestion-item>
            <ui5-suggestion-item text="esse"></ui5-suggestion-item>
            <ui5-suggestion-item text="labore"></ui5-suggestion-item>
            <ui5-suggestion-item text="amet"></ui5-suggestion-item>
            <ui5-suggestion-item text="aute"></ui5-suggestion-item>
            <ui5-suggestion-item text="excepteur"></ui5-suggestion-item>
        </ui5-multi-input>`);
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
			.type("ad{enter}");

		cy.get("ui5-multi-input")
			.find("ui5-token")
			.should("have.length", 1)
			.and("have.attr", "text", "ad");
	});
});
