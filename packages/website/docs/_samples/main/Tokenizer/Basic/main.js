import "@ui5/webcomponents/dist/Token.js";
import "@ui5/webcomponents/dist/Tokenizer.js";

const deleteTokenizer = document.getElementById("delete-tokenizer");

deleteTokenizer.addEventListener("ui5-token-delete", event => {
    const tokens = event.detail?.tokens;

    if (tokens) {
        tokens.forEach(token => token.remove());
    }
});
