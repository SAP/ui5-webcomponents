import "@ui5/webcomponents/dist/MultiInput.js";
import "@ui5/webcomponents/dist/Token.js";

const multiInput = document.getElementById("multi-input")

const createTokenFromText = (text) => {
    let token = document.createElement("ui5-token");
    token.setAttribute("text", text);
    token.setAttribute("slot", "tokens");
    return token;
};

multiInput.addEventListener("change", (event) => {
	const inputValue = event.target.value;

    if (inputValue) {
		multiInput.appendChild(createTokenFromText(inputValue));
		multiInput.value = "";
    }
});

multiInput.addEventListener("token-delete", (event) => {
    const token = event.detail?.token;
    token && token.remove();
});