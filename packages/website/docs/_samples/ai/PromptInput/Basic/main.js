import "@ui5/webcomponents-ai/dist/PromptInput.js";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";

const countries = [
	"Brazil",
	"Belgium",
	"Bangladesh",
	"Bulgaria",
	"Bahamas",
	"Barbados",
	"Belarus",
	"Benin",
	"Bhutan",
	"Bolivia"
];
const input = document.getElementById("prompt-input");

input.addEventListener("ui5-input", () => {
	input.valueState = input.value.length > input.maxlength ? "Negative" : "None";
	input.innerHTML = "";

	countries.forEach(country => {
		const suggestionItem = document.createElement('ui5-suggestion-item');
		suggestionItem.setAttribute('text', country);

		if (country.toLowerCase().includes(input.value.toLowerCase())) {
			input.appendChild(suggestionItem);
		}
	});
});
