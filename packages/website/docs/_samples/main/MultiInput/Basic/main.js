import "@ui5/webcomponents/dist/MultiInput.js";
import "@ui5/webcomponents/dist/Token.js";

document.getElementById("multi-input").addEventListener("token-delete", function (event) {
	const tokens = event.detail?.tokens;

	if (tokens) {
		tokens.forEach(token => token.remove());
	}
});