import "@ui5/webcomponents/dist/Token.js";
import "@ui5/webcomponents/dist/Tokenizer.js";

const clearAllTokenizer = document.getElementById('clear-all');


clearAllTokenizer.addEventListener("ui5-token-delete", event => {
    const tokens = event.detail?.tokens;

    if (tokens) {
        tokens.forEach(token => token.remove());
    }
});