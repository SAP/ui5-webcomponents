import "@ui5/webcomponents-ai/dist/PromptInput.js"

const input = document.getElementById("prompt-input")

input.addEventListener("ui5-input", () => {
	input.valueState = input.value.length > input.maxlength ? "Negative" : "None";
});
